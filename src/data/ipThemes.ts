// ============================================
// IP-SPECIFIC DESIGN THEMES
// ============================================
// Each IP has a unique visual identity that transforms
// the card on hover to match its game's design system.

export interface IPTheme {
  // Colors
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  gradient: string;

  // Typography
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";

  // Visual Effects
  borderStyle: "solid" | "dashed" | "double" | "none";
  borderWidth: string;
  borderRadius: string;
  glowColor: string;
  glowIntensity: number; // 0-1
  backdropBlur: string;

  // Patterns & Textures
  patternOverlay?: string; // CSS background pattern
  textureOpacity: number;

  // Animation
  hoverScale: number;
  hoverRotate: number; // degrees
  transitionStyle: "smooth" | "snappy" | "bouncy" | "dramatic";

  // Special Effects
  specialEffect?: "particles" | "scanlines" | "noise" | "vignette" | "spotlight" | "none";
}

export const ipThemes: Record<string, IPTheme> = {
  // ============================================
  // SDK PRODUCTS
  // ============================================

  // InCharacter - Theatrical & Warm
  incharacter: {
    primary: "#E8A87C", // Warm amber
    secondary: "#D4796A", // Soft coral
    accent: "#4A4A4A", // Charcoal
    background: "rgba(26, 22, 20, 0.95)", // Warm dark
    text: "#F5E6D3", // Cream
    gradient: "linear-gradient(135deg, #E8A87C 0%, #D4796A 50%, #4A4A4A 100%)",

    fontFamily: "var(--font-playfair), Georgia, serif",
    fontWeight: 600,
    letterSpacing: "0.02em",
    textTransform: "none",

    borderStyle: "double",
    borderWidth: "3px",
    borderRadius: "8px",
    glowColor: "#E8A87C",
    glowIntensity: 0.4,
    backdropBlur: "8px",

    patternOverlay: "radial-gradient(circle at 50% 50%, rgba(232, 168, 124, 0.1) 0%, transparent 50%)",
    textureOpacity: 0.15,

    hoverScale: 1.02,
    hoverRotate: 0,
    transitionStyle: "smooth",
    specialEffect: "spotlight",
  },

  // Proximus - Orbital & Tech
  proximus: {
    primary: "#14555A", // Deep teal
    secondary: "#FF6B5B", // Coral signal
    accent: "#88E5E0", // Light cyan
    background: "rgba(10, 30, 35, 0.95)",
    text: "#E0FFFF",
    gradient: "linear-gradient(135deg, #14555A 0%, #88E5E0 50%, #FF6B5B 100%)",

    fontFamily: "var(--font-space-mono), 'Courier New', monospace",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase",

    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "50px", // Pill shape
    glowColor: "#88E5E0",
    glowIntensity: 0.6,
    backdropBlur: "12px",

    patternOverlay: "repeating-radial-gradient(circle at center, transparent 0, transparent 10px, rgba(136, 229, 224, 0.03) 10px, rgba(136, 229, 224, 0.03) 20px)",
    textureOpacity: 0.2,

    hoverScale: 1.03,
    hoverRotate: 0.5,
    transitionStyle: "snappy",
    specialEffect: "particles",
  },

  // Paper Beats Rock - Bold & Playful
  "paper-beats-rock": {
    primary: "#FF4444", // Bold red
    secondary: "#4444FF", // Bold blue
    accent: "#FFDD00", // Bright yellow
    background: "rgba(255, 255, 255, 0.95)",
    text: "#1A1A1A",
    gradient: "linear-gradient(135deg, #FF4444 0%, #FFDD00 50%, #4444FF 100%)",

    fontFamily: "var(--font-bangers), 'Comic Sans MS', cursive",
    fontWeight: 400,
    letterSpacing: "0.08em",
    textTransform: "uppercase",

    borderStyle: "solid",
    borderWidth: "4px",
    borderRadius: "0px", // Sharp edges
    glowColor: "#FFDD00",
    glowIntensity: 0.5,
    backdropBlur: "0px",

    patternOverlay: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)",
    textureOpacity: 0.1,

    hoverScale: 1.05,
    hoverRotate: -2,
    transitionStyle: "bouncy",
    specialEffect: "none",
  },

  // &chill - Cozy & Intimate
  "and-chill": {
    primary: "#9B6B9E", // Soft purple
    secondary: "#FF8B7E", // Warm coral
    accent: "#FFE4B5", // Soft gold
    background: "rgba(25, 20, 35, 0.95)",
    text: "#F5E6F0",
    gradient: "linear-gradient(135deg, #9B6B9E 0%, #FF8B7E 50%, #FFE4B5 100%)",

    fontFamily: "var(--font-quicksand), 'Helvetica Neue', sans-serif",
    fontWeight: 500,
    letterSpacing: "0.01em",
    textTransform: "none",

    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "24px",
    glowColor: "#FF8B7E",
    glowIntensity: 0.35,
    backdropBlur: "20px",

    patternOverlay: "radial-gradient(ellipse at 80% 20%, rgba(255, 139, 126, 0.15) 0%, transparent 50%)",
    textureOpacity: 0.2,

    hoverScale: 1.01,
    hoverRotate: 0,
    transitionStyle: "smooth",
    specialEffect: "vignette",
  },

  // RewarDING! - Achievement & Celebration
  rewarding: {
    primary: "#FFD700", // Gold
    secondary: "#50C878", // Emerald
    accent: "#FFFFFF",
    background: "rgba(15, 25, 20, 0.95)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #FFD700 0%, #50C878 100%)",

    fontFamily: "var(--font-rubik), 'Arial Black', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.03em",
    textTransform: "uppercase",

    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "12px",
    glowColor: "#FFD700",
    glowIntensity: 0.7,
    backdropBlur: "8px",

    patternOverlay: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23FFD700' fill-opacity='0.1'/%3E%3C/svg%3E\")",
    textureOpacity: 0.3,

    hoverScale: 1.04,
    hoverRotate: 0,
    transitionStyle: "bouncy",
    specialEffect: "particles",
  },

  // Space Surfing - Cosmic & Retro-Futuristic
  "space-surfing": {
    primary: "#6B21A8", // Deep purple
    secondary: "#22D3EE", // Cyan
    accent: "#F97316", // Orange
    background: "rgba(5, 5, 20, 0.98)",
    text: "#E0E7FF",
    gradient: "linear-gradient(135deg, #6B21A8 0%, #22D3EE 50%, #F97316 100%)",

    fontFamily: "var(--font-orbitron), 'Eurostile', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",

    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "4px",
    glowColor: "#22D3EE",
    glowIntensity: 0.8,
    backdropBlur: "16px",

    patternOverlay: "radial-gradient(ellipse at 30% 70%, rgba(107, 33, 168, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(34, 211, 238, 0.2) 0%, transparent 40%)",
    textureOpacity: 0.25,

    hoverScale: 1.03,
    hoverRotate: 0,
    transitionStyle: "snappy",
    specialEffect: "scanlines",
  },

  // ============================================
  // INVESTMENT IPs
  // ============================================

  // Darwin's Ark - Natural & Evolutionary
  "darwins-ark": {
    primary: "#228B22", // Forest green
    secondary: "#8B7355", // Weathered brown
    accent: "#87CEEB", // Sky blue
    background: "rgba(20, 25, 15, 0.95)",
    text: "#E8E4D9",
    gradient: "linear-gradient(135deg, #228B22 0%, #8B7355 50%, #87CEEB 100%)",

    fontFamily: "var(--font-bitter), 'Georgia', serif",
    fontWeight: 500,
    letterSpacing: "0.02em",
    textTransform: "none",

    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "4px",
    glowColor: "#228B22",
    glowIntensity: 0.3,
    backdropBlur: "4px",

    patternOverlay: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5' fill='none' stroke='%23228B22' stroke-opacity='0.1'/%3E%3C/svg%3E\")",
    textureOpacity: 0.15,

    hoverScale: 1.02,
    hoverRotate: 0,
    transitionStyle: "smooth",
    specialEffect: "vignette",
  },

  // Dignity - Gothic & Elegant
  dignity: {
    primary: "#2D1B4E", // Gothic purple
    secondary: "#8B0000", // Blood red
    accent: "#C0A080", // Antiqued gold
    background: "rgba(15, 10, 20, 0.98)",
    text: "#E8DFD0",
    gradient: "linear-gradient(135deg, #2D1B4E 0%, #8B0000 50%, #C0A080 100%)",

    fontFamily: "var(--font-cinzel), 'Times New Roman', serif",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase",

    borderStyle: "double",
    borderWidth: "4px",
    borderRadius: "2px",
    glowColor: "#8B0000",
    glowIntensity: 0.4,
    backdropBlur: "6px",

    patternOverlay: "linear-gradient(45deg, rgba(192, 160, 128, 0.05) 25%, transparent 25%, transparent 75%, rgba(192, 160, 128, 0.05) 75%)",
    textureOpacity: 0.2,

    hoverScale: 1.01,
    hoverRotate: 0,
    transitionStyle: "dramatic",
    specialEffect: "vignette",
  },

  // Masquerade Online - Baroque & Mysterious
  "masquerade-online": {
    primary: "#722F37", // Deep crimson
    secondary: "#D4AF37", // Champagne gold
    accent: "#1A1A2E", // Midnight
    background: "rgba(20, 10, 15, 0.98)",
    text: "#F5F0E1",
    gradient: "linear-gradient(135deg, #722F37 0%, #D4AF37 50%, #1A1A2E 100%)",

    fontFamily: "var(--font-cormorant), 'Didot', serif",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "none",

    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "0px",
    glowColor: "#D4AF37",
    glowIntensity: 0.5,
    backdropBlur: "10px",

    patternOverlay: "repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.03) 0px, rgba(212, 175, 55, 0.03) 1px, transparent 1px, transparent 40px)",
    textureOpacity: 0.25,

    hoverScale: 1.02,
    hoverRotate: 0,
    transitionStyle: "smooth",
    specialEffect: "spotlight",
  },

  // Smash the Police State - Revolutionary & Bold
  "smash-the-police-state": {
    primary: "#1A1A1A", // Pure black
    secondary: "#FF6B00", // Warning orange
    accent: "#FFFFFF", // High contrast white
    background: "rgba(10, 10, 10, 0.98)",
    text: "#FFFFFF",
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #FF6B00 50%, #FFFFFF 100%)",

    fontFamily: "var(--font-anton), 'Impact', sans-serif",
    fontWeight: 400,
    letterSpacing: "0.05em",
    textTransform: "uppercase",

    borderStyle: "solid",
    borderWidth: "3px",
    borderRadius: "0px",
    glowColor: "#FF6B00",
    glowIntensity: 0.6,
    backdropBlur: "0px",

    patternOverlay: "repeating-linear-gradient(45deg, rgba(255, 107, 0, 0.05) 0px, rgba(255, 107, 0, 0.05) 2px, transparent 2px, transparent 8px)",
    textureOpacity: 0.3,

    hoverScale: 1.04,
    hoverRotate: -1,
    transitionStyle: "snappy",
    specialEffect: "noise",
  },
};

// Get theme by IP ID
export const getIPTheme = (id: string): IPTheme => {
  return ipThemes[id] || ipThemes.incharacter; // Default fallback
};

// Get transition timing based on style - returns array format for Framer Motion
export const getTransitionTiming = (style: IPTheme["transitionStyle"]): [number, number, number, number] => {
  switch (style) {
    case "smooth":
      return [0.4, 0, 0.2, 1];
    case "snappy":
      return [0.2, 0, 0, 1];
    case "bouncy":
      return [0.34, 1.56, 0.64, 1];
    case "dramatic":
      return [0.7, 0, 0.3, 1];
    default:
      return [0.4, 0, 0.2, 1];
  }
};
