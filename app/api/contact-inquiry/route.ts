import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getContactInquiryType, type ContactInquiryTypeKey } from "@/data/contact";

type ContactInquiryPayload = {
  name: string;
  email: string;
  inquiryType: ContactInquiryTypeKey;
  message: string;
  website?: string;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateStore = new Map<string, RateBucket>();

function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateStore.get(key);

  if (!current || now > current.resetAt) {
    rateStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  rateStore.set(key, current);
  return false;
}

function sanitize(value: string | undefined) {
  return (value ?? "").trim();
}

function validatePayload(payload: ContactInquiryPayload) {
  if (!sanitize(payload.name)) return "Name is required.";
  if (!sanitize(payload.email)) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Email format is invalid.";
  }
  if (!sanitize(payload.message)) return "Message is required.";
  if (!sanitize(payload.inquiryType)) return "Inquiry type is required.";
  return null;
}

async function sendSheetDb(payload: ContactInquiryPayload) {
  const endpoint = process.env.SHEETDB_API_URL;
  if (!endpoint) return false;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        timestamp: new Date().toISOString(),
        name: payload.name,
        email: payload.email,
        organization: "",
        role: "",
        inquiryType: payload.inquiryType,
        message: payload.message,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("SheetDB request failed.");
  }

  return true;
}

async function sendEmail(payload: ContactInquiryPayload) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_APP_PASSWORD;
  const toEmail = [
    "chandan.mehta@tm.org",
    "mbusch108@gmail.com",
  ].join(", ");

  if (!smtpHost || !smtpUser || !smtpPass || !toEmail) return false;

  const inquiry = getContactInquiryType(payload.inquiryType);
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const text = [
    "New Consultation Enquiry",
    "",
    `Enquire Type: ${inquiry.label}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Submitted: ${submittedAt} IST`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  const html = `
  <div style="margin:0;padding:16px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0;font-size:18px;font-weight:600;">New Consultation Enquiry</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 18px;font-size:14px;line-height:1.6;">
          <p style="margin:0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p style="margin:0 0 12px 0;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)} IST</p>
          <p style="margin:0 0 6px 0;"><strong>Message:</strong></p>
          <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
        </td>
      </tr>
    </table>
  </div>`;

  await transporter.sendMail({
    from: `"Maharishi Leadership Site" <${smtpUser}>`,
    to: toEmail,
    replyTo: payload.email,
    subject: inquiry.subject,
    text,
    html,
  });

  const replyText = [
    `Dear ${payload.name},`,
    "",
    "Thank you for your consultation enquiry.",
    "We have received your message and our team will get back to you shortly.",
    "",
    `Enquire Type: ${inquiry.label}`,
    `Submitted: ${submittedAt} IST`,
    "",
    "Warm regards,",
    "Maharishi Center for Leadership",
  ].join("\n");

  const replyHtml = `
  <div style="margin:0;padding:16px;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0;font-size:18px;font-weight:600;">Thank you for your enquiry</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 18px;font-size:14px;line-height:1.6;">
          <p style="margin:0 0 10px 0;">Dear ${escapeHtml(payload.name)},</p>
          <p style="margin:0 0 10px 0;">We have received your consultation enquiry. Our team will get back to you shortly.</p>
          <p style="margin:0;">Warm regards,<br />Maharishi Center for Leadership</p>
        </td>
      </tr>
    </table>
  </div>`;

  await transporter.sendMail({
    from: `"Maharishi Center for Leadership" <${smtpUser}>`,
    to: payload.email,
    subject: "We received your consultation enquiry",
    text: replyText,
    html: replyHtml,
  });

  return true;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let payload: ContactInquiryPayload;
  try {
    payload = (await req.json()) as ContactInquiryPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (sanitize(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  payload.name = sanitize(payload.name);
  payload.email = sanitize(payload.email);
  payload.message = sanitize(payload.message);

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json(
      { ok: false, error: validationError },
      { status: 400 }
    );
  }

  try {
    const sheetDbConfigured = Boolean(process.env.SHEETDB_API_URL);
    const smtpConfigured = Boolean(
      process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_APP_PASSWORD
    );

    if (!sheetDbConfigured && !smtpConfigured) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Contact service is not configured yet. Please set environment variables.",
        },
        { status: 503 }
      );
    }

    const [sheetSaved, emailSent] = await Promise.all([
      sendSheetDb(payload),
      sendEmail(payload),
    ]);

    if (!sheetSaved && !emailSent) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Contact service is not configured correctly. Please check server settings.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
