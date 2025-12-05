"use client"

import React, { useState } from 'react'
import TechnologyInput from './TechnologyInput.jsx'

const urlRegex = /^https?:\/\/.+\..+/

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [projectUrl, setProjectUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [technologies, setTechnologies] = useState([])
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  function validate() {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!description.trim()) e.description = 'Description is required'
    if (!technologies || technologies.length === 0) e.technologies = 'Add at least one technology'
    if (imageUrl && !urlRegex.test(imageUrl)) e.imageUrl = 'Image URL must be a valid URL'
    if (projectUrl && !urlRegex.test(projectUrl)) e.projectUrl = 'Project URL must be a valid URL'
    if (githubUrl && !urlRegex.test(githubUrl)) e.githubUrl = 'GitHub URL must be a valid URL'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const eObj = validate()
    setErrors(eObj)
    if (Object.keys(eObj).length > 0) return

    setLoading(true)
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, imageUrl, projectUrl, githubUrl, technologies }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Failed to create project')
      }

      const created = await res.json()
      // reset
      setTitle('')
      setDescription('')
      setImageUrl('')
      setProjectUrl('')
      setGithubUrl('')
      setTechnologies([])
      setErrors({})
      if (onSubmit) onSubmit(created)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && <p className="text-red-600">{errors.submit}</p>}

      <div>
        <label className="block font-semibold">Title *</label>
        <input aria-label="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
        {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-semibold">Description *</label>
        <textarea aria-label="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={4} />
        {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
      </div>

      <div>
        <label className="block font-semibold">Technologies *</label>
        <TechnologyInput technologies={technologies} onChange={setTechnologies} error={errors.technologies} />
        {errors.technologies && <p className="text-red-600 text-sm">{errors.technologies}</p>}
      </div>

      <div>
        <label className="block font-semibold">Image URL</label>
        <input aria-label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
        {errors.imageUrl && <p className="text-red-600 text-sm">{errors.imageUrl}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Live Project URL</label>
          <input aria-label="Live Project URL" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
          {errors.projectUrl && <p className="text-red-600 text-sm">{errors.projectUrl}</p>}
        </div>
        <div>
          <label className="block font-semibold">GitHub URL</label>
          <input aria-label="GitHub URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
          {errors.githubUrl && <p className="text-red-600 text-sm">{errors.githubUrl}</p>}
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? 'Creating...' : 'Create Project'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  )
}
