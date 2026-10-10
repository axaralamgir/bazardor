"use client";

import { useSyncExternalStore } from "react";
import { formatBengaliDate } from "@/lib/utils";

const subscribe = () => () => {};

/**
 * Renders "" on the server and during hydration, then the real Bengali date on the
 * client, so there is never a server/client mismatch (e.g. around midnight or time zones).
 */
export default function BengaliDate({ className = "" }) {
  const text = useSyncExternalStore(subscribe, () => formatBengaliDate(), () => "");
  return <span className={className}>{text}</span>;
}
