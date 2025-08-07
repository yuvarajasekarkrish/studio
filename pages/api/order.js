mkdir -p pages/api
touch pages/api/order.js
import { sendOrderConfirmationEmail } from '../../../utils/sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { email, orderDetails } = req.body;

  try {
    await sendOrderConfirmationEmail(email, orderDetails);
    res.status(200).json({ message: 'Order email sent!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}

