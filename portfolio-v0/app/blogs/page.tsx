"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api-client'
import { Blog } from '@/lib/types'
import { toast } from 'sonner'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await api.blog.getAll()
      const allBlogs: Blog[] = response.data.data || []
      setBlogs(allBlogs)
    } catch (error) {
      toast.error('Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-8 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thoughts, insights, and experiences from my journey in development and design.
            </p>
          </motion.div>

          <div className="space-y-12">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link href={`/blogs/${blog._id}`} className="block">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg rounded-lg bg-white dark:bg-neutral-900">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <Image
                        src={blog.image || `/placeholder.svg?height=300&width=400&query=${blog.title}`}
                        alt={blog.title}
                        width={400}
                        height={300}
                        className="w-full h-56 sm:h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                          {/* Optional meta could go here if available */}
                        </div>
                        <CardTitle className="font-playfair text-2xl mb-3">
                          {blog.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed dark:text-gray-300">
                          {blog.description?.substring(0, 200)}{blog.description && blog.description.length > 200 ? '...' : ''}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" className="px-0">Read More →</Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
                </Link>
              </motion.article>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
