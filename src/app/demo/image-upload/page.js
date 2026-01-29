'use client';

import { useState } from 'react';
import ImageUpload from '@/components/common/ImageUpload';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ImageUploadDemo() {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = (images) => {
    console.log('Uploaded images:', images);
    setUploadedImages(images);
  };

  const handleError = (error) => {
    console.error('Upload error:', error);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Image Upload Component Demo
          </h1>
          <p className="text-gray-600">
            Test the drag & drop image upload functionality
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Upload Images</h2>
          </CardHeader>
          <CardContent>
            <ImageUpload
              maxFiles={5}
              maxSize={5 * 1024 * 1024}
              onUpload={handleUpload}
              onError={handleError}
              label="Vehicle Images"
              showPreview={true}
              allowReorder={true}
            />
          </CardContent>
        </Card>

        {uploadedImages.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Uploaded Image Data</h2>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(uploadedImages, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
