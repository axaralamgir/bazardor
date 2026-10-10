import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Server-side session lookup (validated against the database, not just the cookie). */
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

/**
 * Use at the top of a protected server page. Redirects to /signin and remembers
 * where the user was going. The sign-in page shows the toast (reason=protected).
 */
export async function requireSession(returnTo) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?callbackUrl=${encodeURIComponent(returnTo)}&reason=protected`);
  }
  return session;
}
