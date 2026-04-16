"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      richColors
      closeButton
      expand
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "20px",
        },
      }}
    />
  );
}
