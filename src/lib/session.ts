import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./auth";

const AUTH_COOKIE_NAME = "vitabiotics_portal_token";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  return payload;
}

export async function requireAuth() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(
  role: "ADMIN" | "DOCTOR" | "PHARMACIST" | "CUSTOMER"
) {
  const user = await requireAuth();

  if (user.role !== role) {
    if (user.role === "ADMIN") {
      redirect("/admin");
    }

    if (user.role === "DOCTOR") {
      redirect("/portal/doctor");
    }

    if (user.role === "PHARMACIST") {
      redirect("/portal/pharmacist");
    }

    redirect("/account");
  }

  return user;
}

export async function requireCustomer() {
  return requireRole("CUSTOMER");
}

export const authCookieName = AUTH_COOKIE_NAME;
