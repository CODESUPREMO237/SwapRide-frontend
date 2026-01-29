'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import ImageUpload from '@/components/common/ImageUpload';
import { Loader } from '@/components/ui/Loader';
import { 
  VEHICLE_MAKES, FUEL_TYPES, TRANSMISSION_TYPES, 
  VEHICLE_CONDITIONS, VEHICLE_BODY_TYPES 
} from '@/lib/constants';
import { X, CheckCircle, ArrowLeft } from 'lucide-react';

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    fuelType: '',
    transmission: '',
    condition: '',
    bodyType: '',
    color: '',
    engineSize: '',
    features: [],
    acceptSwap: false,
    swapPreferences: '',
    city: '',
    region: '',
    country: 'CM',
    images: []
  });

  useEffect(() => {
    if (params.id) {
      fetchVehicleData();
    }
  }, [params.id]);

  const fetchVehicleData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/vehicles/${params.id}`);
      const vehicle = response.data.data?.vehicle || response.data.data;
      
      // Populate form with existing data
      setFormData({
        title: vehicle.title || '',
        description: vehicle.description || '',
        price: vehicle.price || '',
        make: vehicle.make || '',
        model: vehicle.model || '',
        year: vehicle.year || '',
        mileage: vehicle.mileage || '',
        fuelType: vehicle.fuelType || '',
        transmission: vehicle.transmission || '',
        condition: vehicle.condition || '',
        bodyType: vehicle.bodyType || '',
        color: vehicle.color || '',
        engineSize: vehicle.engineSize || '',
        features: vehicle.features || [],
        acceptSwap: vehicle.acceptSwap || false,
        swapPreferences: vehicle.swapPreferences || '',
        city: vehicle.city || '',
        region: vehicle.region || '',
        country: vehicle.country || 'CM',
        images: vehicle.images || []
      });
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      setError('Failed to load vehicle data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (images) => {
    setFormData(prev => ({
      ...prev,
      images: images
    }));
  };

  const handleFeatureAdd = (feature) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const handleFeatureRemove = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== featureToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (formData.price && isNaN(formData.price)) newErrors.price = 'Price must be a number';
    if (!formData.make) newErrors.make = 'Make is required';
    if (!formData.model?.trim()) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (formData.year && (formData.year < 1900 || formData.year > new Date().getFullYear() + 1)) {
      newErrors.year = 'Invalid year';
    }
    if (!formData.mileage) newErrors.mileage = 'Mileage is required';
    if (!formData.fuelType) newErrors.fuelType = 'Fuel type is required';
    if (!formData.transmission) newErrors.transmission = 'Transmission is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.bodyType) newErrors.bodyType = 'Body type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      // Prepare the data for submission
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        year: parseInt(formData.year),
        mileage: parseInt(formData.mileage),
        engineSize: formData.engineSize ? parseFloat(formData.engineSize) : undefined
      };

      // Update vehicle
      await api.put(`/vehicles/${params.id}`, submitData);
      
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push(`/vehicles/${params.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error updating vehicle:', error);
      setError(error.response?.data?.message || 'Failed to update vehicle');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Updated!</h2>
            <p className="text-gray-600">Redirecting to vehicle page...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Vehicle Listing</h1>
          <p className="text-gray-600 mt-2">Update your vehicle information</p>
        </div>

        {error && (
          <Alert type="error" className="mb-6">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Basic Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., 2020 Toyota Camry XLE"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your vehicle..."
                  rows={6}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (XAF) *
                </label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="5000000"
                  className={errors.price ? 'border-red-500' : ''}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Details */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Vehicle Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Make *
                  </label>
                  <Select
                    value={formData.make}
                    onChange={(value) => handleSelectChange('make', value)}
                    options={VEHICLE_MAKES.map(make => ({ value: make, label: make }))}
                    placeholder="Select make"
                    className={errors.make ? 'border-red-500' : ''}
                  />
                  {errors.make && <p className="text-red-500 text-sm mt-1">{errors.make}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <Input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., Camry"
                    className={errors.model ? 'border-red-500' : ''}
                  />
                  {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <Input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className={errors.year ? 'border-red-500' : ''}
                  />
                  {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage (km) *
                  </label>
                  <Input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="50000"
                    className={errors.mileage ? 'border-red-500' : ''}
                  />
                  {errors.mileage && <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <Select
                    value={formData.fuelType}
                    onChange={(value) => handleSelectChange('fuelType', value)}
                    options={FUEL_TYPES.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))}
                    placeholder="Select fuel type"
                    className={errors.fuelType ? 'border-red-500' : ''}
                  />
                  {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission *
                  </label>
                  <Select
                    value={formData.transmission}
                    onChange={(value) => handleSelectChange('transmission', value)}
                    options={TRANSMISSION_TYPES.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))}
                    placeholder="Select transmission"
                    className={errors.transmission ? 'border-red-500' : ''}
                  />
                  {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <Select
                    value={formData.condition}
                    onChange={(value) => handleSelectChange('condition', value)}
                    options={VEHICLE_CONDITIONS.map(cond => ({ value: cond, label: cond.charAt(0).toUpperCase() + cond.slice(1) }))}
                    placeholder="Select condition"
                    className={errors.condition ? 'border-red-500' : ''}
                  />
                  {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Body Type *
                  </label>
                  <Select
                    value={formData.bodyType}
                    onChange={(value) => handleSelectChange('bodyType', value)}
                    options={VEHICLE_BODY_TYPES.map(type => ({ value: type, label: type.charAt(0).toUpperCase() + type.slice(1) }))}
                    placeholder="Select body type"
                    className={errors.bodyType ? 'border-red-500' : ''}
                  />
                  {errors.bodyType && <p className="text-red-500 text-sm mt-1">{errors.bodyType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <Input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g., Black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine Size (L)
                  </label>
                  <Input
                    type="number"
                    name="engineSize"
                    value={formData.engineSize}
                    onChange={handleChange}
                    placeholder="2.5"
                    step="0.1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Features (Optional)</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Add a feature and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleFeatureAdd(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
              </div>
              
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleFeatureRemove(feature)}
                        className="hover:text-blue-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Location</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Douala"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <Input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="e.g., Littoral"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Swap Options */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Swap Options</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="acceptSwap"
                  checked={formData.acceptSwap}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Open to vehicle swap
                </span>
              </label>

              {formData.acceptSwap && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Swap Preferences (Optional)
                  </label>
                  <Textarea
                    name="swapPreferences"
                    value={formData.swapPreferences}
                    onChange={handleChange}
                    placeholder="Describe what vehicles you'd consider for a swap..."
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Images</h2>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={formData.images}
                onImagesChange={handleImageUpload}
                maxImages={10}
              />
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex-1"
            >
              {submitting ? 'Updating...' : 'Update Vehicle'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
