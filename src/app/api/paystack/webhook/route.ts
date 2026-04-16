import crypto from "crypto";
import { NextResponse } from "next/server";
import { verifyPaystackPayment } from "@/lib/paystack";
import { markOrderPaidByReference } from "@/lib/orders";

function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PAYSTACK_SECRET_KEY || "";

  const hash = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  return hash === signature;
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-paystack-signature");
    const rawBody = await request.text();

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody) as {
      event?: string;
      data?: {
        reference?: string;
        status?: string;
      };
    };

    if (event.event === "charge.success" && event.data?.reference) {
      const reference = event.data.reference;

      const payment = await verifyPaystackPayment(reference);

      if (payment.status === "success") {
        await markOrderPaidByReference(reference);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Paystack webhook error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
