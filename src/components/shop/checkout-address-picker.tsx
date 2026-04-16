"use client";

type Address = {
  id: string;
  fullName: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string | null;
  isDefault: boolean;
};

type CheckoutAddressPickerProps = {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (addressId: string) => void;
};

export default function CheckoutAddressPicker({
  addresses,
  selectedAddressId,
  onSelectAddress,
}: CheckoutAddressPickerProps) {
  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5">
      <h3 className="text-lg font-bold text-[var(--foreground)]">
        Use Saved Address
      </h3>
      <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
        Select one of your saved addresses to autofill the checkout form.
      </p>

      <div className="mt-4 space-y-3">
        {addresses.map((address) => (
          <label
            key={address.id}
            className={`flex cursor-pointer gap-3 rounded-[1.25rem] border p-4 transition ${
              selectedAddressId === address.id
                ? "border-blue-300 bg-blue-50/60 shadow-sm"
                : "border-[var(--border)] bg-white hover:border-blue-200"
            }`}
          >
            <input
              type="radio"
              name="savedAddress"
              value={address.id}
              checked={selectedAddressId === address.id}
              onChange={() => onSelectAddress(address.id)}
              className="mt-1 h-4 w-4 accent-[var(--primary)]"
            />

            <div className="text-sm leading-7 text-[var(--foreground)]">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold">{address.fullName}</p>
                {address.isDefault ? (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-700">
                    Default
                  </span>
                ) : null}
              </div>

              <p>{address.addressLine1}</p>
              {address.addressLine2 ? <p>{address.addressLine2}</p> : null}
              <p>
                {address.city}, {address.state}, {address.country}
              </p>
              <p>{address.phone}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
