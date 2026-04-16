"use client";

import { FormEvent, useState } from "react";

export default function CreateResourceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("PDF");
  const [audience, setAudience] = useState("BOTH");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please choose a file first");
      return;
    }

    setError("");
    setSuccess("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to upload file");
        return;
      }

      setFileUrl(data.fileUrl || "");
      setFileType(
        typeof data.fileType === "string" && data.fileType.length > 0
          ? data.fileType
          : "FILE"
      );
      setSuccess("File uploaded successfully. You can now create the resource.");
    } catch {
      setError("Something went wrong while uploading the file.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/resources", {
        method: "POST",
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
        setError(data.error || "Unable to create resource");
        return;
      }

      setSuccess("Resource created successfully.");
      setTitle("");
      setDescription("");
      setFileUrl("");
      setFileType("PDF");
      setAudience("BOTH");
      setSelectedFile(null);

      window.location.reload();
    } catch {
      setError("Something went wrong while creating the resource.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Create Resource
      </h2>

      <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
        Upload a professional document and publish it directly to the doctor,
        pharmacist, or shared resource library.
      </p>

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

        <div className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5">
          <label className="mb-3 block text-sm font-semibold text-[var(--foreground)]">
            Upload File
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <input
              id="resourceFile"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="sr-only"
            />
            <label
              htmlFor="resourceFile"
              className="inline-flex cursor-pointer rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50"
            >
              Choose file
            </label>
            <span className="text-sm text-[var(--muted-foreground)]">
              {selectedFile ? `Selected: ${selectedFile.name}` : "No file selected"}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </button>

            {selectedFile ? (
              <p className="text-sm text-[var(--muted-foreground)]">
                Selected: {selectedFile.name}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Uploaded File URL
          </label>
          <input
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            placeholder="Upload a file to generate this automatically"
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

        <button
          type="submit"
          disabled={isSubmitting || !fileUrl}
          className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating..." : "Create Resource"}
        </button>
      </form>
    </div>
  );
}
