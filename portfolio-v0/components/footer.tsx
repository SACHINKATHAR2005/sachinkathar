"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api-client'
import type { Hero } from '@/lib/types'
import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const [hero, setHero] = useState<Hero | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.hero.getAll()
        const h = res.data?.data?.[0] || res.data?.data || null
        setHero(h)
      } catch {
        // noop
      }
    })()
  }, [])

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden" />
            <span className="text-sm font-semibold tracking-wide">{hero?.name || 'Portfolio'}</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/projects" className="hover:underline">Projects</Link>
            <Link href="/blogs" className="hover:underline">Blogs</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
            {hero?.socialLinks?.github && (
              <a href={hero.socialLinks.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            )}
            {hero?.socialLinks?.linkedin && (
              <a href={hero.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {hero?.socialLinks?.x && (
              <a href={hero.socialLinks.x} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800" aria-label="Twitter/X">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {hero?.socialLinks?.instagram && (
              <a href={hero.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {hero?.socialLinks?.email && (
              <a href={`mailto:${hero.socialLinks.email}`} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
