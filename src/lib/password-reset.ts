import crypto from "crypto";

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function getResetTokenExpiry() {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return date;
}

export function buildResetUrl(token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${appUrl}/reset-password?token=${token}`;
}
