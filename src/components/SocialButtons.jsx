"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

export default function SocialButtons({ callbackURL = "/" }) {
  const [pending, setPending] = useState(null);

  async function handleSocial(provider) {
    setPending(provider);
    // On success the browser is redirected to the provider, so we only handle failure here.
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) {
      toast.error(authErrorMessage(error), { id: "social-error" });
      setPending(null);
    }
  }

  const buttonClass = "btn btn-outline min-h-11 border-line bg-surface font-medium";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" className={buttonClass} disabled={pending !== null} onClick={() => handleSocial("google")}>
        {pending === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" className={buttonClass} disabled={pending !== null} onClick={() => handleSocial("github")}>
        {pending === "github" ? <span className="loading loading-spinner loading-xs" /> : <GitHubIcon />}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
