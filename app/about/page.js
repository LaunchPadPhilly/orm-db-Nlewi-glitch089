import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-12 text-blue-600">
          About Me
        </h1>

        {/* Profile Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Profile photo */}
          <div className="md:col-span-1 flex justify-center">
            <Image 
              src="https://ui-avatars.com/api/?name=Chris+Keels&size=300&background=3b82f6&color=ffffff&bold=true"
              alt="Chris Keels profile photo"
              width={300}
              height={300}
              className="rounded-full shadow-lg"
            />
          </div>
          
          {/* Bio */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Hi, I'm Chris!</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                I'm a passionate developer learning web technologies. I love building interactive 
                websites and solving problems with code. I'm currently focused on learning Next.js 
                and modern web development practices.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My goal is to create beautiful, functional websites that help people. I'm always 
                eager to learn new technologies and improve my skills.
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">My Skills</h2>
          <div className="flex flex-wrap gap-4">
            {['HTML & CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Git & GitHub'].map((skill) => (
              <span 
                key={skill}
                className="bg-blue-100 text-blue-900 px-6 py-3 rounded-full font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-8 border border-blue-100">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">My Goals</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: '🎯', title: 'Portfolio Projects', desc: 'Build diverse projects showcasing my skills' },
              { icon: '📚', title: 'Master Next.js', desc: 'Learn modern React patterns and frameworks' },
              { icon: '💼', title: 'First Dev Role', desc: 'Land a web development position' },
              { icon: '🚀', title: 'Stay Current', desc: 'Keep up with latest web technologies' }
            ].map((goal) => (
              <div key={goal.title} className="bg-white rounded-lg p-6 shadow-sm">
                <span className="text-3xl mb-3 block">{goal.icon}</span>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{goal.title}</h3>
                <p className="text-gray-600">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
