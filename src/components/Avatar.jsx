export default function Avatar({ user, size = 36 }) {
  const style = { width: size, height: size };
  if (user?.image) {
    return (
      // OAuth avatars come from arbitrary hosts, so a plain <img> is used on purpose.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt=""
        referrerPolicy="no-referrer"
        style={style}
        className="rounded-full bg-page object-cover"
      />
    );
  }
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();
  return (
    <span
      style={{ ...style, fontSize: size * 0.4 }}
      className="grid place-items-center rounded-full bg-brand-soft font-semibold text-brand"
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
