import { getAqiInfo } from "@/lib/aqi-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";

interface AqiCardProps {
  aqi: number;
}

export function AqiCard({ aqi }: AqiCardProps) {
  const { level, message, className } = getAqiInfo(aqi);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current AQI</CardTitle>
        <Wind className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold">{aqi}</div>
        <p className={`text-xs font-bold ${className}`}>{level}</p>
        <p className="text-xs text-muted-foreground mt-2">{message}</p>
      </CardContent>
    </Card>
  );
}
