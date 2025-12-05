import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-purple-500 text-white min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center py-20 px-4 w-full">
        <h1 className="text-6xl font-bold mb-6">Hi, I&apos;m Nakerra Lewis!</h1>

        <p className="text-lg max-w-2xl mx-auto mb-4">
          I&apos;m a creative problem solver focused on game design, user experience, and interactive media.
          I build playful, future-facing interfaces that help people connect and try new things.
        </p>

        {/* Removed center page links per user request */}
      </div>
    </section>
  )
}
