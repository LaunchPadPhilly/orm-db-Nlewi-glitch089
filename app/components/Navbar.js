import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300">
            Portfolio
          </Link>

          {/* Navigation links */}
          <div className="flex gap-8 items-center">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              About
            </Link>
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Projects
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}