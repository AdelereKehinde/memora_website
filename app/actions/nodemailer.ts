// app/actions/waitlist.ts
"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      success: false,
      message: "Email is required",
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Read logo from public folder
    const logoPath = path.join(process.cwd(), "public", "memora.png");
    
    const mailOptions: any = {
      from: `"Memora" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "You're on the Memora Waitlist",
    };

    // Check if logo exists and attach it
    if (fs.existsSync(logoPath)) {
      mailOptions.attachments = [
        {
          filename: 'memora-logo.png',
          path: logoPath,
          cid: 'memora-logo',
        },
      ];
      mailOptions.html = getEmailTemplate(email, true);
    } else {
      console.warn('memora.png not found in public folder');
      mailOptions.html = getEmailTemplate(email, false);
    }

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Your spot has been reserved. Check your inbox for confirmation.",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "Failed to send confirmation email. Please try again.",
    };
  }
}

function getEmailTemplate(userEmail: string, hasLogo: boolean): string {
  const logoSection = hasLogo
    ? `<div style="margin-bottom:20px;text-align:center;"><img src="cid:memora-logo" alt="Memora" width="48" height="48" style="display:block;margin:0 auto;border-radius:10px;border:none;"></div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:white;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:white;padding:40px 20px;">
<tr>
<td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#0a0a0a;border:1px solid #262626;border-radius:12px;">

<tr>
<td style="padding:40px 30px 30px;text-align:center;border-bottom:1px solid #1a1a1a;">
${logoSection}
<h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Welcome to Memora</h1>
<p style="margin:12px 0 0;color:#a3a3a3;font-size:15px;line-height:1.5;">Your waitlist position has been confirmed.</p>
</td>
</tr>

<tr>
<td style="padding:30px;">
<p style="margin:0;color:#ffffff;font-size:14px;line-height:1.6;">We've reserved your spot on the Memora waitlist. You're now among a select group of early adopters who will be the first to experience a new standard in collaborative document editing.</p>
</td>
</tr>

<tr>
<td style="padding:0 30px 30px;">
<h2 style="margin:0 0 16px;color:#ffffff;font-size:18px;font-weight:600;">What happens next</h2>

<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding-bottom:12px;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #1a1a1a;border-radius:8px;">
<tr><td style="padding:16px;">
<p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:600;">Priority Access</p>
<p style="margin:0;color:#a3a3a3;font-size:12px;line-height:1.5;">As an early waitlist member, you'll receive priority access before our public launch.</p>
</td></tr>
</table>
</td></tr>

<tr><td style="padding-bottom:12px;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #1a1a1a;border-radius:8px;">
<tr><td style="padding:16px;">
<p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:600;">Exclusive Updates</p>
<p style="margin:0;color:#a3a3a3;font-size:12px;line-height:1.5;">We'll keep you informed about development progress and new feature announcements.</p>
</td></tr>
</table>
</td></tr>

<tr><td>
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #1a1a1a;border-radius:8px;">
<tr><td style="padding:16px;">
<p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:600;">Early Access Invitation</p>
<p style="margin:0;color:#a3a3a3;font-size:12px;line-height:1.5;">When it's your turn, you'll receive a personal invitation with everything you need.</p>
</td></tr>
</table>
</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:0 30px 30px;">
<h2 style="margin:0 0 16px;color:#ffffff;font-size:18px;font-weight:600;">What you'll experience</h2>
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;"><p style="margin:0;color:#ffffff;font-size:13px;font-weight:500;">Real-time collaboration</p><p style="margin:2px 0 0;color:#737373;font-size:11px;">See live cursors and edits from your team as they happen</p></td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;"><p style="margin:0;color:#ffffff;font-size:13px;font-weight:500;">Rich text editing</p><p style="margin:2px 0 0;color:#737373;font-size:11px;">Powerful BlockNote editor with images, embeds, and nested documents</p></td></tr>
<tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;"><p style="margin:0;color:#ffffff;font-size:13px;font-weight:500;">Intelligent organization</p><p style="margin:2px 0 0;color:#737373;font-size:11px;">Hierarchical document structure with icons and cover images</p></td></tr>
<tr><td style="padding:10px 0;"><p style="margin:0;color:#ffffff;font-size:13px;font-weight:500;">Secure sharing</p><p style="margin:2px 0 0;color:#737373;font-size:11px;">Invite team members with viewer or editor roles for controlled access</p></td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:0 30px 30px;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #1a1a1a;border-radius:8px;">
<tr><td style="padding:16px;">
<p style="margin:0 0 4px;color:#ffffff;font-size:13px;font-weight:600;">Stay connected</p>
<p style="margin:0;color:#a3a3a3;font-size:12px;line-height:1.5;">Follow our development journey and connect with other early adopters. We'll be sharing regular updates as we build Memora.</p>
</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 30px;border-top:1px solid #1a1a1a;text-align:center;">
<p style="margin:0 0 4px;color:#525252;font-size:11px;">Memora - Collaborative Document Editor</p>
<p style="margin:0;color:#404040;font-size:10px;">Sent to ${userEmail} because you joined the Memora waitlist.</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;
}