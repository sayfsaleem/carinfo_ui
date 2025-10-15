'use client';

import Link from 'next/link';
import { FaCar, FaTwitter, FaFacebook, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa6';
import { FOOTER_LINKS, APP_NAME, APP_DESCRIPTION } from '../../lib/constants';

/**
 * Footer Component
 * Multi-column footer with links and branding
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0069d9] to-[#007bff] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaCar className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#0069d9] to-[#007bff] bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>

            <p className="text-gray-600 leading-relaxed mb-6">
              Providing cutting-edge vehicle intelligence for everyone. Trusted by thousands of users across the UK for fast and accurate data.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-[#0069d9] hover:to-[#007bff] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-[#0069d9] hover:to-[#007bff] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-[#0069d9] hover:to-[#007bff] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-[#0069d9] hover:to-[#007bff] hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Navigate</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.navigate.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with <FaHeart className="text-red-500" /> for UK vehicle owners
          </p>
        </div>
      </div>
    </footer>
  );
}
