"use client";

import React from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
}

export default function MarkdownImage({ src, alt = "", ...props }: Props) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // eslint-disable-next-line no-console
    console.warn("Markdown image failed to load:", src);
    const img = e.currentTarget as HTMLImageElement;
    img.style.opacity = "0.6";
  };

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="max-w-full h-auto"
      onError={handleError}
      {...props}
    />
  );
}
