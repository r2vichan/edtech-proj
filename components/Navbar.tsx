'use client';

import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Navigation Bar Component
 * Features:
 * - Responsive design (mobile menu)
 * - Logo and brand name
 * - Navigation links
 * - Call-to-action buttons
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">EduLearn AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="hover:text-blue-200 transition">
              Courses
            </a>
            <a href="#about" className="hover:text-blue-200 transition">
              About
            </a>
            <a href="#pricing" className="hover:text-blue-200 transition">
              Pricing
            </a>
            <a href="#contact" className="hover:text-blue-200 transition">
              Contact
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm hover:text-blue-200 transition">
              Sign In
            </button>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <a href="#courses" className="hover:text-blue-200 transition">
                Courses
              </a>
              <a href="#about" className="hover:text-blue-200 transition">
                About
              </a>
              <a href="#pricing" className="hover:text-blue-200 transition">
                Pricing
              </a>
              <a href="#contact" className="hover:text-blue-200 transition">
                Contact
              </a>
              <div className="pt-2 flex flex-col space-y-2">
                <button className="px-4 py-2 text-sm hover:text-blue-200 transition">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
