
'use server';
/**
 * @fileOverview A flow to handle generating an order confirmation email.
 *
 * - sendOrderEmail - A function that generates the email content.
 * - SendOrderEmailInput - The input type for the sendOrderEmail function.
 * - SendOrderEmailOutput - The output type for the sendOrderEmail function.
 */
import 'dotenv/config';
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
  subtotal: z.string().describe('The subtotal of the order before additional costs.'),
  packagingCost: z.string().describe('The fixed packaging cost for the order.'),
  grandTotal: z.string().describe('The grand total of the order.'),
  orderDate: z.string().describe('The date and time the order was placed.'),
});
export type SendOrderEmailInput = z.infer<typeof SendOrderEmailInputSchema>;

const SendOrderEmailOutputSchema = z.object({
  subject: z.string(),
  body: z.string(),
});
export type SendOrderEmailOutput = z.infer<typeof SendOrderEmailOutputSchema>;


export async function sendOrderEmail(input: SendOrderEmailInput): Promise<SendOrderEmailOutput> {
  return await sendOrderEmailFlow(input);
}

const emailGenerationPrompt = ai.definePrompt({
  name: 'orderEmailPrompt',
  input: { schema: SendOrderEmailInputSchema },
  output: { schema: SendOrderEmailOutputSchema },
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
    outputSchema: SendOrderEmailOutputSchema,
  },
  async (input) => {
    const { output } = await emailGenerationPrompt(input);
    
    if (!output) {
        console.error("Failed to generate email content.");
        throw new Error("AI could not generate the order email content. Please try again.");
    }

    return output;
  }
);
