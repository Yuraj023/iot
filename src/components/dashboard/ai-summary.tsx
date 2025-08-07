"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import type { AqiDataPoint } from "@/lib/aqi-data";
import { getAiSummary } from "@/app/actions";

interface AiSummaryProps {
  data: AqiDataPoint[];
}

export function AiSummary({ data }: AiSummaryProps) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError("");
    setSummary("");
    try {
      const result = await getAiSummary({ aqiData: JSON.stringify(data) });
      setSummary(result);
    } catch (e) {
      setError("Failed to generate AI summary. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AI Daily Summary</CardTitle>
        <Sparkles className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-4">
          Get an AI-powered summary of the last 24 hours of air quality data.
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger asChild>
              <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full">
                {isLoading ? "Generating..." : "Generate 24-Hour Summary"}
              </Button>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              {isLoading && (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {error && <p className="text-sm text-destructive">{error}</p>}
              {summary && <p className="text-sm">{summary}</p>}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
