export interface AqiDataPoint {
  time: string;
  aqi: number;
}

const generateHistoricalData = (): AqiDataPoint[] => {
  const data: AqiDataPoint[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Simulate daily patterns: lower at night, higher during day/rush hour
    let baseAqi = 30;
    if (hour > 6 && hour < 10) baseAqi = 55; // Morning traffic
    if (hour > 16 && hour < 20) baseAqi = 65; // Evening traffic
    
    // Add random fluctuation
    let aqi = baseAqi + (Math.random() - 0.5) * 25;

    // Add a random pollution event
    if (Math.random() > 0.95) {
      aqi += Math.random() * 100;
    }
    
    data.push({
      time: time.toISOString(),
      aqi: Math.max(10, Math.round(aqi)),
    });
  }

  // Ensure at least one high value for alert testing
  data[Math.floor(Math.random() * 10) + 10].aqi = 175;

  return data;
};

export const historicalAqiData: AqiDataPoint[] = generateHistoricalData();

export const getCurrentAqi = (): AqiDataPoint => {
  return historicalAqiData[historicalAqiData.length - 1];
};

export const getAqiInfo = (aqi: number): { level: string; message: string; className: string } => {
    if (aqi <= 50) return { level: 'Good', message: 'Air quality is excellent.', className: 'text-green-500' };
    if (aqi <= 100) return { level: 'Moderate', message: 'Air quality is acceptable.', className: 'text-yellow-500' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive', message: 'Sensitive groups may have health effects.', className: 'text-orange-500' };
    if (aqi <= 200) return { level: 'Unhealthy', message: 'Everyone may experience health effects.', className: 'text-red-500' };
    if (aqi <= 300) return { level: 'Very Unhealthy', message: 'Health alert: serious health effects.', className: 'text-purple-500' };
    return { level: 'Hazardous', message: 'Emergency: the entire population is affected.', className: 'text-rose-700' };
};
