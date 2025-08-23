"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { api } from '@/lib/api-client'
import { Blog } from '@/lib/types'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      try {
        const res = await api.blog.getById(id)
        const data = res.data?.data || res.data
        setBlog(data)
      } catch (e) {
        toast.error('Failed to load blog')
        router.push('/blogs')
      } finally {
        setLoading(false)
      }
    })()
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-10 w-2/3 rounded mb-4" />
              <div className="bg-gray-200 h-64 rounded mb-6" />
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded" />
                <div className="bg-gray-200 h-4 rounded w-5/6" />
                <div className="bg-gray-200 h-4 rounded w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!blog) return null

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-sm mb-6">{new Date(blog.createdAt).toLocaleString()}</p>
            {blog.image && (
              <div className="mb-6">
                <Image src={blog.image} alt={blog.title} width={1200} height={630} className="w-full h-auto rounded" />
              </div>
            )}
            <div className="prose max-w-none">
              <p className="text-base leading-7 whitespace-pre-line">{blog.description}</p>
            </div>
            {blog.link && (
              <div className="mt-6">
                <Button asChild>
                  <a href={blog.link} target="_blank" rel="noopener noreferrer">Read full article</a>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
