'use server';
/**
 * @fileOverview A flow to handle sending an order confirmation email.
 *
 * - sendOrderEmail - A function that handles sending the order email.
 * - SendOrderEmailInput - The input type for the sendOrderEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendOrderEmailInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  customerPhone: z.string().describe('The phone number of the customer.'),
  customerAddress1: z.string().describe("The first line of the customer's address."),
  customerAddress2: z.string().optional().describe("The second line of the customer's address."),
  customerCity: z.string().describe('The city of the customer.'),
  customerPincode: z.string().describe("The pincode of the customer's address."),
  cartItemsText: z.string().describe('A formatted string of all items in the cart.'),
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

    console.log('--- SIMULATING ORDER EMAIL ---');
    console.log('To: yuvarajasekar.kg@gmail.com');
    console.log(`Subject: ${subject}`);
    console.log('Body:\n', body);
    
    // In a real application, you would integrate an email service here.
    // For example, using a service like Nodemailer or an API from SendGrid, Mailgun, etc.
    // Since I cannot handle API keys or external services, I am logging this to the console.
  }
);
