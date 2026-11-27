// Writes the OTP emails to HTML files so you can open them in a browser: `npm run email:preview`.
import { writeFile } from "node:fs/promises";
import { otpEmail } from "../src/emails/otpEmail.js";

for (const purpose of ["verify-email", "reset-password"]) {
  const { subject, html } = otpEmail({
    purpose,
    code: "482915",
    firstName: "Ada",
    expiresInMinutes: 10,
    appUrl: "http://localhost:4000",
  });
  const file = `email-preview-${purpose}.html`;
  await writeFile(new URL(`../${file}`, import.meta.url), html);
  console.log(`${subject}\n  -> api/${file}`);
}
