# 🚗 SwapRide Frontend - Next.js Application

## 📖 Overview

SwapRide is a modern vehicle marketplace platform built with Next.js, featuring vehicle buying, selling, and swapping capabilities. This is the frontend application that connects to the SwapRide backend API.

## ✨ Features

- 🚗 **Vehicle Marketplace** - Browse and search thousands of vehicles
- 🔄 **Swap System** - Unique vehicle-to-vehicle swapping
- 🔧 **Parts Marketplace** - Buy and sell vehicle parts
- 💬 **Real-time Chat** - Socket.IO powered messaging
- 👤 **User Authentication** - Secure login and registration
- 📊 **Dashboard** - Manage listings, swaps, and profile
- 💳 **Payment Integration** - Kora payment gateway
- ⭐ **Favorites** - Save and track interesting listings
- 🔔 **Notifications** - Real-time updates

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript (No TypeScript as per requirements)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Real-time:** Socket.IO Client
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Notifications:** React Hot Toast

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── vehicles/          # Vehicle pages
│   │   ├── parts/             # Parts pages
│   │   ├── swaps/             # Swap system pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── messages/          # Chat pages
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   ├── vehicles/          # Vehicle-specific components
│   │   ├── parts/             # Parts-specific components
│   │   ├── swap/              # Swap-specific components
│   │   ├── chat/              # Chat components
│   │   └── common/            # Common components
│   ├── context/
│   │   ├── AuthContext.js     # Authentication state
│   │   └── SocketContext.js   # Socket.IO connection
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   ├── api.js             # Axios instance & config
│   │   ├── utils.js           # Utility functions
│   │   ├── constants.js       # App constants
│   │   └── socket.js          # Socket.IO client
│   └── styles/                 # Additional styles
├── public/                     # Static files
├── .env.example               # Environment variables template
├── .env.local                 # Local environment (create this)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- SwapRide backend running on http://localhost:5000

### Installation

1. **Clone and navigate to frontend directory:**
   ```bash
   cd D:\project\websites\frontends\SwapRide\frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_API_VERSION=v1
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=swapride_uploads
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Key Components

### UI Components (`src/components/ui/`)

- **Button** - Versatile button with multiple variants
- **Input** - Form input with label, icons, and error states
- **Card** - Container component with header, content, footer
- **Modal** - Full-featured modal dialog
- **Select** - Dropdown selection component
- **Textarea** - Multi-line text input
- **Badge** - Status and category badges
- **Loader** - Loading spinner

### Layout Components

- **Navbar** - Main navigation with auth state
- **Footer** - Site footer with links
- **Sidebar** - Dashboard sidebar navigation

### Feature Components

- **VehicleCard** - Display vehicle in grid/list
- **VehicleFilters** - Search and filter controls
- **VehicleForm** - Create/edit vehicle form
- **SwapProposalForm** - Initiate vehicle swap
- **ChatWindow** - Real-time messaging interface
- **ImageUpload** - Cloudinary image uploader

## 🔐 Authentication

The app uses JWT-based authentication:

```javascript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication methods
}
```

### Auth Methods

- `login(email, password)` - Authenticate user
- `register(userData)` - Create new account
- `logout()` - Sign out user
- `updateProfile(updates)` - Update user profile
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, password)` - Reset password
- `verifyEmail(token)` - Verify email address

## 🌐 API Integration

### API Client (`src/lib/api.js`)

The app uses a configured Axios instance:

```javascript
import api from '@/lib/api';

// GET request
const response = await api.get('/vehicles');
const vehicles = response.data.data.vehicles;

// POST request
const response = await api.post('/vehicles', vehicleData);

// Auth token is added automatically via interceptor
```

### Error Handling

The API client automatically:
- Adds JWT token to requests
- Handles 401 responses (auto logout)
- Provides error messages to components

## 💬 Real-time Chat

Socket.IO integration for real-time features:

```javascript
import { useSocket } from '@/hooks/useSocket';

function ChatComponent() {
  const socket = useSocket();
  
  useEffect(() => {
    socket.on('message', handleNewMessage);
    return () => socket.off('message');
  }, []);
}
```

## 🎨 Styling

### Tailwind CSS

The app uses Tailwind CSS for styling:

```javascript
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
  {/* Component content */}
</div>
```

### Custom Utilities

```javascript
import { cn, formatCurrency, formatRelativeTime } from '@/lib/utils';

// Merge class names
className={cn('base-class', condition && 'conditional-class')}

// Format currency
{formatCurrency(15000000)} // "15,000,000 XAF"

// Format dates
{formatRelativeTime(new Date())} // "just now"
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```javascript
<div className="
  grid 
  grid-cols-1          // Mobile: 1 column
  md:grid-cols-2       // Tablet: 2 columns
  lg:grid-cols-3       // Desktop: 3 columns
  gap-6
">
  {/* Content */}
</div>
```

## 🔍 Search & Filters

Vehicle and parts can be filtered by:
- Make, model, year
- Price range
- Fuel type, transmission
- Location
- Condition
- Swap availability

## 🌟 Key Features Implementation

### Vehicle Swap System

1. User browses vehicle listings
2. Clicks "Propose Swap" button
3. Selects their vehicle to offer
4. Optionally adds cash top-up
5. Owner can accept, reject, or counter offer
6. Real-time notifications for all parties

### Image Upload

Integrated with Cloudinary:

```javascript
<ImageUpload
  onUpload={handleImageUpload}
  maxFiles={10}
  maxSize={5 * 1024 * 1024}
/>
```

### Favorites System

```javascript
import { useFavorites } from '@/hooks/useFavorites';

const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
```

## 🚦 Environment Variables

Required:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_API_VERSION` - API version (default: v1)
- `NEXT_PUBLIC_SOCKET_URL` - Socket.IO server URL

Optional:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Upload preset
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk auth key

## 📊 State Management

### React Context

- **AuthContext** - User authentication state
- **SocketContext** - Socket.IO connection

### Local State

Components use React hooks for local state:
- `useState` - Component state
- `useEffect` - Side effects
- `useCallback` - Memoized callbacks
- `useMemo` - Memoized values

## 🐛 Common Issues & Solutions

### Issue: API Connection Failed

**Solution:**
1. Ensure backend is running on port 5000
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify CORS is configured in backend

### Issue: Images Not Loading

**Solution:**
1. Check Cloudinary credentials in `.env.local`
2. Verify upload preset exists
3. Check browser console for errors

### Issue: Authentication Not Persisting

**Solution:**
1. Check JWT token in localStorage
2. Verify token expiration time
3. Check backend cookie settings

### Issue: Socket.IO Not Connecting

**Solution:**
1. Verify `NEXT_PUBLIC_SOCKET_URL` is correct
2. Check backend Socket.IO configuration
3. Ensure no firewall blocking WebSocket

## 📈 Performance Optimization

### Code Splitting

Next.js automatically code-splits by route:

```javascript
// Lazy load components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loader />
});
```

### Image Optimization

```javascript
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="Description"
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="..."
/>
```

### Caching

API responses can be cached:

```javascript
const { data } = useSWR('/api/vehicles', fetcher, {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
});
```

## 🔒 Security Best Practices

- ✅ JWT tokens stored in httpOnly cookies (backend)
- ✅ XSS protection via React's auto-escaping
- ✅ CSRF tokens for forms
- ✅ Input validation on all forms
- ✅ Secure API communication (HTTPS in production)
- ✅ Content Security Policy headers
- ✅ Rate limiting on API calls

## 📝 Development Guidelines

### Component Structure

```javascript
'use client'; // If using client-side features

import { useState } from 'react';
import { ComponentProps } from './types';

export default function Component({ prop1, prop2 }) {
  const [state, setState] = useState(initialState);
  
  const handleAction = () => {
    // Action logic
  };
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### API Calls

```javascript
try {
  const response = await api.get('/endpoint');
  const data = response.data.data;
  // Handle success
} catch (error) {
  const message = error.response?.data?.message || 'Operation failed';
  toast.error(message);
  // Handle error
}
```

### Form Handling

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    await api.post('/endpoint', formData);
    toast.success('Success message');
    router.push('/success-page');
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Set in production environment:
- All `NEXT_PUBLIC_*` variables
- Update `NEXT_PUBLIC_API_URL` to production backend URL

### Hosting Platforms

Recommended platforms:
- **Vercel** (Best for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [Backend API Documentation](../../../backends/SwapRide/backend/README.md)

## 🤝 Contributing

1. Follow the component structure guidelines
2. Use Tailwind CSS for styling
3. Implement proper error handling
4. Add loading states for async operations
5. Test responsive design
6. Document complex logic

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues or questions:
- Check `FRONTEND_IMPLEMENTATION_GUIDE.md`
- Review backend API documentation
- Contact: support@swapride.com

---

**Frontend Status:** Core foundation complete (30%)
**Backend Status:** 100% complete and ready
**Next Steps:** Continue implementing pages and components from the implementation guide

**Happy coding! 🚀**

## Architecture
See [docs/architecture.md](docs/architecture.md) for clean architecture layers, folder structure, testing strategy, and Docker guidance.

