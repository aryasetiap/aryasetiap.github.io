import { client } from '@/sanity/lib/client'
import { authorQuery, featuredProjectsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import * as motion from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Github, Mail, Terminal, Cpu, Database, Layout, Smartphone } from 'lucide-react'

// Revalidate every 60 seconds
export const revalidate = 60

async function getHomepageData() {
  const [author, projects] = await Promise.all([
    client.fetch(authorQuery),
    client.fetch(featuredProjectsQuery)
  ])
  return { author, projects }
}

const SKILLS = [
  { name: 'Frontend', icon: <Layout className="w-5 h-5" />, items: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'] },
  { name: 'Backend', icon: <Database className="w-5 h-5" />, items: ['Node.js', 'PostgreSQL', 'Sanity CMS', 'REST API'] },
  { name: 'Languages', icon: <Terminal className="w-5 h-5" />, items: ['TypeScript', 'JavaScript', 'HTML/CSS', 'SQL'] },
  { name: 'Tools', icon: <Cpu className="w-5 h-5" />, items: ['Git', 'Docker', 'Vercel', 'Postman'] },
]

export default async function Home() {
  const { author, projects } = await getHomepageData()

  return (
    <div className="space-y-32 mb-20">
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-6 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-1 px-4 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-sm font-medium glass"
        >
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          I build <span className="text-gradient">high-performance</span> digital experiences.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mb-10 leading-relaxed"
        >
          {author?.bio ? author.bio[0]?.children?.[0]?.text : "Passionate full-stack developer specializing in building premium web applications with a focus on design, performance, and user experience."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button href="/projects" variant="primary">
            View My Work <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
          <Button href="/about" variant="outline">
            About Me
          </Button>
        </motion.div>
      </section>

      {/* 2. SKILLS SECTION */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Core Expertise</h2>
          <div className="h-1.5 w-20 bg-linear-to-r from-blue-600 to-cyan-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill, index) => (
            <Card key={index} className="flex flex-col items-start gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold">{skill.name}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <Badge key={i} className="bg-transparent border-foreground/10 text-foreground/70">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16 px-2">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
            <p className="text-foreground/60 max-w-lg">
              A selection of my favorite projects where I've blended technical skill with creative problem solving.
            </p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors">
            All Projects <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
            projects.map((project: any, index: number) => (
              <Link key={project._id} href={`/projects/${project.slug}`}>
                <Card className="h-full flex flex-col overflow-hidden p-0 border-none">
                  <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                    {project.coverImage ? (
                      <Image
                        src={urlFor(project.coverImage).url()}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
                        <Terminal className="w-12 h-12 text-foreground/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col grow">
                    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                      {project.techStack?.slice(0, 3).map((tech: string) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-6 line-clamp-2">
                      {project.summary}
                    </p>
                    <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-blue-400">
                      Learn More <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-2 border-foreground/10">
              <Database className="w-12 h-12 mx-auto mb-4 text-foreground/20" />
              <p className="text-foreground/40 font-medium uppercase tracking-widest text-xs">No projects found in Sanity CMS</p>
              <Button href="/admin" variant="ghost" className="mt-4 text-xs underline">
                Go to Admin
              </Button>
            </div>
          )}
        </div>

        <div className="mt-12 md:hidden">
          <Button href="/projects" variant="outline" className="w-full py-4 text-blue-400">
            View All Projects
          </Button>
        </div>
      </section>

      {/* 4. CONTACT SECTION (Preview) */}
      <section className="container mx-auto px-6">
        <Card className="relative overflow-hidden bg-linear-to-br from-blue-600/20 to-cyan-500/20 border-blue-500/20 p-12 md:p-20 flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Mail className="w-40 h-40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's build something epic together.</h2>
          <p className="text-foreground/60 max-w-xl mb-10 md:text-lg">
            I'm currently looking for new opportunities and collaborations. Drop me a message and let's talk about your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="mailto:aryasetiap.code@gmail.com" className="flex items-center gap-3 text-lg font-bold hover:text-blue-400 transition-colors">
              <Mail className="w-6 h-6" /> aryasetiap.code@gmail.com
            </a>
            <div className="flex gap-4">
              <a href="https://github.com/aryasetiap" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl glass glass-hover">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
