// ============================================
// SERVICES & CASE STUDIES DATA
// ============================================

export interface CaseStudy {
  id: string;
  client: string;
  project: string;
  description: string;
  image: string;
  tags: string[];
  results?: string;
  link?: string;
  isPortfolio?: boolean;
}

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
  isPlaceholder?: boolean;
}

export interface Metric {
  value: string;
  label: string;
  isPlaceholder?: boolean;
}

// ============================================
// CASE STUDIES
// ============================================

export const caseStudies: CaseStudy[] = [
  {
    id: "merrill-lynch",
    client: "Merrill Lynch",
    project: "Login Flow Redesign",
    description:
      "Modernized the authentication experience for one of the world's largest wealth management firms. Streamlined the login flow while maintaining enterprise security standards.",
    image: "/images/misc/sign-in-redesign.jpg",
    tags: ["Financial Services", "Authentication", "Enterprise"],
    results: "Reduced login friction by 40%",
  },
  {
    id: "charles-schwab",
    client: "Charles Schwab",
    project: "Dashboard Refresh",
    description:
      "Transformed the trading platform's dashboard with a contemporary design language. Enhanced data visualization and improved user navigation patterns.",
    image: "/images/misc/updated-design.jpg",
    tags: ["Financial Services", "Dashboard", "Data Viz"],
    results: "Increased user engagement 2.5x",
  },
  {
    id: "rising-team",
    client: "Rising Team",
    project: "Platform Modernization",
    description:
      "Complete product redesign from legacy interface to modern, responsive platform. Built a scalable design system for future growth.",
    image: "/images/misc/desktop-design.jpg",
    tags: ["SaaS", "Full Redesign", "Design System"],
    results: "60% reduction in support tickets",
  },
];

// ============================================
// PORTFOLIO WEBSITES
// ============================================

export const portfolioSites: CaseStudy[] = [
  {
    id: "jacob-gruver",
    client: "Jacob Gruver",
    project: "Personal Portfolio",
    description:
      "A modern, data-driven design portfolio featuring multiple selectable themes, metrics-heavy presentation, and a playful technical aesthetic. Showcases 11+ years of UX/UI experience across automotive, aerospace, healthcare, and AI sectors.",
    image: "/images/portfolio/jacobgruver.png",
    tags: ["Portfolio", "Multi-Theme", "Personal Brand"],
    results: "13+ featured projects",
    link: "https://www.jacobgruver.com",
    isPortfolio: true,
  },
  {
    id: "spicecraft",
    client: "SpiceCraft",
    project: "Wellness Platform",
    description:
      "A multi-platform wellness application dedicated to natural health through herbs and spices. Features a searchable database, health benefits, recipes, and educational content on ancestral wellness practices.",
    image: "/images/portfolio/spicecraft.png",
    tags: ["Wellness", "Web App", "Cross-Platform"],
    results: "4.8 star rating",
    link: "https://www.spicecraft.world",
    isPortfolio: true,
  },
  {
    id: "hk3k",
    client: "HK3K",
    project: "Knowledge Management App",
    description:
      "A retro-futuristic arcade aesthetic SaaS landing page with vibrant neon colors, glassmorphism, animated gamified interactions, Easter eggs, and a 'Nitro Mode' with intense visual effects.",
    image: "/images/portfolio/hk3k.png",
    tags: ["SaaS", "Gamified", "AI"],
    results: "Waitlist launch",
    link: "https://www.hk3k.ai",
    isPortfolio: true,
  },
  {
    id: "42robots",
    client: "42Robots AI",
    project: "Enterprise AI Platform",
    description:
      "A modern B2B SaaS marketing website for AI-powered business solutions. Dark-themed corporate aesthetic with clean typography, visual feature demos, and metrics-driven testimonials.",
    image: "/images/portfolio/42robots.png",
    tags: ["AI/ML", "Enterprise", "SaaS"],
    results: "60% faster deployment",
    link: "https://www.42robots.ai",
    isPortfolio: true,
  },
  {
    id: "lux-markets",
    client: "Lux Markets",
    project: "Luxury Marketplace",
    description:
      "A dark luxury aesthetic dashboard for a premium marketplace connecting properties with CPG brands. Features gold accents, sophisticated typography, and smooth hover interactions with a card-based layout.",
    image: "/images/portfolio/luxmarkets.png",
    tags: ["Luxury", "Dashboard", "B2B"],
    results: "7 homepage variations",
    link: "https://www.luxmarketsbyjacob.org",
    isPortfolio: true,
  },
  {
    id: "paralogic-presents",
    client: "Paralogic Presents",
    project: "Event Promotion Website",
    description:
      "An elegant event promotion website featuring exclusive meet-and-greet experiences with Emmy and Golden Globe-winning actor Bruce Davison. Showcases film screenings, art gallery exhibitions, Q&A sessions, and fan interactions with a refined, sophisticated design.",
    image: "/images/portfolio/paralogic.png",
    tags: ["Events", "Entertainment", "Marketing"],
    results: "3-day event launch",
    link: "https://www.paralogicpresents.com",
    isPortfolio: true,
  },
];

// ============================================
// SERVICE TIERS
// ============================================

export const serviceTiers: ServiceTier[] = [
  {
    id: "audit",
    name: "Audit",
    price: "Free",
    priceNote: "No obligation",
    description: "Comprehensive review of your current product with actionable recommendations.",
    features: [
      "UX/UI assessment report",
      "Performance analysis",
      "Accessibility review",
      "Competitor comparison",
      "Priority recommendations",
    ],
    ctaText: "Get Free Audit",
  },
  {
    id: "refresh",
    name: "Refresh",
    price: "Starting at $5k",
    priceNote: "Per project",
    description: "Targeted updates to breathe new life into your existing product.",
    features: [
      "Everything in Audit",
      "UI component updates",
      "Single feature redesign",
      "Design file delivery",
      "Developer handoff docs",
      "2 revision rounds",
    ],
    highlighted: true,
    ctaText: "Start Refresh",
  },
  {
    id: "transform",
    name: "Transform",
    price: "Custom",
    priceNote: "Ongoing partnership",
    description: "Full redesign with ongoing support to keep your product evolving.",
    features: [
      "Everything in Refresh",
      "Complete redesign",
      "Design system creation",
      "Prototype & testing",
      "Implementation support",
      "Monthly maintenance",
      "Priority support",
    ],
    ctaText: "Discuss Project",
  },
];

// ============================================
// METRICS (Placeholders - Update with real data)
// ============================================

export const metrics: Metric[] = [
  {
    value: "40%",
    label: "Faster Load Times",
    isPlaceholder: true,
  },
  {
    value: "2.5x",
    label: "User Engagement",
    isPlaceholder: true,
  },
  {
    value: "15+",
    label: "Enterprise Clients",
    isPlaceholder: true,
  },
  {
    value: "60%",
    label: "Fewer Support Tickets",
    isPlaceholder: true,
  },
];

// ============================================
// TESTIMONIALS (Placeholders - Update with real quotes)
// ============================================

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Working with Compassionate Design transformed our product. Their attention to detail and user-focused approach exceeded our expectations.",
    author: "Client Name",
    title: "VP of Product",
    company: "Company Name",
    isPlaceholder: true,
  },
  {
    id: "testimonial-2",
    quote:
      "The team delivered a modern, intuitive interface that our users love. Our engagement metrics have never been better.",
    author: "Client Name",
    title: "Head of Design",
    company: "Company Name",
    isPlaceholder: true,
  },
  {
    id: "testimonial-3",
    quote:
      "From audit to implementation, the process was seamless. They truly understand how to modernize enterprise products without disrupting workflows.",
    author: "Client Name",
    title: "CTO",
    company: "Company Name",
    isPlaceholder: true,
  },
];
