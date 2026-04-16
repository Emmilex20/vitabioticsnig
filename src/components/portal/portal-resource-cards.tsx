"use client";

import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";

type PortalResource = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  audience: string;
};

export default function PortalResourceCards() {
  const [resources, setResources] = useState<PortalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch("/api/portal/resources");
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Unable to load resources");
          return;
        }

        setResources(data.resources || []);
      } catch {
        setError("Something went wrong while loading resources");
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
        <p className="text-[var(--muted-foreground)]">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 shadow-sm">
        <p className="text-sm font-medium text-rose-700">{error}</p>
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
        <p className="text-[var(--muted-foreground)]">
          No resources available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {resources.map((resource) => (
        <article
          key={resource.id}
          className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-sm"
        >
          <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white shadow-sm">
              <FileText className="h-9 w-9 text-[var(--primary)]" />
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                {resource.fileType}
              </span>

              <span className="inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[var(--foreground)]">
                {resource.audience}
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--foreground)]">
              {resource.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
              {resource.description}
            </p>

            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download Resource
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
