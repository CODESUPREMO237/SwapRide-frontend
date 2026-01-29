'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import  Button  from '@/components/ui/Button';
import  Input  from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { Loader } from '@/components/ui/Loader';
import { formatCurrency } from '@/lib/utils';
import { Repeat, DollarSign } from 'lucide-react';

export default function SwapProposalForm({ targetVehicle, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [myVehicles, setMyVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    proposedVehicle: '',
    cashTopUp: '',
    message: '',
  });

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  const fetchMyVehicles = async () => {
    try {
      setLoadingVehicles(true);
      const response = await api.get('/vehicles/my-listings');
      setMyVehicles(response.data.data.vehicles || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError('Failed to load your vehicles');
    } finally {
      setLoadingVehicles(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, proposedVehicle: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.proposedVehicle) {
      setError('Please select a vehicle to offer');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const swapData = {
        requestedVehicle: targetVehicle._id,
        proposedVehicle: formData.proposedVehicle,
        cashTopUp: formData.cashTopUp ? parseInt(formData.cashTopUp) : 0,
        message: formData.message,
      };

      await api.post('/swaps', swapData);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating swap proposal:', error);
      setError(error.response?.data?.message || 'Failed to create swap proposal');
    } finally {
      setLoading(false);
    }
  };

  if (loadingVehicles) {
    return (
      <div className="flex justify-center py-8">
        <Loader size="lg" />
      </div>
    );
  }

  if (myVehicles.length === 0) {
    return (
      <div className="text-center py-8">
        <Repeat className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-600 mb-4">
          You need to have at least one active listing to propose a swap
        </p>
        <Button onClick={onCancel}>Close</Button>
      </div>
    );
  }

  const vehicleOptions = myVehicles
    .filter(v => v.status === 'active')
    .map(v => ({
      value: v._id,
      label: `${v.title} - ${formatCurrency(v.price)}`
    }));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert type="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Target Vehicle Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">You want to swap for:</p>
        <div className="flex items-center gap-4">
          <img
            src={targetVehicle.images?.[0]?.url || '/images/placeholder-car.jpg'}
            alt={targetVehicle.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{targetVehicle.title}</h3>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(targetVehicle.price)}
            </p>
          </div>
        </div>
      </div>

      {/* Select Your Vehicle */}
      <Select
        label="Select Your Vehicle to Offer"
        options={[
          { value: '', label: 'Choose a vehicle...' },
          ...vehicleOptions
        ]}
        value={formData.proposedVehicle}
        onChange={handleSelectChange}
        required
      />

      {/* Cash Top-Up */}
      <Input
        label="Cash Top-Up (Optional)"
        type="number"
        name="cashTopUp"
        placeholder="0"
        value={formData.cashTopUp}
        onChange={handleChange}
        leftIcon={<DollarSign className="h-5 w-5 text-gray-400" />}
        helperText="Additional cash you're willing to add to the swap"
      />

      {/* Message */}
      <Textarea
        label="Message to Seller"
        name="message"
        placeholder="Tell the seller why you want to make this swap..."
        value={formData.message}
        onChange={handleChange}
        rows={4}
      />

      {/* Value Summary */}
      {formData.proposedVehicle && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-2">Swap Summary</p>
          <div className="space-y-1 text-sm text-blue-800">
            <div className="flex justify-between">
              <span>Your Vehicle:</span>
              <span className="font-semibold">
                {formatCurrency(
                  myVehicles.find(v => v._id === formData.proposedVehicle)?.price || 0
                )}
              </span>
            </div>
            {formData.cashTopUp > 0 && (
              <div className="flex justify-between">
                <span>Cash Top-Up:</span>
                <span className="font-semibold">
                  {formatCurrency(parseInt(formData.cashTopUp))}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-blue-300">
              <span className="font-semibold">Total Offer:</span>
              <span className="font-bold">
                {formatCurrency(
                  (myVehicles.find(v => v._id === formData.proposedVehicle)?.price || 0) +
                  (formData.cashTopUp ? parseInt(formData.cashTopUp) : 0)
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          loading={loading}
          disabled={loading}
          leftIcon={<Repeat className="h-5 w-5" />}
        >
          {loading ? 'Submitting...' : 'Propose Swap'}
        </Button>
      </div>
    </form>
  );
}
