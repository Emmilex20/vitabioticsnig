export function passwordResetEmailTemplate({
  firstName,
  resetUrl,
}: {
  firstName: string;
  resetUrl: string;
}) {
  return `
    <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#101828;">
      <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #d0d5dd;">
          <div style="background:#1e4fae;padding:32px 24px;text-align:left;">
            <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;color:#dbe7ff;">
              Professional Portal
            </div>
            <h1 style="margin:12px 0 0;font-size:32px;line-height:1.2;font-weight:800;color:#ffffff;">
              Reset your password
            </h1>
            <p style="margin:14px 0 0;font-size:16px;line-height:1.7;color:rgba(255,255,255,0.85);">
              Secure access for doctors and pharmacists.
            </p>
          </div>

          <div style="padding:32px 24px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#344054;">
              Hello ${firstName},
            </p>

            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#344054;">
              We received a request to reset your password for your professional portal account.
            </p>

            <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#344054;">
              Click the button below to create a new password. This link will expire in 1 hour.
            </p>

            <div style="margin:0 0 24px;">
              <a
                href="${resetUrl}"
                style="display:inline-block;background:#1e4fae;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-size:14px;font-weight:700;"
              >
                Reset Password
              </a>
            </div>

            <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#667085;">
              If the button above does not work, copy and paste this link into your browser:
            </p>

            <p style="margin:0 0 24px;font-size:14px;line-height:1.7;word-break:break-word;color:#1e4fae;">
              ${resetUrl}
            </p>

            <div style="padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e4e7ec;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#475467;">
                If you did not request this password reset, you can safely ignore this email.
              </p>
            </div>
          </div>

          <div style="padding:20px 24px;border-top:1px solid #eaecf0;background:#fcfcfd;">
            <p style="margin:0;font-size:13px;line-height:1.7;color:#667085;">
              Vitabiotics Professional Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
