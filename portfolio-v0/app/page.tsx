"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Twitter, Instagram, Download, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api, API_BASE_URL } from '@/lib/api-client'
import { Hero, Project, Skill } from '@/lib/types'
import { toast } from 'sonner'
import InlineMusic from '@/components/inline-music'
import Footer from '@/components/footer'

export default function HomePage() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [skills, setSkills] = useState<Skill[]>([])
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [heroResponse, projectsResponse, skillsResponse] = await Promise.all([
        api.hero.getAll(),
        api.project.getAll(),
        api.skill.getAll().catch(() => ({ data: { data: [] } }))
      ])

      // Get the first hero data (assuming single hero record)
      const heroData = heroResponse.data?.data[0] || heroResponse?.data?.data
      setHero(heroData)

      // Get featured projects or first 3 projects
      const projects = projectsResponse.data.data || []
      const featured = projects.filter((p: Project) => p.featured).slice(0, 3)
      setFeaturedProjects(featured.length > 0 ? featured : projects.slice(0, 3))

      // Skills
      const skillsData: Skill[] = skillsResponse?.data?.data || []
      setSkills(skillsData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      toast.error('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (url: string) => {
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = 'sachin-kathar-resume.pdf'; // Set a proper file name
      link.rel = 'noopener noreferrer';
      
      // Simulate click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume');
    }
  };

  const toAttachmentUrl = (url: string, filename = 'sachin-kathar-resume.pdf') => {
    try {
      let u = url
      // If it's a PDF but delivered via image, switch to raw delivery
      if (u.includes('/image/upload/') && /\.pdf($|\?)/i.test(u)) {
        u = u.replace('/image/upload/', '/raw/upload/')
      }
      // Inject fl_attachment to force download with filename
      if (u.includes('/upload/')) {
        return u.replace('/upload/', `/upload/fl_attachment:${encodeURIComponent(filename)}/`)
      }
      // Fallback query param
      return `${u}${u.includes('?') ? '&' : '?'}fl_attachment=${encodeURIComponent(filename)}`
    } catch {
      return url
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-16 rounded mb-6"></div>
                <div className="bg-gray-200 h-6 rounded mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-4 w-3/4"></div>
                <div className="bg-gray-200 h-10 rounded w-32"></div>
              </div>
              <div className="animate-pulse">
                <div className="bg-gray-200 h-96 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo left + socials under photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="w-full max-w-md mx-auto">
                <Image
                  src={hero?.avatar || "https://res.cloudinary.com/dzlvf9qm5/image/upload/v1753870557/IMG_20230427_233301_eou2gn.jpg"}
                  alt={hero?.name || "Profile"}
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-xl object-cover"
                  priority
                />
                {/* Socials below photo */}
                <div className="mt-4 flex items-center gap-2 flex-wrap text-gray-700 dark:text-gray-200">
                  {hero?.socialLinks?.github && (
                    <a href={hero.socialLinks.github} target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors" aria-label="GitHub">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {hero?.socialLinks?.linkedin && (
                    <a href={hero.socialLinks.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {hero?.socialLinks?.x && (
                    <a href={hero.socialLinks.x} target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors" aria-label="Twitter/X">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {hero?.socialLinks?.instagram && (
                    <a href={hero.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors" aria-label="Instagram">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {hero?.socialLinks?.email && (
                    <a href={`mailto:${hero.socialLinks.email}`} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors" aria-label="Email">
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Info right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                {hero?.name || 'Creative'}
                <br />
                

                {/* hero?.titles || */}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                {hero?.about || 'Loading profile information...'}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild>
                  <Link href="/projects">View My Work</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
                {hero?.resume?.url && (
                  <Button variant="outline" asChild>
                    <a
                      href="/api/resume"
                      download="sachin-kathar-resume.pdf"
                      className="flex items-center"
                      onClick={() => {
                        // Provide quick UI feedback; do not block default download
                        setDownloading(true)
                        setTimeout(() => setDownloading(false), 4000)
                      }}
                    >
                      {downloading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Resume
                        </>
                      )}
                    </a>
                  </Button>
                )}
              </div>

              {/* Social links on the right removed as requested; kept only under the photo */}

              <div className="mt-6">
                <InlineMusic />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      {skills.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold">Skills</h2>
              <p className="text-gray-600 mt-2">A few tools and technologies I use regularly</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((s) => {
                const iconUrl = s.icon && (s.icon.startsWith('http://') || s.icon.startsWith('https://'))
                  ? s.icon
                  : (s.icon ? `${API_BASE_URL}/${s.icon.replace(/^\//, '')}` : '')
                return (
                  <div key={s._id} className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 shadow-sm bg-white/60">
                    {iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={iconUrl} alt={s.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <div className="w-6 h-6 rounded bg-gray-200" />
                    )}
                    <span className="text-sm font-medium truncate">{s.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Professional Experience */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">Professional Experience</h2>
            <p className="text-gray-600 mt-2">I genuinely enjoy a good work environment and the team I work with.</p>
          </div>

          <div className="space-y-6">
            {featuredProjects.map((p) => (
              <div key={p._id} className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm text-gray-500">{p.title.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noreferrer" className="hover:underline">
                          {p.title}
                        </a>
                      ) : (
                        p.title
                      )}
                      {p.company ? ` · ${p.company}` : ''}
                    </h3>
                    <p className="text-sm text-gray-600">{p.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.techStack?.slice(0,6).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-neutral-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {p.startDate || ''}{p.endDate ? ` · ${p.endDate}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold">Education</h2>
            <p className="text-gray-600 mt-2">Proudly part of this amazing institution.</p>
          </div>
          {hero?.educations && hero.educations.length > 0 ? (
            <div className="space-y-6">
              {hero.educations.map((e) => (
                <div key={e._id || e.institute} className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {e.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={e.logo} alt={e.institute} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500">{e.institute.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">
                        {e.url ? (
                          <a href={e.url} target="_blank" rel="noreferrer" className="hover:underline">
                            {e.institute}
                          </a>
                        ) : e.institute}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {e.mode && <span className="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-neutral-700">{e.mode}</span>}
                        {e.degree && <span className="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-neutral-700">{e.degree}</span>}
                        {e.stream && <span className="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-neutral-700">{e.stream}</span>}
                        {e.tags?.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded-full border border-gray-200 dark:border-neutral-700">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {(e.startYear || '')}{e.endYear ? ` to ${e.endYear}` : ''}
                  </div>
                </div>
              ))}
            </div>
          ) : hero?.education ? (
            <p className="text-gray-600">{hero.education}</p>
          ) : (
            <p className="text-gray-600">No education details available.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
