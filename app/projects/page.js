"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectForm from './components/ProjectForm'

const PLACEHOLDERS = [
  '/project1.jpg',
  '/project2.jpg',
  '/project3.jpg',
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Failed to load projects')
        const data = await res.json()
        if (mounted) setProjects(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function handleCreate(newProject) {
    // Optimistically add or refetch
    setProjects((p) => [newProject, ...p])
    setShowForm(false)
  }

  // Small image component with a fallback to plain <img> when Next/Image fails
  function ProjectImage({ src, alt }) {
    const [err, setErr] = useState(false)
    if (!src) return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">No image</div>
    )
    if (err) {
      return <img src={src} alt={alt} width={600} height={400} className="object-cover w-full h-full" />
    }
    return (
      <Image
        src={src}
        alt={alt}
        width={600}
        height={400}
        className="object-cover w-full h-full"
        onError={() => setErr(true)}
      />
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Add New Project button top-right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>
          <div className="ml-auto">
            <button
              onClick={() => setShowForm((s) => !s)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Close' : 'Add New Project'}
            </button>
          </div>
        </div>

        {/* Slide-down form */}
        <div className={`overflow-hidden transition-all duration-300 ${showForm ? 'max-h-[800px] mb-6' : 'max-h-0'}`}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ProjectForm isOpen={showForm} onCancel={() => setShowForm(false)} onSubmit={handleCreate} />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <p className="text-center py-12">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-12">{error}</p>
        ) : projects.length > 0 ? (
          (() => {
            // Deterministically ensure each placeholder image is shown at most once.
            // This handles two cases:
            // 1) DB rows that already point to placeholder URLs (dedupe them so each placeholder shows once)
            // 2) Projects without an image - assign unused placeholders to the first ones only
            const DEFAULT_TECHS = ['HTML', 'CSS', 'JavaScript']

            // Work on a shallow copy to avoid mutating original state directly
            let byIdSorted = projects.slice().sort((a, b) => (a.id || 0) - (b.id || 0))

            // Force the three seed projects to use the provided placeholders
            // (ensures the three visible projects show the requested images)
            const seedMap = new Map([
              [1, PLACEHOLDERS[0]],
              [2, PLACEHOLDERS[1]],
              [3, PLACEHOLDERS[2]],
            ])
            byIdSorted = byIdSorted.map((p) => ({ ...p, imageUrl: seedMap.get(p.id) || p.imageUrl }))

            const usedPlaceholders = new Set()

            // First pass: respect any explicit imageUrls but dedupe if multiple projects reference the same placeholder
            const interim = byIdSorted.map((p) => {
              const project = { ...p }
              if (project.imageUrl && PLACEHOLDERS.includes(project.imageUrl)) {
                if (!usedPlaceholders.has(project.imageUrl)) {
                  usedPlaceholders.add(project.imageUrl)
                  // keep imageUrl as-is
                } else {
                  // duplicate placeholder in DB: treat as no image so we don't show the same placeholder twice
                  project.imageUrl = null
                }
              }
              return project
            })

            // Compute remaining unused placeholders
            const unusedPlaceholders = PLACEHOLDERS.filter((p) => !usedPlaceholders.has(p))

            // Second pass: assign unused placeholders to projects without an image, in stable order
            let nextIdx = 0
            const displayProjects = interim.map((project) => {
              const pr = { ...project }
              if (!pr.imageUrl && nextIdx < unusedPlaceholders.length) {
                pr._placeholder = unusedPlaceholders[nextIdx++]
              } else {
                pr._placeholder = null
              }

              if (!pr.technologies || pr.technologies.length === 0) {
                pr.technologies = DEFAULT_TECHS
                pr._noTechs = true
              } else {
                pr._noTechs = false
              }

              return pr
            })

            // Deduplicate projects for display (by `id` when present, otherwise by title+description)
            const seen = new Set()
            const uniqueDisplay = []
            for (const p of displayProjects) {
              const key = p.id ? `id:${p.id}` : `txt:${(p.title||'').trim()}|${(p.description||'').trim()}`
              if (!seen.has(key)) {
                seen.add(key)
                uniqueDisplay.push(p)
              }
            }

            return (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {uniqueDisplay.map((project, idx) => (
                  <div key={project.id || idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-48 overflow-hidden">
                        {project.imageUrl || project._placeholder ? (
                          <ProjectImage src={project.imageUrl || project._placeholder} alt={`Screenshot of ${project.title || 'project'}`} />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">No image</div>
                        )}
                      </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {project.technologies?.slice(0, 3).map((tech, index) => (
                          <span key={index} className="text-sm bg-gray-200 px-3 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="text-sm text-gray-500 px-3 py-1">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/projects/${project.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })()
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">No projects yet</h2>
              <p className="text-gray-600 mb-6">
                Get started by creating your first project!
              </p>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-900 mb-2">💡 Project Ideas:</h3>
          <ul className="text-yellow-800 space-y-1">
            <li>• Past school projects</li>
            <li>• Personal coding projects</li>
            <li>• Design work or creative projects</li>
            <li>• Future projects you want to build (coming soon!)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// Learning Objectives for Students:
// 1. Understand server vs client components
// 2. Learn React state management patterns
// 3. Implement API integration
// 4. Handle async operations and error states
// 5. Build interactive user interfaces
// 6. Practice component composition
