import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaSchemaVersion: string | undefined;
};

const PRISMA_SCHEMA_VERSION = "admin-role-v1";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }

  const pool = new Pool({
    connectionString,
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ["error"],
  });
}

function hasDelegate(
  client: PrismaClient,
  key: "passwordResetToken" | "portalRequest" | "portalResource"
) {
  const delegate = Reflect.get(client as object, key) as
    | { findMany?: unknown; create?: unknown }
    | undefined;

  return !!delegate && (
    typeof delegate.findMany === "function" ||
    typeof delegate.create === "function"
  );
}

export function getPrisma() {
  const cachedClient = globalForPrisma.prisma;
  const cachedVersion = globalForPrisma.prismaSchemaVersion;
  const needsFreshClient =
    !cachedClient ||
    cachedVersion !== PRISMA_SCHEMA_VERSION ||
    !hasDelegate(cachedClient, "passwordResetToken") ||
    !hasDelegate(cachedClient, "portalRequest") ||
    !hasDelegate(cachedClient, "portalResource");

  if (!needsFreshClient) {
    return cachedClient;
  }

  const prismaClient = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient;
    globalForPrisma.prismaSchemaVersion = PRISMA_SCHEMA_VERSION;
  }

  return prismaClient;
}

export const prisma = getPrisma();
