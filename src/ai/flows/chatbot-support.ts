'use server';
/**
 * @fileOverview A mental health chatbot that provides supportive responses using CBT techniques and offers emergency triggers if users express suicidal thoughts.
 *
 * - chatbotSupport - A function that handles the chatbot interactions.
 * - ChatbotSupportInput - The input type for the chatbotSupport function.
 * - ChatbotSupportOutput - The return type for the chatbotSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotSupportInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type ChatbotSupportInput = z.infer<typeof ChatbotSupportInputSchema>;

const ChatbotSupportOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type ChatbotSupportOutput = z.infer<typeof ChatbotSupportOutputSchema>;

export async function chatbotSupport(input: ChatbotSupportInput): Promise<ChatbotSupportOutput> {
  return chatbotSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotSupportPrompt',
  input: {schema: ChatbotSupportInputSchema},
  output: {schema: ChatbotSupportOutputSchema},
  prompt: `You are a mental health chatbot designed to provide supportive responses using Cognitive Behavioral Therapy (CBT) techniques.

  If the user expresses suicidal thoughts or mentions harming themselves, provide the following emergency message with helpline numbers:

  "If you are having suicidal thoughts, please reach out to the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to connect with the Crisis Text Line."

  Otherwise, respond with supportive messages using CBT techniques. Use predefined responses that are helpful and encouraging.

  User message: {{{message}}}
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_CIVIC_INTEGRITY',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  }
});

const chatbotSupportFlow = ai.defineFlow(
  {
    name: 'chatbotSupportFlow',
    inputSchema: ChatbotSupportInputSchema,
    outputSchema: ChatbotSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
