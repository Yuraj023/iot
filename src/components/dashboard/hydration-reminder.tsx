"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Droplets } from "lucide-react";

export function HydrationReminder() {
  const { toast } = useToast();
  const [reminderSet, setReminderSet] = useState(false);

  const handleReminderClick = () => {
    setReminderSet(true);
    toast({
      title: "Hydration Reminder Set!",
      description: "We'll remind you to drink water in an hour.",
    });

    setTimeout(() => {
      toast({
        title: "💧 Time to Hydrate!",
        description: "Take a moment to drink a glass of water.",
        duration: 10000,
      });
      setReminderSet(false);
    }, 60 * 60 * 1000); // 1 hour
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Hydration Reminder</CardTitle>
        <Droplets className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-4">
          Stay hydrated for better health. We can remind you every hour.
        </p>
        <Button onClick={handleReminderClick} disabled={reminderSet} className="w-full">
          {reminderSet ? "Reminder is Active" : "Remind Me in 1 Hour"}
        </Button>
      </CardContent>
    </Card>
  );
}
