"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Plus, Save, Trash2, Edit } from 'lucide-react'
import { api, API_BASE_URL } from '@/lib/api-client'
import type { Skill } from '@/lib/types'
import { toast } from 'sonner'

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [form, setForm] = useState({ name: '', category: '', icon: '' as string })
  const [iconFile, setIconFile] = useState<File | null>(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setLoading(true)
    try {
      const res = await api.skill.getAll()
      const list: Skill[] = res.data?.data || []
      setSkills(list)
    } catch {
      toast.error('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEditing(null)
    setForm({ name: '', category: '', icon: '' })
    setIconFile(null)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('category', form.category)
      if (iconFile) fd.append('file', iconFile)
      else if (form.icon) fd.append('icon', form.icon)

      if (editing) {
        await api.skill.update(editing._id, fd)
        toast.success('Skill updated')
      } else {
        await api.skill.create(fd)
        toast.success('Skill created')
      }
      resetForm()
      fetchSkills()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save skill')
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Delete this skill?')) return
    try {
      await api.skill.delete(id)
      toast.success('Deleted')
      fetchSkills()
    } catch {
      toast.error('Failed to delete skill')
    }
  }

  const beginEdit = (s: Skill) => {
    setEditing(s)
    setForm({ name: s.name, category: s.category, icon: s.icon || '' })
    setIconFile(null)
  }

  const toIconUrl = (raw?: string) => {
    if (!raw) return ''
    if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
    return `${API_BASE_URL}/${raw.replace(/^\//, '')}`
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-playfair text-3xl font-bold mb-2">Skills</h1>
          <p className="text-gray-600">Manage your skills library</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">{editing ? 'Edit Skill' : 'Add Skill'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input value={form.name} onChange={(e) => setForm(v => ({ ...v, name: e.target.value }))} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input value={form.category} onChange={(e) => setForm(v => ({ ...v, category: e.target.value }))} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Icon URL (optional)</label>
                    <Input value={form.icon} onChange={(e) => setForm(v => ({ ...v, icon: e.target.value }))} placeholder="https://..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Or Upload Icon</label>
                    <Input type="file" accept="image/*" onChange={(e) => setIconFile(e.target.files?.[0] || null)} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : (editing ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />)}
                    {editing ? 'Save Changes' : 'Add Skill'}
                  </Button>
                  {editing && (
                    <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">All Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-10 text-center text-gray-600">Loading...</div>
              ) : skills.length === 0 ? (
                <div className="py-10 text-center text-gray-600">No skills yet</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((s) => (
                    <div key={s._id} className="flex items-center justify-between gap-3 border rounded-lg p-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {toIconUrl(s.icon) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={toIconUrl(s.icon)} alt={s.name} className="w-8 h-8 object-contain" />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gray-200" />)
                        }
                        <div className="truncate">
                          <div className="font-medium truncate">{s.name}</div>
                          <div className="text-xs text-gray-600 truncate">{s.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => beginEdit(s)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => onDelete(s._id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
