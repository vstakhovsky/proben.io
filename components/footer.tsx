import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="font-serif text-lg font-semibold text-gray-900">
            Proben
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/sample-report"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sample Report
            </Link>
            <Link
              href="/app/readiness-check"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Readiness Check
            </Link>
            <Link
              href="/portfolio/build-process"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Build Process
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © 2025 Proben.io
          </div>
        </div>
      </div>
    </footer>
  );
}
