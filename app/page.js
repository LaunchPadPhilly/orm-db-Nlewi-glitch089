import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-blue-600">
              Hi, I'm Chris K!
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-12 leading-relaxed">
              A passionate developer building beautiful and functional web experiences
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <Link href="/about" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
              About Me
            </Link>
            <Link href="/projects" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
              View Projects
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md">
              Get In Touch
            </Link>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Web Development</h3>
              <p className="text-gray-600 text-sm">Building modern, responsive websites</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Design Focused</h3>
              <p className="text-gray-600 text-sm">Creating beautiful user experiences</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Always Learning</h3>
              <p className="text-gray-600 text-sm">Staying current with latest tech</p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Welcome to my portfolio!
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This is a showcase of my web development journey. Explore my projects, learn more about me, 
              and feel free to reach out if you'd like to collaborate or discuss opportunities.
            </p>
            <p className="text-gray-500 text-sm">
              💡 Tip: Check out my projects to see what I've been working on!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
