"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { getSafeImageSrc } from "@/lib/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc,
  alt,
  ...props
}: SafeImageProps) {
  const safeFallbackSrc = getSafeImageSrc(fallbackSrc);
  const [currentSrc, setCurrentSrc] = useState(
    getSafeImageSrc(src, safeFallbackSrc),
  );

  useEffect(() => {
    setCurrentSrc(getSafeImageSrc(src, safeFallbackSrc));
  }, [src, safeFallbackSrc]);

  return (
    <Image
      {...props}
      alt={alt}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== safeFallbackSrc) {
          setCurrentSrc(safeFallbackSrc);
        }
      }}
    />
  );
}
