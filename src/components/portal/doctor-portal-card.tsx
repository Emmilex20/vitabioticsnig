import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type DoctorPortalCardProps = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

export default function DoctorPortalCard({
  title,
  description,
  href,
  imageSrc,
}: DoctorPortalCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${title}. ${description}`}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 44vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-(--primary) opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="bg-(--primary) px-4 py-4 text-center text-white">
        <h3 className="text-lg font-extrabold leading-tight">{title}</h3>
      </div>

      <span className="sr-only">{description}</span>
    </Link>
  );
}
