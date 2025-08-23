"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { api } from '@/lib/api-client'
import { Hero } from '@/lib/types'
import { toast } from 'sonner'

export default function AdminBioPage() {
  const [bios, setBios] = useState<Hero[]>([])
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editing, setEditing] = useState<Hero | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    education: '',
    titles: '' as string,
    location: '',
    github: '',
    linkedin: '',
    email: '',
  })

  useEffect(() => {
    fetchBio()
  }, [])

  const fetchBio = async () => {
    try {
      const res = await api.hero.getAll()
      const list: Hero[] = res.data?.Heros || res.data?.data || []
      setBios(list)
      if (list.length > 0) fillForm(list[0])
    } catch {
      toast.error('Failed to fetch bio')
    } finally {
      setLoading(false)
    }
  }

  const fillForm = (h: Hero) => {
    setEditing(h)
    setFormData({
      name: h.name || '',
      about: h.about || '',
      education: h.education || '',
      titles: (h.titles || []).join(', '),
      location: h.location || '',
      github: h.socialLinks?.github || '',
      linkedin: h.socialLinks?.linkedin || '',
      email: h.socialLinks?.email || '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('about', formData.about)
      if (formData.education) fd.append('education', formData.education)
      if (formData.location) fd.append('location', formData.location)
      if (formData.titles) {
        formData.titles.split(',').map(t => t.trim()).filter(Boolean).forEach(t => fd.append('titles', t))
      }
      if (formData.github) fd.append('github', formData.github)
      if (formData.linkedin) fd.append('linkedin', formData.linkedin)
      if (formData.email) fd.append('email', formData.email)
      if (imageFile) fd.append('file', imageFile)

      if (editing) {
        await api.hero.upload(editing._id, fd)
        toast.success('Bio updated')
      } else {
        await api.hero.create(fd)
        toast.success('Bio created')
      }
      setImageFile(null)
      fetchBio()
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save bio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold mb-1">Bio</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your profile information</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
                <div className="h-24 bg-gray-200 rounded" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-1/2" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="animate-pulse space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                  <div className="h-9 w-20 bg-gray-200 rounded" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-lg border">
              <h2 className="font-playfair text-xl sm:text-2xl font-bold mb-4">{editing ? 'Edit Bio' : 'Create Bio'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Education</label>
                    <Input name="education" value={formData.education} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">About</label>
                  <Textarea name="about" value={formData.about} onChange={handleChange} rows={4} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Titles (comma separated)</label>
                    <Input name="titles" value={formData.titles} onChange={handleChange} placeholder="Developer, Designer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input name="location" value={formData.location} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub</label>
                    <Input name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    <Input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Resume (PDF)</label>
                  <Input type="file" accept="application/pdf" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" /> {editing ? 'Update' : 'Create'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            {bios.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-playfair">Current Bio</CardTitle>
                  <CardDescription>Click to load into editor</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {bios[0].avatar && (
                      <Image src={bios[0].avatar!} alt={bios[0].name} width={80} height={80} className="rounded-full" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{bios[0].name}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{bios[0].about}</p>
                    </div>
                    <Button variant="outline" onClick={() => fillForm(bios[0])}>Edit</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}
