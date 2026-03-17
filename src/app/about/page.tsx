import { client } from '@/sanity/lib/client'
import { authorQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import * as motion from 'framer-motion/client'
import { Mail, Github, Linkedin, FileText, User, Sparkles, Code2, Coffee, Terminal } from 'lucide-react'

// Revalidate every 60 seconds
export const revalidate = 60

export const metadata = {
  title: "About Me | Arya Setia Pratama",
  description: "Learn more about my background, technical skills, and professional journey as a full-stack developer.",
}

export default async function AboutPage() {
  const author = await client.fetch(authorQuery)

  return (
    <div className="container mx-auto px-6 py-12 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Profile Sidebar (Left) */}
        <aside className="lg:col-span-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="glass p-2 rounded-[2.5rem] overflow-hidden aspect-square relative group">
              <div className="w-full h-full rounded-4xl overflow-hidden bg-linear-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center relative">
                {/* Fallback for profile photo since we don't have an image field in schema yet, using a stylized icon */}
                <User className="w-32 h-32 text-blue-400 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                   <span className="text-4xl font-bold text-gradient">ASP</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                 <Button variant="ghost" className="text-white hover:bg-white/10">Follow @aryasetiap</Button>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 glass px-6 py-3 rounded-2xl border-blue-500/30 flex items-center gap-2 shadow-xl">
               <Sparkles className="w-5 h-5 text-blue-400" />
               <span className="font-bold text-sm">Full-stack Dev</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl space-y-8"
          >
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-6">Stay Connected</h3>
              <div className="space-y-4">
                <a href="mailto:aryasetiap.code@gmail.com" className="flex items-center gap-4 text-foreground/70 hover:text-blue-400 transition-colors group">
                  <div className="p-2 rounded-xl bg-foreground/5 group-hover:bg-blue-500/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">aryasetiap.code@gmail.com</span>
                </a>
                <a href="https://github.com/aryasetiap" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground/70 hover:text-blue-400 transition-colors group">
                  <div className="p-2 rounded-xl bg-foreground/5 group-hover:bg-blue-500/10">
                    <Github className="w-5 h-5" />
                  </div>
                  <span className="font-medium">github.com/aryasetiap</span>
                </a>
                <a href="https://linkedin.com/in/aryasetiap" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-foreground/70 hover:text-blue-400 transition-colors group">
                  <div className="p-2 rounded-xl bg-foreground/5 group-hover:bg-blue-500/10">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span className="font-medium">linkedin.com/in/aryasetiap</span>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-foreground/5">
              {author?.resumeUrl ? (
                <Button href={author.resumeUrl} className="w-full py-4 shadow-blue-500/20">
                  Get My Resume <FileText className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button className="w-full py-4 shadow-blue-500/20" onClick={() => alert('Resume not yet uploaded in CMS.')}>
                  Resume Available Soon <FileText className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </aside>

        {/* Story & Details (Right) */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                I'm <span className="text-gradient">{author?.name || "Arya Setia Pratama"}</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light">
                Crafting modern, pixel-perfect, and high-performance digital experiences from Indonesia.
              </p>
            </motion.div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="glass p-8 md:p-12 rounded-[2.5rem] border-foreground/5">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-blue-400" /> The Story So Far
              </h2>
              {author?.bio ? (
                <PortableText 
                  value={author.bio}
                  components={{
                    block: {
                      normal: ({children}) => <p className="text-foreground/70 leading-relaxed mb-6 last:mb-0">{children}</p>,
                    }
                  }}
                />
              ) : (
                <div className="space-y-6 text-foreground/70">
                  <p>I am a dedicated developer with a strong focus on building scalable web applications. My journey started with a fascination for how the web works, which evolved into a professional career building robust solutions using the latest technologies.</p>
                  <p>I believe in "Quality over Quantity" and always strive to implement best practices, from clean code to intuitive user interfaces. When I'm not coding, you'll find me exploring new design trends or contributing to open-source projects.</p>
                </div>
              )}
            </div>
          </motion.section>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="flex items-start gap-4 p-8">
               <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                  <Coffee className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-xl font-bold mb-1">Motto</h4>
                  <p className="text-sm text-foreground/50">Keep shipping, keep learning. Every pixel matters.</p>
               </div>
            </Card>
            <Card className="flex items-start gap-4 p-8">
               <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Terminal className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-xl font-bold mb-1">Focus</h4>
                  <p className="text-sm text-foreground/50">Next.js & Cloud Native architecture.</p>
               </div>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}
