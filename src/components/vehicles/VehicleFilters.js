'use client';

import { useState } from 'react';
import  Input from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Button  from '@/components/ui/Button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { VEHICLE_MAKES, FUEL_TYPES, TRANSMISSION_TYPES, VEHICLE_CONDITIONS } from '@/lib/constants';

export default function VehicleFilters({ filters, setFilters, onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    if (onSearch) onSearch(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters = {
      search: '',
      make: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      fuelType: '',
      transmission: '',
      condition: '',
      acceptSwap: false,
    };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
    if (onSearch) onSearch(emptyFilters);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString()
  }));

  const makeOptions = VEHICLE_MAKES.map(make => ({ value: make, label: make }));
  const fuelOptions = FUEL_TYPES.map(fuel => ({ value: fuel, label: fuel }));
  const transmissionOptions = TRANSMISSION_TYPES.map(trans => ({ value: trans, label: trans }));
  const conditionOptions = VEHICLE_CONDITIONS.map(cond => ({ value: cond, label: cond }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-between w-full mb-4 text-gray-700 font-medium"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </span>
        {isOpen ? <X className="h-5 w-5" /> : <SlidersHorizontal className="h-5 w-5" />}
      </button>

      {/* Filters */}
      <div className={`space-y-5 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">Search Filters</h3>
        </div>

        {/* Search */}
        <Input
          placeholder="Search vehicles..."
          value={localFilters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          leftIcon={<Search className="h-5 w-5 text-gray-400" />}
        />

        {/* Make */}
        <Select
          label="Make"
          options={[{ value: '', label: 'All Makes' }, ...makeOptions]}
          value={localFilters.make || ''}
          onChange={(value) => handleFilterChange('make', value)}
        />

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (XAF)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Year Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Select
              options={[{ value: '', label: 'Min Year' }, ...yearOptions]}
              value={localFilters.minYear || ''}
              onChange={(value) => handleFilterChange('minYear', value)}
            />
            <Select
              options={[{ value: '', label: 'Max Year' }, ...yearOptions]}
              value={localFilters.maxYear || ''}
              onChange={(value) => handleFilterChange('maxYear', value)}
            />
          </div>
        </div>

        {/* Fuel Type */}
        <Select
          label="Fuel Type"
          options={[{ value: '', label: 'All Fuel Types' }, ...fuelOptions]}
          value={localFilters.fuelType || ''}
          onChange={(value) => handleFilterChange('fuelType', value)}
        />

        {/* Transmission */}
        <Select
          label="Transmission"
          options={[{ value: '', label: 'All Transmissions' }, ...transmissionOptions]}
          value={localFilters.transmission || ''}
          onChange={(value) => handleFilterChange('transmission', value)}
        />

        {/* Condition */}
        <Select
          label="Condition"
          options={[{ value: '', label: 'All Conditions' }, ...conditionOptions]}
          value={localFilters.condition || ''}
          onChange={(value) => handleFilterChange('condition', value)}
        />

        {/* Swap Available */}
        <div className="flex items-center">
          <input
            id="acceptSwap"
            type="checkbox"
            checked={localFilters.acceptSwap || false}
            onChange={(e) => handleFilterChange('acceptSwap', e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="acceptSwap" className="ml-2 text-sm text-gray-700">
            Only show swap-available vehicles
          </label>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button onClick={resetFilters} variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
