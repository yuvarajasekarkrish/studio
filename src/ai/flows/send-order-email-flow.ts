'use server';
/**
 * @fileOverview A flow to handle sending an order confirmation email.
 *
 * - sendOrderEmail - A function that handles sending the order email.
 * - SendOrderEmailInput - The input type for the sendOrderEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SendOrderEmailInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  customerPhone: z.string().describe('The phone number of the customer.'),
  customerAddress1: z.string().describe('The first line of the customer\'s address.'),
  customerAddress2: z.string().optional().describe('The second line of the customer\'s address.'),
  customerCity: z.string().describe('The city of the customer.'),
  customerPincode: z.string().describe('The pincode of the customer\'s address.'),
  cartItemsText: z.string().describe('A formatted string of all items in the cart.'),
  grandTotal: z.string().describe('The grand total of the order.'),
});
export type SendOrderEmailInput = z.infer<typeof SendOrderEmailInputSchema>;

export async function sendOrderEmail(input: SendOrderEmailInput): Promise<void> {
  await sendOrderEmailFlow(input);
}

const sendOrderEmailFlow = ai.defineFlow(
  {
    name: 'sendOrderEmailFlow',
    inputSchema: SendOrderEmailInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const address_line_2 = input.customerAddress2 ? `\n${input.customerAddress2}` : '';

    const emailBody = `
A new order has been received from Maharaj Pyropark.

Customer Details:
Name: ${input.customerName}
Phone: ${input.customerPhone}
Address: 
${input.customerAddress1}${address_line_2}
${input.customerCity}, ${input.customerPincode}

Order Summary:
${input.cartItemsText}

Grand Total: ₹${input.grandTotal}

Order placed on: ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
    `.trim();

    console.log('--- SIMULATING ORDER EMAIL ---');
    console.log('To: yuvarajasekar.kg@gmail.com');
    console.log(`Subject: New Order Received from ${input.customerName}`);
    console.log('Body:\n', emailBody);
  }
);
