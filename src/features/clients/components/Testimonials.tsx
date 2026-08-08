'use client';

import { motion } from 'framer-motion';

const testimonialsData = [
  // Column 1
  [
    {
      name: 'Marc Laventure',
      handle: '@MarcLaventure',
      avatar: '/logo.jpg',
      quote:
        'Tech engineering + monetary contributions are paramount for OSS. TensorLoom delivered our enterprise cloud portal in record time with unmatched precision.',
    },
    {
      name: 'meabed',
      handle: '@Meabed',
      avatar: '/logo.jpg',
      quote:
        "Been building something with Bun + tensorLoom and the speed and ergonomics are way out of this world!!!! Can't go back to legacy node stacks.",
    },
    {
      name: 'Alina Dino',
      handle: '@alina_dino',
      avatar: '/logo.jpg',
      quote:
        'The team delivered beyond expectations — on time and within budget. Our idea was simple but they understood it deeply and built something our users love.',
    },
  ],
  // Column 2
  [
    {
      name: 'Aqueel',
      handle: '@AqueelMiq',
      avatar: '/logo.jpg',
      quote:
        'Jetfuel on bun at X! @shlomiatar who built the framework has an eye for picking the right tools for the job.',
    },
    {
      name: 'Shlomi Atar',
      handle: '@shlomiatar',
      avatar: '/logo.jpg',
      quote:
        'Shoutout to the tensorLoom team and the phenomenal engine that is powering our server driven UI. Incredible work.',
    },
    {
      name: 'htmx.org',
      handle: '@htmx_org',
      avatar: '/logo.jpg',
      quote: 'htmx works great w/ @bunjavascript, @tensorloom and @tursodatabase btw',
    },
    {
      name: 'nuqs',
      handle: '@nuqs47ng',
      avatar: '/logo.jpg',
      quote:
        "I'm a Node.js + Fastify diehard, but the Bun + tensorLoom combo looks very promising.",
    },
  ],
  // Column 3
  [
    {
      name: 'Jarred Sumner',
      handle: '@jarredsumner',
      avatar: '/logo.jpg',
      quote:
        'You can use Express with Bun, but often we see people using tensorLoom, Hono, or Bun.serve() directly.',
    },
    {
      name: 'Runyasak Ch. 💚',
      handle: '@runyasak',
      avatar: '/logo.jpg',
      quote:
        "Started using @tensorloom to create a Discord Bot and found the type system beautifully easy. DX is fantastic and coding is fun! Use @DrizzleORM with PostgreSQL. So much easier than I've used before.",
    },
    {
      name: 'Herrington Darkholme',
      handle: '@hd_nvim',
      avatar: '/logo.jpg',
      quote:
        "Was introduced to @tensorloom today and it looks pretty solid. end-to-end type safety/guard/swapper are killer features of the modern web! (and it's fast)",
    },
  ],
  // Column 4
  [
    {
      name: 'José Donato 🦋',
      handle: '@josedonato__',
      avatar: '/logo.jpg',
      quote:
        "Handling tables with ~350k rows like it's nothing. Working on allowing @ag_grid server side row model when connecting a custom backend to Terminal Pro.",
    },
    {
      name: 'Bewinxed',
      handle: '@Bewinxed',
      avatar: '/logo.jpg',
      quote:
        'Tensorloom single handedly carrying js backends. I have been using it almost exclusively for all my projects.',
    },
    {
      name: 'MikroORM',
      handle: '@MikroORM',
      avatar: '/logo.jpg',
      quote:
        "I've been playing a bit with @bunjavascript and @tensorloom, need to do a few more tweaks before the release.",
    },
  ],
  // Column 5
  [
    {
      name: 'haxiom.io',
      handle: '@haxiom_io',
      avatar: '/logo.jpg',
      quote:
        "One diff tensorLoom made in our org is that it makes it easy to refactor fearlessly. You can be pretty certain if things won't work simply because TypeScript will tell you that your types don't match.",
    },
    {
      name: 'STACIA',
      handle: '@stacia__x',
      avatar: '/logo.jpg',
      quote:
        'Tensorloom was the first framework that truly sparked my interest in JS/TS. I usually stick to Python, mostly using FastAPI. When I tried tensorLoom (v1.1), I immediately felt it provides an amazing dev experience. Love tensorLoom 🚀',
    },
    {
      name: 'Micky',
      handle: '@Rasmic',
      avatar: '/logo.jpg',
      quote: "Tensorloom is fast, type-safe, and elegant. Can't ask for more.",
    },
  ],
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="w-full py-20 md:py-32 bg-[#111115] text-white relative z-20 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Elysia Wall Title Banner */}
        <div className="mb-14 text-center flex items-center justify-center gap-3 flex-wrap">
          <span className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
            What people say about
          </span>
          <img
            src="/logo.jpg"
            alt="tensorLoom Logo"
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg object-cover shadow-md inline-block"
          />
          <span className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
            tensorLoom
          </span>
        </div>

        {/* 5-Column Elysia-Style Masonry Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 items-start">
          {testimonialsData.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3 sm:gap-4">
              {column.map((item, itemIdx) => (
                <motion.div
                  key={`${colIdx}-${itemIdx}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (colIdx * 3 + itemIdx) * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#191920] border border-white/10 hover:border-[#c99b3e]/50 transition-all duration-300 flex flex-col gap-3 shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden leading-tight">
                      <h4 className="text-sm font-bold text-white font-heading truncate">
                        {item.name}
                      </h4>
                      <span className="text-xs text-slate-400 font-sans truncate">
                        {item.handle}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed break-words">
                    {item.quote}
                  </p>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
