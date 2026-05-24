import nodemailer from 'nodemailer'
import logger from './logger.js'
import config from '../config.js'

// Create transporter with mock service (use real SMTP in production)
const createTransporter = () => {
  if (config.SMTP.HOST && config.SMTP.USER && config.SMTP.PASS) {
    return nodemailer.createTransport({
      host: config.SMTP.HOST,
      port: config.SMTP.PORT || 587,
      secure: config.SMTP.PORT === 465,
      auth: {
        user: config.SMTP.USER,
        pass: config.SMTP.PASS
      }
    })
  }

  // Fallback: use test account for development
  return nodemailer.createTestAccount().then(testAccount => {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    })
  })
}

export async function sendPropertyEmail(recipientEmail, properties, subject = 'דו"ח נכסים') {
  try {
    const transporter = await createTransporter()

    // Build HTML table
    const propertyRows = properties
      .slice(0, 10)
      .map(p => `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px; text-align: right;">${p.score || 'N/A'}</td>
          <td style="padding: 8px; text-align: right;">${p.address || ''}</td>
          <td style="padding: 8px; text-align: right;">${p.city || ''}</td>
          <td style="padding: 8px; text-align: right;">₪${(p.price || 0).toLocaleString('he-IL')}</td>
          <td style="padding: 8px; text-align: right;">${p.size || ''}m²</td>
        </tr>
      `)
      .join('')

    const htmlContent = `
      <html dir="rtl" style="font-family: Arial, sans-serif;">
        <body style="background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px;">
            <h1 style="color: #333; text-align: right;">דו"ח נדלן</h1>
            <p style="color: #666; text-align: right;">תאריך: ${new Date().toLocaleDateString('he-IL')}</p>

            <p style="color: #333; text-align: right; margin-top: 20px;">
              סה"כ נכסים: <strong>${properties.length}</strong>
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <thead>
                <tr style="background-color: #4CAF50; color: white;">
                  <th style="padding: 12px; text-align: right;">דירוג</th>
                  <th style="padding: 12px; text-align: right;">כתובת</th>
                  <th style="padding: 12px; text-align: right;">עיר</th>
                  <th style="padding: 12px; text-align: right;">מחיר</th>
                  <th style="padding: 12px; text-align: right;">גודל</th>
                </tr>
              </thead>
              <tbody>
                ${propertyRows}
              </tbody>
            </table>

            <p style="color: #999; font-size: 12px; text-align: right; margin-top: 30px;">
              זהו דו"ח אוטומטי מ-PropertyScout AI
            </p>
          </div>
        </body>
      </html>
    `

    const mailOptions = {
      from: config.SMTP.USER || 'noreply@propertyscout.ai',
      to: recipientEmail,
      subject,
      html: htmlContent
    }

    const info = await transporter.sendMail(mailOptions)
    logger.success(`Email sent to ${recipientEmail}`)
    return info
  } catch (error) {
    logger.error('Email sending error', error.message)
    throw error
  }
}

export async function sendPropertyEmailWithAttachment(recipientEmail, properties, attachments = []) {
  try {
    const transporter = await createTransporter()

    const mailOptions = {
      from: config.SMTP.USER || 'noreply@propertyscout.ai',
      to: recipientEmail,
      subject: 'דו"ח נדלן',
      html: `<p style="text-align: right;">שלום,<br/>אנא ראה את הקבצים המצורפים.</p>`,
      attachments
    }

    const info = await transporter.sendMail(mailOptions)
    logger.success(`Email with attachments sent to ${recipientEmail}`)
    return info
  } catch (error) {
    logger.error('Email with attachments error', error.message)
    throw error
  }
}
