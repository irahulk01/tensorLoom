export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0A0A0A] pt-20 pb-12 font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between mb-40">
        {/* Left Side: Brand and Copyright */}
        <div className="flex flex-col mb-12 md:mb-0">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/logo.jpg"
              alt="tensorLoom Logo"
              className="w-8 h-8 rounded-md object-cover"
            />
            <span className="text-xl font-semibold tracking-tight text-white">tensorLoom</span>
          </div>
          <p className="text-sm text-zinc-500">© copyright tensorLoom 2026. All rights reserved.</p>
        </div>

        {/* Right Side: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 text-sm">
          {/* Column 1: Pages */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2">Pages</h4>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              All Products
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Studio
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Clients
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Blog
            </a>
          </div>

          {/* Column 2: Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2">Socials</h4>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2">Legal</h4>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>

          {/* Column 4: Register */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2">Register</h4>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Sign Up
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Login
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
              Forgot Password
            </a>
          </div>
        </div>
      </div>

      {/* Massive Background Text */}
      <div className="absolute bottom-[-10%] left-0 w-full flex justify-center items-end pointer-events-none z-0 overflow-hidden select-none">
        <h1 className="text-[20vw] font-black text-white/[0.03] leading-none tracking-tighter whitespace-nowrap">
          tensorLoom
        </h1>
      </div>
    </footer>
  );
}
