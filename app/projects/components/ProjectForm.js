'use client'

import { useState } from 'react'
import TechnologyInput from './TechnologyInput'

const URL_REGEX = /^https?:\/\/.+\..+/

"use client";
import { useState } from "react";
import TechnologyInput from "./TechnologyInput";

const urlRegex = /^https?:\/\/.+\..+/;

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    technologies: []
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required'
    }

    if (formData.imageUrl && !URL_REGEX.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid image URL'
    }

    if (formData.projectUrl && !URL_REGEX.test(formData.projectUrl)) {
      newErrors.projectUrl = 'Please enter a valid project URL'
    }

    if (formData.githubUrl && !URL_REGEX.test(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const newProject = await response.json()
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
        githubUrl: '',
        technologies: []
      })
      setErrors({})

      // Call parent callback
      onSubmit(newProject)
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create project' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Submit error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., My Amazing Portfolio"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what your project does..."
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used *
            </label>
            <TechnologyInput
              technologies={formData.technologies}
              onChange={(technologies) =>
                setFormData(prev => ({ ...prev, technologies }))
              }
              error={errors.technologies}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.imageUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.imageUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>

          {/* Project URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live Demo URL
            </label>
            <input
              type="url"
              name="projectUrl"
              value={formData.projectUrl}
              onChange={handleChange}
              placeholder="https://myproject.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.projectUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.projectUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.projectUrl}</p>
            )}
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.githubUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.githubUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.githubUrl}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}