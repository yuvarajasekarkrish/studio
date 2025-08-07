
'use server';
// Note: dotenv/config is loaded in the dev server (src/ai/dev.ts)
/**
 * @fileOverview A flow to handle generating and sending an order confirmation email.
 *
 * - sendOrderEmail - A function that generates the email content and sends it.
 * - SendOrderEmailInput - The input type for the sendOrderEmail function.
 * - SendOrderEmailOutput - The output type for the sendOrderEmail function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as nodemailer from 'nodemailer';

const SendOrderEmailInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  customerEmail: z.string().describe("The email address of the customer."),
  customerPhone: z.string().describe('The phone number of the customer.'),
  customerAddress1: z.string().describe("The first line of the customer's address."),
  customerAddress2: z.string().optional().describe("The second line of the customer's address."),
  customerCity: z.string().describe('The city of the customer.'),
  customerPincode: z.string().describe("The pincode of the customer's address."),
  cartItemsText: z.string().describe('A formatted string of all items in the cart.'),
  subtotal: z.string().describe('The subtotal of the order before additional costs.'),
  grandTotal: z.string().describe('The grand total of the order.'),
  orderDate: z.string().describe('The date and time the order was placed.'),
});
export type SendOrderEmailInput = z.infer<typeof SendOrderEmailInputSchema>;

const SendOrderEmailOutputSchema = z.object({
  messageId: z.string(),
});
export type SendOrderEmailOutput = z.infer<typeof SendOrderEmailOutputSchema>;


export async function sendOrderEmail(input: SendOrderEmailInput): Promise<SendOrderEmailOutput> {
  return await sendOrderEmailFlow(input);
}

const emailGenerationPrompt = ai.definePrompt({
  name: 'orderEmailPrompt',
  input: { schema: SendOrderEmailInputSchema },
  output: { schema: z.object({ subject: z.string(), body: z.string() }) },
  prompt: `You are an order processing agent for a company named "Maharaj Pyrotech".
Your task is to generate a professional HTML email and a subject line for a new order notification.
The email should be sent to the business owner to inform them of a new order.

Generate a concise subject line like "New Order Received from [Customer Name]".

For the email body, generate a well-formatted HTML document. It should include:
- A main heading "New Order Received".
- A section with the customer's delivery details (Name, Email, Phone, Address).
- An HTML table for the "Order Summary". The table should have columns for "Item", "Quantity", and "Price".
- The order items should be parsed from the 'cartItemsText' and populated into the table rows.
- Below the table, display the Subtotal and the Grand Total. The Grand Total includes a 3% packaging and forwarding fee. Clearly label both.
- The email should be styled professionally with some basic CSS for readability (e.g., borders for the table, bold headings).

Use the following customer and order details:
Customer Name: {{customerName}}
Customer Email: {{customerEmail}}
Customer Phone: {{customerPhone}}
Delivery Address: {{customerAddress1}}{{#if customerAddress2}}, {{customerAddress2}}{{/if}}, {{customerCity}}, {{customerPincode}}

Order Items (raw text):
{{{cartItemsText}}}

Subtotal: {{subtotal}}
Grand Total (incl. 3% fee): {{grandTotal}}

Order placed on: {{orderDate}}
`,
});


const sendOrderEmailFlow = ai.defineFlow(
  {
    name: 'sendOrderEmailFlow',
    inputSchema: SendOrderEmailInputSchema,
    outputSchema: SendOrderEmailOutputSchema,
  },
  async (input) => {
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
        const errorMsg = "Email server credentials (EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD) are not configured in the .env file.";
        console.error(errorMsg);
        throw new Error(errorMsg);
    }
    
    const { output } = await emailGenerationPrompt(input);
    
    if (!output) {
        throw new Error("AI could not generate the order email content.");
    }

    const { subject, body } = output;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
        },
    });

    const mailOptions = {
       from: `Maharaj Pyrotech <${process.env.EMAIL_SERVER_USER}>`,
       to: 'maharajpyropark@gmail.com',
        replyTo: input.customerEmail,
        subject: subject,
        html: body,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to maharajpyropark@gmail.com. Message ID:', info.messageId);
        return { messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        // Provide a more specific error message.
        const specificError = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to send email. The provider said: ${specificError}. If you are on the Spark plan, this is likely because external network requests are blocked. If testing locally, this is likely due to an invalid username or password. Please ensure you have generated and are using a 16-digit Google App Password in your .env file.`);
    }
  }
);
