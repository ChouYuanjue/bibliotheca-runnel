import Link from "next/link";

interface PosterPreviewProps {
  src: string;
  title: string;
  href?: string;
  eager?: boolean;
}

export default function PosterPreview({ src, title, href, eager = false }: PosterPreviewProps) {
  const poster = (
    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
      {/* SVG previews stay vector in the browser; a plain img keeps their intrinsic aspect ratio. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${title} poster`}
        className="block h-auto w-full"
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );

  if (!href) return poster;

  return (
    <Link href={href} className="block transition-opacity hover:opacity-[0.97]" aria-label={`Open ${title}`}>
      {poster}
    </Link>
  );
}
