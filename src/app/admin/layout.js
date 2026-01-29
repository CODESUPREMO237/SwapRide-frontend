'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Package, 
  Repeat, 
  AlertTriangle,
  Star,
  Settings,
  FileText,
  BarChart3,
  ArrowLeft
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Vehicles', href: '/admin/vehicles', icon: Car },
    { name: 'Parts', href: '/admin/parts', icon: Package },
    { name: 'Swaps', href: '/admin/swaps', icon: Repeat },
    { name: 'Reports', href: '/admin/reports', icon: AlertTriangle },
    { name: 'Reviews', href: '/admin/reviews', icon: Star },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Payments', href: '/admin/payments', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-sm hover:text-blue-200 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Exit Admin
              </button>
              <div className="h-6 w-px bg-blue-400"></div>
              <h1 className="text-lg font-bold">SwapRide Admin Panel</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">System Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
