import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  await prisma.portalResource.deleteMany();

  await prisma.portalResource.createMany({
    data: [
      {
        title: "Customer Nutrition Counseling Guide",
        description:
          "A pharmacist-ready guide for counseling customers on wellness support.",
        fileUrl: "/downloads/customer-nutrition-counseling-guide.pdf",
        fileType: "PDF",
        audience: "PHARMACIST",
      },
      {
        title: "Pharmacy Shelf Education Material",
        description:
          "Printable in-pharmacy educational material for product awareness.",
        fileUrl: "/downloads/pharmacy-shelf-education-material.pdf",
        fileType: "PDF",
        audience: "PHARMACIST",
      },
      {
        title: "Clinical Product Overview",
        description:
          "Clinical support material for doctors and healthcare professionals.",
        fileUrl: "/downloads/clinical-product-overview.pdf",
        fileType: "PDF",
        audience: "DOCTOR",
      },
      {
        title: "Patient Education Support Leaflet",
        description:
          "A patient-friendly education document for consultation support.",
        fileUrl: "/downloads/patient-education-support-leaflet.pdf",
        fileType: "PDF",
        audience: "DOCTOR",
      },
      {
        title: "General Product Reference Handbook",
        description:
          "Shared professional resource for both doctors and pharmacists.",
        fileUrl: "/downloads/general-product-reference-handbook.pdf",
        fileType: "PDF",
        audience: "BOTH",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
