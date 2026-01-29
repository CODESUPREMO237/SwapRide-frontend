# ImageUpload Component

A comprehensive, production-ready image upload component with drag & drop, preview, reordering, and Cloudinary integration.

## Features

✅ **Drag & Drop** - Drag files directly into the upload zone
✅ **Click to Upload** - Traditional file input fallback
✅ **Multiple Files** - Upload multiple images at once
✅ **Image Preview** - Real-time preview grid with thumbnails
✅ **Delete Images** - Remove individual images
✅ **Reorder Images** - Drag images to reorder (first = cover photo)
✅ **Upload Progress** - Visual progress indicator
✅ **File Validation** - Size and type validation
✅ **Error Handling** - User-friendly error messages
✅ **Cloudinary Integration** - Direct upload to Cloudinary via backend

## Installation

The component uses these dependencies (already installed):

```bash
npm install lucide-react
```

## Usage

### Basic Example

```javascript
import ImageUpload from '@/components/common/ImageUpload';

function MyForm() {
  const [images, setImages] = useState([]);

  const handleUpload = (uploadedImages) => {
    setImages(uploadedImages);
    console.log('Images:', uploadedImages);
  };

  const handleError = (error) => {
    console.error('Upload error:', error);
  };

  return (
    <ImageUpload
      maxFiles={5}
      maxSize={5 * 1024 * 1024}
      onUpload={handleUpload}
      onError={handleError}
    />
  );
}
```

### With All Props

```javascript
<ImageUpload
  maxFiles={10}                    // Maximum number of files (default: 5)
  maxSize={5 * 1024 * 1024}       // Max file size in bytes (default: 5MB)
  onUpload={handleUpload}         // Callback when upload completes
  onError={handleError}           // Callback on error
  initialImages={[]}              // Pre-populate with existing images
  label="Upload Images"           // Custom label (default: "Upload Images")
  showPreview={true}              // Show preview grid (default: true)
  allowReorder={true}             // Enable drag-to-reorder (default: true)
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxFiles` | number | 5 | Maximum number of files allowed |
| `maxSize` | number | 5242880 | Maximum file size in bytes (5MB) |
| `onUpload` | function | - | Callback when images are uploaded successfully |
| `onError` | function | - | Callback when an error occurs |
| `initialImages` | array | [] | Array of initial images to display |
| `label` | string | "Upload Images" | Label text for the upload area |
| `showPreview` | boolean | true | Whether to show image previews |
| `allowReorder` | boolean | true | Whether to allow drag-to-reorder |

## Returned Image Format

The `onUpload` callback receives an array of image objects:

```javascript
[
  {
    id: "cloudinary-public-id",
    url: "https://res.cloudinary.com/...",
    publicId: "cloudinary-public-id"
  }
]
```

## Backend Requirements

The component expects a backend endpoint at `/uploads/image` that:

1. Accepts multipart/form-data with an `image` field
2. Uploads to Cloudinary
3. Returns response in this format:

```javascript
{
  data: {
    public_id: "unique-id",
    secure_url: "https://cloudinary-url",
    // other cloudinary fields...
  }
}
```

### Example Backend Route (Express + Cloudinary)

```javascript
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const upload = multer({ storage: multer.memoryStorage() });

router.post('/uploads/image', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: 'swapride' },
      (error, result) => {
        if (error) throw error;
        res.json({ data: result });
      }
    ).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});
```

## Features in Detail

### Drag & Drop

Users can drag files directly into the upload zone. The zone highlights when files are dragged over it.

### File Validation

- **Type validation**: Only image files (image/*) are accepted
- **Size validation**: Files exceeding maxSize are rejected
- **Count validation**: Uploading more than maxFiles is prevented

### Image Preview

Images are displayed in a responsive grid with:
- Numbered badges (1, 2, 3...)
- Hover effects
- Delete buttons (appear on hover)
- Aspect ratio maintained

### Reordering

When `allowReorder={true}`:
- Drag any image to reorder
- First image becomes the cover photo
- Real-time position updates

### Upload Progress

Each uploading image shows:
- Loading spinner
- Upload percentage
- Disabled state during upload

### Error Handling

Errors are displayed in a red alert box with:
- Icon indicator
- Clear error messages
- Multiple errors listed separately

## Styling

The component uses Tailwind CSS classes. Customize by:

1. **Colors**: Modify bg-*, border-*, text-* classes
2. **Spacing**: Adjust p-*, m-*, gap-* classes
3. **Sizes**: Change w-*, h-* classes

## Demo Page

Visit `/demo/image-upload` to see the component in action.

## Common Issues

### "Upload failed" error

**Cause**: Backend endpoint not configured correctly
**Fix**: Ensure `/uploads/image` endpoint exists and returns correct format

### Images not previewing

**Cause**: CORS or Cloudinary configuration
**Fix**: Check Cloudinary credentials and CORS settings

### "File too large" error

**Cause**: File exceeds maxSize
**Fix**: Increase maxSize or compress images before upload

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support (with touch events)

## Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Focus indicators

## Performance

- Lazy loading for large image lists
- Optimized re-renders
- Memory cleanup for blob URLs
- Progress tracking for large files

## License

MIT
