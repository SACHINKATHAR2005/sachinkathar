"use client"

import { useEffect, useMemo, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api-client'
import { toast } from 'sonner'
import { Trash2, ChevronLeft, ChevronRight, Mail } from 'lucide-react'

interface MessageDoc {
  _id: string
  name: string
  email: string
  subject?: string
  message: string
  createdAt: string
}

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<MessageDoc[]>([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await api.contact.getAll()
      setMessages(res.data?.data || [])
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const current = useMemo(() => messages[index], [messages, index])

  const onPrev = () => setIndex((i) => Math.max(0, i - 1))
  const onNext = () => setIndex((i) => Math.min(messages.length - 1, i + 1))

  const onDelete = async () => {
    if (!current) return
    setDeleting(true)
    try {
      await api.contact.delete(current._id)
      toast.success('Message deleted')
      setMessages((prev) => {
        const copy = prev.filter((m) => m._id !== current._id)
        // Adjust index to stay in bounds
        if (index >= copy.length) setIndex(Math.max(0, copy.length - 1))
        return copy
      })
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-lg rounded-lg bg-white dark:bg-neutral-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-playfair text-2xl">Contact Messages</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Review submissions one by one. Total: {messages.length}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={onPrev} disabled={loading || index === 0}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {messages.length ? index + 1 : 0} / {messages.length}
                  </span>
                  <Button variant="outline" onClick={onNext} disabled={loading || index >= messages.length - 1}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-40 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              ) : !current ? (
                <p className="text-gray-600 dark:text-gray-300">No messages found.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{current.subject || 'No subject'}</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(current.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <Button variant="destructive" onClick={onDelete} disabled={deleting}>
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <Mail className="w-4 h-4" />
                    <a className="underline" href={`mailto:${current.email}`}>{current.name} &lt;{current.email}&gt;</a>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed">{current.message}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
