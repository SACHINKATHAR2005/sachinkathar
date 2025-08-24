"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { api } from '@/lib/api-client'
import { EducationEntry, Hero } from '@/lib/types'
import { toast } from 'sonner'

export default function AdminEducationPage() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [entries, setEntries] = useState<EducationEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchHero()
  }, [])

  const fetchHero = async () => {
    setLoading(true)
    try {
      const res = await api.hero.getAll()
      const list: Hero[] = res.data?.Heros || res.data?.data || []
      const latest = list[0] || null
      setHero(latest)
      setEntries(latest?.educations || [])
    } catch (e) {
      toast.error('Failed to load hero/education')
    } finally {
      setLoading(false)
    }
  }

  const addEntry = () => {
    setEntries(prev => [
      ...prev,
      { institute: '', mode: 'Offline', degree: '', stream: '', startYear: '', endYear: '', tags: [], logo: '' },
    ])
  }

  const removeEntry = (index: number) => {
    setEntries(prev => prev.filter((_, i) => i !== index))
  }

  const updateEntry = (index: number, field: keyof EducationEntry, value: any) => {
    setEntries(prev => prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)))
  }

  const updateTags = (index: number, value: string) => {
    const tags = value.split(',').map(t => t.trim()).filter(Boolean)
    updateEntry(index, 'tags', tags)
  }

  const save = async () => {
    if (!hero?._id) {
      toast.error('No hero record found. Please create Bio first.')
      return
    }
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('educations', JSON.stringify(entries))
      await api.hero.upload(hero._id, fd)
      toast.success('Education saved')
      fetchHero()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save education')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-playfair text-3xl font-bold mb-2">Education</h1>
          <p className="text-gray-600">Manage structured education entries</p>
        </motion.div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-playfair">Entries</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={addEntry}>
                <Plus className="w-4 h-4 mr-2" /> Add Entry
              </Button>
              <Button onClick={save} disabled={saving || loading}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-10 text-center text-gray-600">Loading...</div>
            ) : entries.length === 0 ? (
              <div className="py-10 text-center text-gray-600">No entries. Click Add Entry.</div>
            ) : (
              <div className="space-y-6">
                {entries.map((e, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Entry {idx + 1}</h3>
                      <Button variant="destructive" size="icon" onClick={() => removeEntry(idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Institute</label>
                        <Input value={e.institute || ''} onChange={(ev) => updateEntry(idx, 'institute', ev.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Logo URL</label>
                        <Input value={e.logo || ''} onChange={(ev) => updateEntry(idx, 'logo', ev.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Institute URL</label>
                        <Input placeholder="https://..." value={e.url || ''} onChange={(ev) => updateEntry(idx, 'url', ev.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Mode</label>
                        <Select value={e.mode || 'Offline'} onValueChange={(v) => updateEntry(idx, 'mode', v as any)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Online">Online</SelectItem>
                            <SelectItem value="Offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Degree</label>
                        <Input value={e.degree || ''} onChange={(ev) => updateEntry(idx, 'degree', ev.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Stream</label>
                        <Input value={e.stream || ''} onChange={(ev) => updateEntry(idx, 'stream', ev.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Year</label>
                        <Input value={e.startYear || ''} onChange={(ev) => updateEntry(idx, 'startYear', ev.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">End Year</label>
                        <Input value={e.endYear || ''} onChange={(ev) => updateEntry(idx, 'endYear', ev.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                        <Input value={(e.tags || []).join(', ')} onChange={(ev) => updateTags(idx, ev.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Notes</label>
                      <Textarea placeholder="Optional notes (kept locally in UI only)" disabled />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
