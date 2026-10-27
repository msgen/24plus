import nodemailer from 'nodemailer';

/** Sends the notification e-mail when SMTP_* env vars are set; otherwise a no-op (leads are still stored). */
export async function notify(subject: string, text: string, replyTo?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !MAIL_TO) return false;
  const t = nodemailer.createTransport({
    host: SMTP_HOST, port: Number(SMTP_PORT ?? 587), secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
  });
  await t.sendMail({ from: MAIL_FROM ?? SMTP_USER ?? MAIL_TO, to: MAIL_TO, replyTo, subject, text });
  return true;
}
