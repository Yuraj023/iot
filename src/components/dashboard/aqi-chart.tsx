"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { AqiDataPoint } from "@/lib/aqi-data";
import { useTheme } from "@/components/theme-provider";

interface AqiChartProps {
  data: AqiDataPoint[];
}

export function AqiChart({ data }: AqiChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const formattedData = data.map(item => ({
    ...item,
    time: new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
  }));

  return (
    <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={formattedData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "hsl(var(--muted))" : "hsl(var(--border))"} />
                <XAxis dataKey="time" stroke={isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={isDark ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))"} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDark ? "hsl(var(--background))" : "hsl(var(--card))",
                        borderColor: isDark ? "hsl(var(--border))" : "hsl(var(--border))",
                        color: isDark ? "hsl(var(--foreground))" : "hsl(var(--card-foreground))",
                        borderRadius: 'var(--radius)'
                    }}
                />
                <Line type="monotone" dataKey="aqi" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
