import { client } from '@/sanity/lib/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import { ArrowLeft, Github, Globe, Calendar, Tag, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// SSG: Generate paths for all projects
export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"]{ "slug": slug.current }`)
  return projects.map((p: { slug: string }) => ({ slug: p.slug }))
}

// SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })
  
  if (!project) return { title: "Project Not Found" }
  
  return {
    title: `${project.title} | Projects`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) notFound()

  return (
    <div className="container mx-auto px-6 py-12 mb-20">
      {/* Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <Link href="/projects" className="group flex items-center text-sm font-medium text-foreground/50 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Projects
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-12">
          <section>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            >
              {project.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-3xl overflow-hidden glass shadow-2xl"
            >
              {project.coverImage ? (
                <Image
                  src={urlFor(project.coverImage).url()}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
                   <Globe className="w-20 h-20 text-foreground/10" />
                </div>
              )}
            </motion.div>
          </section>

          {/* Project Story/Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="glass p-8 md:p-12 rounded-3xl border-foreground/5">
               <PortableText 
                 value={project.content} 
                 components={{
                   block: {
                     h2: ({children}) => <h2 className="text-3xl font-bold mb-6 mt-12 text-white">{children}</h2>,
                     h3: ({children}) => <h3 className="text-2xl font-bold mb-4 mt-8 text-white">{children}</h3>,
                     normal: ({children}) => <p className="text-foreground/70 leading-relaxed mb-6">{children}</p>,
                   },
                   list: {
                     bullet: ({children}) => <ul className="list-disc list-inside space-y-3 mb-8 text-foreground/70">{children}</ul>,
                   }
                 }}
               />
            </div>
          </article>
        </div>

        {/* Sidebar Info (Right) */}
        <aside className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-32 space-y-6"
          >
            <div className="glass p-8 rounded-3xl space-y-8">
              {/* Stats/Infos */}
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center text-xs uppercase tracking-widest font-bold text-foreground/40 mb-3">
                    <Tag className="w-3 h-3 mr-2" /> Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech: string) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>

                {project.repositoryUrl && (
                  <div>
                    <h4 className="flex items-center text-xs uppercase tracking-widest font-bold text-foreground/40 mb-3">
                      <Github className="w-3 h-3 mr-2" /> Repository
                    </h4>
                    <a 
                      href={project.repositoryUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors font-medium break-all flex items-center gap-2"
                    >
                      {project.repositoryUrl.replace('https://', '')} <ArrowLeft className="w-4 h-4 rotate-135" />
                    </a>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="pt-6 border-t border-foreground/5">
                <Button className="w-full py-4 text-lg">
                  Visit Live Demo <Globe className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Help/Contact */}
            <div className="glass p-8 rounded-3xl bg-blue-500/5 border-blue-500/10">
              <h4 className="text-sm font-bold mb-2">Interested in this project?</h4>
              <p className="text-xs text-foreground/50 mb-4">
                I'm open to collaborations or building similar solutions for you.
              </p>
              <Link href="/about" className="text-sm font-bold text-blue-400 flex items-center">
                Let's talk <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  )
}
