import Link from 'next/link'

export default function Contact() {
  const contactChannels = [
    {
      icon: '📧',
      title: 'Email',
      value: 'chris@example.com',
      href: 'mailto:chris@example.com',
      description: 'Feel free to send me an email anytime!'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/chriskeels',
      href: 'https://linkedin.com/in/chriskeels',
      description: 'Connect with me on LinkedIn!'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'github.com/chriskeels',
      href: 'https://github.com/chriskeels',
      description: 'Check out my code and projects!'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      value: '@chriskeels',
      href: 'https://twitter.com/chriskeels',
      description: 'Follow for web dev updates!'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-blue-600">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          I'd love to hear from you! Reach out through any of these channels.
        </p>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {contactChannels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow block"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{channel.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-lg text-gray-900 mb-1">{channel.title}</p>
                  <p className="text-blue-600 hover:text-blue-800 font-medium mb-2">
                    {channel.value}
                  </p>
                  <p className="text-gray-600 text-sm">{channel.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-500 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Let's collaborate!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Whether you have a project idea, want to discuss web development, or just want to say hello, 
            I'd be delighted to hear from you! Don't hesitate to reach out through any of the channels above.
          </p>
          <p className="text-gray-500 text-sm">
            I typically respond within 24-48 hours. Looking forward to connecting with you!
          </p>
        </div>

        {/* Tips Box */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">💡 Customize Your Contact Info:</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✏️ Replace email, LinkedIn, and GitHub with your actual links</li>
            <li>✏️ Add or remove contact channels as needed</li>
            <li>✏️ Create a contact form for direct messages (future enhancement)</li>
            <li>✏️ Add your location or availability if desired</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
