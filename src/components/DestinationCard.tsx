import React from 'react';
import { MapPin, Cloud, Clock } from 'lucide-react';
import type { Destination, Weather, Flight, UserLocation } from '../types';
import WeatherForecast from './WeatherForecast';

interface Props {
  destination: Destination;
  weather: Weather;
  flight: Flight;
  userLocation: UserLocation | null;
}

export default function DestinationCard({ destination, weather, flight, userLocation }: Props) {
  const formatPrice = (price: number) => {
    if (!userLocation) return `$${price}`;
    
    const convertedPrice = price * userLocation.currency.rate;
    return `${userLocation.currency.symbol}${Math.round(convertedPrice)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={destination.image}
          alt={destination.city}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
          {destination.type}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold">{destination.city}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{destination.country}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <Cloud className="w-4 h-4 mr-2 text-gray-600" />
            <div>
              <div className="font-semibold">{weather.temp}°C</div>
              <div className="text-xs text-gray-600">{weather.description}</div>
            </div>
          </div>
        </div>

        {weather.forecast && <WeatherForecast forecast={weather.forecast} />}

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{flight.duration}</span>
              </div>
              <div className="text-xs text-gray-500">
                {flight.airline}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-indigo-600">
                {formatPrice(flight.price)}
              </div>
              <div className="text-xs text-gray-500">per person</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}