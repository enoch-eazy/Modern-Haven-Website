import nodemailer from "nodemailer";
import { env, isMailConfigured, isProduction, isTest } from "../config/env.js";
import { otpEmail } from "../emails/otpEmail.js";
import { serviceUnavailable } from "../utils/httpError.js";
import { OTP_TTL_MINUTES } from "./otp.js";

let transporter;
function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.port === 465,
    auth: { user: env.mail.user, pass: env.mail.pass },
  });
  return transporter;
}

/**
 * Emails sent while SMTP isn't configured (development and tests). Newest last, capped.
 * Tests read codes from here; in development the email is also printed to the console.
 */
export const outbox = [];

export async function sendMail({ to, subject, html, text }) {
  if (!isMailConfigured) {
    if (isProduction) {
      throw serviceUnavailable("We can't send emails right now. Please try again later or contact us.");
    }
    outbox.push({ to, subject, html, text });
    if (outbox.length > 20) outbox.shift();
    if (!isTest) console.info(`\n[mail] SMTP not configured, printing instead.\nTo: ${to}\nSubject: ${subject}\n${text}\n`);
    return;
  }

  try {
    await getTransporter().sendMail({ from: env.mail.from, to, subject, html, text });
  } catch (error) {
    console.error("Failed to send email", error);
    throw serviceUnavailable("We couldn't send the email. Please try again in a moment.");
  }
}

export function sendOtpEmail(user, purpose, code) {
  const message = otpEmail({
    purpose,
    code,
    firstName: user.firstName,
    expiresInMinutes: OTP_TTL_MINUTES,
    appUrl: env.appUrl,
  });
  return sendMail({ to: user.email, ...message });
}
