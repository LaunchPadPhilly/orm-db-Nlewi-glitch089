'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ProjectForm from './components/ProjectForm'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/projects', {
        cache: 'no-store'
      })
      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleProjectCreated = async (newProject) => {
    // Refresh the projects list
    await fetchProjects()
    setIsFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            ← Back to Home
          </Link>
        </div>

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-blue-600">
              My Projects
            </h1>
            <p className="text-xl text-gray-600">
              A collection of my recent work and projects
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
          >
            + Add New Project
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  {project.imageUrl ? (
                    <Image 
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.technologies?.map((tech) => (
                      <span key={tech} className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects found. Add some projects to get started!</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-900 mb-3 text-lg">💡 Tips for Customizing:</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✏️ Replace with your actual projects or ideas</li>
            <li>✏️ Add real images or screenshots (save to public/ folder)</li>
            <li>✏️ Update descriptions to match your projects</li>
            <li>✏️ Add links to GitHub repos or live demos</li>
            <li>✏️ Mark projects as "Coming Soon" when working on them</li>
          </ul>
        </div>
      </div>

      {/* Project Form Modal */}
      <ProjectForm
        isOpen={isFormOpen}
        onCancel={() => setIsFormOpen(false)}
        onSubmit={handleProjectCreated}
      />
    </div>
  )
}
