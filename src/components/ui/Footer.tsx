export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-foreground/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Arya Setia Pratama. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/aryasetiap" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/aryasetiap" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
