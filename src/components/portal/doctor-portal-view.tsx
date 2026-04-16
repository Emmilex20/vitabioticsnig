import Link from "next/link";
import { doctorPortalItems } from "@/data/portal";
import DoctorPortalCard from "./doctor-portal-card";
import LogoutButton from "./logout-button";

type DoctorPortalViewProps = {
  email: string;
};

export default function DoctorPortalView({
  email,
}: DoctorPortalViewProps) {
  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
      <div className="bg-(--primary) px-6 py-7 sm:px-10">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Doctors Portal
        </h1>
      </div>

      <div className="bg-[radial-gradient(circle_at_top,_rgba(30,79,174,0.08),_transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-slate-500 transition hover:text-(--primary)"
          >
            &lt; Go back
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-(--primary)">
              Signed in as {email}
            </span>
            <LogoutButton />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-(--foreground) sm:text-4xl">
            Empowering Nigerian Doctors with Science-Based Nutrition
          </h2>
          <p className="mt-4 text-base leading-8 text-(--muted-foreground)">
            Welcome to the Vitabiotics Nigeria Doctor Portal - a secure platform
            designed for healthcare professionals. Here, you can access clinical
            studies, detailed product information, product updates and
            newsletters, and request clinical presentations.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {doctorPortalItems.map((item) => (
            <DoctorPortalCard
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
