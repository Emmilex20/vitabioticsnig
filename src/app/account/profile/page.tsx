import AccountShell from "@/components/account/account-shell";
import AccountHeader from "@/components/account/account-header";
import ProfileForm from "@/components/account/profile-form";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/session";

export default async function AccountProfilePage() {
  const user = await requireCustomer();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
    },
  });

  return (
    <AccountShell>
      <AccountHeader
        title="Profile"
        description="Update your shopper account details."
        firstName={user.firstName}
      />

      <ProfileForm
        initialFirstName={dbUser?.firstName ?? ""}
        initialLastName={dbUser?.lastName ?? ""}
        initialEmail={dbUser?.email ?? ""}
      />
    </AccountShell>
  );
}
