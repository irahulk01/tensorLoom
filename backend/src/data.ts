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
}

export interface ContentData {
  nav: {
    services: string;
    work: string;
    thinking: string;
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
      services: 'Architecture',
      work: 'Systems',
      thinking: 'Philosophy',
      contact: 'Connect',
    },
    hero: {
      badge: 'Engineering Studio',
      title: 'We build brands that are clear, cohesive, and built to last.',
      subtitle:
        '10 years of engineering taught us that complexity kills. We ship fast, precise software for teams that cannot afford to fail.',
      ctaPrimary: 'Initialize Project',
      ctaSecondary: 'Inspect Systems',
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
      title: 'Production Systems',
      subtitle: "Architectures we've engineered and scaled.",
      items: [
        {
          id: 'quantum',
          title: 'Quantum Nexus',
          category: 'Real-time Telemetry',
          description: 'A decentralized pipeline processing sub-millisecond sensor data globally.',
          metric: '< 5ms',
          metricLabel: 'Latency',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'synapse',
          title: 'Synapse Engine',
          category: 'Transaction Layer',
          description:
            'A headless transaction engine that powers massive flash sales without throttling.',
          metric: '99.99%',
          metricLabel: 'Uptime',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'loomflow',
          title: 'Loomflow Core',
          category: 'Internal Infrastructure',
          description:
            'An AI-assisted routing platform that parallelizes support ticket resolution.',
          metric: '40%',
          metricLabel: 'Efficiency Gain',
          accentColor: 'from-zinc-400 to-zinc-600',
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
      services: 'Arquitectura',
      work: 'Sistemas',
      thinking: 'Filosofía',
      contact: 'Conectar',
    },
    hero: {
      badge: 'Estudio de Ingeniería',
      title: 'Construimos sistemas que funcionan.',
      subtitle:
        '10 años de ingeniería nos enseñaron que la complejidad mata. Entregamos software rápido y preciso para equipos que no pueden darse el lujo de fallar.',
      ctaPrimary: 'Inicializar Proyecto',
      ctaSecondary: 'Inspeccionar Sistemas',
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
          id: 'quantum',
          title: 'Quantum Nexus',
          category: 'Telemetría en Tiempo Real',
          description:
            'Una tubería descentralizada procesando datos de sensores en submilisegundos globalmente.',
          metric: '< 5ms',
          metricLabel: 'Latencia',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'synapse',
          title: 'Synapse Engine',
          category: 'Capa de Transacción',
          description: 'Un motor de transacciones sin cabeza para ventas masivas.',
          metric: '99.99%',
          metricLabel: 'Uptime',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'loomflow',
          title: 'Loomflow Core',
          category: 'Infraestructura Interna',
          description: 'Una plataforma de enrutamiento asistida por IA.',
          metric: '40%',
          metricLabel: 'Eficiencia',
          accentColor: 'from-zinc-400 to-zinc-600',
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
      services: 'Architektur',
      work: 'Systeme',
      thinking: 'Philosophie',
      contact: 'Verbinden',
    },
    hero: {
      badge: 'Engineering Studio',
      title: 'Wir bauen Systeme, die funktionieren.',
      subtitle:
        '10 Jahre Engineering haben uns gelehrt: Komplexität tötet. Wir liefern schnelle, präzise Software für Teams, die sich keine Fehler leisten können.',
      ctaPrimary: 'Projekt initialisieren',
      ctaSecondary: 'Systeme inspizieren',
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
          id: 'quantum',
          title: 'Quantum Nexus',
          category: 'Echtzeit-Telemetrie',
          description:
            'Eine dezentrale Pipeline, die globale Sensordaten im Sub-Millisekundenbereich verarbeitet.',
          metric: '< 5ms',
          metricLabel: 'Latenz',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'synapse',
          title: 'Synapse Engine',
          category: 'Transaktionsschicht',
          description: 'Eine Headless-Transaktions-Engine, die massive Flash-Sales antreibt.',
          metric: '99.99%',
          metricLabel: 'Uptime',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'loomflow',
          title: 'Loomflow Core',
          category: 'Interne Infrastruktur',
          description: 'Eine KI-gestützte Routing-Plattform.',
          metric: '40%',
          metricLabel: 'Effizienz',
          accentColor: 'from-zinc-400 to-zinc-600',
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
      services: 'Architecture',
      work: 'Systèmes',
      thinking: 'Philosophie',
      contact: 'Connecter',
    },
    hero: {
      badge: "Studio d'ingénierie",
      title: 'Nous construisons des systèmes qui fonctionnent.',
      subtitle:
        "10 ans d'ingénierie nous ont appris que la complexité tue. Nous livrons des logiciels rapides pour les équipes qui ne peuvent pas échouer.",
      ctaPrimary: 'Initialiser le Projet',
      ctaSecondary: 'Inspecter les Systèmes',
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
          id: 'quantum',
          title: 'Quantum Nexus',
          category: 'Télémétrie en temps réel',
          description:
            "Un pipeline décentralisé traitant des données de capteurs en moins d'une milliseconde.",
          metric: '< 5ms',
          metricLabel: 'Latence',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'synapse',
          title: 'Synapse Engine',
          category: 'Couche de Transaction',
          description: 'Un moteur de transaction headless pour les ventes flash massives.',
          metric: '99.99%',
          metricLabel: 'Uptime',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'loomflow',
          title: 'Loomflow Core',
          category: 'Infrastructure Interne',
          description: 'Une plateforme de routage assistée par IA.',
          metric: '40%',
          metricLabel: 'Efficacité',
          accentColor: 'from-zinc-400 to-zinc-600',
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
      services: 'アーキテクチャ',
      work: 'システム',
      thinking: '哲学',
      contact: '接続',
    },
    hero: {
      badge: 'エンジニアリングスタジオ',
      title: '機能するシステムを構築する。',
      subtitle:
        '10年のエンジニアリングが、複雑さは命取りであることを教えてくれました。失敗の許されないチームのために、高速で正確なソフトウェアを提供します。',
      ctaPrimary: 'プロジェクトの初期化',
      ctaSecondary: 'システムの検査',
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
          id: 'quantum',
          title: 'Quantum Nexus',
          category: 'リアルタイムテレメトリ',
          description: 'グローバルなセンサーデータをミリ秒単位で処理する分散パイプライン。',
          metric: '< 5ms',
          metricLabel: 'レイテンシ',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'synapse',
          title: 'Synapse Engine',
          category: 'トランザクション層',
          description: '大規模なフラッシュセールを処理するヘッドレストランザクションエンジン。',
          metric: '99.99%',
          metricLabel: '稼働率',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'loomflow',
          title: 'Loomflow Core',
          category: '内部インフラストラクチャ',
          description: 'AI支援のルーティングプラットフォーム。',
          metric: '40%',
          metricLabel: '効率向上',
          accentColor: 'from-zinc-400 to-zinc-600',
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
      services: 'आर्किटेक्चर',
      work: 'सिस्टम',
      thinking: 'दर्शन',
      contact: 'जुड़ें',
    },
    hero: {
      badge: 'इंजीनियरिंग स्टूडियो',
      title: 'हम ऐसे सिस्टम बनाते हैं जो काम करते हैं।',
      subtitle:
        '10 साल की इंजीनियरिंग ने हमें सिखाया कि जटिलता मारती है। हम उन टीमों के लिए तेज़, सटीक सॉफ़्टवेयर शिप करते हैं जो विफल नहीं हो सकते।',
      ctaPrimary: 'प्रोजेक्ट शुरू करें',
      ctaSecondary: 'सिस्टम का निरीक्षण करें',
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
          id: 'quantum',
          title: 'क्वांटम नेक्सस',
          category: 'रीयल-टाइम टेलीमेट्री',
          description: 'सब-मिलीसेकंड सेंसर डेटा को संसाधित करने वाली एक विकेन्द्रीकृत पाइपलाइन।',
          metric: '< 5ms',
          metricLabel: 'विलंबता',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'synapse',
          title: 'सिनैप्स इंजन',
          category: 'लेनदेन परत',
          description: 'एक हेडलेस ट्रांजेक्शन इंजन जो बड़े पैमाने पर बिक्री को शक्ति देता है।',
          metric: '99.99%',
          metricLabel: 'अपटाइम',
          accentColor: 'from-zinc-400 to-zinc-600',
        },
        {
          id: 'loomflow',
          title: 'लूमफ्लो कोर',
          category: 'आंतरिक अवसंरचना',
          description: 'एक एआई-समर्थित रूटिंग प्लेटफॉर्म।',
          metric: '40%',
          metricLabel: 'दक्षता',
          accentColor: 'from-zinc-400 to-zinc-600',
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
