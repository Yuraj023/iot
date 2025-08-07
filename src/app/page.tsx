import { Header } from "@/components/layout/header";
import { AqiCard } from "@/components/dashboard/aqi-card";
import { AqiChart } from "@/components/dashboard/aqi-chart";
import { HydrationReminder } from "@/components/dashboard/hydration-reminder";
import { AiSummary } from "@/components/dashboard/ai-summary";
import { historicalAqiData, getCurrentAqi } from "@/lib/aqi-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const currentAqi = getCurrentAqi();
  const isAlert = currentAqi.aqi > 150;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {isAlert && (
            <Alert variant="destructive" className="shadow-lg">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High AQI Alert!</AlertTitle>
              <AlertDescription>
                The current Air Quality Index is at a level considered unhealthy. It is advised to limit outdoor activities.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AqiCard aqi={currentAqi.aqi} />
            <HydrationReminder />
            <AiSummary data={historicalAqiData} />
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>24-Hour AQI Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <AqiChart data={historicalAqiData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
