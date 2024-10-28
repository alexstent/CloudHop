import React, { useState } from 'react';
import { MapPin, Loader } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import type { UserLocation } from '../types';

interface Props {
  onLocationChange: (location: UserLocation) => void;
}

export default function LocationInput({ onLocationChange }: Props) {
  const { location, loading, error } = useLocation();
  const [manualInput, setManualInput] = useState('');
  const [showManual, setShowManual] = useState(false);

  React.useEffect(() => {
    if (location) {
      onLocationChange(location);
    }
  }, [location, onLocationChange]);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          manualInput
        )}&key=YOUR_OPENCAGE_API_KEY`
      );
      const data = await response.json();
      
      if (data.results.length > 0) {
        const result = data.results[0];
        const newLocation: UserLocation = {
          city: result.components.city || result.components.town || '',
          country: result.components.country || '',
          coordinates: {
            lat: result.geometry.lat,
            lng: result.geometry.lng,
          },
          currency: location?.currency || { code: 'USD', symbol: '$', rate: 1 },
        };
        onLocationChange(newLocation);
      }
    } catch (err) {
      console.error('Error setting manual location:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Your Location</h2>
        </div>
        {!showManual && (
          <button
            onClick={() => setShowManual(true)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Enter manually
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader className="w-4 h-4 animate-spin" />
          <span>Detecting your location...</span>
        </div>
      ) : error || showManual ? (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Set Location
            </button>
            {showManual && (
              <button
                type="button"
                onClick={() => setShowManual(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : location ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium">{location.city}</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600">{location.country}</span>
          </div>
          <div className="text-sm text-gray-600">
            Currency: {location.currency.symbol} ({location.currency.code})
          </div>
        </div>
      ) : null}
    </div>
  );
}