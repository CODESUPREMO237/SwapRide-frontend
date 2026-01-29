/**
 * Application Constants
 */

// Vehicle Types
export const VEHICLE_TYPES = [
  { value: 'car', label: 'Car' },
  { value: 'motorcycle', label: 'Motorcycle' },
  { value: 'truck', label: 'Truck' },
  { value: 'van', label: 'Van' },
  { value: 'bus', label: 'Bus' },
  { value: 'suv', label: 'SUV' },
];

// Vehicle Conditions (as strings for filter dropdowns)
export const VEHICLE_CONDITIONS = ['new', 'used', 'refurbished', 'damaged'];

// Fuel Types (as strings for filter dropdowns)
export const FUEL_TYPES = ['petrol', 'diesel', 'electric', 'hybrid', 'gas'];

// Transmission Types (as strings for filter dropdowns)
export const TRANSMISSION_TYPES = ['automatic', 'manual', 'semi-automatic'];

// Body Types (as strings for filter dropdowns)
export const VEHICLE_BODY_TYPES = [
  'sedan', 'suv', 'hatchback', 'coupe', 'convertible',
  'wagon', 'pickup', 'van', 'minivan', 'crossover',
  'sports car', 'truck', 'bus'
];

// Part Categories
export const PART_CATEGORIES = [
  { value: 'engine', label: 'Engine & Transmission', icon: '⚙️' },
  { value: 'brakes', label: 'Brakes & Suspension', icon: '🛞' },
  { value: 'electrical', label: 'Electrical & Lighting', icon: '💡' },
  { value: 'body', label: 'Body Parts & Panels', icon: '🚗' },
  { value: 'interior', label: 'Interior & Accessories', icon: '🪑' },
  { value: 'wheels', label: 'Wheels & Tires', icon: '⚫' },
  { value: 'exhaust', label: 'Exhaust System', icon: '💨' },
  { value: 'cooling', label: 'Cooling & Heating', icon: '❄️' },
  { value: 'fuel', label: 'Fuel System', icon: '⛽' },
  { value: 'other', label: 'Other Parts', icon: '🔧' },
];

// Swap Status
export const SWAP_STATUS = {
  PENDING: { value: 'pending', label: 'Pending', color: 'yellow' },
  ACCEPTED: { value: 'accepted', label: 'Accepted', color: 'green' },
  REJECTED: { value: 'rejected', label: 'Rejected', color: 'red' },
  COUNTERED: { value: 'countered', label: 'Counter Offer', color: 'blue' },
  COMPLETED: { value: 'completed', label: 'Completed', color: 'green' },
  CANCELLED: { value: 'cancelled', label: 'Cancelled', color: 'gray' },
};

// User Types
export const USER_TYPES = [
  { value: 'individual', label: 'Individual Seller' },
  { value: 'dealer', label: 'Dealer' },
  { value: 'company', label: 'Company' },
];

// Report Types
export const REPORT_TYPES = [
  { value: 'fake_listing', label: 'Fake Listing' },
  { value: 'scam', label: 'Scam or Fraud' },
  { value: 'stolen', label: 'Stolen Vehicle' },
  { value: 'inappropriate', label: 'Inappropriate Content' },
  { value: 'spam', label: 'Spam' },
  { value: 'other', label: 'Other' },
];

// Popular Vehicle Makes
export const POPULAR_MAKES = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan',
  'Volkswagen', 'Mercedes-Benz', 'BMW', 'Audi', 'Hyundai',
  'Kia', 'Mazda', 'Subaru', 'Peugeot', 'Renault',
];

// All Vehicle Makes (for filters)
export const VEHICLE_MAKES = [
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan',
  'Volkswagen', 'Mercedes-Benz', 'BMW', 'Audi', 'Hyundai',
  'Kia', 'Mazda', 'Subaru', 'Peugeot', 'Renault',
  'Fiat', 'Mitsubishi', 'Suzuki', 'Isuzu', 'Daihatsu',
  'Volvo', 'Jaguar', 'Land Rover', 'Porsche', 'Lexus',
  'Infiniti', 'Acura', 'Cadillac', 'Jeep', 'Ram',
  'GMC', 'Buick', 'Chrysler', 'Dodge', 'Tesla',
  'Citroën', 'Opel', 'Seat', 'Škoda', 'Other'
];

// Year Range
export const YEAR_RANGE = Array.from(
  { length: new Date().getFullYear() - 1990 + 1 },
  (_, i) => new Date().getFullYear() - i
);

// Price Ranges for Quick Filters
export const PRICE_RANGES = [
  { value: '0-5000000', label: 'Under 5M XAF' },
  { value: '5000000-10000000', label: '5M - 10M XAF' },
  { value: '10000000-20000000', label: '10M - 20M XAF' },
  { value: '20000000-50000000', label: '20M - 50M XAF' },
  { value: '50000000-999999999', label: 'Over 50M XAF' },
];

// Subscription Plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    duration: 'month',
    features: [
      'List up to 5 vehicles',
      'Basic search listing',
      'Email support',
      'Standard response time',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 25000,
    duration: 'month',
    features: [
      'List up to 25 vehicles',
      'Priority listing',
      'Featured badge',
      '5 free boosts/month',
      'Priority support',
      'Analytics dashboard',
    ],
    popular: true,
  },
  {
    id: 'dealer',
    name: 'Dealer',
    price: 75000,
    duration: 'month',
    features: [
      'Unlimited listings',
      'Top priority placement',
      'Verified dealer badge',
      'Unlimited boosts',
      '24/7 dedicated support',
      'Advanced analytics',
      'Bulk upload tools',
      'Custom dealer page',
    ],
  },
];

// Featured Listing Pricing
export const FEATURED_PRICING = {
  duration: {
    '7': { days: 7, price: 5000, label: '7 Days' },
    '14': { days: 14, price: 9000, label: '14 Days' },
    '30': { days: 30, price: 15000, label: '30 Days' },
  },
};

// Boost Listing Pricing
export const BOOST_PRICING = {
  duration: {
    '3': { days: 3, price: 2500, label: '3 Days' },
    '7': { days: 7, price: 4000, label: '7 Days' },
    '14': { days: 14, price: 7000, label: '14 Days' },
  },
};

// Navigation Links
export const NAV_LINKS = [
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/parts', label: 'Parts' },
  { href: '/swaps', label: 'Swap Center' },
  { href: '/how-it-works', label: 'How It Works' },
];

// Footer Links
export const FOOTER_LINKS = {
  marketplace: [
    { href: '/vehicles', label: 'Browse Vehicles' },
    { href: '/parts', label: 'Browse Parts' },
    { href: '/swaps', label: 'Swap Center' },
    { href: '/featured', label: 'Featured Listings' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
  ],
  support: [
    { href: '/help', label: 'Help Center' },
    { href: '/safety', label: 'Safety Tips' },
    { href: '/faq', label: 'FAQ' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
  sellers: [
    { href: '/sell', label: 'Sell Your Vehicle' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/dealer', label: 'Dealer Program' },
    { href: '/guidelines', label: 'Seller Guidelines' },
  ],
};

// Image Upload Limits
export const UPLOAD_LIMITS = {
  maxSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 10,
  acceptedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

// Pagination
export const ITEMS_PER_PAGE = 20;

// Map Default Center (Cameroon)
export const MAP_DEFAULT_CENTER = {
  lat: 3.848,
  lng: 11.5021,
  zoom: 6,
};

// Cities in Cameroon
export const CAMEROON_CITIES = [
  'Douala', 'Yaoundé', 'Bamenda', 'Bafoussam', 'Garoua',
  'Maroua', 'Nkongsamba', 'Ngaoundéré', 'Bertoua', 'Loum',
  'Kumba', 'Edéa', 'Kribi', 'Limbé', 'Buea', 'Tiko',
];

// Contact Information
export const CONTACT_INFO = {
  email: 'tchabeustephane2@gmail.com',
  phone: '+237 679 398 551',
  address: 'Tiko, Cameroon',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61582474586037',
  twitter: 'http://bit.ly/4pbhGIK',
  instagram: '',
  linkedin: 'http://bit.ly/47Cwmua',
};
