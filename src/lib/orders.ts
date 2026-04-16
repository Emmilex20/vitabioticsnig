import { prisma } from "@/lib/prisma";

export async function markOrderPaidByReference(reference: string) {
  const order = await prisma.order.findFirst({
    where: {
      paymentReference: reference,
    },
  });

  if (!order) {
    throw new Error("Order not found for payment reference");
  }

  if (
    order.status === "PAID" ||
    order.status === "PROCESSING" ||
    order.status === "SHIPPED" ||
    order.status === "DELIVERED"
  ) {
    return order;
  }

  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      status: "PAID",
    },
  });

  return updatedOrder;
}
