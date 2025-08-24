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
import { EducationEntry, Hero } from '@/lib/types'
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
  const [educations, setEducations] = useState<EducationEntry[]>([])
  const [savingEdu, setSavingEdu] = useState(false)
  const [eduUploading, setEduUploading] = useState<Record<number, boolean>>({})

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

  const handleEduLogoFile = async (idx: number, file?: File | null) => {
    if (!file) return
    try {
      setEduUploading(prev => ({ ...prev, [idx]: true }))
      const fd = new FormData()
      fd.append('file', file)
      const res = await api.upload.image(fd)
      const url: string = res.data?.url
      if (url) {
        updateEdu(idx, 'logo', url)
        toast.success('Logo uploaded')
      } else {
        toast.error('Upload failed: no URL returned')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to upload logo')
    } finally {
      setEduUploading(prev => ({ ...prev, [idx]: false }))
    }
  }

  // Education editor helpers
  const addEdu = () => {
    setEducations(prev => ([...prev, { institute: '', mode: 'Offline', startYear: '', endYear: '', degree: '', stream: '', logo: '', url: '', tags: [] }]))
  }
  const removeEdu = (idx: number) => setEducations(prev => prev.filter((_, i) => i !== idx))
  const updateEdu = (idx: number, field: keyof EducationEntry, value: any) =>
    setEducations(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e))
  const updateEduTags = (idx: number, value: string) =>
    updateEdu(idx, 'tags', value.split(',').map(t => t.trim()).filter(Boolean))

  const saveEducations = async () => {
    if (!editing?._id) {
      toast.error('Create the Bio first, then add education entries.')
      return
    }
    setSavingEdu(true)
    try {
      const fd = new FormData()
      fd.append('educations', JSON.stringify(educations))
      await api.hero.upload(editing._id, fd)
      toast.success('Education saved')
      fetchBio()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save education')
    } finally {
      setSavingEdu(false)
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
    setEducations(h.educations || [])
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

            {/* Education section inside Bio */}
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="font-playfair">Education</CardTitle>
                  <CardDescription>Manage structured college details</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addEdu}>Add Entry</Button>
                  <Button onClick={saveEducations} disabled={savingEdu}>{savingEdu ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Saving</> : 'Save Education'}</Button>
                </div>
              </CardHeader>
              <CardContent>
                {educations.length === 0 ? (
                  <div className="py-8 text-center text-gray-600">No education entries yet.</div>
                ) : (
                  <div className="space-y-6">
                    {educations.map((e, idx) => (
                      <div key={idx} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Entry {idx + 1}</h3>
                          <Button variant="destructive" size="sm" onClick={() => removeEdu(idx)}>Remove</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Institute</label>
                            <Input value={e.institute || ''} onChange={(ev) => updateEdu(idx, 'institute', ev.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Logo</label>
                            <div className="space-y-2">
                              <Input value={e.logo || ''} onChange={(ev) => updateEdu(idx, 'logo', ev.target.value)} placeholder="https://..." />
                              <div className="flex items-center gap-2">
                                <Input type="file" accept="image/*" onChange={(ev) => handleEduLogoFile(idx, ev.target.files?.[0] || null)} />
                                {eduUploading[idx] && <Loader2 className="w-4 h-4 animate-spin" />}
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Institute URL</label>
                            <Input placeholder="https://..." value={e.url || ''} onChange={(ev) => updateEdu(idx, 'url', ev.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Mode</label>
                            <Input value={e.mode || ''} onChange={(ev) => updateEdu(idx, 'mode', ev.target.value)} placeholder="Online/Offline" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Degree</label>
                            <Input value={e.degree || ''} onChange={(ev) => updateEdu(idx, 'degree', ev.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Stream</label>
                            <Input value={e.stream || ''} onChange={(ev) => updateEdu(idx, 'stream', ev.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Start Year</label>
                            <Input value={e.startYear || ''} onChange={(ev) => updateEdu(idx, 'startYear', ev.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">End Year</label>
                            <Input value={e.endYear || ''} onChange={(ev) => updateEdu(idx, 'endYear', ev.target.value)} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                            <Input value={(e.tags || []).join(', ')} onChange={(ev) => updateEduTags(idx, ev.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

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
