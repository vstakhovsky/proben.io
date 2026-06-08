'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-xl font-semibold text-gray-900">
              Proben
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/sample-report"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Sample Report
            </Link>
            <Link
              href="/app/readiness-check"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              data-testid="nav-run-readiness-check"
            >
              Readiness Check
            </Link>
            <Link
              href="/portfolio/build-process"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Build Process
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 py-4">
        <div className="flex flex-col space-y-3 px-4">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Home
          </Link>
          <Link
            href="/sample-report"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Sample Report
          </Link>
          <Link
            href="/app/readiness-check"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            data-testid="nav-run-readiness-check"
          >
            Readiness Check
          </Link>
          <Link
            href="/portfolio/build-process"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            Build Process
          </Link>
        </div>
      </div>
    </nav>
  );
}
