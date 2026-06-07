// app/api/contact/route.ts
import nodemailer from "nodemailer";

// Direct image URL
const LOGO_URL = "https://textbook-ashen.vercel.app/memora.png";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
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

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Memora" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #0a0a0a; border: 1px solid #262626; border-radius: 12px;">
                  
                  <!-- Header with Logo -->
                  <tr>
                    <td style="padding: 40px 30px 30px; text-align: center; border-bottom: 1px solid #1a1a1a;">
                      <div style="margin-bottom: 20px; text-align: center;">
                        <img src="${LOGO_URL}" alt="Memora" width="48" height="48" style="display: block; margin: 0 auto; border-radius: 10px; border: none;">
                      </div>
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
                        Message Received
                      </h1>
                      <p style="margin: 12px 0 0; color: #a3a3a3; font-size: 15px; line-height: 1.5;">
                        Thank you for reaching out to us.
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <p style="margin: 0 0 16px; color: #ffffff; font-size: 15px; line-height: 1.7;">
                        Hi ${name},
                      </p>
                      <p style="margin: 0 0 24px; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                        We've received your message and appreciate you taking the time to contact us. Our team will review your message and get back to you shortly.
                      </p>
                      <p style="margin: 24px 0 0; color: #a3a3a3; font-size: 14px; line-height: 1.6;">
                        Best regards,<br>
                        The Memora Team
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 30px; border-top: 1px solid #1a1a1a; text-align: center;">
                      <p style="margin: 0; color: #525252; font-size: 11px; line-height: 1.6;">
                        This is an automated response. Please do not reply to this email.
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

    // Send notification email to admin
    await transporter.sendMail({
      from: `"Memora Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #0a0a0a; border: 1px solid #262626; border-radius: 12px;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 30px 30px; text-align: center; border-bottom: 1px solid #1a1a1a;">
                      <div style="margin-bottom: 20px; text-align: center;">
                        <img src="${LOGO_URL}" alt="Memora" width="48" height="48" style="display: block; margin: 0 auto; border-radius: 10px; border: none;">
                      </div>
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                        New Contact Form Submission
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 16px; background-color: #111111; border: 1px solid #1a1a1a; border-radius: 8px; margin-bottom: 12px;">
                            <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 12px;">Name</p>
                            <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${name}</p>
                          </td>
                        </tr>
                        <tr><td style="height: 12px;"></td></tr>
                        <tr>
                          <td style="padding: 16px; background-color: #111111; border: 1px solid #1a1a1a; border-radius: 8px;">
                            <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 12px;">Email</p>
                            <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 500;">${email}</p>
                          </td>
                        </tr>
                        <tr><td style="height: 12px;"></td></tr>
                        <tr>
                          <td style="padding: 16px; background-color: #111111; border: 1px solid #1a1a1a; border-radius: 8px;">
                            <p style="margin: 0 0 8px; color: #a3a3a3; font-size: 12px;">Message</p>
                            <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 24px 30px; border-top: 1px solid #1a1a1a; text-align: center;">
                      <p style="margin: 0; color: #525252; font-size: 11px;">
                        Memora - Contact Form Notification
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

    return Response.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}