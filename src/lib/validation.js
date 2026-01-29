/**
 * Form Validation Utilities
 * Reusable validation functions for form inputs
 */

export const validators = {
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (value, min, fieldName = 'This field') => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (value, max, fieldName = 'This field') => {
    if (value && value.length > max) {
      return `${fieldName} must be no more than ${max} characters`;
    }
    return null;
  },

  min: (value, min, fieldName = 'This field') => {
    if (value && Number(value) < min) {
      return `${fieldName} must be at least ${min}`;
    }
    return null;
  },

  max: (value, max, fieldName = 'This field') => {
    if (value && Number(value) > max) {
      return `${fieldName} must be no more than ${max}`;
    }
    return null;
  },

  number: (value, fieldName = 'This field') => {
    if (value && isNaN(Number(value))) {
      return `${fieldName} must be a valid number`;
    }
    return null;
  },

  positiveNumber: (value, fieldName = 'This field') => {
    if (value && Number(value) <= 0) {
      return `${fieldName} must be a positive number`;
    }
    return null;
  },

  year: (value) => {
    const currentYear = new Date().getFullYear();
    const year = Number(value);
    if (value && (year < 1900 || year > currentYear + 1)) {
      return `Please enter a valid year between 1900 and ${currentYear + 1}`;
    }
    return null;
  },

  phone: (value) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (value && !phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  url: (value) => {
    try {
      if (value) {
        new URL(value);
      }
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  zipCode: (value) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (value && !zipRegex.test(value)) {
      return 'Please enter a valid ZIP code';
    }
    return null;
  },

  vin: (value) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (value && !vinRegex.test(value.toUpperCase())) {
      return 'Please enter a valid 17-character VIN';
    }
    return null;
  },

  licensePlate: (value) => {
    const plateRegex = /^[A-Z0-9\-]{2,10}$/;
    if (value && !plateRegex.test(value.toUpperCase())) {
      return 'Please enter a valid license plate';
    }
    return null;
  },
};

/**
 * Validate a single field with multiple validators
 */
export const validateField = (value, validationRules) => {
  for (const rule of validationRules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return null;
};

/**
 * Validate entire form
 */
export const validateForm = (formData, validationSchema) => {
  const errors = {};
  
  Object.keys(validationSchema).forEach((fieldName) => {
    const rules = validationSchema[fieldName];
    const value = formData[fieldName];
    const error = validateField(value, rules);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Custom hook for form validation
 */
export const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    if (validationSchema[name]) {
      const error = validateField(values[name], validationSchema[name]);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Validate all fields
    const { isValid, errors: validationErrors } = validateForm(values, validationSchema);
    setErrors(validationErrors);
    
    if (isValid) {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};

export default validators;
