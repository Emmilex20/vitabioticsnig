"use client";

import { FormEvent, useState } from "react";

type EditResourceFormProps = {
  resource: {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    fileType: string;
    audience: string;
  };
};

export default function EditResourceForm({ resource }: EditResourceFormProps) {
  const [title, setTitle] = useState(resource.title);
  const [description, setDescription] = useState(resource.description);
  const [fileUrl, setFileUrl] = useState(resource.fileUrl);
  const [fileType, setFileType] = useState(resource.fileType);
  const [audience, setAudience] = useState(resource.audience);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/resources/${resource.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          fileUrl,
          fileType,
          audience,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to update resource");
        return;
      }

      setSuccess("Resource updated successfully.");
    } catch {
      setError("Something went wrong while updating the resource.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmed) return;

    setSuccess("");
    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/resources/${resource.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to delete resource");
        return;
      }

      window.location.href = "/admin/resources";
    } catch {
      setError("Something went wrong while deleting the resource.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Edit Resource
      </h2>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        {success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {success}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            File URL
          </label>
          <input
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              File Type
            </label>
            <input
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            >
              <option value="BOTH">Both</option>
              <option value="DOCTOR">Doctor</option>
              <option value="PHARMACIST">Pharmacist</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full border border-rose-200 bg-white px-6 py-3.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete Resource"}
          </button>
        </div>
      </form>
    </div>
  );
}
