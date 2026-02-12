// ============================================
// SERVICES & CASE STUDIES DATA
// ============================================

export interface CaseStudy {
  id: string;
  client: string;
  project: string;
  description: string;
  image: string;
  comparisonImage?: string; // Original/competitor design for before/after comparison
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

export interface OngoingService {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
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
    comparisonImage: "/images/portfolio/merrill.png",
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
    comparisonImage: "/images/portfolio/schwab.png",
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
    comparisonImage: "/images/portfolio/risingteam.png",
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
    id: "foundation",
    name: "Foundation",
    price: "Starting at $5,000",
    priceNote: "Full project",
    description: "Complete website or app design with a polished, professional result.",
    features: [
      "Free discovery call",
      "Full website or app design",
      "Mobile responsive",
      "Design file delivery",
      "Developer handoff docs",
      "2 revision rounds",
      "Project complete in 4–6 weeks",
    ],
    highlighted: true,
    ctaText: "Get Started",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$15,000–$50,000",
    priceNote: "Ongoing partnership",
    description: "Full redesign with design systems, prototyping, and ongoing support.",
    features: [
      "Free UX/UI audit",
      "Complete product redesign",
      "Design system creation",
      "Prototype & user testing",
      "Implementation support",
      "Monthly maintenance",
      "Priority support",
      "Dedicated design lead",
    ],
    ctaText: "Schedule a Call",
  },
];

// ============================================
// ONGOING SERVICES
// ============================================

export const ongoingServices: OngoingService[] = [
  {
    id: "domain",
    name: "Domain Registration",
    price: "$35",
    period: "per year",
    description: "Secure your perfect domain name with full DNS management.",
    features: [
      "Domain registration & renewal",
      "DNS management",
      "Domain privacy protection",
      "Email forwarding setup",
    ],
  },
  {
    id: "hosting",
    name: "Website Hosting",
    price: "$49",
    period: "per month",
    description: "Fast, reliable hosting with SSL and daily backups.",
    features: [
      "High-performance hosting",
      "Free SSL certificate",
      "Daily backups",
      "99.9% uptime guarantee",
      "CDN included",
    ],
  },
  {
    id: "maintenance",
    name: "Maintenance & Updates",
    price: "$149",
    period: "per month",
    description: "Keep your site fresh, secure, and running smoothly.",
    features: [
      "Monthly content updates",
      "Security patches",
      "Performance monitoring",
      "Bug fixes",
      "Priority email support",
      "2 hours of updates included",
    ],
  },
  {
    id: "bundle",
    name: "Complete Care",
    price: "$299",
    period: "per month",
    description: "All-inclusive package: hosting, maintenance, strategy, and peace of mind.",
    features: [
      "Everything in Hosting",
      "Everything in Maintenance",
      "Domain renewal included",
      "Monthly analytics reports",
      "Quarterly strategy call",
      "SEO monitoring",
      "Priority support",
      "4 hours of updates included",
    ],
  },
];

// ============================================
// METRICS
// ============================================

export const metrics: Metric[] = [
  {
    value: "40%",
    label: "Login Friction Reduced",
  },
  {
    value: "2.5x",
    label: "Engagement Increase",
  },
  {
    value: "30M+",
    label: "Vehicles Shipped",
  },
  {
    value: "60%",
    label: "Support Tickets Reduced",
  },
];

// ============================================
// TESTIMONIALS (Real LinkedIn recommendations)
// ============================================

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-ahmer",
    quote:
      "I quickly came to depend on Jacob's insight into thinking through multi-system interactions with complex requirements. While many designers consider the end user and creating an intuitive design, a great designer also considers the environment and safety needs of those users. Jacob consistently exceeded that bar of user empathy.",
    author: "Ahmer Khan",
    title: "AI & Decision Insights Lead",
    company: "CloudCar",
  },
  {
    id: "testimonial-feinberg",
    quote:
      "Having him on the team is akin to having an extra Product Manager. Jacob is capable of leading other designers, working directly with stakeholders and C-Suite individuals, and can be counted on to deliver a breadth of work in a timely manner. Jacob goes the extra mile and can be counted on to research his decisions and be up to date on the latest Best Practices.",
    author: "Matthew Feinberg",
    title: "Director of Product",
    company: "20+ Years in Product & Engineering",
  },
  {
    id: "testimonial-tomter",
    quote:
      "Jacob is an exemplary UI UX Professional with an abundance of expertise in the industry, as well as a calming and professional demeanor. I really admired the way he was able to lift up other team members and help them to see the way forward when it felt like work was ambiguous or frustrating.",
    author: "Christina Tomter",
    title: "IT Professional",
    company: "Amperon (Clean Energy)",
  },
  {
    id: "testimonial-kinlaw",
    quote:
      "Jacob is a kind, thoughtful, highly talented UI/UX designer who was instrumental in designing/restructuring our internal CRM app. Using best practices, relentless focus, and tenacious attention to detail, he delivered a best-in-class experience for our users. Jacob's positivity lights up the room and is an absolute delight to work with.",
    author: "Matthew Kinlaw",
    title: "Executive Director, Commercial Solutions Lead",
    company: "",
  },
  {
    id: "testimonial-sankar",
    quote:
      "Jacob was immensely helpful in coming up with the final product design, driving numerous white-boarding and brainstorming sessions. His expertise was one of the key drivers for this project. The end result was a well received design with great feedback from the management and end users.",
    author: "Aravind Sankar",
    title: "Software Engineer",
    company: "Walmart",
  },
];
