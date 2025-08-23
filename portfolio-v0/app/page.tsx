"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Twitter, Download, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/api-client'
import { Hero, Project } from '@/lib/types'
import { toast } from 'sonner'

export default function HomePage() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [heroResponse, projectsResponse] = await Promise.all([
        api.hero.getAll(),
        api.project.getAll()
      ])

      // Get the first hero data (assuming single hero record)
      const heroData = heroResponse.data?.data[0] || heroResponse?.data?.data
      setHero(heroData)

      // Get featured projects or first 3 projects
      const projects = projectsResponse.data.data || []
      const featured = projects.filter((p: Project) => p.featured).slice(0, 3)
      setFeaturedProjects(featured.length > 0 ? featured : projects.slice(0, 3))
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
                {hero?.name || 'Creative'}
                <br />
                <span className="italic">{'Developer'}</span>

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

              <div className="flex space-x-4">
                {hero?.socialLinks?.github && (
                  <a href={hero.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {hero?.socialLinks?.linkedin && (
                  <a href={hero.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {/* {hero?.socialLinks?.twitter && (
                  <a href={hero.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )} */}
                {hero?.socialLinks?.email && (
                  <a href={`mailto:${hero.socialLinks.email}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 rounded-2xl transform rotate-6"></div>
                <Image
                  src={hero?.avatar || "https://res.cloudinary.com/dzlvf9qm5/image/upload/v1753870557/IMG_20230427_233301_eou2gn.jpg"}
                  alt={hero?.name || "Profile"}
                  width={400}
                  height={500}
                  className="relative rounded-2xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              A selection of projects that showcase my passion for creating
              exceptional digital experiences.
            </p>
          </motion.div>

          {featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={project.image || `/placeholder.svg?height=300&width=400&query=${project.title}`}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="outline" className="bg-white text-black hover:bg-gray-100" asChild>
                        <Link href="/projects">View Project</Link>
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No featured projects available.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
