export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#fcfbf9] pt-16 pb-12 font-sans border-t border-[#c99b3e]/20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-16 flex flex-col md:flex-row justify-between mb-24 md:mb-32">
        {/* Brand & Copyright */}
        <div className="flex flex-col mb-10 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.jpg"
              alt="tensorLoom Logo"
              className="w-7 h-7 rounded-md object-cover shadow-xs"
            />
            <span className="text-xl font-extrabold tracking-tight text-[#0f1117] font-heading">
              tensorLoom
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4a4d57]">
            © copyright tensorLoom 2026. All rights reserved.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-xs sm:text-sm">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0f1117] mb-1 font-heading">Pages</h4>
            <a href="#services" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Capabilities
            </a>
            <a href="#work" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Our Work
            </a>
            <a href="#tech-stack" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Tech Stack
            </a>
            <a href="/blog" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Blog
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0f1117] mb-1 font-heading">Socials</h4>
            <a href="#" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Twitter
            </a>
            <a href="#" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              GitHub
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0f1117] mb-1 font-heading">Legal</h4>
            <a href="#" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0f1117] mb-1 font-heading">Contact</h4>
            <a href="#contact" className="text-[#4a4d57] hover:text-[#c99b3e] transition-colors">
              Initiate Project
            </a>
            <span className="text-[#b38730] font-mono text-xs font-semibold">
              hello@tensorloom.com
            </span>
          </div>
        </div>
      </div>

      {/* Massive Background Text Watermark */}
      <div className="absolute bottom-[-10%] left-0 w-full flex justify-center items-end pointer-events-none z-0 overflow-hidden select-none">
        <h1 className="text-[18vw] font-black text-[#c99b3e]/[0.05] leading-none tracking-tight whitespace-nowrap font-heading">
          tensorLoom
        </h1>
      </div>
    </footer>
  );
}
