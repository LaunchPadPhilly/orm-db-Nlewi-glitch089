"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectForm from './components/ProjectForm'

const PLACEHOLDERS = [
  'https://placehold.co/600x400/blue/white?text=Lemon-Aid',
  'https://placehold.co/600x400/green/white?text=PlayerLobby',
  'https://placehold.co/600x400/purple/white?text=PlanPal',
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.map((project, idx) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-40 overflow-hidden">
                  <Image
                    src={project.imageUrl || PLACEHOLDERS[idx % PLACEHOLDERS.length]}
                    alt={project.title + ' screenshot'}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
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
