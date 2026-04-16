import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PortalCardProps = {
  title: string;
  description: string;
  href: string;
  imageLabel: string;
  imageSrc?: string;
  cta?: string;
};

export default function PortalCard({
  title,
  description,
  href,
  imageLabel,
  imageSrc,
  cta = "Open feature",
}: PortalCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,24,40,0.22)] via-transparent to-transparent" />

        <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
          {imageLabel}
        </div>

        {!imageSrc ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-blue-100 bg-white text-center text-sm font-bold text-[var(--primary)] shadow-sm">
              {imageLabel}
            </div>
          </div>
        ) : null}
      </div>

      <div className="bg-[var(--primary)] px-5 py-5 text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/80">{description}</p>

        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
          {cta}
          <ArrowRight size={16} className="transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
