"use client"

import React, { useState } from 'react'

const QUICK = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Prisma']

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [input, setInput] = useState('')

  function addTech(value) {
    const v = value.trim()
    if (!v) return
    if (technologies.includes(v)) return
    onChange([...technologies, v])
    setInput('')
  }

  function removeTech(index) {
    const next = technologies.slice()
    next.splice(index, 1)
    onChange(next)
  }

  function onKey(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTech(input)
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => addTech(q)}
            className="text-sm bg-gray-200 px-3 py-1 rounded"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Type a technology and press Enter"
          className={`w-full border px-3 py-2 rounded ${error ? 'border-red-500' : ''}`}
        />
        <button type="button" onClick={() => addTech(input)} className="bg-blue-600 text-white px-3 py-2 rounded">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((t, i) => (
          <span key={t + i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
            <span>{t}</span>
            <button type="button" onClick={() => removeTech(i)} aria-label={`Remove ${t}`} className="text-sm text-gray-600">×</button>
          </span>
        ))}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  )
}
