const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.warn("PAYSTACK_SECRET_KEY is not set");
}

type InitializePaymentArgs = {
  email: string;
  amountKobo: number;
  reference: string;
  callback_url: string;
  metadata?: Record<string, unknown>;
};

export async function initializePaystackPayment({
  email,
  amountKobo,
  reference,
  callback_url,
  metadata,
}: InitializePaymentArgs) {
  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        reference,
        callback_url,
        metadata,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Unable to initialize Paystack payment");
  }

  return data.data as {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function verifyPaystackPayment(reference: string) {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Unable to verify Paystack payment");
  }

  return data.data as {
    status: string;
    reference: string;
    amount: number;
    paid_at?: string;
    metadata?: Record<string, unknown>;
    customer?: {
      email?: string;
    };
  };
}
