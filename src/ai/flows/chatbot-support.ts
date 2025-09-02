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
  prompt: `You are a mental health chatbot named WellMind. Your purpose is to be a supportive companion, offering a safe space for users to express their thoughts and feelings without judgment. Your tone should be warm, empathetic, and encouraging.

You are equipped with knowledge of Cognitive Behavioral Therapy (CBT) and mindfulness techniques. Use these to guide users, but do so gently. Listen first, and offer suggestions like simple breathing exercises, thought reframing, or journaling prompts when appropriate.

IMPORTANT: If the user expresses suicidal thoughts, mentions self-harm, or is in immediate crisis, you MUST respond with ONLY the following emergency message:

"I hear that you are in a lot of pain right now. It's important to talk to someone who can provide immediate support. Please reach out to the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to connect with the Crisis Text Line. They are available 24/7."

For all other conversations, provide supportive and helpful responses.

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
