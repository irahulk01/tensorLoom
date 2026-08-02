export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  accentColor: string;
  url?: string;
}

export interface ContentData {
  nav: {
    home: string;
    services?: string;
    work: string;
    techStack: string;
    blog: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  servicesSection: {
    title: string;
    subtitle: string;
    items: Service[];
  };
  workSection: {
    title: string;
    subtitle: string;
    items: Project[];
  };
  beliefsSection: {
    title: string;
    statements: string[];
  };
  principlesSection: {
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      description: string;
    }[];
  };
  contactTranslations: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      submit: string;
    };
  };
}

export const contentData: Record<string, ContentData> = {
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
  es: {
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      work: 'Nuestro Trabajo',
      techStack: 'Tecnologías',
      blog: 'Blog',
      contact: 'Contáctanos',
    },
    hero: {
      badge: 'Estudio de Ingeniería',
      title: 'Construimos sistemas que funcionan.',
      subtitle:
        '10 años de ingeniería nos enseñaron que la complejidad mata. Entregamos software rápido y preciso para equipos que no pueden darse el lujo de fallar.',
      ctaPrimary: 'Ver Nuestro Trabajo',
      ctaSecondary: 'Hablar con Nuestro Experto',
    },
    servicesSection: {
      title: 'Capacidades',
      subtitle: 'Diseñamos sistemas resilientes desde cero.',
      items: [
        {
          id: 'web-apps',
          title: 'Arquitectura Web',
          description:
            'Arquitecturas SPA y SSR construidas para el borde. Cero cambio de diseño, interacciones instantáneas.',
          icon: 'Layout',
        },
        {
          id: 'ai-agents',
          title: 'IA Aplicada',
          description:
            'LLMs y búsqueda semántica conectados directamente a sus pipelines de datos. Inteligencia real.',
          icon: 'Cpu',
        },
        {
          id: 'cloud-native',
          title: 'Nativo de la Nube',
          description:
            'Microservicios de alto rendimiento desplegados en infraestructura sin servidor.',
          icon: 'Cloud',
        },
        {
          id: 'perf-tuning',
          title: 'Rendimiento',
          description:
            'Perfilamos, auditamos y reescribimos código lento. Nos obsesionamos con cada milisegundo.',
          icon: 'Zap',
        },
      ],
    },
    workSection: {
      title: 'Sistemas en Producción',
      subtitle: 'Arquitecturas que hemos diseñado y escalado.',
      items: [
        {
          id: 'icashiq',
          title: 'iCashiq',
          category: 'Fintech',
          description:
            'Una solución financiera de vanguardia diseñada para optimizar los flujos de caja y ofrecer análisis profundos.',
          metric: '99.9%',
          metricLabel: 'Tiempo de Actividad',
          accentColor: 'from-cyan-500/20 to-teal-500/20',
          url: 'https://icashiq.com/',
        },
        {
          id: 'easydocuments',
          title: 'Easy Documents',
          category: 'SaaS Empresarial',
          description:
            'Compilación instantánea de documentos y orquestador de flujos de trabajo creado para empresas modernas.',
          metric: 'Instantáneo',
          metricLabel: 'Velocidad de Renderizado',
          accentColor: 'from-violet-500/20 to-indigo-500/20',
          url: 'https://easydocoments.com/',
        },
        {
          id: 'studentscorner',
          title: 'Students Corner',
          category: 'Portal de Edtech',
          description:
            'Un portal unificado para que los estudiantes colaboren, gestionen cursos y accedan a recursos de aprendizaje.',
          metric: '20k+',
          metricLabel: 'Usuarios Activos Mensuales',
          accentColor: 'from-rose-500/20 to-orange-500/20',
          url: 'https://studentscorners.com/',
        },
        {
          id: 'aheeramilk',
          title: 'Aheera Milk',
          category: 'Comercio Electrónico D2C',
          description:
            'Plataforma láctea directa al consumidor con suscripciones automatizadas y programación de entregas frescas por la mañana.',
          metric: '24 Hr',
          metricLabel: 'Ciclo de Entrega',
          accentColor: 'from-emerald-500/20 to-teal-500/20',
          url: 'https://aheeramilk.netlify.app/',
        },
      ],
    },
    beliefsSection: {
      title: 'Lo que creemos',
      statements: [
        'La ingeniería debe ser invisible.',
        'La complejidad es el enemigo de la confiabilidad.',
        'Asume que la red es hostil.',
        'El diseño es cómo funciona, no solo cómo se ve.',
        'La atención obsesiva al detalle es la única forma de enviar calidad.',
      ],
    },
    principlesSection: {
      title: 'Filosofía de Ingeniería',
      subtitle: 'Cómo enfocamos la construcción de software.',
      items: [
        {
          id: 'p1',
          title: 'Cero Sobrecarga de Abstracción',
          description: 'Escribimos código para eliminar herramientas innecesarias.',
        },
        {
          id: 'p2',
          title: 'Diseño para el Borde',
          description:
            'Cada decisión de arquitectura está optimizada para el tiempo hasta el primer byte.',
        },
        {
          id: 'p3',
          title: 'Movimiento como Contexto',
          description:
            'Despreciamos la animación inútil. El movimiento solo existe para explicar cambios de estado.',
        },
      ],
    },
    contactTranslations: {
      title: 'Inicializar Conexión.',
      subtitle: 'Díganos qué está construyendo. Le daremos una respuesta brutalmente honesta.',
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        phone: 'Teléfono (Opcional)',
        company: 'Empresa',
        message: 'Detalles técnicos de su problema...',
        submit: 'Transmitir Solicitud',
      },
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      services: 'Leistungen',
      work: 'Unsere Arbeit',
      techStack: 'Tech-Stack',
      blog: 'Blog',
      contact: 'Kontaktieren Sie uns',
    },
    hero: {
      badge: 'AI Engineering Studio',
      title: 'Wir bauen Systeme, die funktionieren.',
      subtitle:
        '10 Jahre Engineering haben uns gelehrt: Komplexität tötet. Wir liefern schnelle, präzise Software für Teams, die sich keine Fehler leisten können.',
      ctaPrimary: 'Unsere Arbeit ansehen',
      ctaSecondary: 'Mit Experten sprechen',
    },
    servicesSection: {
      title: 'Fähigkeiten',
      subtitle: 'Wir entwickeln belastbare Systeme von Grund auf neu.',
      items: [
        {
          id: 'web-apps',
          title: 'Web-Architektur',
          description:
            'SPA und SSR Architekturen für den Edge gebaut. Null Layout Shift, sofortige Interaktionen.',
          icon: 'Layout',
        },
        {
          id: 'ai-agents',
          title: 'Angewandte KI',
          description: 'LLMs und semantische Suche direkt mit Ihren Datenpipelines verdrahtet.',
          icon: 'Cpu',
        },
        {
          id: 'cloud-native',
          title: 'Cloud Native',
          description: 'Hochdurchsatz-Microservices, auf serverloser Infrastruktur bereitgestellt.',
          icon: 'Cloud',
        },
        {
          id: 'perf-tuning',
          title: 'Performance',
          description: 'Wir analysieren, auditieren und schreiben langsamen Code neu.',
          icon: 'Zap',
        },
      ],
    },
    workSection: {
      title: 'Produktionssysteme',
      subtitle: 'Architekturen, die wir entwickelt und skaliert haben.',
      items: [
        {
          id: 'icashiq',
          title: 'iCashiq',
          category: 'Fintech',
          description:
            'Eine hochmoderne Finanzlösung zur Optimierung des Cashflows und Bereitstellung tiefer Analysen.',
          metric: '99.9%',
          metricLabel: 'System-Uptime',
          accentColor: 'from-cyan-500/20 to-teal-500/20',
          url: 'https://icashiq.com/',
        },
        {
          id: 'easydocuments',
          title: 'Easy Documents',
          category: 'Enterprise-SaaS',
          description:
            'Sofortige Dokumentenerstellung und Workflow-Orchestrierung für moderne Unternehmen.',
          metric: 'Sofort',
          metricLabel: 'Rendergeschwindigkeit',
          accentColor: 'from-violet-500/20 to-indigo-500/20',
          url: 'https://easydocoments.com/',
        },
        {
          id: 'studentscorner',
          title: 'Students Corner',
          category: 'Edtech-Hub',
          description:
            'Ein einheitliches Portal für Studenten zur Zusammenarbeit, Kursverwaltung und zum Zugriff auf Lerninhalte.',
          metric: '20k+',
          metricLabel: 'Aktive Nutzer monatlich',
          accentColor: 'from-rose-500/20 to-orange-500/20',
          url: 'https://studentscorners.com/',
        },
        {
          id: 'aheeramilk',
          title: 'Aheera Milk',
          category: 'D2C E-Commerce',
          description:
            'Direkt-an-Endkunden-Milchplattform mit automatisierten Abonnements und morgendlicher Frischmilch-Lieferplanung.',
          metric: '24 Std.',
          metricLabel: 'Lieferzyklus',
          accentColor: 'from-emerald-500/20 to-teal-500/20',
          url: 'https://aheeramilk.netlify.app/',
        },
      ],
    },
    beliefsSection: {
      title: 'Woran wir glauben',
      statements: [
        'Engineering sollte unsichtbar sein.',
        'Komplexität ist der Feind der Zuverlässigkeit.',
        'Gehen Sie davon aus, dass das Netzwerk feindlich ist.',
        'Design ist, wie es funktioniert, nicht nur, wie es aussieht.',
        'Obsessive Liebe zum Detail ist der einzige Weg zur Qualität.',
      ],
    },
    principlesSection: {
      title: 'Engineering-Philosophie',
      subtitle: 'Wie wir an Softwareentwicklung herangehen.',
      items: [
        {
          id: 'p1',
          title: 'Kein Abstraktions-Overhead',
          description: 'Wir schreiben Code, um unnötige Tools zu eliminieren.',
        },
        {
          id: 'p2',
          title: 'Design for the Edge',
          description: 'Jede Architekturentscheidung ist auf die Time-to-First-Byte optimiert.',
        },
        {
          id: 'p3',
          title: 'Motion als Kontext',
          description:
            'Wir verabscheuen nutzlose Animationen. Bewegung existiert nur, um Zustandsänderungen zu erklären.',
        },
      ],
    },
    contactTranslations: {
      title: 'Verbindung initialisieren.',
      subtitle: 'Sagen Sie uns, was Sie bauen. Wir geben eine brutal ehrliche Antwort.',
      form: {
        name: 'Name',
        email: 'E-Mail',
        phone: 'Telefon (Optional)',
        company: 'Unternehmen',
        message: 'Technische Details Ihres Problems...',
        submit: 'Anfrage senden',
      },
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      work: 'Nos Réalisations',
      techStack: 'Stack Technique',
      blog: 'Blog',
      contact: 'Contactez-nous',
    },
    hero: {
      badge: "Studio d'ingénierie",
      title: 'Nous construisons des systèmes qui fonctionnent.',
      subtitle:
        "10 ans d'ingénierie nous ont appris que la complexité tue. Nous livrons des logiciels rapides pour les équipes qui ne peuvent pas échouer.",
      ctaPrimary: 'Voir Nos Réalisations',
      ctaSecondary: 'Parler à Un Expert',
    },
    servicesSection: {
      title: 'Capacités',
      subtitle: 'Nous concevons des systèmes résilients de A à Z.',
      items: [
        {
          id: 'web-apps',
          title: 'Architecture Web',
          description:
            "Architectures SPA et SSR conçues pour l'edge. Zéro Layout Shift, interactions instantanées.",
          icon: 'Layout',
        },
        {
          id: 'ai-agents',
          title: 'IA Appliquée',
          description:
            'LLMs et recherche sémantique connectés directement à vos pipelines de données.',
          icon: 'Cpu',
        },
        {
          id: 'cloud-native',
          title: 'Cloud Native',
          description: 'Microservices à haut débit déployés sur une infrastructure serverless.',
          icon: 'Cloud',
        },
        {
          id: 'perf-tuning',
          title: 'Performance',
          description:
            'Nous profilons, auditons et réécrivons le code lent. Nous sommes obsédés par chaque milliseconde.',
          icon: 'Zap',
        },
      ],
    },
    workSection: {
      title: 'Systèmes en Production',
      subtitle: "Architectures que nous avons conçues et mises à l'échelle.",
      items: [
        {
          id: 'icashiq',
          title: 'iCashiq',
          category: 'Fintech',
          description:
            'Une solution financière de pointe conçue pour optimiser les flux de trésorerie et fournir des analyses approfondies.',
          metric: '99.9%',
          metricLabel: 'Disponibilité',
          accentColor: 'from-cyan-500/20 to-teal-500/20',
          url: 'https://icashiq.com/',
        },
        {
          id: 'easydocuments',
          title: 'Easy Documents',
          category: "SaaS d'Entreprise",
          description:
            'Compilation instantanée de documents et orchestrateur de flux de travail conçu pour les entreprises modernes.',
          metric: 'Instantané',
          metricLabel: 'Vitesse de Rendu',
          accentColor: 'from-violet-500/20 to-indigo-500/20',
          url: 'https://easydocoments.com/',
        },
        {
          id: 'studentscorner',
          title: 'Students Corner',
          category: 'Hub Edtech',
          description:
            "Un portail unifié permettant aux étudiants de collaborer, gérer les cours et accéder aux ressources d'apprentissage.",
          metric: '20k+',
          metricLabel: 'Utilisateurs Actifs Mensuels',
          accentColor: 'from-rose-500/20 to-orange-500/20',
          url: 'https://studentscorners.com/',
        },
        {
          id: 'aheeramilk',
          title: 'Aheera Milk',
          category: 'Commerce Électronique D2C',
          description:
            'Plateforme laitière directe aux consommateurs avec abonnements automatisés et planification des livraisons de lait frais le matin.',
          metric: '24 Hr',
          metricLabel: 'Cycle de Livraison',
          accentColor: 'from-emerald-500/20 to-teal-500/20',
          url: 'https://aheeramilk.netlify.app/',
        },
      ],
    },
    beliefsSection: {
      title: 'Ce que nous croyons',
      statements: [
        "L'ingénierie doit être invisible.",
        "La complexité est l'ennemi de la fiabilité.",
        'Partez du principe que le réseau est hostile.',
        'Le design est la façon dont cela fonctionne.',
        "L'attention obsessionnelle aux détails est la seule façon de livrer de la qualité.",
      ],
    },
    principlesSection: {
      title: "Philosophie d'ingénierie",
      subtitle: 'Comment nous abordons la création de logiciels.',
      items: [
        {
          id: 'p1',
          title: "Zéro surcoût d'abstraction",
          description: 'Nous écrivons du code pour éliminer les outils inutiles.',
        },
        {
          id: 'p2',
          title: 'Design for the Edge',
          description: "Chaque décision d'architecture est optimisée pour le time-to-first-byte.",
        },
        {
          id: 'p3',
          title: 'Le mouvement comme contexte',
          description:
            "Nous méprisons l'animation inutile. Le mouvement n'existe que pour expliquer les changements d'état.",
        },
      ],
    },
    contactTranslations: {
      title: 'Initialiser la connexion.',
      subtitle:
        'Dites-nous ce que vous construisez. Nous vous donnerons une réponse brutalement honnête.',
      form: {
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone (Optionnel)',
        company: 'Entreprise',
        message: 'Détails techniques de votre problème...',
        submit: 'Transmettre la Requête',
      },
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      services: 'サービス',
      work: '実績',
      techStack: '技術スタック',
      blog: 'ブログ',
      contact: 'お問い合わせ',
    },
    hero: {
      badge: 'エンジニアリングスタジオ',
      title: '機能するシステムを構築する。',
      subtitle:
        '10年のエンジニアリングが、複雑さは命取りであることを教えてくれました。失敗の許されないチームのために、高速で正確なソフトウェアを提供します。',
      ctaPrimary: '実績を見る',
      ctaSecondary: 'エキスパートに相談',
    },
    servicesSection: {
      title: '能力',
      subtitle: '回復力のあるシステムをゼロから設計します。',
      items: [
        {
          id: 'web-apps',
          title: 'Webアーキテクチャ',
          description:
            'エッジ向けに構築されたSPAおよびSSRアーキテクチャ。レイアウトシフトなし、瞬時のインタラクション。',
          icon: 'Layout',
        },
        {
          id: 'ai-agents',
          title: '応用AI',
          description:
            'データパイプラインに直接組み込まれたLLMとセマンティック検索。真のインテリジェンス。',
          icon: 'Cpu',
        },
        {
          id: 'cloud-native',
          title: 'クラウドネイティブ',
          description:
            'サーバーレスインフラストラクチャにデプロイされた高スループットのマイクロサービス。',
          icon: 'Cloud',
        },
        {
          id: 'perf-tuning',
          title: 'パフォーマンス',
          description:
            '遅いコードをプロファイリングし、監査し、書き直します。1ミリ秒単位にこだわります。',
          icon: 'Zap',
        },
      ],
    },
    workSection: {
      title: '本番システム',
      subtitle: '私たちが設計し、拡張したアーキテクチャ。',
      items: [
        {
          id: 'icashiq',
          title: 'iCashiq',
          category: 'フィンテック',
          description:
            'キャッシュフローを合理化し、詳細な分析を提供する最先端の財務ソリューション。',
          metric: '99.9%',
          metricLabel: 'システム稼働率',
          accentColor: 'from-cyan-500/20 to-teal-500/20',
          url: 'https://icashiq.com/',
        },
        {
          id: 'easydocuments',
          title: 'Easy Documents',
          category: 'エンタープライズSaaS',
          description:
            '現代 of 企業向けに構築された、即時のドキュメント作成とワークフローオーケストレーター。',
          metric: '即時',
          metricLabel: 'レンダリング速度',
          accentColor: 'from-violet-500/20 to-indigo-500/20',
          url: 'https://easydocoments.com/',
        },
        {
          id: 'studentscorner',
          title: 'Students Corner',
          category: 'エドテックハブ',
          description:
            '学生がコラボレーションし、コースを管理し、学習資産にアクセスするための統一ポータル。',
          metric: '20k+',
          metricLabel: '月間アクティブユーザー数',
          accentColor: 'from-rose-500/20 to-orange-500/20',
          url: 'https://studentscorners.com/',
        },
        {
          id: 'aheeramilk',
          title: 'Aheera Milk',
          category: 'D2C Eコマース',
          description:
            '自動サブスクリプションと朝の新鮮な牛乳配達スケジューリングを備えた、消費者直接取引の酪農プラットフォーム。',
          metric: '24時間',
          metricLabel: '配達サイクル',
          accentColor: 'from-emerald-500/20 to-teal-500/20',
          url: 'https://aheeramilk.netlify.app/',
        },
      ],
    },
    beliefsSection: {
      title: '私たちの信念',
      statements: [
        'エンジニアリングは目に見えないものであるべきだ。',
        '複雑さは信頼性の敵である。',
        'ネットワークは敵対的であると想定する。',
        'デザインとは、見た目だけでなく、それがどう機能するかである。',
        '品質を届ける唯一の方法は、細部への異常な執着である。',
      ],
    },
    principlesSection: {
      title: 'エンジニアリング哲学',
      subtitle: 'ソフトウェア構築へのアプローチ。',
      items: [
        {
          id: 'p1',
          title: '抽象化のオーバーヘッドゼロ',
          description: '不要なツールを排除するためにコードを書きます。',
        },
        {
          id: 'p2',
          title: 'エッジのためのデザイン',
          description: 'すべてのアーキテクチャの決定は、Time-to-First-Byteに最適化されています。',
        },
        {
          id: 'p3',
          title: 'コンテキストとしてのモーション',
          description:
            '無駄なアニメーションを軽蔑します。モーションは状態変化を説明するためだけに存在します。',
        },
      ],
    },
    contactTranslations: {
      title: '接続を初期化します。',
      subtitle:
        '何を構築しているのか教えてください。私たちが支援できるかどうか、残酷なほど正直に答えます。',
      form: {
        name: '名前',
        email: 'Eメール',
        phone: '電話番号（任意）',
        company: '会社名',
        message: '問題の技術的な詳細...',
        submit: 'リクエストを送信',
      },
    },
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      work: 'हमारा काम',
      techStack: 'टेक स्टैक',
      blog: 'ब्लॉग',
      contact: 'संपर्क करें',
    },
    hero: {
      badge: 'इंजीनियरिंग स्टूडियो',
      title: 'हम ऐसे सिस्टम बनाते हैं जो काम करते हैं।',
      subtitle:
        '10 साल की इंजीनियरिंग ने हमें सिखाया कि जटिलता मारती है। हम उन टीमों के लिए तेज़, सटीक सॉफ़्टवेयर शिप करते हैं जो विफल नहीं हो सकते।',
      ctaPrimary: 'हमारा काम देखें',
      ctaSecondary: 'विशेषज्ञ से बात करें',
    },
    servicesSection: {
      title: 'क्षमताएं',
      subtitle: 'हम बुनियादी स्तर से लचीले सिस्टम इंजीनियर करते हैं।',
      items: [
        {
          id: 'web-apps',
          title: 'वेब आर्किटेक्चर',
          description:
            'एज के लिए निर्मित एसपीए और एसएसआर आर्किटेक्चर। शून्य लेआउट शिफ्ट, त्वरित इंटरैक्शन।',
          icon: 'Layout',
        },
        {
          id: 'ai-agents',
          title: 'एप्लाइड एआई',
          description: 'एलएलएम और सिमेंटिक सर्च सीधे आपके डेटा पाइपलाइनों से जुड़े हैं।',
          icon: 'Cpu',
        },
        {
          id: 'cloud-native',
          title: 'क्लाउड नेटिव',
          description: 'सर्वरलेस इंफ्रास्ट्रक्चर पर तैनात हाई-थ्रूपुट माइक्रोसर्विसेज।',
          icon: 'Cloud',
        },
        {
          id: 'perf-tuning',
          title: 'प्रदर्शन',
          description:
            'हम धीमे कोड को प्रोफाइल, ऑडिट और फिर से लिखते हैं। हम हर मिलीसेकंड पर ध्यान देते हैं।',
          icon: 'Zap',
        },
      ],
    },
    workSection: {
      title: 'उत्पादन प्रणाली',
      subtitle: 'आर्किटेक्चर जिन्हें हमने इंजीनियर और स्केल किया है।',
      items: [
        {
          id: 'icashiq',
          title: 'iCashiq',
          category: 'फिनटेक',
          description:
            'नकदी प्रवाह को सुव्यवस्थित करने और गहन विश्लेषण प्रदान करने के लिए डिज़ाइन किया गया एक अत्याधुनिक वित्तीय समाधान।',
          metric: '99.9%',
          metricLabel: 'सिस्टम अपटाइम',
          accentColor: 'from-cyan-500/20 to-teal-500/20',
          url: 'https://icashiq.com/',
        },
        {
          id: 'easydocuments',
          title: 'Easy Documents',
          category: 'एंटरप्राइज SaaS',
          description:
            'आधुनिक उद्यमों के लिए निर्मित त्वरित दस्तावेज़ संकलन और कार्यप्रवाह आर्केस्ट्रेटर।',
          metric: 'त्वरित',
          metricLabel: 'रेंडरिंग गति',
          accentColor: 'from-violet-500/20 to-indigo-500/20',
          url: 'https://easydocoments.com/',
        },
        {
          id: 'studentscorner',
          title: 'Students Corner',
          category: 'एडटेक हब',
          description:
            'छात्रों के लिए सहयोग करने, पाठ्यक्रमों का प्रबंधन करने और सीखने की संपत्तियों तक पहुँचने के लिए एक एकीकृत पोर्टल।',
          metric: '20k+',
          metricLabel: 'मासिक सक्रिय उपयोगकर्ता',
          accentColor: 'from-rose-500/20 to-orange-500/20',
          url: 'https://studentscorners.com/',
        },
        {
          id: 'aheeramilk',
          title: 'Aheera Milk',
          category: 'D2C ई-कॉमर्स',
          description:
            'स्वचालित सदस्यता और सुबह की ताजा दूध वितरण शेड्यूलिंग के साथ उपभोक्ता-सीधे डेयरी प्लेटफॉर्म।',
          metric: '24 घंटे',
          metricLabel: 'वितरण चक्र',
          accentColor: 'from-emerald-500/20 to-teal-500/20',
          url: 'https://aheeramilk.netlify.app/',
        },
      ],
    },
    beliefsSection: {
      title: 'हम क्या मानते हैं',
      statements: [
        'इंजीनियरिंग अदृश्य होनी चाहिए।',
        'जटिलता विश्वसनीयता की दुश्मन है।',
        'मान लें कि नेटवर्क शत्रुतापूर्ण है।',
        'डिज़ाइन यह है कि यह कैसे काम करता है, न कि केवल कैसा दिखता है।',
        'गुणवत्ता शिप करने का एकमात्र तरीका विवरण पर जुनूनी ध्यान देना है।',
      ],
    },
    principlesSection: {
      title: 'इंजीनियरिंग दर्शन',
      subtitle: 'सॉफ्टवेयर बनाने के प्रति हमारा दृष्टिकोण।',
      items: [
        {
          id: 'p1',
          title: 'शून्य एब्स्ट्रेक्शन ओवरहेड',
          description: 'हम अनावश्यक उपकरणों को खत्म करने के लिए कोड लिखते हैं।',
        },
        {
          id: 'p2',
          title: 'एज के लिए डिज़ाइन',
          description: 'प्रत्येक आर्किटेक्चर निर्णय टाइम-टू-फर्स्ट-बाइट के लिए अनुकूलित है।',
        },
        {
          id: 'p3',
          title: 'संदर्भ के रूप में गति',
          description:
            'हम बेकार एनीमेशन से नफरत करते हैं। गति केवल स्थिति परिवर्तन को समझाने के लिए मौजूद है।',
        },
      ],
    },
    contactTranslations: {
      title: 'कनेक्शन प्रारंभ करें।',
      subtitle: 'हमें बताएं कि आप क्या बना रहे हैं। हम आपको पूरी तरह से ईमानदार जवाब देंगे।',
      form: {
        name: 'नाम',
        email: 'ईमेल',
        phone: 'फ़ोन (वैकल्पिक)',
        company: 'कंपनी',
        message: 'आपकी समस्या का तकनीकी विवरण...',
        submit: 'अनुरोध प्रेषित करें',
      },
    },
  },
};
