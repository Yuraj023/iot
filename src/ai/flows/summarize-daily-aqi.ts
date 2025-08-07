'use server';
/**
 * @fileOverview An AI agent that summarizes the air quality data for the past 24 hours.
 *
 * - summarizeDailyAQI - A function that handles the air quality data summarization process.
 * - SummarizeDailyAQIInput - The input type for the summarizeDailyAQI function.
 * - SummarizeDailyAQIOutput - The return type for the summarizeDailyAQI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDailyAQIInputSchema = z.object({
  aqiData: z.string().describe('The air quality data for the past 24 hours in JSON format.'),
});
export type SummarizeDailyAQIInput = z.infer<typeof SummarizeDailyAQIInputSchema>;

const SummarizeDailyAQIOutputSchema = z.object({
  summary: z.string().describe('A summary of the air quality data for the past 24 hours.'),
});
export type SummarizeDailyAQIOutput = z.infer<typeof SummarizeDailyAQIOutputSchema>;

export async function summarizeDailyAQI(input: SummarizeDailyAQIInput): Promise<SummarizeDailyAQIOutput> {
  return summarizeDailyAQIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDailyAQIPrompt',
  input: {schema: SummarizeDailyAQIInputSchema},
  output: {schema: SummarizeDailyAQIOutputSchema},
  prompt: `You are an expert air quality analyst.

You will be provided with air quality data for the past 24 hours.  Summarize the data in a way that is easy to understand for the average person.

Air Quality Data: {{{aqiData}}}`,
});

const summarizeDailyAQIFlow = ai.defineFlow(
  {
    name: 'summarizeDailyAQIFlow',
    inputSchema: SummarizeDailyAQIInputSchema,
    outputSchema: SummarizeDailyAQIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
