export type IPCategory = "sdk" | "investment";
export type IPStatus = "available" | "beta" | "alpha" | "concept" | "seeking-investment";
export type DevelopmentStage = "production" | "beta" | "alpha" | "prototype" | "concept";

export interface InvestorData {
  marketSize: string;
  targetAudience: string;
  revenueModel: string;
  competitiveAdvantage: string;
  fundingNeeded?: string;
  projectedROI?: string;
}

export interface IP {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: IPCategory;
  status: IPStatus;
  developmentStage: DevelopmentStage;
  orbitRadius: number; // For Mission Control visualization
  orbitSpeed: number; // Relative orbit speed
  color: string; // Accent color for the IP
  investorData: InvestorData;
  features?: string[];
  link?: string;
}

export const ips: IP[] = [
  // SDK Products - Inner Orbit (Available/Near-Ready)
  {
    id: "incharacter",
    title: "InCharacter",
    tagline: "AI-Powered Character Conversations",
    description:
      "SDK enabling developers to create AI characters that maintain consistent personalities across conversations. Perfect for games, educational apps, and interactive experiences.",
    image: "/images/products/pirate-robot-cartoon.png",
    category: "sdk",
    status: "available",
    developmentStage: "production",
    orbitRadius: 1.2,
    orbitSpeed: 1.0,
    color: "#00F5FF",
    investorData: {
      marketSize: "$4.2B Character AI Market by 2028",
      targetAudience: "Game developers, EdTech companies, Entertainment studios",
      revenueModel: "API usage-based pricing + Enterprise licensing",
      competitiveAdvantage: "Proprietary personality persistence engine",
    },
    features: [
      "Persistent character memory",
      "Multi-platform SDK",
      "Real-time personality adaptation",
    ],
  },
  {
    id: "proximus",
    title: "Proximus",
    tagline: "Location-Aware Social Gaming",
    description:
      "SDK for building proximity-based multiplayer experiences. Players discover and interact with others nearby, creating organic social gaming moments.",
    image: "/images/products/proximus-poster.jpg",
    category: "sdk",
    status: "beta",
    developmentStage: "beta",
    orbitRadius: 1.5,
    orbitSpeed: 0.85,
    color: "#A855F7",
    investorData: {
      marketSize: "$12B Location-Based Gaming Market",
      targetAudience: "Mobile game studios, Social app developers",
      revenueModel: "SDK licensing + Revenue share on in-app purchases",
      competitiveAdvantage: "Battery-efficient location algorithms",
    },
    features: [
      "Low-power Bluetooth discovery",
      "Privacy-first architecture",
      "Cross-platform support",
    ],
  },
  {
    id: "paper-beats-rock",
    title: "Paper Beats Rock",
    tagline: "Strategic Twist on a Classic",
    description:
      "A strategic multiplayer game framework that transforms simple mechanics into deep competitive experiences. SDK includes matchmaking, ranking, and tournament systems.",
    image: "/images/products/paper-beats-rock.jpg",
    category: "sdk",
    status: "available",
    developmentStage: "production",
    orbitRadius: 1.3,
    orbitSpeed: 1.1,
    color: "#FFD700",
    investorData: {
      marketSize: "$2.1B Casual Competitive Gaming",
      targetAudience: "Casual game developers, Esports platforms",
      revenueModel: "White-label licensing + Tournament fees",
      competitiveAdvantage: "Proven engagement mechanics, 85% day-7 retention",
    },
    features: [
      "ELO matchmaking",
      "Tournament scaffolding",
      "Spectator mode API",
    ],
  },
  {
    id: "and-chill",
    title: "&chill",
    tagline: "Watch Together, Anywhere",
    description:
      "SDK for synchronized media viewing experiences. Enables developers to build virtual movie nights, watch parties, and co-viewing features into any application.",
    image: "/images/products/vr-theatre-date.png",
    category: "sdk",
    status: "beta",
    developmentStage: "beta",
    orbitRadius: 1.6,
    orbitSpeed: 0.75,
    color: "#FF006E",
    investorData: {
      marketSize: "$8.5B Social Streaming Market",
      targetAudience: "Streaming platforms, Social apps, Dating apps",
      revenueModel: "Per-user monthly fee + Enterprise licensing",
      competitiveAdvantage: "Sub-100ms sync across all devices",
    },
    features: [
      "Real-time video sync",
      "Spatial audio chat",
      "Multi-platform support",
    ],
  },
  {
    id: "rewarding",
    title: "RewarDING!",
    tagline: "Gamification That Actually Works",
    description:
      "Comprehensive rewards and achievements SDK. Drop-in gamification for any app—points, badges, leaderboards, and behavioral psychology-backed engagement loops.",
    image: "/images/products/product-screenshot-1.png",
    category: "sdk",
    status: "alpha",
    developmentStage: "alpha",
    orbitRadius: 1.8,
    orbitSpeed: 0.65,
    color: "#10B981",
    investorData: {
      marketSize: "$15.4B Gamification Market by 2027",
      targetAudience: "Fitness apps, EdTech, Enterprise software",
      revenueModel: "Tiered SaaS pricing",
      competitiveAdvantage: "Behavioral science-driven reward timing",
    },
    features: [
      "A/B tested reward loops",
      "Analytics dashboard",
      "No-code integration option",
    ],
  },
  {
    id: "space-surfing",
    title: "Space Surfing",
    tagline: "Physics-Based Multiplayer Framework",
    description:
      "SDK for building physics-driven multiplayer experiences. Perfect for racing games, sports titles, and any game requiring deterministic physics across clients.",
    image: "/images/products/product-screenshot-2.png",
    category: "sdk",
    status: "alpha",
    developmentStage: "alpha",
    orbitRadius: 2.0,
    orbitSpeed: 0.55,
    color: "#06B6D4",
    investorData: {
      marketSize: "$5.8B Racing Game Market",
      targetAudience: "Indie game studios, Racing game developers",
      revenueModel: "Per-title licensing + Revenue share",
      competitiveAdvantage: "Deterministic physics rollback netcode",
    },
    features: [
      "Rollback netcode",
      "Replay system",
      "Leaderboard integration",
    ],
  },

  // Investment IPs - Outer Orbit (Seeking Funding)
  {
    id: "darwins-ark",
    title: "Darwin's Ark",
    tagline: "Evolution Strategy MMO",
    description:
      "A massively multiplayer strategy game where players guide species through millions of years of evolution. Compete, adapt, and dominate ecosystems in this scientifically-grounded experience.",
    image: "/images/misc/dabw-4.jpg",
    category: "investment",
    status: "seeking-investment",
    developmentStage: "concept",
    orbitRadius: 2.8,
    orbitSpeed: 0.35,
    color: "#22C55E",
    investorData: {
      marketSize: "$3.2B Strategy MMO Market",
      targetAudience: "Strategy gamers, Science enthusiasts, Ages 18-45",
      revenueModel: "F2P with cosmetics + Season pass",
      competitiveAdvantage: "Partnership with natural history museums",
      fundingNeeded: "$2.5M Seed Round",
      projectedROI: "4.2x over 5 years",
    },
    features: [
      "Real evolutionary mechanics",
      "Persistent world",
      "Educational partnerships",
    ],
  },
  {
    id: "dignity",
    title: "Dignity",
    tagline: "Narrative RPG About Human Rights",
    description:
      "An emotionally powerful narrative RPG exploring human rights across different eras and cultures. Players experience history through the eyes of those who fought for dignity.",
    image: "/images/misc/dbw-2.jpg",
    category: "investment",
    status: "seeking-investment",
    developmentStage: "prototype",
    orbitRadius: 3.2,
    orbitSpeed: 0.3,
    color: "#F59E0B",
    investorData: {
      marketSize: "$1.8B Narrative Game Market",
      targetAudience: "Story-driven gamers, Educational institutions",
      revenueModel: "Premium + Educational licensing",
      competitiveAdvantage: "Partnership with Amnesty International",
      fundingNeeded: "$1.8M Series A",
      projectedROI: "3.5x over 4 years",
    },
    features: [
      "Branching narratives",
      "Historical accuracy",
      "Educational certification",
    ],
  },
  {
    id: "masquerade-online",
    title: "Masquerade Online",
    tagline: "Social Deduction MMO",
    description:
      "A Victorian-era social deduction MMO where every player wears a mask. Build alliances, uncover secrets, and navigate a world where no one is who they seem.",
    image: "/images/misc/vampire-game-cover.png",
    category: "investment",
    status: "seeking-investment",
    developmentStage: "concept",
    orbitRadius: 3.5,
    orbitSpeed: 0.25,
    color: "#8B5CF6",
    investorData: {
      marketSize: "$2.4B Social Deduction Genre",
      targetAudience: "Among Us players, Social gamers, Ages 16-35",
      revenueModel: "F2P + Mask/costume cosmetics",
      competitiveAdvantage: "Persistent reputation system",
      fundingNeeded: "$3.2M Seed Round",
      projectedROI: "5.1x over 5 years",
    },
    features: [
      "Persistent social reputation",
      "Player-driven events",
      "Live mystery seasons",
    ],
  },
  {
    id: "smash-the-police-state",
    title: "Smash the Police State",
    tagline: "Tactical Resistance Strategy",
    description:
      "A thought-provoking tactical strategy game about organizing resistance against authoritarianism. Inspired by real movements, players coordinate protests and civil disobedience.",
    image: "/images/misc/rebels-game-cover.png",
    category: "investment",
    status: "seeking-investment",
    developmentStage: "prototype",
    orbitRadius: 3.8,
    orbitSpeed: 0.2,
    color: "#EF4444",
    investorData: {
      marketSize: "$1.2B Political/Strategy Niche",
      targetAudience: "Politically engaged gamers, Ages 18-40",
      revenueModel: "Premium release + DLC campaigns",
      competitiveAdvantage: "Advisor board of activists and historians",
      fundingNeeded: "$1.5M Seed Round",
      projectedROI: "2.8x over 3 years",
    },
    features: [
      "Historical campaign modes",
      "Procedural scenarios",
      "Community mod support",
    ],
  },
];

// Helper functions for filtering
export const getSDKProducts = () => ips.filter((ip) => ip.category === "sdk");
export const getInvestmentIPs = () => ips.filter((ip) => ip.category === "investment");
export const getAvailableProducts = () => ips.filter((ip) => ip.status === "available");

// Legacy export for backward compatibility
export const products = ips;
export type Product = IP;

export interface TeamMember {
  name: string;
  role: string;
  class: string; // RPG-style class
  stats: {
    creativity: number;
    technical: number;
    leadership: number;
    chaos: number;
  };
}

export interface TeamDivision {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  members: TeamMember[];
}

export const teamMembers: TeamDivision[] = [
  {
    id: "product",
    title: "Product Division",
    description: "Visionary leaders steering the ship toward innovation.",
    image: "/images/team/cyborgs-leadership.png",
    color: "#FF006E", // Magenta
    members: [
      {
        name: "Jacob Gruver",
        role: "Head of Design",
        class: "Design Overlord",
        stats: { creativity: 98, technical: 85, leadership: 92, chaos: 77 },
      },
      {
        name: "Matthew Feinberg",
        role: "Director of Product",
        class: "Product Sage",
        stats: { creativity: 88, technical: 79, leadership: 95, chaos: 42 },
      },
    ],
  },
  {
    id: "design",
    title: "Design Division",
    description: "Crafting interfaces that feel like magic.",
    image: "/images/team/cyborgs-designing.png",
    color: "#A855F7", // Violet
    members: [
      {
        name: "Jeremy Summer",
        role: "UI Specialist",
        class: "Pixel Wizard",
        stats: { creativity: 95, technical: 82, leadership: 68, chaos: 55 },
      },
      {
        name: "Paul Paulino",
        role: "UX/UI & Design Ops",
        class: "Flow Master",
        stats: { creativity: 91, technical: 78, leadership: 75, chaos: 38 },
      },
      {
        name: "Richard Guillory",
        role: "Media Design Specialist",
        class: "Visual Alchemist",
        stats: { creativity: 97, technical: 71, leadership: 62, chaos: 83 },
      },
    ],
  },
  {
    id: "engineering",
    title: "Development Division",
    description: "Building the impossible, one line of code at a time.",
    image: "/images/team/cyborgs-coding.png",
    color: "#00F5FF", // Cyan
    members: [
      {
        name: "Jarred Jacobs",
        role: "Full Stack Developer",
        class: "Code Ninja",
        stats: { creativity: 72, technical: 96, leadership: 70, chaos: 61 },
      },
      {
        name: "Ryan Anderson",
        role: "Full Stack Developer",
        class: "Stack Sorcerer",
        stats: { creativity: 75, technical: 94, leadership: 65, chaos: 58 },
      },
    ],
  },
];
