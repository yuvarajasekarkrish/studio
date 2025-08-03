
'use server';
/**
 * @fileOverview A flow to handle sending an order confirmation email.
 *
 * - sendOrderEmail - A function that handles sending the order email.
 * - SendOrderEmailInput - The input type for the sendOrderEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const SendOrderEmailInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  customerPhone: z.string().describe('The phone number of the customer.'),
  customerAddress1: z.string().describe("The first line of the customer's address."),
  customerAddress2: z.string().optional().describe("The second line of the customer's address."),
  customerCity: z.string().describe('The city of the customer.'),
  customerPincode: z.string().describe("The pincode of the customer's address."),
  cartItemsText: z.string().describe('A formatted string of all items in the cart.'),
  subtotal: z.string().describe('The subtotal of the order before additional costs.'),
  packagingCost: z.string().describe('The fixed packaging cost for the order.'),
  grandTotal: z.string().describe('The grand total of the order.'),
  orderDate: z.string().describe('The date and time the order was placed.'),
});
export type SendOrderEmailInput = z.infer<typeof SendOrderEmailInputSchema>;

export async function sendOrderEmail(input: SendOrderEmailInput): Promise<void> {
  await sendOrderEmailFlow(input);
}

const emailGenerationPrompt = ai.definePrompt({
  name: 'orderEmailPrompt',
  input: { schema: SendOrderEmailInputSchema },
  output: { schema: z.object({ subject: z.string(), body: z.string() }) },
  prompt: `You are an order processing agent for a company named "Maharaj Pyropark".
Your task is to generate a professional email subject and body for a new order notification.
The email should be sent to the business owner to inform them of a new order.

Use the following customer and order details:
Customer Name: {{customerName}}
Customer Phone: {{customerPhone}}
Delivery Address: {{customerAddress1}}{{#if customerAddress2}}, {{customerAddress2}}{{/if}}, {{customerCity}}, {{customerPincode}}

Order Items:
{{{cartItemsText}}}

Subtotal: {{subtotal}}
Packaging Cost: {{packagingCost}}
Grand Total: {{grandTotal}}

Order placed on: {{orderDate}}

Generate a concise subject line like "New Order Received from [Customer Name]".
Generate a clear and well-formatted email body containing all the provided details in a structured way.
`,
});


const sendOrderEmailFlow = ai.defineFlow(
  {
    name: 'sendOrderEmailFlow',
    inputSchema: SendOrderEmailInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const { output } = await emailGenerationPrompt(input);
    
    if (!output) {
        console.error("Failed to generate email content.");
        throw new Error("AI could not generate the order email. Please try again.");
    }

    const { subject, body } = output;
    const recipientEmail = 'yuvarajasekarkrish@gmail.com';

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Maharaj Pyropark" <${process.env.EMAIL_SERVER_USER}>`,
        to: recipientEmail,
        subject: subject,
        text: body, // For plain text email
        html: `<pre>${body}</pre>`, // For HTML email, using <pre> to preserve formatting
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order email sent successfully to ${recipientEmail}`);
    } catch (error) {
        console.error("Failed to send email:", error);
        // Fallback to logging if email fails, so the order isn't lost.
        console.log('--- FALLBACK: LOGGING ORDER EMAIL ---');
        console.log(`To: ${recipientEmail}`);
        console.log(`Subject: ${subject}`);
        console.log('Body:\n', body);
        console.log('------------------------------------');
        throw new Error("Failed to send the order email via the provider. Please check server logs and ensure your .env file is configured correctly.");
    }
  }
);
