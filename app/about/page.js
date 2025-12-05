import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">About Me</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <Image
                    src="/profile.jpg"
                    alt="Profile photo of Nakerra Lewis"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                  />
                </div>

          <div className="text-gray-700">
            <p className="text-lg">
              I&apos;m a creative problem solver exploring game design, user experience, and interactive media. I&apos;m learning how to build engaging apps that help people connect and step outside their comfort zones.
            </p>
            <p className="text-lg mt-4">
              My goal is to create fun and meaningful digital experiences that inspire confidence and community.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">HTML &amp; CSS</span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">JavaScript</span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">Tailwind CSS</span>
            <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">React</span>
            <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full">Next.js</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">My Goals</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Build user-friendly apps that encourage people to make new friends</li>
            <li>Improve my skills in front-end development</li>
            <li>Learn more about UX design and game mechanics</li>
            <li>Launch more interactive projects like Lemon-Aid and PlanPal</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
