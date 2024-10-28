import React from 'react';
import { Sliders, Thermometer, Clock, Calendar, Snowflake } from 'lucide-react';
import type { SearchFilters } from '../types';
import { format } from 'date-fns';

interface Props {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export default function SearchFilters({ filters, onFilterChange }: Props) {
  const handleDateChange = (type: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dates: {
        ...filters.dates,
        [type]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination Type
          </label>
          <div className="flex gap-3 flex-wrap">
            {['all', 'city', 'beach', 'snow'].map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange({ ...filters, type: type as SearchFilters['type'] })}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filters.type === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Snowflake className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Snow Conditions
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.hasSnow}
              onChange={(e) => onFilterChange({ ...filters, hasSnow: e.target.checked })}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-600">Show only destinations with snow</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Travel Dates
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.dates?.start || ''}
                min={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={filters.dates?.end || ''}
                min={filters.dates?.start || format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Max Flight Time (hours)
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            value={filters.maxFlightTime}
            onChange={(e) =>
              onFilterChange({ ...filters, maxFlightTime: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600 mt-1">{filters.maxFlightTime} hours</div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-gray-600" />
            <label className="text-sm font-medium text-gray-700">
              Temperature Range (°C)
            </label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={filters.minTemp}
              onChange={(e) =>
                onFilterChange({ ...filters, minTemp: Number(e.target.value) })
              }
              className="w-20 px-3 py-2 border rounded-md"
              placeholder="Min"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={filters.maxTemp}
              onChange={(e) =>
                onFilterChange({ ...filters, maxTemp: Number(e.target.value) })
              }
              className="w-20 px-3 py-2 border rounded-md"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}