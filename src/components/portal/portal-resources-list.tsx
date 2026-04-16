"use client";

import { useEffect, useState } from "react";

type PortalResource = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
};

export default function PortalResourcesList() {
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

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Available Resources
      </h2>
      <p className="mt-3 text-[var(--muted-foreground)]">
        Download professional documents and support materials.
      </p>

      <div className="mt-8 space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                  {resource.fileType}
                </span>

                <h3 className="mt-3 text-lg font-bold text-[var(--foreground)]">
                  {resource.title}
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
                  {resource.description}
                </p>
              </div>

              <a
                href={resource.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
