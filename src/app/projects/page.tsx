import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Terminal, Search } from 'lucide-react'

// Revalidate every 60 seconds
export const revalidate = 60

export const metadata = {
  title: "Projects | Arya Setia Pratama",
  description: "A showcase of my latest web development projects and technical experiments.",
}

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery)

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header Section */}
      <header className="mb-20 max-w-2xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          My <span className="text-gradient">Projects</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-foreground/60 leading-relaxed"
        >
          Explore a curated collection of my work, ranging from complex full-stack applications to focused UI experiments. Each project represents a unique challenge solved with modern technology.
        </motion.p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects && projects.length > 0 ? (
          projects.map((project: any, index: number) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <Card className="group h-full flex flex-col overflow-hidden p-0 border-none">
                  <div className="relative aspect-16/10 overflow-hidden rounded-t-3xl bg-foreground/5">
                    {project.coverImage ? (
                      <Image
                        src={urlFor(project.coverImage).url()}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Terminal className="w-12 h-12 text-foreground/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack?.slice(0, 3).map((tech: string) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-foreground/60 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-blue-400">
                      View Case Study <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-40 text-center glass rounded-3xl border-dashed border-2 border-foreground/10">
             <Search className="w-12 h-12 mx-auto mb-4 text-foreground/20" />
             <p className="text-foreground/40 font-medium">Coming soon. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}
