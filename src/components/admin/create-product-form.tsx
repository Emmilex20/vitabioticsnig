"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";

export default function CreateProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("WOMEN");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [usage, setUsage] = useState("");
  const [benefits, setBenefits] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [elementItems, setElementItems] = useState("");
  const [spotlightTitle, setSpotlightTitle] = useState("");
  const [bestFor, setBestFor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inStock, setInStock] = useState(true);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please choose an image first");
      toast.error("Please choose an image first");
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
        setError(data.error || "Unable to upload image");
        toast.error(data.error || "Unable to upload image");
        return;
      }

      setImageUrl(data.fileUrl || "");
      setSuccess("Image uploaded successfully.");
      toast.success("Image uploaded successfully.");
    } catch {
      setError("Something went wrong while uploading the image.");
      toast.error("Something went wrong while uploading the image.");
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
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price,
          oldPrice,
          shortDescription,
          badge,
          sku,
          description,
          usage,
          benefits,
          ingredients,
          elementItems,
          spotlightTitle,
          bestFor,
          imageUrl,
          inStock,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to create product");
        toast.error(data.error || "Unable to create product");
        return;
      }

      setSuccess("Product created successfully.");
      toast.success("Product created successfully.");
      setName("");
      setCategory("WOMEN");
      setPrice("");
      setOldPrice("");
      setShortDescription("");
      setBadge("");
      setSku("");
      setDescription("");
      setUsage("");
      setBenefits("");
      setIngredients("");
      setElementItems("");
      setSpotlightTitle("");
      setBestFor("");
      setImageUrl("");
      setSelectedFile(null);
      setInStock(true);

      window.location.reload();
    } catch {
      setError("Something went wrong while creating the product.");
      toast.error("Something went wrong while creating the product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Create Product
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              SKU
            </label>
            <input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            >
              <option value="WOMEN">Women</option>
              <option value="MEN">Men</option>
              <option value="KIDS">Kids</option>
              <option value="PREGNANCY">Pregnancy</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Old Price
            </label>
            <input
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              type="number"
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Badge
            </label>
            <input
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
              placeholder="Best Seller"
            />
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-4">
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-[var(--foreground)]"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition hover:bg-gray-50 disabled:opacity-70"
              >
                {isUploading ? (
                  <ButtonSpinner label="Uploading..." />
                ) : (
                  "Upload Image"
                )}
              </button>
              {imageUrl ? (
                <span className="text-xs font-medium text-emerald-700">
                  Image ready
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Image URL
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            placeholder="Upload image to generate automatically"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Short Description
          </label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Full Description
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
            Usage
          </label>
          <textarea
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Benefits
            </label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={5}
              placeholder={"One benefit per line"}
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Ingredients
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={5}
              placeholder={"One ingredient per line"}
              className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-5">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            Product detail storytelling
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
            These fields power the nutrient spotlight section and the richer
            product information layout on the product page.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Product Elements
          </label>
          <textarea
            value={elementItems}
            onChange={(e) => setElementItems(e.target.value)}
            rows={5}
            placeholder={
              "Zinc | Supports normal testosterone levels\nVitamin D | Contributes to immune system function"
            }
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
          />
          <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground)]">
            Add one element per line using the format Title | Description. These
            entries automatically power the nutrient spotlight section on the
            product page.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Spotlight Title
          </label>
          <input
            value={spotlightTitle}
            onChange={(e) => setSpotlightTitle(e.target.value)}
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4"
            placeholder="Key nutrients, clearer benefits, and a more premium story."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
            Best For
          </label>
          <textarea
            value={bestFor}
            onChange={(e) => setBestFor(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3"
            placeholder="Short summary about who this product suits best"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)]"
          />
          <span>In stock</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {isSubmitting ? <ButtonSpinner label="Creating..." /> : "Create Product"}
        </button>
      </form>
    </div>
  );
}
