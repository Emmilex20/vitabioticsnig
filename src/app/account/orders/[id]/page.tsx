import { notFound } from "next/navigation";
import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import OrderTrackingResult from "@/components/shop/order-tracking-result";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AccountOrderDetailPage({ params }: PageProps) {
  const user = await requireCustomer();
  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: {
      id,
      customerId: user.id,
    },
    include: {
      items: {
        select: {
          id: true,
          productId: true,
          productName: true,
          quantity: true,
          totalPrice: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <AccountShell>
      <AccountHeader
        title="Order Details"
        description="Review your order progress and item details."
        firstName={user.firstName}
      />

      <OrderTrackingResult
        order={{
          ...order,
          createdAt: order.createdAt.toISOString(),
        }}
      />
    </AccountShell>
  );
}
