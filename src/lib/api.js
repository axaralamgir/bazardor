import { cache } from "react";

const BASE_URLS = [
  process.env.NEXT_PUBLIC_BAZARDOR_API_URL || "https://api.api-store.workers.dev/api/bazardor",
  process.env.NEXT_PUBLIC_BAZARDOR_FALLBACK_API_URL || "https://api.abcz.workers.dev/api/bazardor",
]
  .map((url) => url.replace(/\/+$/, ""))
  .filter((url, index, all) => all.indexOf(url) === index);

export class ApiError extends Error {
  constructor(message, options) {
    super(message, options);
    this.name = "ApiError";
  }
}

/**
 * GET a path from the primary API, falling back to the alternative one on network
 * errors / non-2xx responses. A 404 is a *real* "not found", not an outage, so it
 * is returned as { notFound: true } instead of being retried or thrown.
 */
async function request(path) {
  let lastError;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000),
      });
      if (res.status === 404) return { notFound: true };
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { data: await res.json() };
    } catch (error) {
      lastError = error;
    }
  }
  throw new ApiError("বাজারের তথ্য লোড করা যায়নি।", { cause: lastError });
}

function toNumber(value) {
  const n = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return null;
  const today = toNumber(raw.today);
  if (!raw.slug || !raw.nameBn || today === null) return null;

  const markets = Array.isArray(raw.markets)
    ? raw.markets
        .map((m) => ({
          market: m?.market,
          division: m?.division ?? "",
          min: toNumber(m?.min),
          max: toNumber(m?.max),
        }))
        .filter((m) => m.market && m.min !== null && m.max !== null)
    : [];

  return {
    id: raw.id ?? raw.slug,
    slug: String(raw.slug),
    nameBn: String(raw.nameBn),
    category: raw.category ?? "",
    categoryNameBn: raw.categoryNameBn ?? "",
    categoryIcon: raw.categoryIcon ?? "",
    unit: raw.unit ?? "",
    image: raw.image || raw.categoryIcon || "🛒",
    today,
    yesterday: toNumber(raw.yesterday),
    lastWeek: toNumber(raw.lastWeek),
    lastMonth: toNumber(raw.lastMonth),
    pct: toNumber(raw.change?.pct) ?? 0,
    markets,
  };
}

function normalizeCategory(raw) {
  if (!raw || typeof raw !== "object" || !raw.slug || !raw.nameBn) return null;
  return {
    id: raw.id ?? raw.slug,
    slug: String(raw.slug),
    nameBn: String(raw.nameBn),
    icon: raw.icon ?? "",
  };
}

function normalizeList(data, normalizer) {
  if (!Array.isArray(data)) throw new ApiError("API থেকে অপ্রত্যাশিত গঠনের উত্তর এসেছে।");
  return data.map(normalizer).filter(Boolean);
}

/** All products. cache() makes this one request per render pass, shared by layout + page. */
export const getProducts = cache(async () => {
  const result = await request("/products");
  return result.notFound ? [] : normalizeList(result.data, normalizeProduct);
});

export const getCategories = cache(async () => {
  const result = await request("/categories");
  return result.notFound ? [] : normalizeList(result.data, normalizeCategory);
});

/** Product by slug, resolved from the already-fetched list (no extra request). */
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

/** Product by numeric id via /products/:id (null when it does not exist). */
export async function getProductById(id) {
  const result = await request(`/products/${encodeURIComponent(id)}`);
  return result.notFound ? null : normalizeProduct(result.data);
}

export async function getCategoryBySlug(slug) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

/** Products of one category, filtered from the shared product list. */
export async function getCategoryProducts(slug) {
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}
