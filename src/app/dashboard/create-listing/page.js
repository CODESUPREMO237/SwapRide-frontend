'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Button from '@/components/ui/Button';  // ✅ Correct (default import)
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import ImageUpload from '@/components/common/ImageUpload';
import { 
  VEHICLE_MAKES, FUEL_TYPES, TRANSMISSION_TYPES, 
  VEHICLE_CONDITIONS, VEHICLE_BODY_TYPES 
} from '@/lib/constants';
import { X, CheckCircle } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    listingType: 'vehicle',
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
    location: {
      city: '',
      region: '',
      address: ''
    },
    images: []
  });

  // Handle regular input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle Select component changes
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
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
    // Clear image error
    if (errors.images) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  const handleImageError = (error) => {
    setError(error);
  };

  const handleFeatureAdd = (feature) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const removeFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // Enhanced validation with specific error messages
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.title || formData.title.trim().length < 10) {
          newErrors.title = 'Title must be at least 10 characters';
        }
        if (!formData.description || formData.description.trim().length < 50) {
          newErrors.description = 'Description must be at least 50 characters';
        }
        if (!formData.price || Number(formData.price) <= 0) {
          newErrors.price = 'Please enter a valid price';
        }
        break;
        
      case 2:
        if (formData.listingType === 'vehicle') {
          if (!formData.make) newErrors.make = 'Please select a make';
          if (!formData.model || formData.model.trim().length < 2) {
            newErrors.model = 'Model is required';
          }
          if (!formData.year) newErrors.year = 'Please select a year';
          if (!formData.mileage || Number(formData.mileage) < 0) {
            newErrors.mileage = 'Please enter valid mileage';
          }
          if (!formData.fuelType) newErrors.fuelType = 'Please select fuel type';
          if (!formData.transmission) newErrors.transmission = 'Please select transmission';
          if (!formData.condition) newErrors.condition = 'Please select condition';
        } else {
          // Part validation
          if (!formData.condition) newErrors.condition = 'Please select condition';
        }
        break;
        
      case 3:
        if (formData.images.length === 0) {
          newErrors.images = 'Please upload at least one image';
          setError('Please upload at least one image');
        }
        break;
        
      case 4:
        if (!formData.location.city || formData.location.city.trim().length < 2) {
          newErrors['location.city'] = 'City is required';
        }
        if (!formData.location.region || formData.location.region.trim().length < 2) {
          newErrors['location.region'] = 'Region is required';
        }
        break;
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setError('Please fix the errors below');
      return false;
    }
    
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
// FIXED handleSubmit function for create-listing/page.js
// This transforms the form data to match the backend Part model requirements

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateStep(4)) return;

  setLoading(true);
  setError('');

  try {
    console.log('📤 Original form data:', formData);
    
    let dataToSend;
    
    if (formData.listingType === 'vehicle') {
      // Vehicle data - add required location fields
      dataToSend = {
        ...formData,
        location: {
          ...formData.location,
          country: 'CM' // Cameroon - required by backend
        }
      };
    } else {
      // Part data - transform to match backend Part model
      dataToSend = {
        // Basic Info
        title: formData.title,
        partName: formData.title, // Use title as partName
        description: formData.description,
        
        // Part Details
        category: 'other', // Default category since we don't have a category field yet
        
        // Compatibility - Backend expects arrays
        compatibility: {
          makes: formData.make ? [formData.make] : [],
          models: formData.model ? [formData.model] : [],
          years: [],
          isUniversal: !formData.make // If no make specified, it's universal
        },
        
        // Condition
        condition: formData.condition,
        
        // Pricing
        price: Number(formData.price),
        currency: 'XAF',
        priceNegotiable: true,
        
        // Swap Options
        openToSwap: formData.acceptSwap,
        swapPreferences: {
          additionalNotes: formData.swapPreferences || ''
        },
        
        // Stock
        quantity: 1,
        inStock: true,
        
        // Media - Transform images to backend format
        images: formData.images.map((img, index) => ({
          public_id: img.publicId || img.id,
          url: img.url,
          isPrimary: index === 0
        })),
        
        // Location - Backend requires coordinates
        location: {
          city: formData.location.city,
          region: formData.location.region,
          country: 'CM', // Cameroon
          coordinates: {
            type: 'Point',
            coordinates: [0, 0] // Default coordinates (0, 0)
          }
        }
      };
    }
    
    console.log('📦 Transformed data to send:', dataToSend);
    
    const endpoint = formData.listingType === 'vehicle' ? '/vehicles' : '/parts';
    console.log('🎯 Endpoint:', endpoint);
    
    const response = await api.post(endpoint, dataToSend);
    console.log('✅ Success response:', response.data);

    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard/my-listings');
    }, 2000);
  } catch (error) {
    console.error('❌ Full error object:', error);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error data:', error.response?.data);
    console.error('❌ Error message:', error.response?.data?.message);
    console.error('❌ Error details:', error.response?.data?.errors);
    console.error('❌ Status code:', error.response?.status);
    
    // Show detailed error message
    let errorMessage = 'Failed to create listing. ';
    
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      // Array of validation errors
      const errorMessages = error.response.data.errors.map(err => {
        return `${err.path || err.field}: ${err.message || err.msg}`;
      });
      errorMessage += errorMessages.join(', ');
    } else if (error.response?.data?.errors && typeof error.response.data.errors === 'object') {
      // Object of field errors
      const fieldErrors = error.response.data.errors;
      errorMessage += Object.entries(fieldErrors)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(', ');
    } else if (error.response?.data?.message) {
      errorMessage += error.response.data.message;
    } else {
      errorMessage += 'Please check all fields and try again.';
    }
    
    setError(errorMessage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    setLoading(false);
  }
};

  // Prepare options for Select components
  const makeOptions = VEHICLE_MAKES.map(make => ({ value: make, label: make }));
  const fuelOptions = FUEL_TYPES.map(fuel => ({ value: fuel, label: fuel }));
  const transmissionOptions = TRANSMISSION_TYPES.map(trans => ({ value: trans, label: trans }));
  const conditionOptions = VEHICLE_CONDITIONS.map(cond => ({ value: cond, label: cond }));
  const bodyTypeOptions = VEHICLE_BODY_TYPES.map(type => ({ value: type, label: type }));

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 40 }, (_, i) => ({
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString()
  }));

  // Success Screen
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Listing Created Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your listing is now live and visible to potential buyers.
            </p>
            <Button onClick={() => router.push('/dashboard/my-listings')}>
              View My Listings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Listing
            </h1>
            <p className="text-gray-600">
              List your vehicle or part for sale or swap
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
                  `}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}>Basic Info</span>
              <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-600'}>Details</span>
              <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-600'}>Images</span>
              <span className={step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-600'}>Location</span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert type="error" className="mb-6" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent className="p-6">
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                    
                    <Select
                      label="Listing Type"
                      options={[
                        { value: 'vehicle', label: 'Vehicle' },
                        { value: 'part', label: 'Vehicle Part' }
                      ]}
                      value={formData.listingType}
                      onChange={(value) => handleSelectChange('listingType', value)}
                      required
                    />

                    <Input
                      label="Title"
                      name="title"
                      required
                      placeholder="e.g., 2020 Toyota Camry XLE"
                      value={formData.title}
                      onChange={handleChange}
                      error={errors.title}
                      helperText="Enter a clear, descriptive title (minimum 10 characters)"
                    />

                    <Textarea
                      label="Description"
                      name="description"
                      required
                      placeholder="Describe your vehicle or part in detail..."
                      value={formData.description}
                      onChange={handleChange}
                      error={errors.description}
                      rows={6}
                      maxLength={1000}
                      showCharCount
                      helperText="Provide detailed information about condition, features, etc. (minimum 50 characters)"
                    />

                    <Input
                      label="Price (XAF)"
                      type="number"
                      name="price"
                      required
                      placeholder="15000000"
                      value={formData.price}
                      onChange={handleChange}
                      error={errors.price}
                      helperText="Enter the price in Central African CFA francs"
                    />

                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <input
                        id="acceptSwap"
                        name="acceptSwap"
                        type="checkbox"
                        checked={formData.acceptSwap}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="acceptSwap" className="text-sm font-medium text-gray-900 cursor-pointer">
                        I'm willing to consider swap offers
                      </label>
                    </div>

                    {formData.acceptSwap && (
                      <Textarea
                        label="Swap Preferences (Optional)"
                        name="swapPreferences"
                        placeholder="What kind of vehicle would you consider for a swap?"
                        value={formData.swapPreferences}
                        onChange={handleChange}
                        rows={3}
                      />
                    )}
                  </div>
                )}

                {/* Step 2: Vehicle Details */}
                {step === 2 && formData.listingType === 'vehicle' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Make"
                        options={[{ value: '', label: 'Select Make' }, ...makeOptions]}
                        value={formData.make}
                        onChange={(value) => handleSelectChange('make', value)}
                        error={errors.make}
                        required
                      />

                      <Input
                        label="Model"
                        name="model"
                        required
                        placeholder="e.g., Camry"
                        value={formData.model}
                        onChange={handleChange}
                        error={errors.model}
                      />

                      <Select
                        label="Year"
                        options={[{ value: '', label: 'Select Year' }, ...yearOptions]}
                        value={formData.year}
                        onChange={(value) => handleSelectChange('year', value)}
                        error={errors.year}
                        required
                      />

                      <Input
                        label="Mileage (km)"
                        type="number"
                        name="mileage"
                        required
                        placeholder="50000"
                        value={formData.mileage}
                        onChange={handleChange}
                        error={errors.mileage}
                      />

                      <Select
                        label="Fuel Type"
                        options={[{ value: '', label: 'Select Fuel Type' }, ...fuelOptions]}
                        value={formData.fuelType}
                        onChange={(value) => handleSelectChange('fuelType', value)}
                        error={errors.fuelType}
                        required
                      />

                      <Select
                        label="Transmission"
                        options={[{ value: '', label: 'Select Transmission' }, ...transmissionOptions]}
                        value={formData.transmission}
                        onChange={(value) => handleSelectChange('transmission', value)}
                        error={errors.transmission}
                        required
                      />

                      <Select
                        label="Condition"
                        options={[{ value: '', label: 'Select Condition' }, ...conditionOptions]}
                        value={formData.condition}
                        onChange={(value) => handleSelectChange('condition', value)}
                        error={errors.condition}
                        required
                      />

                      <Select
                        label="Body Type"
                        options={[{ value: '', label: 'Select Body Type' }, ...bodyTypeOptions]}
                        value={formData.bodyType}
                        onChange={(value) => handleSelectChange('bodyType', value)}
                      />

                      <Input
                        label="Color"
                        name="color"
                        placeholder="e.g., Black"
                        value={formData.color}
                        onChange={handleChange}
                      />

                      <Input
                        label="Engine Size (Optional)"
                        name="engineSize"
                        placeholder="e.g., 2.5L"
                        value={formData.engineSize}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Features (Optional)
                      </label>
                      <div className="flex gap-2 mb-3">
                        <Input
                          placeholder="Add a feature..."
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleFeatureAdd(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={(e) => {
                            const input = e.target.parentElement.querySelector('input');
                            handleFeatureAdd(input.value);
                            input.value = '';
                          }}
                        >
                          Add
                        </Button>
                      </div>
                      {formData.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                            >
                              {feature}
                              <button
                                type="button"
                                onClick={() => removeFeature(feature)}
                                className="hover:text-blue-900"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Part Details (if part selected) */}
                {step === 2 && formData.listingType === 'part' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Part Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Compatible Make"
                        options={[{ value: '', label: 'Select Make' }, ...makeOptions]}
                        value={formData.make}
                        onChange={(value) => handleSelectChange('make', value)}
                      />

                      <Input
                        label="Compatible Model (Optional)"
                        name="model"
                        placeholder="e.g., Camry"
                        value={formData.model}
                        onChange={handleChange}
                      />

                      <Select
                        label="Condition"
                        options={[
                          { value: '', label: 'Select Condition' },
                          { value: 'new', label: 'New' },
                          { value: 'used', label: 'Used' },
                          { value: 'refurbished', label: 'Refurbished' },
                          { value: 'scrap', label: 'For Scrap' }
                        ]}
                        value={formData.condition}
                        onChange={(value) => handleSelectChange('condition', value)}
                        error={errors.condition}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Images */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Images</h2>
                    
                    <ImageUpload
                      maxFiles={10}
                      maxSize={10 * 1024 * 1024} // 10MB
                      onUpload={handleImageUpload}
                      onError={handleImageError}
                      initialImages={formData.images}
                      label={`Upload ${formData.listingType === 'vehicle' ? 'Vehicle' : 'Part'} Images`}
                      showPreview={true}
                      allowReorder={true}
                    />

                    {errors.images && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.images}
                      </p>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-blue-900 mb-2">
                        📸 Photo Tips
                      </p>
                      <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                        <li>Upload clear, well-lit photos</li>
                        <li>Include multiple angles (front, back, sides, interior)</li>
                        <li>Show any damage or wear</li>
                        <li>First image will be the cover photo</li>
                        <li>You can drag images to reorder them</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Step 4: Location */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Details</h2>
                    
                    <Input
                      label="City"
                      name="location.city"
                      required
                      placeholder="e.g., Douala"
                      value={formData.location.city}
                      onChange={handleChange}
                      error={errors['location.city']}
                    />

                    <Input
                      label="Region/State"
                      name="location.region"
                      required
                      placeholder="e.g., Littoral"
                      value={formData.location.region}
                      onChange={handleChange}
                      error={errors['location.region']}
                    />

                    <Textarea
                      label="Address (Optional)"
                      name="location.address"
                      placeholder="Street address or area..."
                      value={formData.location.address}
                      onChange={handleChange}
                      rows={3}
                    />

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-900 flex items-start gap-2">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>Privacy Note:</strong> Your exact address will not be shown publicly. 
                          Only the city and region will be visible to potential buyers.
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Previous
                    </Button>
                  )}
                  
                  <div className={step === 1 ? 'ml-auto' : ''}>
                    {step < 4 ? (
                      <Button type="button" onClick={nextStep} variant="primary">
                        Next Step
                      </Button>
                    ) : (
                      <Button type="submit" loading={loading} disabled={loading} variant="primary">
                        {loading ? 'Creating Listing...' : 'Create Listing'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
