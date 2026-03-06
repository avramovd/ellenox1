import nodemailer from "nodemailer";

export function getMailer() {
  const host = process.env.EMAIL_HOST!;
  const port = Number(process.env.EMAIL_PORT || 465);
  const secure = (process.env.EMAIL_SECURE || "true") === "true";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });
}
