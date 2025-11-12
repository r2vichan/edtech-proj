'use client';

import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';

/**
 * Footer Component
 * Features:
 * - Company information
 * - Navigation links organized by category
 * - Contact information
 * - Social media links
 * - Copyright notice
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">EduLearn AI</span>
            </div>
            <p className="text-sm mb-4">
              Empowering learners worldwide with cutting-edge AI and machine
              learning education.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@edulearn.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#ml" className="hover:text-white transition">
                  Machine Learning
                </a>
              </li>
              <li>
                <a href="#dl" className="hover:text-white transition">
                  Deep Learning
                </a>
              </li>
              <li>
                <a href="#nlp" className="hover:text-white transition">
                  Natural Language Processing
                </a>
              </li>
              <li>
                <a href="#cv" className="hover:text-white transition">
                  Computer Vision
                </a>
              </li>
              <li>
                <a href="#ai" className="hover:text-white transition">
                  AI for Everyone
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition">
                  Press
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#partners" className="hover:text-white transition">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#help" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© 2024 EduLearn AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
