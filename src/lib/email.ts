import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const from =
    process.env.EMAIL_FROM || "Vitabiotics Portal <onboarding@resend.dev>";

  const result = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  return result;
}
