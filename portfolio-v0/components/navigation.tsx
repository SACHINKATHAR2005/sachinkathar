"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { api } from '@/lib/api-client'
import { Hero } from '@/lib/types'
import { Moon, Sun, List, Grid } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Blog' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [hero, setHero] = useState<Hero | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [listMode, setListMode] = useState(false)

  useEffect(() => {
    fetchHero()
    // initialize theme & list mode from localStorage
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const dark = storedTheme ? storedTheme === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)

    const storedListMode = typeof window !== 'undefined' ? localStorage.getItem('listMode') : null
    const lm = storedListMode === 'true'
    setListMode(lm)
    document.documentElement.setAttribute('data-list-mode', lm ? 'list' : 'grid')
  }, [])

  const fetchHero = async () => {
    try {
      const response = await api.hero.getAll()
      const heroData = response?.data?.data[0] || response?.data?.data
      setHero(heroData)
    } catch (error) {
      console.error('Failed to fetch hero:', error)
    }
  }

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const toggleListMode = () => {
    const next = !listMode
    setListMode(next)
    document.documentElement.setAttribute('data-list-mode', next ? 'list' : 'grid')
    localStorage.setItem('listMode', String(next))
  }

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-4"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 rounded-full border border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur pl-5 pr-2">
          <Link href="/" className="font-playfair text-2xl font-bold">
            {hero?.name || 'Portfolio'}
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                  pathname === item.href ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-300"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleListMode}
              aria-label="Toggle List Mode"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {listMode ? <Grid className="w-5 h-5" /> : <List className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2" aria-label="Toggle Menu" onClick={() => setMobileOpen(v => !v)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-2">
            <div className="flex flex-col gap-1 border-t border-gray-200 pt-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    pathname === item.href ? "bg-black text-white" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}
