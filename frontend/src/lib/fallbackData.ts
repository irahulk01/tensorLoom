export const fallbackContentData: Record<string, any> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      work: 'Our Work',
      techStack: 'Tech Stack',
      blog: 'Blog',
      contact: 'Contact Us',
    },
    hero: {
      badge: 'AI Engineering Studio',
      title: 'We build brands that are clear, cohesive, and built to last.',
      subtitle:
        '5+ years of engineering taught us that complexity kills. We ship fast, precise software for teams that cannot afford to fail.',
      ctaPrimary: 'View Our Work',
      ctaSecondary: 'Talk to Our Expert',
    },
    servicesSection: {
      title: 'Capabilities',
      subtitle: 'We engineer resilient systems from the ground up.',
      items: [
        {
          id: 'web-apps',
          title: 'Web Architecture',
          description:
            'SPA and SSR architectures built for the edge. Zero layout shift, instant interactions, and flawless performance.',
          icon: 'Layout',
        },
        {
          id: 'ai-agents',
          title: 'Applied AI',
          description:
            'LLMs and semantic search wired directly into your data pipelines. Real intelligence, not just API wrappers.',
          icon: 'Cpu',
        },
        {
          id: 'cloud-native',
          title: 'Cloud Native',
          description:
            'High-throughput microservices deployed on serverless infrastructure. Built to scale seamlessly when traffic spikes.',
          icon: 'Cloud',
        },
        {
          id: 'perf-tuning',
          title: 'Performance',
          description:
            'We profile, audit, and rewrite slow code. From database indexing to bundle splitting, we obsess over every millisecond.',
          icon: 'Zap',
        },
      ],
    },
    workSection: {
      title: 'Our Work',
      subtitle: "Architectures we've engineered and scaled.",
      items: [
        {
          id: 'icashiq',
          title: 'iCashiq',
          category: 'Fintech',
          description:
            'A cutting-edge financial solution designed to streamline cash flows and provide deep analytics.',
          metric: '99.9%',
          metricLabel: 'System Uptime',
          accentColor: 'from-cyan-500/20 to-teal-500/20',
          url: 'https://icashiq.com/',
        },
        {
          id: 'easydocuments',
          title: 'Easy Documents',
          category: 'Enterprise SaaS',
          description:
            'Instant document compilation and workflow orchestrator built for modern enterprises.',
          metric: 'Instant',
          metricLabel: 'Rendering Speed',
          accentColor: 'from-violet-500/20 to-indigo-500/20',
          url: 'https://easydocoments.com/',
        },
        {
          id: 'studentscorner',
          title: 'Students Corner',
          category: 'Edtech Hub',
          description:
            'A unified portal for students to collaborate, manage courses, and access learning assets.',
          metric: '20k+',
          metricLabel: 'Monthly Active Users',
          accentColor: 'from-rose-500/20 to-orange-500/20',
          url: 'https://studentscorners.com/',
        },
        {
          id: 'aheeramilk',
          title: 'Aheera Milk',
          category: 'D2C E-commerce',
          description:
            'Direct-to-consumer dairy platform with automated subscriptions and fresh morning delivery scheduling.',
          metric: '24 Hr',
          metricLabel: 'Delivery Cycle',
          accentColor: 'from-emerald-500/20 to-teal-500/20',
          url: 'https://aheeramilk.netlify.app/',
        },
      ],
    },
    beliefsSection: {
      title: 'What we believe',
      statements: [
        'Engineering should be invisible.',
        'Complexity is the enemy of reliability.',
        'Assume the network is hostile and latency is the default.',
        'Design is how it works, not just how it looks.',
        'Obsessive attention to detail is the only way to ship quality.',
      ],
    },
    principlesSection: {
      title: 'Engineering Philosophy',
      subtitle: 'How we approach building software.',
      items: [
        {
          id: 'p1',
          title: 'Zero Abstraction Overhead',
          description:
            "We don't use tools to avoid writing code. We write code to eliminate unnecessary tools and dependencies.",
        },
        {
          id: 'p2',
          title: 'Design for the Edge',
          description:
            'Every architecture decision is optimized for time-to-first-byte. Data should live where the users are.',
        },
        {
          id: 'p3',
          title: 'Motion as Context',
          description:
            'We despise useless animation. Motion exists only to explain state changes and reduce cognitive load.',
        },
      ],
    },
    contactTranslations: {
      title: 'Initialize Connection.',
      subtitle:
        "Tell us what you're building. We'll give you a brutally honest answer if we can help.",
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone (Optional)',
        company: 'Company',
        message: 'Technical details of your problem...',
        submit: 'Transmit Request',
      },
    },
  },
};
