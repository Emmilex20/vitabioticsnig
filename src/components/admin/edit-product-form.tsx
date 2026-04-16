"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ButtonSpinner from "@/components/shared/button-spinner";

function stringifyElementItems(value: unknown) {
  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const title = "title" in item ? item.title : "";
      const description = "description" in item ? item.description : "";

      if (typeof title !== "string" || typeof description !== "string") {
        return null;
      }

      const cleanTitle = title.trim();
      const cleanDescription = description.trim();

      if (!cleanTitle || !cleanDescription) {
        return null;
      }

      return `${cleanTitle} | ${cleanDescription}`;
    })
    .filter((item): item is string => Boolean(item))
    .join("\n");
}

type EditProductFormProps = {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    oldPrice: number | null;
    shortDescription: string;
    badge: string | null;
    sku: string;
    inStock: boolean;
    description: string;
    usage: string;
    imageUrl: string | null;
    benefits: string[];
    ingredients: string[];
    elementItems: unknown;
    spotlightTitle: string | null;
    bestFor: string | null;
  };
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(String(product.price));
  const [oldPrice, setOldPrice] = useState(
    product.oldPrice ? String(product.oldPrice) : ""
  );
  const [shortDescription, setShortDescription] = useState(
    product.shortDescription
  );
  const [badge, setBadge] = useState(product.badge ?? "");
  const [sku, setSku] = useState(product.sku);
  const [description, setDescription] = useState(product.description);
  const [usage, setUsage] = useState(product.usage);
  const [benefits, setBenefits] = useState((product.benefits ?? []).join("\n"));
  const [ingredients, setIngredients] = useState(
    (product.ingredients ?? []).join("\n")
  );
  const [elementItems, setElementItems] = useState(
    stringifyElementItems(product.elementItems)
  );
  const [spotlightTitle, setSpotlightTitle] = useState(
    product.spotlightTitle ?? ""
  );
  const [bestFor, setBestFor] = useState(product.bestFor ?? "");
  const [imageUrl, setImageUrl] = useState(product.imageUrl ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inStock, setInStock] = useState(product.inStock);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
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
        setError(data.error || "Unable to update product");
        toast.error(data.error || "Unable to update product");
        return;
      }

      setSuccess("Product updated successfully.");
      toast.success("Product updated successfully.");
    } catch {
      setError("Something went wrong while updating the product.");
      toast.error("Something went wrong while updating the product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    setSuccess("");
    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to delete product");
        toast.error(data.error || "Unable to delete product");
        return;
      }

      toast.success("Product deleted successfully.");
      window.location.href = "/admin/products";
    } catch {
      setError("Something went wrong while deleting the product.");
      toast.error("Something went wrong while deleting the product.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
        Edit Product
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
            />
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border)] bg-slate-50 p-4">
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
              Replace Product Image
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
            These fields control the nutrient spotlight section and the richer
            product information layout on the product detail page.
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

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {isSaving ? <ButtonSpinner label="Saving..." /> : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-full border border-rose-200 bg-white px-6 py-3.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-70"
          >
            {isDeleting ? (
              <ButtonSpinner label="Deleting..." />
            ) : (
              "Delete Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
