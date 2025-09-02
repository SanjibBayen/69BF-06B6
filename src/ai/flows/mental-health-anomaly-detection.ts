'use server';
/**
 * @fileOverview This file defines a Genkit flow for detecting anomalies in wearable data and sending notifications.
 *
 * - detectAnomaliesAndNotify - A function that detects anomalies in wearable data and sends notifications.
 * - MentalHealthAnomalyDetectionInput - The input type for the detectAnomaliesAndNotify function.
 * - MentalHealthAnomalyDetectionOutput - The return type for the detectAnomaliesAndNotify function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentalHealthAnomalyDetectionInputSchema = z.object({
  heartRate: z.number().describe('The user heart rate in BPM.'),
  sleepDuration: z.number().describe('The user sleep duration in hours.'),
  activityLevel: z.string().describe('The user activity level (e.g., sedentary, light, moderate, vigorous).'),
  mood: z.string().optional().describe('The user self-reported mood.'),
});

export type MentalHealthAnomalyDetectionInput = z.infer<typeof MentalHealthAnomalyDetectionInputSchema>;

const MentalHealthAnomalyDetectionOutputSchema = z.object({
  anomalyDetected: z.boolean().describe('Whether an anomaly was detected in the wearable data.'),
  notificationMessage: z.string().optional().describe('The notification message to send to the user.'),
});

export type MentalHealthAnomalyDetectionOutput = z.infer<typeof MentalHealthAnomalyDetectionOutputSchema>;

export async function detectAnomaliesAndNotify(
  input: MentalHealthAnomalyDetectionInput
): Promise<MentalHealthAnomalyDetectionOutput> {
  return mentalHealthAnomalyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthAnomalyDetectionPrompt',
  input: {schema: MentalHealthAnomalyDetectionInputSchema},
  output: {schema: MentalHealthAnomalyDetectionOutputSchema},
  prompt: `You are an AI assistant that monitors wearable data for anomalies related to mental health.

  Based on the user's heart rate, sleep duration, activity level and mood, determine if there are any anomalies that could indicate a potential mental health issue. Anomalies include sudden inactivity, irregular heartbeat, or significant changes in sleep patterns.

  If an anomaly is detected, set anomalyDetected to true and generate a notification message asking the user if they are feeling okay.
  If no anomaly is detected, set anomalyDetected to false and do not generate a notification message.

  Here is the user's data:
  Heart Rate: {{{heartRate}}} BPM
  Sleep Duration: {{{sleepDuration}}} hours
  Activity Level: {{{activityLevel}}}
  Mood: {{{mood}}}
`,
});

const mentalHealthAnomalyDetectionFlow = ai.defineFlow(
  {
    name: 'mentalHealthAnomalyDetectionFlow',
    inputSchema: MentalHealthAnomalyDetectionInputSchema,
    outputSchema: MentalHealthAnomalyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
