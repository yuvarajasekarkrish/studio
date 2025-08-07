mkdir utils
touch utils/sendEmail.js
import nodemailer from 'nodemailer';

export async function sendOrderConfirmationEmail(to, orderDetails) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: to,
    subject: 'Order Confirmation',
    html: `<h3>Thank you for your order!</h3><pre>${JSON.stringify(orderDetails, null, 2)}</pre>`
  };

  await transporter.sendMail(mailOptions);
}
