"use client";

import { LoaderCircle } from "lucide-react";

type ButtonSpinnerProps = {
  label: string;
};

export default function ButtonSpinner({ label }: ButtonSpinnerProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <LoaderCircle size={16} className="animate-spin" />
      {label}
    </span>
  );
}
