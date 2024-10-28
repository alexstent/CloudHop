export interface Destination {
  id: string;
  city: string;
  country: string;
  type: 'city' | 'beach' | 'snow';
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  averageTemp: number;
  hasSnow: boolean;
  flightTime: number;
}

export interface Weather {
  temp: number;
  description: string;
  icon: string;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export interface Flight {
  price: number;
  duration: string;
  airline: string;
  departure: string;
  arrival: string;
}

export interface SearchFilters {
  type: 'all' | 'city' | 'beach' | 'snow';
  maxFlightTime: number;
  minTemp: number;
  maxTemp: number;
  hasSnow?: boolean;
  dates?: {
    start: string;
    end: string;
  };
}

export interface UserLocation {
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  currency: {
    code: string;
    symbol: string;
    rate: number;
  };
}