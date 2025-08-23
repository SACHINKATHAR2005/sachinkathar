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
import { Certificate } from '@/lib/types'
import { toast } from 'sonner'

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    link: '',
    category: '',
    issuer: '',
  })

  useEffect(() => {
    fetchCerts()
  }, [])

  const fetchCerts = async () => {
    try {
      const res = await api.certificate.getAll()
      setCerts(res.data?.certificates || [])
    } catch {
      toast.error('Failed to fetch certificates')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({ title: '', date: '', description: '', link: '', category: '', issuer: '' })
    setImageFile(null)
    setEditing(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('title', formData.title)
      if (formData.date) fd.append('date', formData.date)
      if (formData.description) fd.append('description', formData.description)
      if (formData.link) fd.append('link', formData.link)
      if (formData.category) fd.append('category', formData.category)
      if (formData.issuer) fd.append('issuer', formData.issuer)
      if (imageFile) fd.append('file', imageFile)

      if (editing) {
        await api.certificate.update(editing._id, fd)
        toast.success('Certificate updated')
      } else {
        await api.certificate.create(fd)
        toast.success('Certificate created')
      }
      resetForm()
      fetchCerts()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save certificate')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (c: Certificate) => {
    setEditing(c)
    setFormData({
      title: c.title,
      date: c.date || '',
      description: c.description || '',
      link: c.link || '',
      category: c.category || '',
      issuer: c.issuer || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certificate?')) return
    try {
      await api.certificate.delete(id)
      toast.success('Certificate deleted')
      fetchCerts()
    } catch {
      toast.error('Failed to delete certificate')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-playfair text-3xl font-bold mb-2">Certificates</h1>
            <p className="text-gray-600">Manage your certificates</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Certificate
          </Button>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-lg border">
            <h2 className="font-playfair text-2xl font-bold mb-4">{editing ? 'Edit Certificate' : 'Add New Certificate'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Issuer</label>
                  <Input name="issuer" value={formData.issuer} onChange={handleChange} placeholder="e.g. Coursera" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Issue Date</label>
                  <Input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. course, award" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Credential URL</label>
                  <Input name="link" value={formData.link} onChange={handleChange} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : editing ? 'Update' : 'Create'}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => (
            <motion.div key={c._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image src={c.image || `/placeholder.svg?height=200&width=300&query=${c.title}`} alt={c.title} width={300} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair">{c.title}</CardTitle>
                  <CardDescription>{c.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{c.description}</p>
                  <div className="flex justify-between">
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(c)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(c._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {c.link && (
                      <a href={c.link} target="_blank" className="text-sm text-gray-600 hover:text-black">Verify</a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {certs.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No certificates yet. Create your first certificate!</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
