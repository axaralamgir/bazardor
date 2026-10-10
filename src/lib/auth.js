import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Reuse one client across hot reloads / serverless invocations.
const globalForMongo = globalThis;
globalForMongo._bazardorMongo ??= new MongoClient(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bazardor",
);
const db = globalForMongo._bazardorMongo.db();

const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

// BETTER_AUTH_SECRET and BETTER_AUTH_URL are read from the environment automatically.
export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false, // after sign-up the user is sent to /signin, as the assignment requires
  },
  socialProviders,
  plugins: [nextCookies()], // must stay last
});
