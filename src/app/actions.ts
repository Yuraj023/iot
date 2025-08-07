'use server';

import {summarizeDailyAQI} from '@/ai/flows/summarize-daily-aqi';
import type {SummarizeDailyAQIInput, SummarizeDailyAQIOutput} from '@/ai/flows/summarize-daily-aqi';

export async function getAiSummary(input: SummarizeDailyAQIInput): Promise<string> {
  try {
    const result: SummarizeDailyAQIOutput = await summarizeDailyAQI(input);
    return result.summary;
  } catch (error) {
    console.error("AI Summary generation failed:", error);
    throw new Error("Failed to generate AI summary.");
  }
}
