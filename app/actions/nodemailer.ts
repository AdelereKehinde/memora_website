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
    // Read and encode the logo image from public folder
    const logoPath = path.join(process.cwd(), "public", "memora.png");
    let logoDataUrl = '';
    
    try {
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString("base64");
      logoDataUrl = `data:image/png;base64,${logoBase64}`;
    } catch (err) {
      console.warn('Logo file not found, using text fallback');
    }

    await transporter.sendMail({
      from: `"Memora" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "You're on the Memora Waitlist",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
        </head>
        <body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;padding:40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#0a0a0a;border:1px solid #262626;border-radius:16px;">
                  
                  <!-- Header with Logo -->
                  <tr>
                    <td style="padding:48px 40px 32px;text-align:center;border-bottom:1px solid #1a1a1a;">
                      ${logoDataUrl ? `
                      <div style="margin-bottom:24px;">
                        <img src="${logoDataUrl}" alt="Memora" width="48" height="48" style="display:block;margin:0 auto;border-radius:8px;border:none;outline:none;">
                      </div>
                      ` : `
                      <div style="margin-bottom:24px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                          <tr>
                            <td style="width:48px;height:48px;background-color:#ffffff;border-radius:8px;text-align:center;vertical-align:middle;">
                              <span style="color:#000000;font-size:24px;font-weight:700;line-height:48px;">M</span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      `}
                      <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;letter-spacing:-0.5px;line-height:1.2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                        Welcome to Memora
                      </h1>
                      <p style="margin:16px 0 0;color:#a3a3a3;font-size:16px;line-height:1.6;">
                        Your waitlist position has been confirmed.
                      </p>
                    </td>
                  </tr>

                  <!-- Confirmation Message -->
                  <tr>
                    <td style="padding:40px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:24px;background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:12px;">
                            <p style="margin:0;color:#ffffff;font-size:15px;line-height:1.7;">
                              We've reserved your spot on the Memora waitlist. You're now among a select group of early adopters who will be the first to experience a new standard in collaborative document editing.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- What to Expect -->
                  <tr>
                    <td style="padding:0 40px 40px;">
                      <h2 style="margin:0 0 24px;color:#ffffff;font-size:20px;font-weight:600;letter-spacing:-0.3px;">
                        What happens next
                      </h2>
                      
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding-bottom:16px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:10px;">
                              <tr>
                                <td style="padding:20px;">
                                  <p style="margin:0 0 8px;color:#ffffff;font-size:14px;font-weight:600;">
                                    Priority Access
                                  </p>
                                  <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.6;">
                                    As an early waitlist member, you'll receive priority access before our public launch. You'll be among the first to create, organize, and collaborate in real-time with Memora.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:16px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:10px;">
                              <tr>
                                <td style="padding:20px;">
                                  <p style="margin:0 0 8px;color:#ffffff;font-size:14px;font-weight:600;">
                                    Exclusive Updates
                                  </p>
                                  <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.6;">
                                    We'll keep you informed about our development progress, new feature announcements, and exclusive insights into the product before anyone else.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:10px;">
                              <tr>
                                <td style="padding:20px;">
                                  <p style="margin:0 0 8px;color:#ffffff;font-size:14px;font-weight:600;">
                                    Early Access Invitation
                                  </p>
                                  <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.6;">
                                    When it's your turn, you'll receive a personal invitation with everything you need to get started. No additional steps required on your part.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Feature Highlights -->
                  <tr>
                    <td style="padding:0 40px 40px;">
                      <h2 style="margin:0 0 24px;color:#ffffff;font-size:20px;font-weight:600;letter-spacing:-0.3px;">
                        What you'll experience
                      </h2>
                      
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:16px 0;border-bottom:1px solid #1a1a1a;">
                            <p style="margin:0 0 4px;color:#ffffff;font-size:14px;font-weight:500;">
                              Real-time collaboration
                            </p>
                            <p style="margin:0;color:#737373;font-size:13px;">
                              See live cursors and edits from your team as they happen
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px 0;border-bottom:1px solid #1a1a1a;">
                            <p style="margin:0 0 4px;color:#ffffff;font-size:14px;font-weight:500;">
                              Rich text editing
                            </p>
                            <p style="margin:0;color:#737373;font-size:13px;">
                              Powerful BlockNote editor with images, embeds, and nested documents
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px 0;border-bottom:1px solid #1a1a1a;">
                            <p style="margin:0 0 4px;color:#ffffff;font-size:14px;font-weight:500;">
                              Intelligent organization
                            </p>
                            <p style="margin:0;color:#737373;font-size:13px;">
                              Hierarchical document structure with icons and cover images
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px 0;">
                            <p style="margin:0 0 4px;color:#ffffff;font-size:14px;font-weight:500;">
                              Secure sharing
                            </p>
                            <p style="margin:0;color:#737373;font-size:13px;">
                              Invite team members with viewer or editor roles for controlled access
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Stay Connected -->
                  <tr>
                    <td style="padding:0 40px 40px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:12px;">
                        <tr>
                          <td style="padding:24px;">
                            <p style="margin:0 0 8px;color:#ffffff;font-size:15px;font-weight:600;">
                              Stay connected
                            </p>
                            <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.6;">
                              Follow our development journey and connect with other early adopters. We'll be sharing regular updates and behind-the-scenes insights as we build Memora.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:32px 40px;border-top:1px solid #1a1a1a;text-align:center;">
                      <p style="margin:0 0 8px;color:#525252;font-size:13px;">
                        Memora - Collaborative Document Editor
                      </p>
                      <p style="margin:0 0 4px;color:#404040;font-size:12px;">
                        This email was sent to ${email} because you joined the Memora waitlist.
                      </p>
                      <p style="margin:0;color:#404040;font-size:12px;">
                        If you didn't request this, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

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