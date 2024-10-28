import React, { useState, useMemo } from 'react';
import { Plane } from 'lucide-react';
import SearchFilters from './components/SearchFilters';
import DestinationCard from './components/DestinationCard';
import LocationInput from './components/LocationInput';
import { destinations } from './data/destinations';
import type { SearchFilters as SearchFiltersType, UserLocation, Weather } from './types';

function App() {
  const [filters, setFilters] = useState<SearchFiltersType>({
    type: 'all',
    maxFlightTime: 8,
    minTemp: 15,
    maxTemp: 30,
    hasSnow: false,
  });

  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [weatherData, setWeatherData] = useState<Record<string, Weather>>({});

  React.useEffect(() => {
    async function fetchWeatherData() {
      if (filters.dates?.start && filters.dates?.end) {
        const mockForecast = destinations.reduce((acc, dest) => ({
          ...acc,
          [dest.city]: {
            temp: dest.averageTemp,
            description: dest.hasSnow ? 'Snowy' : dest.averageTemp > 25 ? 'Sunny' : 'Partly cloudy',
            icon: dest.hasSnow ? '13d' : dest.averageTemp > 25 ? '01d' : '02d',
            forecast: Array.from({ length: 3 }, (_, i) => ({
              date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              temp: dest.averageTemp + (Math.random() - 0.5) * 5,
              description: dest.hasSnow ? 'Snowy' : dest.averageTemp > 25 ? 'Sunny' : 'Partly cloudy',
              icon: dest.hasSnow ? '13d' : dest.averageTemp > 25 ? '01d' : '02d',
            })),
          },
        }), {});
        setWeatherData(mockForecast);
      } else {
        const mockCurrentWeather = destinations.reduce((acc, dest) => ({
          ...acc,
          [dest.city]: {
            temp: dest.averageTemp,
            description: dest.hasSnow ? 'Snowy' : dest.averageTemp > 25 ? 'Sunny' : 'Partly cloudy',
            icon: dest.hasSnow ? '13d' : dest.averageTemp > 25 ? '01d' : '02d',
          },
        }), {});
        setWeatherData(mockCurrentWeather);
      }
    }

    fetchWeatherData();
  }, [filters.dates]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      if (filters.type !== 'all' && dest.type !== filters.type) return false;
      if (dest.flightTime > filters.maxFlightTime) return false;
      if (dest.averageTemp < filters.minTemp || dest.averageTemp > filters.maxTemp) return false;
      if (filters.hasSnow && !dest.hasSnow) return false;
      return true;
    });
  }, [filters]);

  const mockFlight = {
    price: 299,
    duration: '3h 45m',
    airline: 'CloudHop Airlines',
    departure: '10:00',
    arrival: '13:45',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Plane className="w-8 h-8 text-indigo-600" />
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              CloudHop
            </h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LocationInput onLocationChange={setUserLocation} />
        <SearchFilters filters={filters} onFilterChange={setFilters} />

        <div className="mb-4 text-gray-600">
          Found {filteredDestinations.length} destinations matching your criteria
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              weather={weatherData[destination.city] || { temp: 0, description: 'Loading...', icon: '' }}
              flight={{
                ...mockFlight,
                duration: `${destination.flightTime}h ${Math.floor(Math.random() * 60)}m`,
                price: Math.floor(Math.random() * 500) + 200,
              }}
              userLocation={userLocation}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;