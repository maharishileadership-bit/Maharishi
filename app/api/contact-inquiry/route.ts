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
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const html = `
  <div style="margin:0;padding:24px;background:#f7f9fc;font-family:Arial,sans-serif;color:#102f4f;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e6ebf2;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:20px 24px;background:linear-gradient(135deg,#0b2d4d,#174c7a);color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85;">Maharishi Center for Leadership</div>
          <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:600;">New Consultation Enquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7f95;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Enquire Type</td><td style="padding:8px 0;font-size:15px;font-weight:600;text-align:right;">${escapeHtml(inquiry.label)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7f95;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Name</td><td style="padding:8px 0;font-size:15px;font-weight:600;text-align:right;">${escapeHtml(payload.name)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7f95;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Email</td><td style="padding:8px 0;font-size:15px;font-weight:600;text-align:right;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#0b2d4d;text-decoration:none;">${escapeHtml(payload.email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7f95;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Submitted</td><td style="padding:8px 0;font-size:15px;font-weight:600;text-align:right;">${escapeHtml(submittedAt)} IST</td></tr>
          </table>
          <div style="margin-top:18px;padding:16px;border:1px solid #e8edf4;border-radius:12px;background:#fbfcfe;">
            <div style="margin-bottom:8px;color:#6b7f95;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Message</div>
            <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6;color:#153958;">${escapeHtml(payload.message)}</p>
          </div>
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
  <div style="margin:0;padding:24px;background:#f4f7fb;font-family:Arial,sans-serif;color:#102f4f;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e6ebf2;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:22px 24px;background:linear-gradient(135deg,#0b2d4d,#174c7a);color:#ffffff;">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.85;">Maharishi Center for Leadership</div>
          <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:600;">Thank You For Your Enquiry</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;color:#153958;">Dear ${escapeHtml(payload.name)},</p>
          <p style="margin:0 0 12px 0;font-size:15px;line-height:1.7;color:#21486a;">
            Thank you for contacting us. We have received your consultation enquiry and our team will respond shortly.
          </p>
          <div style="margin-top:14px;padding:14px 16px;border:1px solid #e8edf4;border-radius:12px;background:#fbfcfe;">
            <p style="margin:0 0 6px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7f95;">Enquire Type</p>
            <p style="margin:0;font-size:15px;font-weight:600;color:#102f4f;">${escapeHtml(inquiry.label)}</p>
          </div>
          <div style="margin-top:22px;padding-top:14px;border-top:1px solid #edf1f6;">
            <p style="margin:0;font-size:14px;line-height:1.7;color:#315777;">
              Warm regards,<br />
              <strong>Maharishi Center for Leadership Team</strong>
            </p>
          </div>
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
        process.env.SMTP_APP_PASSWORD &&
        process.env.CONTACT_NOTIFY_TO
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
