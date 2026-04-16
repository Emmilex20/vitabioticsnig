import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initializePaystackPayment } from "@/lib/paystack";
import { getAuthUser } from "@/lib/session";
import { calculateOrderTotal } from "@/lib/checkout";

type CheckoutItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
};

function generateReference(orderId: string) {
  return `VTB-${orderId}-${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser();

    const body = await request.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      country,
      state,
      city,
      addressLine1,
      addressLine2,
      notes,
      items,
    } = body as {
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      country: string;
      state: string;
      city: string;
      addressLine1: string;
      addressLine2?: string;
      notes?: string;
      items: CheckoutItem[];
    };

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !country ||
      !state ||
      !city ||
      !addressLine1 ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing required checkout information" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
    const total = calculateOrderTotal(subtotal);

    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        sku: true,
      },
    });

    const productSkuMap = new Map(products.map((product) => [product.id, product.sku]));

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "One or more products could not be verified" },
        { status: 400 }
      );
    }

    const createdOrder = await prisma.order.create({
      data: {
        customerId: authUser?.role === "CUSTOMER" ? authUser.id : null,
        customerName,
        customerEmail: customerEmail.toLowerCase(),
        customerPhone,
        country,
        state,
        city,
        addressLine1,
        addressLine2: addressLine2 || null,
        notes: notes || null,
        subtotal,
        total,
        items: {
          create: items.map((item) => {
            const sku = productSkuMap.get(item.id);

            if (!sku) {
              throw new Error(`Missing SKU for product ${item.id}`);
            }

            return {
              productId: item.id,
              productName: item.name,
              productSlug: item.slug,
              sku,
              quantity: item.quantity,
              unitPrice: Number(item.price),
              totalPrice: Number(item.price) * Number(item.quantity),
            };
          }),
        },
      },
    });

    const reference = generateReference(createdOrder.id);

    await prisma.order.update({
      where: { id: createdOrder.id },
      data: {
        paymentReference: reference,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const payment = await initializePaystackPayment({
      email: customerEmail,
      amountKobo: Math.round(total * 100),
      reference,
      callback_url: `${appUrl}/checkout/verify?reference=${reference}`,
      metadata: {
        orderId: createdOrder.id,
        customerName,
      },
    });

    return NextResponse.json(
      {
        success: true,
        authorizationUrl: payment.authorization_url,
        reference,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order/payment init error:", error);

    return NextResponse.json(
      { error: "Unable to initialize payment" },
      { status: 500 }
    );
  }
}
