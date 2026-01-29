'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, X, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/api';

export default function ImageUpload({
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  onUpload,
  onError,
  initialImages = [],
  label = 'Upload Images',
  showPreview = true,
  allowReorder = true
}) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Debug: Log images state
  useEffect(() => {
    console.log('📸 Full images state:', JSON.stringify(images, null, 2));
  }, [images]);

  // Sync with initialImages
  useEffect(() => {
    if (initialImages.length > 0 && images.length === 0) {
      console.log('🔄 Setting initial images:', initialImages);
      setImages(initialImages);
    }
  }, [initialImages]);

  // Notify parent when images change (after render)
  useEffect(() => {
    const uploadedImages = images.filter(img => !img.uploading);
    if (uploadedImages.length > 0 || images.length === 0) {
      onUpload?.(uploadedImages);
    }
  }, [images]);

  // File validation
  const validateFile = (file) => {
    const errors = [];
    
    if (!file.type.startsWith('image/')) {
      errors.push(`${file.name} is not an image file`);
    }
    
    if (file.size > maxSize) {
      errors.push(`${file.name} exceeds ${maxSize / (1024 * 1024)}MB limit`);
    }
    
    return errors;
  };

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [images, maxFiles]);

  // Handle file input change
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
    e.target.value = '';
  };

  // Process and upload files
  const handleFiles = async (files) => {
    setErrors([]);
    
    if (images.length + files.length > maxFiles) {
      const error = `You can only upload up to ${maxFiles} images`;
      setErrors([error]);
      onError?.(error);
      return;
    }
    
    const validationErrors = [];
    files.forEach(file => {
      const fileErrors = validateFile(file);
      validationErrors.push(...fileErrors);
    });
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      onError?.(validationErrors.join(', '));
      return;
    }
    
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      
      try {
        // Create preview
        const preview = URL.createObjectURL(file);
        const tempImage = {
          id: tempId,
          url: preview,
          file,
          uploading: true
        };
        
        console.log('🔄 Adding temp image:', tempImage);
        
        // Add temp image
        setImages(prev => [...prev, tempImage]);
        
        // Upload to backend
        const formData = new FormData();
        formData.append('image', file);
        
        setUploadProgress(prev => ({ ...prev, [tempId]: 0 }));
        
        console.log('⬆️ Uploading to /uploads/image...');
        
        const response = await api.post('/uploads/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(prev => ({
              ...prev,
              [tempId]: percentCompleted
            }));
          },
        });
        
        console.log('✅ Upload response:', response.data);
        
        // Handle different response structures
        const imageData = response.data.data || response.data;
        const uploadedImage = {
          id: imageData.public_id || imageData.id || `uploaded-${Date.now()}-${Math.random()}`,
          url: imageData.secure_url || imageData.url || preview,
          publicId: imageData.public_id,
          uploading: false
        };
        
        console.log('📦 Processed uploaded image:', uploadedImage);
        
        // Replace temp with uploaded
        setImages(prev => {
          const updated = prev.map(img =>
            img.id === tempId ? uploadedImage : img
          );
          console.log('📋 Updated images array:', updated);
          return updated;
        });
        
        // Clean up blob URL only if we have a real URL
        if (uploadedImage.url !== preview) {
          URL.revokeObjectURL(preview);
        }
        
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[tempId];
          return newProgress;
        });
        
      } catch (error) {
        console.error('❌ Upload error:', error);
        console.error('❌ Error response:', error.response);
        const errorMsg = error.response?.data?.message || 'Failed to upload image';
        setErrors(prev => [...prev, errorMsg]);
        onError?.(errorMsg);
        
        // Remove failed
        setImages(prev => prev.filter(img => img.id !== tempId));
      }
    }
    
    setUploading(false);
  };

  // Remove image
  const handleRemove = (imageId) => {
    const image = images.find(img => img.id === imageId);
    if (image?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(image.url);
    }
    
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Drag to reorder
  const handleDragStart = (e, index) => {
    if (!allowReorder) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    if (!allowReorder || draggedIndex === null) return;
    e.preventDefault();
    
    if (draggedIndex !== index) {
      setImages(prev => {
        const newImages = [...prev];
        const draggedImage = newImages[draggedIndex];
        newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, draggedImage);
        return newImages;
      });
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Get visible images - be more lenient with filtering
  const visibleImages = images.filter(img => {
    if (!img) return false;
    // Image is valid if it has url OR if it's uploading and has a preview
    return img.url || (img.uploading && img.file);
  });
  
  console.log('👁️ Visible images count:', visibleImages.length, 'Total:', images.length);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      
      {/* Upload Zone */}
      {images.length < maxFiles && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center
            transition-colors cursor-pointer
            ${dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400 bg-white'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {uploading ? (
                <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
              ) : (
                <Upload className="h-6 w-6 text-gray-400" />
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium text-blue-600">Click to upload</span>
                {' '}or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to {maxSize / (1024 * 1024)}MB
              </p>
              <p className="text-xs text-gray-500">
                {images.filter(img => !img.uploading).length} / {maxFiles} images uploaded
              </p>
            </div>
            
            {uploading && (
              <div className="text-sm text-gray-600">
                Uploading...
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              {errors.map((error, index) => (
                <p key={`error-${index}`}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Debug Info */}
      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
        <div className="font-bold mb-2 text-yellow-900">🔍 Debug Info:</div>
        <div className="space-y-1 text-yellow-800">
          <div>Total images: {images.length}</div>
          <div>Visible images: {visibleImages.length}</div>
          <div>Show preview: {showPreview ? 'Yes' : 'No'}</div>
          <div>Uploading: {uploading ? 'Yes' : 'No'}</div>
          <div>Images with URLs: {images.filter(img => img?.url).length}</div>
          <div className="mt-2 font-mono text-xs">
            {images.map((img, i) => (
              <div key={i} className="truncate">
                [{i}] id: {img?.id?.substring(0, 20)}... | url: {img?.url ? '✅' : '❌'}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Image Previews */}
      {showPreview && visibleImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              draggable={allowReorder && !image.uploading}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                relative group aspect-square rounded-lg overflow-hidden
                border-2 bg-gray-100
                ${image.uploading 
                  ? 'border-blue-300' 
                  : 'border-gray-200 hover:border-blue-400'
                }
                transition-colors
                ${allowReorder && !image.uploading ? 'cursor-move' : ''}
                ${draggedIndex === index ? 'opacity-50' : ''}
              `}
            >
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={image.url.startsWith('blob:')}
                />
              )}
              
              {/* Upload Progress */}
              {image.uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 text-white animate-spin mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">
                      {uploadProgress[image.id] || 0}%
                    </p>
                  </div>
                </div>
              )}
              
              {/* Remove Button */}
              {!image.uploading && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(image.id);
                  }}
                  className="
                    absolute top-2 right-2 p-1.5 bg-red-500 text-white
                    rounded-full opacity-0 group-hover:opacity-100
                    transition-opacity hover:bg-red-600
                    focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500
                  "
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {/* Image Number Badge */}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded font-medium">
                {index + 1}
              </div>
              
              {/* Upload Success Indicator */}
              {!image.uploading && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Helper Text */}
      {images.length > 0 && (
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>
            {allowReorder && '💡 Drag images to reorder. '}
            First image will be the cover photo.
          </span>
          <span className="font-medium">
            {images.filter(img => !img.uploading).length} uploaded
          </span>
        </div>
      )}
    </div>
  );
}
