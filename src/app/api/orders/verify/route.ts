import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaystackPayment } from "@/lib/paystack";
import { markOrderPaidByReference } from "@/lib/orders";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference } = body as { reference?: string };

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference is required" },
        { status: 400 }
      );
    }

    const payment = await verifyPaystackPayment(reference);

    const order = await prisma.order.findFirst({
      where: { paymentReference: reference },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found for this payment reference" },
        { status: 404 }
      );
    }

    if (payment.status !== "success") {
      return NextResponse.json(
        { error: "Payment has not been completed" },
        { status: 400 }
      );
    }

    const expectedAmountKobo = Math.round(order.total * 100);

    if (payment.amount !== expectedAmountKobo) {
      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    const updatedOrder = await markOrderPaidByReference(reference);

    return NextResponse.json(
      {
        success: true,
        orderId: updatedOrder.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify payment error:", error);

    return NextResponse.json(
      { error: "Unable to verify payment" },
      { status: 500 }
    );
  }
}
