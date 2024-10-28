import React from 'react';
import { format } from 'date-fns';
import type { WeatherForecast } from '../types';

interface Props {
  forecast: WeatherForecast[];
}

export default function WeatherForecast({ forecast }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t">
      {forecast.map((day) => (
        <div key={day.date} className="text-center">
          <div className="text-xs text-gray-500">
            {format(new Date(day.date), 'MMM d')}
          </div>
          <div className="font-semibold">{day.temp}°C</div>
          <div className="text-xs text-gray-600">{day.description}</div>
        </div>
      ))}
    </div>
  );
}