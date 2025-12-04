'use client'

import { useState } from 'react'

const QUICK_ADD_TECHNOLOGIES = [
  'React',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'HTML',
  'CSS',
  'Git'
]

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [input, setInput] = useState('')

  const handleAdd = (tech) => {
    if (tech && !technologies.includes(tech)) {
      onChange([...technologies, tech])
      setInput('')
    }
  }

  const handleRemove = (tech) => {
    onChange(technologies.filter(t => t !== tech))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd(input.trim())
    }
  }

  return (
    <div className="space-y-3">
      {/* Quick add buttons */}
      <div className="flex flex-wrap gap-2">
        {QUICK_ADD_TECHNOLOGIES.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => handleAdd(tech)}
            disabled={technologies.includes(tech)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              technologies.includes(tech)
                ? 'bg-blue-200 text-blue-800 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            + {tech}
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Or type a custom technology..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => handleAdd(input.trim())}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Selected technologies */}
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemove(tech)}
                className="hover:text-blue-700 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  )
}
