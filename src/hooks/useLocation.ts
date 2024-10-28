import { useState, useEffect } from 'react';
import axios from 'axios';
import type { UserLocation } from '../types';

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUserLocation() {
      try {
        // Get user's coordinates
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        // Get location details using OpenCage Geocoding API
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
        );

        const result = response.data.results[0];
        const components = result.components;
        
        // Get currency information
        const currencyResponse = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );

        const currencyCode = components.currency || 'USD';
        const rate = currencyResponse.data.rates[currencyCode] || 1;

        setLocation({
          city: components.city || components.town || components.village || '',
          country: components.country || '',
          coordinates: { lat: latitude, lng: longitude },
          currency: {
            code: currencyCode,
            symbol: getCurrencySymbol(currencyCode),
            rate: rate,
          },
        });
      } catch (err) {
        setError('Unable to detect location. Please enter manually.');
      } finally {
        setLoading(false);
      }
    }

    getUserLocation();
  }, []);

  return { location, loading, error };
}

function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    // Add more currency symbols as needed
  };
  return symbols[currencyCode] || currencyCode;
}