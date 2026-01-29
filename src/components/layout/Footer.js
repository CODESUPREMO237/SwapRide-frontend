'use client';

import Link from 'next/link';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Cookie } from 'lucide-react';
import { FOOTER_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">
                Swap<span className="text-blue-500">Ride</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              The leading vehicle marketplace in Cameroon. Buy, sell, and swap vehicles and parts with confidence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.marketplace.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-500 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-500 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-500 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} SwapRide. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/terms" className="hover:text-blue-500 transition">
                Terms
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/privacy" className="hover:text-blue-500 transition">
                Privacy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/cookies" className="hover:text-blue-500 transition">
                Cookies
              </Link>
              <span className="text-gray-600">•</span>
              <button
                onClick={() => {
                  localStorage.removeItem('cookieConsent');
                  window.location.reload();
                }}
                className="hover:text-blue-500 transition flex items-center gap-1"
              >
                <Cookie className="h-3 w-3" />
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
