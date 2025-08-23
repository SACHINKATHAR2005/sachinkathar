"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderOpen, FileText, Award, TrendingUp } from 'lucide-react'
import { api } from '@/lib/api-client'
import { toast } from 'sonner'

interface Stats {
  projects: number
  blogs: number
  certificates: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, blogs: 0, certificates: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projectsRes, blogsRes, certificatesRes] = await Promise.all([
        api.project.getAll(),
        api.blog.getAll(),
        api.certificate.getAll()
      ])

      setStats({
        projects: projectsRes.data?.data.length || 0,
        blogs: blogsRes.data?.data.length || 0,
        certificates: certificatesRes.data?.certificates.length || 0
      })
    } catch (error) {
      toast.error('Failed to fetch dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      description: 'Published projects'
    },
    {
      title: 'Blog Posts',
      value: stats.blogs,
      icon: FileText,
      description: 'Published articles'
    },
    {
      title: 'Certificates',
      value: stats.certificates,
      icon: Award,
      description: 'Professional certifications'
    },
    {
      title: 'Total Items',
      value: stats.projects + stats.blogs + stats.certificates,
      icon: TrendingUp,
      description: 'All content items'
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-playfair text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to your portfolio admin panel</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {loading ? '...' : card.value}
                    </div>
                    <p className="text-xs text-gray-600">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your portfolio content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="w-8 h-8 text-gray-600" />
                    <div>
                      <h3 className="font-semibold">Add Project</h3>
                      <p className="text-sm text-gray-600">Create a new project</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-gray-600" />
                    <div>
                      <h3 className="font-semibold">Write Blog</h3>
                      <p className="text-sm text-gray-600">Create a new blog post</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-gray-600" />
                    <div>
                      <h3 className="font-semibold">Add Certificate</h3>
                      <p className="text-sm text-gray-600">Upload a new certificate</p>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
