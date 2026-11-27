// Transactional email carrying a one-time code. Table layout + inline styles so it renders
// consistently in Gmail, Outlook and Apple Mail. Preview it with `npm run email:preview`.

const BRAND = {
  green: "#0f2b22",
  greenLight: "#f0f7f4",
  gold: "#ffd700",
  ink: "#161816",
  muted: "#5b625e",
  border: "#e3e8e5",
};

const COPY = {
  "verify-email": {
    subject: (code) => `${code} is your Modern Haven verification code`,
    preheader: "Confirm your email to finish creating your account.",
    heading: "Confirm your email",
    intro: "Thanks for signing up! Enter this code to verify your email address and finish creating your account.",
    ignore: "If you didn't create a Modern Haven account, you can safely ignore this email.",
  },
  "reset-password": {
    subject: (code) => `${code} is your Modern Haven password reset code`,
    preheader: "Use this code to choose a new password.",
    heading: "Reset your password",
    intro: "We received a request to reset your password. Enter this code to choose a new one.",
    ignore: "If you didn't ask to reset your password, ignore this email. Your password won't change.",
  },
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

/**
 * @param {{ purpose: "verify-email" | "reset-password", code: string, firstName?: string, expiresInMinutes: number, appUrl: string }} options
 * @returns {{ subject: string, html: string, text: string }}
 */
export function otpEmail({ purpose, code, firstName, expiresInMinutes, appUrl }) {
  const copy = COPY[purpose];
  const name = firstName ? escapeHtml(firstName) : "there";
  const year = new Date().getFullYear();
  const spacedCode = code.split("").join(" ");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(copy.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.greenLight};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(copy.preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.greenLight};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">
        <tr>
          <td style="background:${BRAND.green};padding:24px 32px;">
            <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.2px;">Modern <span style="color:${BRAND.gold};">Haven</span></span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink};">
            <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:700;color:${BRAND.green};">${escapeHtml(copy.heading)}</h1>
            <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">Hi ${name},</p>
            <p style="margin:0;font-size:15px;line-height:1.6;">${escapeHtml(copy.intro)}</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:24px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.greenLight};border:1px dashed ${BRAND.green};border-radius:12px;">
              <tr>
                <td style="padding:18px 28px;font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;letter-spacing:6px;color:${BRAND.green};text-align:center;" aria-label="Your code is ${code}">${spacedCode}</td>
              </tr>
            </table>
            <p style="margin:14px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};">This code expires in ${expiresInMinutes} minutes.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px;font-family:Arial,Helvetica,sans-serif;">
            <p style="margin:0 0 12px;font-size:13px;line-height:1.6;color:${BRAND.muted};">${escapeHtml(copy.ignore)}</p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:${BRAND.muted};">For your security, never share this code with anyone. Modern Haven will never ask you for it.</p>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid ${BRAND.border};padding:20px 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.muted};">
            Gadgets &amp; fashion for the whole family.<br>
            <a href="${escapeHtml(appUrl)}" style="color:${BRAND.green};font-weight:700;text-decoration:none;">Visit the store</a>
            &nbsp;·&nbsp;
            <a href="${escapeHtml(appUrl)}/contact" style="color:${BRAND.green};font-weight:700;text-decoration:none;">Contact us</a>
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${BRAND.muted};">&copy; ${year} Modern Haven · Lagos</p>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    `Hi ${firstName || "there"},`,
    "",
    copy.intro,
    "",
    `Your code: ${code}`,
    `It expires in ${expiresInMinutes} minutes.`,
    "",
    copy.ignore,
    "Never share this code with anyone.",
    "",
    `Modern Haven · ${appUrl}`,
  ].join("\n");

  return { subject: copy.subject(code), html, text };
}
