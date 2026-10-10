/** Maps a Better Auth client error to a Bengali message. */
export function authErrorMessage(error) {
  const code = String(error?.code ?? "").toUpperCase();
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || code.includes("INVALID_PASSWORD")) {
    return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
  }
  if (code.includes("USER_ALREADY_EXISTS")) return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে।";
  if (code.includes("PASSWORD_TOO_SHORT")) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (code.includes("INVALID_EMAIL")) return "ইমেইল ঠিকানাটি সঠিক নয়।";
  if (code.includes("PROVIDER_NOT_FOUND")) return "এই লগইন পদ্ধতি এখনো চালু করা হয়নি।";
  if (error?.status === 429) return "অনেকবার চেষ্টা করা হয়েছে। একটু পরে আবার চেষ্টা করুন।";
  return "কিছু একটা সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।";
}
