import nodemailer from "nodemailer";

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
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #262626; border-radius: 16px; overflow: hidden;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 48px 40px 32px; text-align: center; border-bottom: 1px solid #1a1a1a;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.2;">
                        Message Received
                      </h1>
                      <p style="margin: 16px 0 0; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                        Thank you for reaching out to us.
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 16px; color: #ffffff; font-size: 15px; line-height: 1.7;">
                        Hi ${name},
                      </p>
                      <p style="margin: 0 0 24px; color: #a3a3a3; font-size: 15px; line-height: 1.7;">
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
                    <td style="padding: 24px 40px; border-top: 1px solid #1a1a1a; text-align: center;">
                      <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.6;">
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
      from: `"Memora" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="background-color: black; color:white; padding: 20px; font-family: Arial, sans-serif; border-radius: 8px; border: 1px solid #e0e0e0;">
          <h2>New Contact Form Submission</h2>
          <p style="margin: 0 0 10px;">
            <strong>Name:</strong> ${name}
          </p>
          <p style="margin: 0 0 10px;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="margin: 0 0 10px;">
            <strong>Message:</strong>
          </p>
          <p style="margin: 0;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
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
