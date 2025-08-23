"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/lib/api-client'
import { Blog } from '@/lib/types'
import { toast } from 'sonner'

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    category: 'general',
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await api.blog.getAll()
      setBlogs(res.data?.data || [])
    } catch {
      toast.error('Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', link: '', category: 'general' })
    setImageFile(null)
    setEditingBlog(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      if (formData.title) fd.append('title', formData.title)
      if (formData.description) fd.append('description', formData.description)
      if (formData.link) fd.append('link', formData.link)
      if (formData.category) fd.append('category', formData.category)
      if (imageFile) fd.append('file', imageFile)

      if (editingBlog) {
        await api.blog.update(editingBlog._id, fd)
        toast.success('Blog updated')
      } else {
        await api.blog.create(fd)
        toast.success('Blog created')
      }
      resetForm()
      fetchBlogs()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save blog')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (b: Blog) => {
    setEditingBlog(b)
    setFormData({
      title: b.title,
      description: b.description,
      link: b.link || '',
      category: b.category || 'general',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return
    try {
      await api.blog.delete(id)
      toast.success('Blog deleted')
      fetchBlogs()
    } catch {
      toast.error('Failed to delete blog')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-playfair text-3xl font-bold mb-2">Blogs</h1>
            <p className="text-gray-600">Create and manage your blog posts</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="font-playfair text-2xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input name="category" value={formData.category} onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Read More Link (optional)</label>
                  <Input name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cover Image</label>
                  <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : editingBlog ? 'Update' : 'Create'}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <motion.div key={b._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image src={b.image || `/placeholder.svg?height=200&width=300&query=${b.title}`} alt={b.title} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair">{b.title}</CardTitle>
                  <CardDescription>{b.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{b.description}</p>
                  <div className="flex justify-between">
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(b)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(b._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {b.link && (
                      <a href={b.link} target="_blank" className="text-sm text-gray-600 hover:text-black">Read</a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {blogs.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No blogs yet. Create your first blog!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
