"use client";

import { useState } from "react";

/** Plain <img> that removes itself if the remote file fails to load. */
export function HotlinkImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(true)} />;
}
