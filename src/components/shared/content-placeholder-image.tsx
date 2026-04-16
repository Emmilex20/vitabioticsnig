"use client";

import Image from "next/image";
import { useState } from "react";

type ContentPlaceholderImageProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function ContentPlaceholderImage({
  src,
  alt,
  label,
  className,
  sizes,
  fill = false,
  width,
  height,
}: ContentPlaceholderImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[linear-gradient(180deg,#eaf3ff_0%,#f8fbff_100%)] text-center ${className ?? ""}`}
      >
        <div className="space-y-2 px-6">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700">
            Image Placeholder
          </p>
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {label ?? alt}
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            Add {src.replace(/^\//, "")} to the public folder.
          </p>
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 900}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
