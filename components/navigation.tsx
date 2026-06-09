'use client';

import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pill-shaped Header */}
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white border border-gray-200 rounded-full mt-4">
          {/* Logo with Subtitle */}
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl font-semibold text-gray-900 leading-tight">
              Proben
            </span>
            <span className="text-xs text-gray-500 font-medium tracking-wide">
              MEETING READINESS
            </span>
          </Link>

          <div className="w-px h-8 bg-gray-200"></div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/sample-report"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Sample report
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              How it works
            </Link>
            <Link
              href="/#what-proben-checks"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Checks
            </Link>
            <Link
              href="/#resources"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Resources
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Pricing
            </Link>
          </div>

          <div className="w-px h-8 bg-gray-200"></div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#log-in"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              Log in
            </Link>
            <Link
              href="/app/readiness-check"
              className="inline-flex items-center justify-center px-4 py-2 bg-brand-green hover:bg-brand-greenHover text-white font-medium rounded-md transition-colors text-sm whitespace-nowrap"
              data-testid="nav-run-readiness-check"
            >
              Run readiness check
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 space-y-3">
          <Link
            href="/sample-report"
            className="block text-sm text-gray-600 hover:text-gray-900"
          >
            Sample report
          </Link>
          <Link
            href="/#how-it-works"
            className="block text-sm text-gray-600 hover:text-gray-900"
          >
            How it works
          </Link>
          <Link
            href="/#what-proben-checks"
            className="block text-sm text-gray-600 hover:text-gray-900"
          >
            Checks
          </Link>
          <Link
            href="/#resources"
            className="block text-sm text-gray-600 hover:text-gray-900"
          >
            Resources
          </Link>
          <Link
            href="/#pricing"
            className="block text-sm text-gray-600 hover:text-gray-900"
          >
            Pricing
          </Link>
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="/#log-in"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/app/readiness-check"
              className="inline-flex items-center justify-center px-4 py-2 bg-brand-green hover:bg-brand-greenHover text-white font-medium rounded-md transition-colors text-sm"
              data-testid="mobile-nav-run-readiness-check"
            >
              Run readiness check
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
