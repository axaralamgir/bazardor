/** Renders the API's `image` field: an emoji today, but an image URL works too. */
export default function ProductIcon({ image, className = "size-12 text-2xl" }) {
  const isUrl = typeof image === "string" && /^(https?:\/\/|\/)/.test(image);
  return (
    <span className={`grid shrink-0 place-items-center rounded-xl bg-page ${className}`} aria-hidden="true">
      {isUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="size-2/3 object-contain" />
      ) : (
        image
      )}
    </span>
  );
}
