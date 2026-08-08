import nodemailer from 'nodemailer';

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER || 'tensorloom@gmail.com';
  const rawPass = process.env.GMAIL_APP_PASSWORD || 'xwsa lzpk uyvq lzrc';
  const gmailPass = rawPass ? rawPass.replace(/\s+/g, '') : '';

  if (!gmailUser || !gmailPass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
}

export async function sendContactEmailNotification(contact: {
  contactId: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  createdAt: string;
}) {
  const transporter = getTransporter();
  const recipientEmail =
    process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER || 'tensorloom@gmail.com';
  const gmailUser = process.env.GMAIL_USER || 'tensorloom@gmail.com';

  if (!transporter) {
    console.log('Nodemailer skipped: GMAIL_USER or GMAIL_APP_PASSWORD not available.');
    return false;
  }

  const formattedDate = new Date(contact.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0c10; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; background-color: #12141c; border-radius: 24px; overflow: hidden; border: 1px solid rgba(201, 155, 62, 0.3); box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Accent Gold Glow Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #c99b3e 0%, #e5be6b 50%, #b38730 100%); height: 6px;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 36px 40px 28px 40px; background-color: #12141c;">
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">
                      tensor<span style="color: #c99b3e;">Loom</span>
                    </h1>
                    <p style="color: #c99b3e; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; margin: 6px 0 0 0;">
                      AI ENGINEERING STUDIO • NEW CLIENT LEAD
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <div style="background: rgba(201, 155, 62, 0.12); border: 1px solid rgba(201, 155, 62, 0.4); color: #e5be6b; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 12px; font-weight: 800; padding: 8px 14px; border-radius: 10px; display: inline-block;">
                      ${contact.contactId}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Information Card -->
          <tr>
            <td style="padding: 0 40px 28px 40px;">
              <p style="color: #94a3b8; font-size: 11px; font-family: ui-monospace, SFMono-Regular, monospace; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 14px 0;">
                01 / CLIENT CREDENTIALS
              </p>

              <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1a1d28; border: 1px solid rgba(251, 251, 253, 0.08); border-radius: 16px; padding: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                    <span style="color: #64748b; font-size: 12px; width: 120px; display: inline-block;">Full Name:</span>
                    <strong style="color: #ffffff; font-size: 15px; font-weight: 700;">${contact.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                    <span style="color: #64748b; font-size: 12px; width: 120px; display: inline-block;">Work Email:</span>
                    <a href="mailto:${contact.email}" style="color: #e5be6b; font-size: 14px; font-weight: 700; text-decoration: none;">${contact.email}</a>
                  </td>
                </tr>
                ${
                  contact.phone
                    ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                    <span style="color: #64748b; font-size: 12px; width: 120px; display: inline-block;">Verified Phone:</span>
                    <strong style="color: #ffffff; font-size: 14px; font-family: ui-monospace, SFMono-Regular, monospace;">${contact.phone}</strong>
                  </td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td style="padding: 10px 0 0 0;">
                    <span style="color: #64748b; font-size: 12px; width: 120px; display: inline-block;">Target Service:</span>
                    <span style="background-color: #c99b3e; color: #0f1117; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 8px; display: inline-block; font-family: ui-monospace, SFMono-Regular, monospace;">${contact.service || 'General Engineering'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Message Container -->
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <p style="color: #94a3b8; font-size: 11px; font-family: ui-monospace, SFMono-Regular, monospace; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 14px 0;">
                02 / PROJECT SPECIFICATIONS & OVERVIEW
              </p>
              <div style="background-color: #0b0c10; border-radius: 16px; padding: 24px; border-left: 4px solid #c99b3e; border: 1px solid rgba(201, 155, 62, 0.25);">
                <p style="color: #f8fafc; font-size: 14px; line-height: 1.65; margin: 0; white-space: pre-wrap; font-family: 'Inter', sans-serif;">${contact.message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA Reply Bar -->
          <tr>
            <td style="padding: 0 40px 36px 40px;" align="center">
              <a href="mailto:${contact.email}?subject=Re:%20tensorLoom%20Inquiry%20[${contact.contactId}]" style="background: linear-gradient(135deg, #c99b3e 0%, #b38730 100%); color: #0f1117; font-size: 14px; font-weight: 800; text-decoration: none; padding: 16px 36px; border-radius: 14px; display: inline-block; shadow: 0 10px 25px -5px rgba(201, 155, 62, 0.4); letter-spacing: -0.01em;">
                Reply Directly to ${contact.name} →
              </a>
            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="background-color: #0b0c10; padding: 24px 40px; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <p style="color: #64748b; font-size: 11px; font-family: ui-monospace, SFMono-Regular, monospace; margin: 0 0 4px 0;">
                Logged into MongoDB Atlas Collection: <strong style="color: #e5be6b;">contacts</strong>
              </p>
              <p style="color: #475569; font-size: 11px; font-family: ui-monospace, SFMono-Regular, monospace; margin: 0;">
                Received on ${formattedDate}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"tensorLoom Leads" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: contact.email,
      subject: `⚡ New Lead: ${contact.name} (${contact.service || 'Inquiry'}) [${contact.contactId}]`,
      html: htmlContent,
    });

    console.log('Nodemailer email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Nodemailer email error:', error);
    return false;
  }
}
