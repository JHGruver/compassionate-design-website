# Compassionate Design - Design System

> A comprehensive design system for the Compassionate Design brand, featuring a gaming-inspired dark theme with neon accents and premium glassmorphism effects.

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Effects & Treatments](#effects--treatments)
7. [Animation & Motion](#animation--motion)
8. [Iconography](#iconography)
9. [Responsive Design](#responsive-design)
10. [Accessibility](#accessibility)
11. [SASS Architecture](#sass-architecture)

---

## Brand Overview

### Brand Personality
- **Bold** - Provocative, confident, unapologetic
- **Innovative** - Cutting-edge tech meets emotional design
- **Crafted** - Obsessive attention to detail
- **Human-First** - Technology that serves people

### Design Philosophy
> "Software that feels illegal to use—in the best way."

We create experiences that blend technical excellence with emotional resonance. Every pixel, every interaction, every line of code is infused with intention.

### Target Audience
- Game developers & studios
- Tech investors
- Creative technologists
- Design-conscious consumers

---

## Color System

### Core Palette

#### Backgrounds (Dark Theme)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `$background` | `#0A0A0F` | `10, 10, 15` | Primary background |
| `$background-secondary` | `#12121A` | `18, 18, 26` | Cards, elevated surfaces |
| `$background-tertiary` | `#1A1A25` | `26, 26, 37` | Hover states, borders |

#### Foreground (Text)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `$foreground` | `#EDEDED` | `237, 237, 237` | Primary text |
| `$foreground-muted` | `#A0A0A0` | `160, 160, 160` | Secondary text, captions |

### Accent Colors (Neon Palette)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `$accent-cyan` | `#00F5FF` | `0, 245, 255` | Primary accent, CTAs, links, SDK status |
| `$accent-magenta` | `#FF006E` | `255, 0, 110` | Secondary accent, Investment status, alerts |
| `$accent-violet` | `#A855F7` | `168, 85, 247` | Tertiary accent, Beta status, hover states |
| `$accent-gold` | `#FFB627` | `255, 182, 39` | Highlights, badges, premium indicators |
| `$accent-green` | `#00FF88` | `0, 255, 136` | Success states, Alpha status |

### Semantic Colors

```scss
// Status Colors
$status-available: $accent-cyan;      // SDK Available
$status-beta: $accent-violet;         // Beta Access
$status-alpha: $accent-green;         // Alpha Access
$status-investment: $accent-magenta;  // Seeking Investment
$status-concept: $accent-gold;        // Concept Phase

// Feedback Colors
$success: $accent-green;
$warning: $accent-gold;
$error: $accent-magenta;
$info: $accent-cyan;
```

### Color with Opacity

For overlays, glows, and transparency effects:

```scss
// Glassmorphism
$glass-background: rgba($background-secondary, 0.8);
$glass-border: rgba(255, 255, 255, 0.1);
$glass-border-hover: rgba(255, 255, 255, 0.2);

// Glow Effects (at 50% opacity for standard glow)
$glow-cyan: rgba($accent-cyan, 0.5);
$glow-magenta: rgba($accent-magenta, 0.5);
$glow-violet: rgba($accent-violet, 0.5);

// Overlay Intensities
$overlay-light: rgba(0, 0, 0, 0.3);
$overlay-medium: rgba(0, 0, 0, 0.5);
$overlay-heavy: rgba(0, 0, 0, 0.8);
```

### Gradients

```scss
// Primary gradient (hero text, buttons)
$gradient-hero: linear-gradient(135deg, $accent-cyan, $accent-magenta);

// Card backgrounds
$gradient-card: linear-gradient(180deg, $background-secondary, $background);

// Accent gradients
$gradient-cyan-violet: linear-gradient(135deg, $accent-cyan, $accent-violet);
$gradient-magenta-violet: linear-gradient(135deg, $accent-magenta, $accent-violet);
$gradient-full-spectrum: linear-gradient(135deg, $accent-cyan, $accent-magenta, $accent-violet);
```

---

## Typography

### Font Families

```scss
$font-sans: 'Geist Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-mono: 'Geist Mono', 'SF Mono', 'Fira Code', monospace;
```

### Type Scale

| Class | Size | Weight | Letter Spacing | Line Height | Usage |
|-------|------|--------|----------------|-------------|-------|
| `.display-xl` | `clamp(3.5rem, 12vw, 10rem)` | 900 | -0.04em | 0.95 | Hero headlines |
| `.display-lg` | `clamp(2.5rem, 8vw, 6rem)` | 800 | -0.03em | 1.1 | Section titles |
| `.display-md` | `clamp(1.75rem, 5vw, 3.5rem)` | 700 | -0.02em | 1.1 | Subsection titles |
| `h1` | `2.5rem` (40px) | 700 | -0.02em | 1.1 | Page titles |
| `h2` | `2rem` (32px) | 700 | -0.02em | 1.2 | Section headers |
| `h3` | `1.5rem` (24px) | 700 | -0.01em | 1.3 | Card titles |
| `h4` | `1.25rem` (20px) | 600 | 0 | 1.4 | Subtitles |
| `body` | `1rem` (16px) | 400 | 0 | 1.6 | Body text |
| `small` | `0.875rem` (14px) | 400 | 0 | 1.5 | Captions, metadata |
| `tiny` | `0.75rem` (12px) | 500 | 0.05em | 1.4 | Labels, badges |

### Typography Utilities

```scss
// Gradient text effect
.gradient-text {
  background: $gradient-hero;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

// Glow text effects
.text-glow-cyan {
  text-shadow: 0 0 20px $glow-cyan;
}

.text-glow-magenta {
  text-shadow: 0 0 20px $glow-magenta;
}

// Monospace labels (tech aesthetic)
.label-mono {
  font-family: $font-mono;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## Spacing & Layout

### Spacing Scale

Based on 4px base unit:

| Token | Value | Pixels |
|-------|-------|--------|
| `$space-1` | `0.25rem` | 4px |
| `$space-2` | `0.5rem` | 8px |
| `$space-3` | `0.75rem` | 12px |
| `$space-4` | `1rem` | 16px |
| `$space-5` | `1.25rem` | 20px |
| `$space-6` | `1.5rem` | 24px |
| `$space-8` | `2rem` | 32px |
| `$space-10` | `2.5rem` | 40px |
| `$space-12` | `3rem` | 48px |
| `$space-16` | `4rem` | 64px |
| `$space-20` | `5rem` | 80px |
| `$space-24` | `6rem` | 96px |
| `$space-32` | `8rem` | 128px |

### Layout Tokens

```scss
$container-max: 1440px;
$container-content: 1280px;
$container-narrow: 768px;

$section-padding: clamp(4rem, 10vw, 8rem);
$section-gap: clamp(2rem, 5vw, 4rem);

$grid-gap: 1.5rem;        // 24px - default grid gap
$grid-gap-lg: 2rem;       // 32px - large grid gap
$card-gap: 1.5rem;        // 24px - between cards
```

### Grid System

```scss
// 12-column grid
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: $grid-gap;
}

// Common layouts
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

// Responsive (mobile-first)
@media (max-width: 1024px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
```

---

## Components

### Buttons

#### Primary Button
```scss
.btn-primary {
  background: $gradient-hero;
  color: $background;
  font-weight: 700;
  padding: $space-4 $space-8;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s $ease-out-expo;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px $glow-cyan;
  }
}
```

#### Secondary Button (Ghost)
```scss
.btn-secondary {
  background: transparent;
  color: $foreground;
  font-weight: 600;
  padding: $space-4 $space-8;
  border-radius: 0.5rem;
  border: 1px solid $glass-border;
  cursor: pointer;
  transition: all 0.3s $ease-out-expo;

  &:hover {
    border-color: $accent-cyan;
    color: $accent-cyan;
  }
}
```

#### Button Sizes
| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| `sm` | `0.5rem 1rem` | 0.875rem | 0.375rem |
| `md` | `0.75rem 1.5rem` | 1rem | 0.5rem |
| `lg` | `1rem 2rem` | 1.125rem | 0.75rem |

### Cards

#### Glass Card
```scss
.glass-card {
  background: $glass-background;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid $glass-border;
  border-radius: 1rem;
  padding: $space-6;
  transition: all 0.3s $ease-out-expo;

  &:hover {
    border-color: $accent-cyan;
    box-shadow: 0 0 30px rgba($accent-cyan, 0.15);
    transform: translateY(-4px);
  }
}
```

#### IP Card (Product Card)
```scss
.ip-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s $ease-out-expo;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(var(--ip-color), 0.25);
    border-color: rgba(var(--ip-color), 0.4);
  }

  // Image section
  .ip-card__image {
    height: 12rem;
    position: relative;
    overflow: hidden;

    img {
      object-fit: cover;
      transition: transform 0.5s $ease-out-expo;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  // Content section
  .ip-card__content {
    padding: $space-5;
  }
}
```

### Badges & Pills

```scss
.badge {
  display: inline-flex;
  align-items: center;
  padding: $space-1 $space-3;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &--cyan {
    background: rgba($accent-cyan, 0.15);
    color: $accent-cyan;
    border: 1px solid rgba($accent-cyan, 0.3);
  }

  &--magenta {
    background: rgba($accent-magenta, 0.15);
    color: $accent-magenta;
    border: 1px solid rgba($accent-magenta, 0.3);
  }

  &--violet {
    background: rgba($accent-violet, 0.15);
    color: $accent-violet;
    border: 1px solid rgba($accent-violet, 0.3);
  }
}
```

### Form Inputs

```scss
.input {
  width: 100%;
  padding: $space-4 $space-6;
  background: $background;
  border: 1px solid $glass-border;
  border-radius: 0.5rem;
  color: $foreground;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: $foreground-muted;
  }

  &:focus {
    outline: none;
    border-color: $accent-cyan;
    box-shadow: 0 0 0 3px rgba($accent-cyan, 0.1);
  }
}
```

---

## Effects & Treatments

### Glassmorphism

The signature visual style combining:
- Semi-transparent backgrounds
- Backdrop blur
- Subtle borders
- Soft shadows

```scss
@mixin glass($blur: 20px, $opacity: 0.8) {
  background: rgba($background-secondary, $opacity);
  backdrop-filter: blur($blur);
  -webkit-backdrop-filter: blur($blur);
  border: 1px solid $glass-border;
}
```

### Glow Effects

```scss
@mixin glow($color, $intensity: 20px) {
  box-shadow: 0 0 $intensity rgba($color, 0.5);
}

@mixin glow-hover($color) {
  &:hover {
    box-shadow:
      0 0 20px rgba($color, 0.3),
      0 0 40px rgba($color, 0.2),
      0 0 60px rgba($color, 0.1);
  }
}
```

### Grid Background

```scss
.grid-background {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### Noise Overlay

Subtle film grain texture for depth:

```scss
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); // SVG noise pattern
}
```

### Gradient Overlays

```scss
// Image overlay (bottom fade)
.overlay-bottom {
  background: linear-gradient(
    to top,
    $background 0%,
    rgba($background, 0.5) 50%,
    transparent 100%
  );
}

// Radial glow
.radial-glow {
  background: radial-gradient(
    circle at center,
    rgba($accent-cyan, 0.1) 0%,
    transparent 70%
  );
}
```

---

## Animation & Motion

### Timing Functions (Easings)

```scss
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);      // Smooth deceleration
$ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    // Standard ease-out
$ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1); // Snappy in-out
$ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   // Bouncy feel
```

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `$duration-fast` | `150ms` | Micro-interactions |
| `$duration-normal` | `300ms` | Standard transitions |
| `$duration-slow` | `500ms` | Page transitions |
| `$duration-slower` | `800ms` | Complex animations |

### Keyframe Animations

```scss
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba($accent-cyan, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba($accent-cyan, 0.6);
  }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Animation Classes

```scss
.animate-fade-in {
  animation: fadeIn 0.6s $ease-out-expo forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s $ease-out-expo forwards;
}

.animate-scale-in {
  animation: scaleIn 0.6s $ease-out-expo forwards;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### Hover Transitions

Standard hover pattern:
```scss
.interactive-element {
  transition: all 0.3s $ease-out-expo;

  &:hover {
    transform: translateY(-4px);
    // + color/shadow changes
  }
}
```

---

## Iconography

### Icon System

Custom SVG icons with consistent sizing:

| Size | Pixels | Usage |
|------|--------|-------|
| `xs` | 16px | Inline, badges |
| `sm` | 20px | Buttons, lists |
| `md` | 24px | Default |
| `lg` | 32px | Section headers |
| `xl` | 48px | Hero features |

### Icon Colors

Icons inherit `currentColor` for flexibility:

```scss
.icon {
  width: 24px;
  height: 24px;
  color: currentColor;

  &--cyan { color: $accent-cyan; }
  &--magenta { color: $accent-magenta; }
  &--violet { color: $accent-violet; }
  &--muted { color: $foreground-muted; }
}
```

### Available Icons

- `SparkleIcon` - Magic, features
- `DiamondIcon` - Premium, value
- `GemIcon` - Products, IPs
- `MailIcon` - Contact, email
- `LinkedInIcon` - Social
- `CraftIcon` - Quality, craft (star)
- `VisionIcon` - Vision, eye
- `HeartTechIcon` - Human-first tech

---

## Responsive Design

### Breakpoints

```scss
$breakpoints: (
  'sm': 640px,   // Mobile landscape
  'md': 768px,   // Tablet portrait
  'lg': 1024px,  // Tablet landscape / Small desktop
  'xl': 1280px,  // Desktop
  '2xl': 1536px  // Large desktop
);

// Mixin usage
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

// Example
.element {
  padding: $space-4;

  @include respond-to('md') {
    padding: $space-6;
  }

  @include respond-to('lg') {
    padding: $space-8;
  }
}
```

### Mobile-First Patterns

```scss
// Typography scales down on mobile
.display-lg {
  font-size: clamp(2.5rem, 8vw, 6rem);
}

// Grid collapses
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-6;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}

// Spacing adjusts
.section {
  padding: $space-16 $space-4;

  @include respond-to('md') {
    padding: $space-24 $space-6;
  }

  @include respond-to('lg') {
    padding: $space-32 $space-8;
  }
}
```

---

## Accessibility

### Color Contrast

All text meets WCAG AA standards (4.5:1 minimum):

| Combination | Ratio | Pass |
|-------------|-------|------|
| `$foreground` on `$background` | 15.2:1 | AAA |
| `$foreground-muted` on `$background` | 7.1:1 | AA |
| `$accent-cyan` on `$background` | 12.8:1 | AAA |
| `$accent-magenta` on `$background` | 5.9:1 | AA |

### Focus States

```scss
// Visible focus ring
:focus-visible {
  outline: 2px solid $accent-cyan;
  outline-offset: 2px;
}

// Remove default for custom styling
:focus:not(:focus-visible) {
  outline: none;
}
```

### Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Screen Reader Utilities

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## SASS Architecture

### File Structure

```
src/styles/
├── _index.scss              # Main entry point
├── abstracts/
│   ├── _variables.scss      # All SASS variables
│   ├── _functions.scss      # SASS functions
│   ├── _mixins.scss         # Reusable mixins
│   └── _placeholders.scss   # Extend-only selectors
├── base/
│   ├── _reset.scss          # CSS reset/normalize
│   ├── _typography.scss     # Base typography
│   └── _utilities.scss      # Utility classes
├── components/
│   ├── _buttons.scss        # Button styles
│   ├── _cards.scss          # Card components
│   ├── _badges.scss         # Badges & pills
│   ├── _forms.scss          # Form elements
│   └── _icons.scss          # Icon styling
├── layout/
│   ├── _grid.scss           # Grid system
│   ├── _header.scss         # Header/nav
│   ├── _footer.scss         # Footer
│   └── _sections.scss       # Section layouts
├── effects/
│   ├── _glass.scss          # Glassmorphism
│   ├── _glows.scss          # Glow effects
│   ├── _backgrounds.scss    # Background patterns
│   └── _animations.scss     # Keyframes & animation classes
└── themes/
    └── _dark.scss           # Dark theme (default)
```

### Variable Naming Convention

```scss
// Pattern: $category-property-variant

// Colors
$color-background: #0A0A0F;
$color-background-secondary: #12121A;
$color-accent-cyan: #00F5FF;

// Typography
$font-family-sans: 'Geist Sans', sans-serif;
$font-size-base: 1rem;
$font-weight-bold: 700;

// Spacing
$space-4: 1rem;
$space-8: 2rem;

// Effects
$effect-blur-glass: 20px;
$effect-shadow-glow: 0 0 20px;
```

### Useful Mixins

```scss
// Responsive breakpoint
@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

// Glassmorphism
@mixin glass($blur: 20px, $opacity: 0.8) {
  background: rgba($background-secondary, $opacity);
  backdrop-filter: blur($blur);
  -webkit-backdrop-filter: blur($blur);
  border: 1px solid $glass-border;
}

// Glow effect
@mixin glow($color, $size: 20px) {
  box-shadow: 0 0 $size rgba($color, 0.5);
}

// Text gradient
@mixin text-gradient($gradient) {
  background: $gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

// Truncate text
@mixin truncate($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// Aspect ratio container
@mixin aspect-ratio($width, $height) {
  aspect-ratio: $width / $height;
}
```

---

## Quick Reference

### Color CSS Variables

```css
:root {
  --background: #0A0A0F;
  --background-secondary: #12121A;
  --background-tertiary: #1A1A25;
  --foreground: #EDEDED;
  --foreground-muted: #A0A0A0;
  --accent-cyan: #00F5FF;
  --accent-magenta: #FF006E;
  --accent-violet: #A855F7;
  --accent-gold: #FFB627;
  --accent-green: #00FF88;
}
```

### Tailwind Custom Classes

With Tailwind v4 `@theme inline`:

```css
bg-background          /* Primary background */
bg-background-secondary /* Card background */
text-foreground        /* Primary text */
text-foreground-muted  /* Secondary text */
text-accent-cyan       /* Cyan accent */
text-accent-magenta    /* Magenta accent */
text-accent-violet     /* Violet accent */
```

---

---

# IP Design Systems

Complete visual identity and brand guidelines for all 10 intellectual properties. Each IP has a unique design language that reflects its theme, audience, and emotional goals.

---

## 1. InCharacter

### Brand Essence
**One-line concept:** Give your game a soul through AI characters that remember, evolve, and truly connect.

**Mood/tone:** Intimate, empathetic, conversational, warm, human-centered

**Target emotional response:** Wonder at authentic connection; feeling understood by digital characters; curiosity about personality depth

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#8B5FBF` | Amethyst Conversation | Thoughtful purple suggesting technology and emotion |
| Secondary | `#E8D5F2` | Whisper Lavender | Soft, approachable backdrop for dialogue |
| Accent | `#FF8FA3` | Heartbeat Pink | Emotional punctuation, moments of connection |
| Background | `#FAF8FC` | Gentle Presence | Nearly white with purple undertones |
| Text | `#2D2140` | Deep Thought | Rich, readable purple-black |
| Gradient | Radial from Heartbeat Pink center to Amethyst Conversation edges | Emotional warmth radiating outward |

### Typography
- **Display/headline:** Recoleta Medium - Soft, slightly rounded serifs that feel both contemporary and approachable
- **Body:** Inter - Clean, highly readable sans with humanist proportions
- **Accent/UI:** Space Grotesk - Geometric but friendly for buttons and labels
- **Character:** Warm and conversational with subtle personality; approachable intelligence

### Visual Motifs
- **Primary symbol:** Overlapping speech bubbles forming a heart or face silhouette
- **Secondary patterns:** Dialogue trees as organic branch structures; conversation flow lines like neural pathways
- **Texture treatments:** Soft gradients with subtle grain; watercolor-edge effects on dialogue bubbles
- **Recurring elements:** Animated quotation marks; personality trait icons; memory fragment sparkles

### Art Style
- **Illustration:** Soft-edged vector with watercolor textures; character portraits with glowing auras
- **Character design:** Silhouette-based with distinctive emotional signatures; expressive eyes and gesture
- **Environment:** Abstract conversation spaces—mindscapes made of words, memories, and emotional color
- **UI aesthetic:** Nested dialogue cards with depth; layered glassmorphism; organic, flowing containers

### Animation Style
- **Motion:** Fluid and organic; gentle bounces suggesting breathing; responsive like living presence
- **Transitions:** Morphing between states; fade-through-blur; text that types in conversationally
- **Micro-interactions:** Characters "lean in" when engaged; subtle pulse suggesting active listening
- **Loading states:** Thinking ellipsis that bounces; character pondering animation

### Sound Design Direction
- **Audio mood:** Intimate, warm, ASMR-quality clarity
- **UI sounds:** Soft chimes; paper rustle; pen on paper; warm vocal hums
- **Music:** Ambient piano with lo-fi elements; intimate acoustic; bedroom pop instrumentals

### Taglines
1. "Characters who remember. Worlds that feel."
2. "Every conversation shapes who they become."
3. "AI with a soul. Characters with a story."

---

## 2. Proximus

### Brand Essence
**One-line concept:** The real world becomes your game board—connect with players in your actual space.

**Mood/tone:** Spontaneous, electric, urban-explorer, serendipitous, connected

**Target emotional response:** Excitement of unexpected encounters; thrill of real-world treasure hunting; belonging to a local gaming community

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#00E5FF` | Radar Cyan | Electric, tech-forward, signal-like vibrancy |
| Secondary | `#1A1A2E` | Night Explorer | Deep navy for urban nighttime gaming |
| Accent | `#FFD93D` | Discovery Gold | Bright pops marking found players/locations |
| Background | `#0F0F1E` | Shadow Map | Almost black with blue undertones |
| Text | `#F0F0F0` | Signal White | High contrast for outdoor readability |
| Gradient | Pulsing radial from Discovery Gold through Radar Cyan to Night Explorer | Like a radar ping |

### Typography
- **Display/headline:** Druk Wide Bold - Condensed, impactful, urban poster energy
- **Body:** Archivo - Geometric sans with technical precision
- **Accent/UI:** JetBrains Mono - Monospace for coordinates, distances, technical data
- **Character:** Sharp, technical, high-energy street style; billboard-ready impact

### Visual Motifs
- **Primary symbol:** Concentric radar rings with player dots; proximity indicator
- **Secondary patterns:** Topographic map lines; Bluetooth signal waves; coordinate grids
- **Texture treatments:** Scan-line effects; holographic interference; asphalt texture
- **Recurring elements:** Directional arrows; distance counters; pulsing connection indicators; GPS pins

### Art Style
- **Illustration:** Isometric low-poly 3D with neon outlines; tech-noir aesthetic
- **Character design:** Geometric avatars; customizable totems; ghost-trace movement trails
- **Environment:** Stylized map views mixing real geography with game layer; AR overlay aesthetic
- **UI aesthetic:** Heads-up display; translucent panels over map; spatial UI

### Animation Style
- **Motion:** Snappy and immediate; radar sweeps; geometric pop-ins
- **Transitions:** Sliding panels; map zoom; signal wave expansions
- **Micro-interactions:** Haptic-matched button presses; proximity alerts that buzz
- **Loading states:** Scanning animation; radar sweep; "locating players" pulse

### Sound Design Direction
- **Audio mood:** Urban soundscape; tech UI; satisfying pings
- **UI sounds:** Sonar blips; metal clicks; electronic confirmations; radar sweeps
- **Music:** Synthwave; electronic beats; urban night ambience with bass

### Taglines
1. "The game is wherever you are."
2. "Find players. Not playlists."
3. "Your neighborhood is the arena."

---

## 3. Paper Beats Rock

### Brand Essence
**One-line concept:** Strategic depth meets instant fun—competitive gaming that respects your time.

**Mood/tone:** Playful-competitive, sharp, clever, accessible, tournament-ready

**Target emotional response:** Satisfaction of outplaying opponents; joy of quick strategic victories; respect for skillful play

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#FF4655` | Victory Red | Bold, competitive, energetic |
| Secondary | `#2D4CFF` | Strategic Blue | Confident, thoughtful opposition |
| Accent | `#FFD700` | Trophy Gold | Achievement, winning moments |
| Background | `#FFFEF7` | Arena Cream | Clean, uncluttered playing field |
| Text | `#1A1A1A` | Decisive Black | Strong contrast, clear hierarchy |
| Gradient | Diagonal split from Victory Red to Strategic Blue | Representing competition/opposition |

### Typography
- **Display/headline:** Sohne Breit Extrafett - Ultra-bold condensed for tournament energy
- **Body:** Satoshi - Geometric sans with sports-jersey clarity
- **Accent/UI:** Bebas Neue - Compressed caps for stats, scores, timers
- **Character:** Bold, confident, athletic; scoreboard aesthetic

### Visual Motifs
- **Primary symbol:** Three-way cycle diagram (rock-paper-scissors evolution); balanced triangle
- **Secondary patterns:** Competitive brackets; versus symbols; directional advantage arrows
- **Texture treatments:** Halftone dots; screen-print texture; paper grain
- **Recurring elements:** VS. badges; countdown timers; win-streak flames; rank emblems

### Art Style
- **Illustration:** Bold flat color with strong outlines; screen-print poster aesthetic
- **Character design:** Iconic player avatars; mascot-style tokens; expressive emoji faces
- **Environment:** Abstract competitive arenas; geometric battlegrounds; minimalist stages
- **UI aesthetic:** Tournament bracket clarity; sports broadcast overlays

### Animation Style
- **Motion:** Snappy and immediate; no wasted frames; responsive inputs
- **Transitions:** Quick cuts; swipe transitions; competitive flip reveals
- **Micro-interactions:** Satisfying button presses; damage shake; victory pop
- **Loading states:** Countdown timers; opponent searching; matchmaking spinner

### Sound Design Direction
- **Audio mood:** Arcade energy; sports broadcast excitement; satisfying impact
- **UI sounds:** Sharp clicks; paper rip; rock thud; referee whistle; crowd reactions
- **Music:** Upbeat electronic; chiptune competition; sports arena anthems

### Taglines
1. "Five minutes. Pure strategy. Total domination."
2. "Outsmart. Outplay. Repeat."
3. "Quick games. Deep strategy. Endless competition."

---

## 4. &chill

### Brand Essence
**One-line concept:** Distance disappears when you're watching together—synchronized moments, shared reactions.

**Mood/tone:** Cozy, synchronized, intimate-at-distance, relaxed, comforting

**Target emotional response:** Warmth of shared experience; comfort of presence despite distance; joy of synchronized laughter

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#6B5B95` | Twilight Purple | Cozy evening viewing atmosphere |
| Secondary | `#FF6B9D` | Companion Pink | Warm presence, heartbeat of togetherness |
| Accent | `#FEC868` | Popcorn Glow | Snack-time warmth, comfort lighting |
| Background | `#1C1821` | Theater Dark | Deep viewing environment |
| Text | `#E8E4F0` | Soft Subtitle | Easy on eyes during long sessions |
| Gradient | Horizontal sunset from Companion Pink through Twilight Purple to Theater Dark | Dimming lights for movie time |

### Typography
- **Display/headline:** Tiempos Headline - Elegant, slightly theatrical serif
- **Body:** System UI Font Stack - Comfortable, familiar reading
- **Accent/UI:** Circular - Friendly geometric for controls and timestamps
- **Character:** Comfortable and inviting; living-room casual; subtitle-readable

### Visual Motifs
- **Primary symbol:** Two play buttons synchronized/overlapped; connection line between avatars
- **Secondary patterns:** Sync pulse waves; shared heartbeat visualizations; parallel timelines
- **Texture treatments:** Soft glow effects; ambient lighting; blanket/fabric textures
- **Recurring elements:** Presence indicators; reaction bubbles; cozy room illustrations

### Art Style
- **Illustration:** Soft, warm digital painting; cozy interior scenes; nostalgic comfort
- **Character design:** Cute, relatable avatars; emotion-forward expressions; cozy settings
- **Environment:** Stylized living rooms; comfortable viewing spaces; warm lighting
- **UI aesthetic:** Minimal intrusion; theater mode elegance; controls fade when not needed

### Animation Style
- **Motion:** Gentle and smooth; synchronized movements; relaxed pacing
- **Transitions:** Fade transitions; gentle slides; curtain-like reveals
- **Micro-interactions:** Soft haptics; gentle confirmations; floating reaction animations
- **Loading states:** "Waiting for others" with patient animations; syncing progress bar

### Sound Design Direction
- **Audio mood:** Warm, low-key, comfortable; ASMR-adjacent UI
- **UI sounds:** Soft pops; gentle chimes; popcorn sounds; synchronized "click" when both ready
- **Music:** Lo-fi chill; ambient warmth; acoustic comfort; bedroom pop

### Taglines
1. "Miles apart. Moments together."
2. "Press play together, anywhere."
3. "Same couch energy. Different couches."

---

## 5. RewarDING!

### Brand Essence
**One-line concept:** Every action counts—addictive progression that makes participation irresistible.

**Mood/tone:** Energetic, rewarding, dopamine-driven, celebratory, motivating

**Target emotional response:** Rush of achievement; craving for next reward; pride in progression; competitive motivation

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#FF6B35` | Achievement Orange | Energetic, warm, celebratory |
| Secondary | `#4ECDC4` | Progress Teal | Growth, advancement, leveling up |
| Accent | `#FFE66D` | Golden Moment | Victory, special rewards, rare achievements |
| Background | `#2A2D34` | Focused Charcoal | Lets rewards pop visually |
| Text | `#F7F7F7` | Clear White | High visibility for stats |
| Gradient | Explosive radial from Golden Moment through Achievement Orange | Achievement burst |

### Typography
- **Display/headline:** Montserrat ExtraBold - Bold, modern, impactful
- **Body:** Rubik - Rounded, friendly, gamification standard
- **Accent/UI:** Khand Bold - Condensed for stats, leaderboards, numbers
- **Character:** Bold and celebratory; numbers-forward; arcade influence

### Visual Motifs
- **Primary symbol:** Rising bar graph becoming a trophy; upward arrow with star burst
- **Secondary patterns:** Badge collections; progress rings; XP bars; level-up rays
- **Texture treatments:** Metallic sheens; gem facets; confetti overlays; particles
- **Recurring elements:** Star bursts; progress circles; streak flames; podium positions

### Art Style
- **Illustration:** Vibrant flat design with dimensional depth; badge/icon focused
- **Character design:** Mascot avatars that level up visually; achievement hunter personas
- **Environment:** Abstract achievement galleries; trophy rooms; leaderboard stadiums
- **UI aesthetic:** Dashboard-heavy; data visualization; gamified progress everywhere

### Animation Style
- **Motion:** Energetic and bouncy; celebration explosions; satisfying pops
- **Transitions:** Scale-up reveals; particle bursts; level-up transformations
- **Micro-interactions:** Every interaction rewards; points fly to counter; badges spin in
- **Loading states:** Progress bars that feel satisfying; XP earning during load

### Sound Design Direction
- **Audio mood:** Celebratory, arcade-inspired, dopamine-triggering
- **UI sounds:** Coin collect; level up fanfare; achievement unlock chime; leaderboard climb
- **Music:** Upbeat electronic; victory themes; motivational beats; arcade game music

### Taglines
1. "Every action. Every reward. Everything counts."
2. "Level up your engagement."
3. "Achievement unlocked. Again. And again."

---

## 6. Space Surfing

### Brand Essence
**One-line concept:** Physics perfection meets cosmic speed—ride the gravity wells across the universe.

**Mood/tone:** Exhilarating, precise, cosmic, flow-state, weightless

**Target emotional response:** Rush of momentum; satisfaction of perfect physics; awe of space; meditative flow

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#00D9FF` | Velocity Cyan | Speed, energy, cosmic ice |
| Secondary | `#B24FFF` | Nebula Purple | Deep space mystery, gravity wells |
| Accent | `#FF3864` | Rocket Red | Boost moments, danger zones, speed trails |
| Background | `#0A0E1A` | Void Black | Infinite space darkness |
| Text | `#FFFFFF` | Starlight White | Maximum contrast against void |
| Gradient | Flowing curve from Velocity Cyan through Nebula Purple with Rocket Red streaks | Surfing through a nebula |

### Typography
- **Display/headline:** Eurostile Extended - Futuristic, wide, aerodynamic
- **Body:** Rajdhani - Technical, speed-appropriate readability
- **Accent/UI:** Orbitron - Sci-fi classic for stats, speed counters, coordinates
- **Character:** Aerodynamic, futuristic, technical; HUD-style clarity

### Visual Motifs
- **Primary symbol:** Surfboard/spacecraft hybrid with motion trails; gravity well spiral
- **Secondary patterns:** Orbital trajectories; star-field particles; velocity vectors
- **Texture treatments:** Chrome reflections; holographic star-maps; speed blur; lens flares
- **Recurring elements:** Speed lines; boost trails; gravity field visualizations; checkpoint rings

### Art Style
- **Illustration:** Sleek vector with 80s retro-future influence; chrome and neon
- **Character design:** Minimalist racer avatars; ships as personality; customizable trails
- **Environment:** Stylized cosmic environments; geometric space structures; abstract gravity
- **UI aesthetic:** Racing HUD; minimal interference; speed/trajectory data; holographic overlays

### Animation Style
- **Motion:** Smooth and fluid; momentum-based; speed ramping; flow-state elegance
- **Transitions:** Speed blur transitions; warp jumps; orbital swoops
- **Micro-interactions:** Gravity pull on buttons; momentum-based scrolling; boost acceleration
- **Loading states:** Orbital calculations; trajectory plotting; engine charging

### Sound Design Direction
- **Audio mood:** Cosmic ambience with precise technical sounds; synth-wave energy
- **UI sounds:** Rocket boost; gravity pull hum; checkpoint whoosh; speed wind
- **Music:** Synthwave; electronic space ambient; retro-future racing tracks

### Taglines
1. "Gravity is your canvas. Speed is your art."
2. "Surf the cosmos at light speed."
3. "Physics-perfect. Infinitely fast."

---

## 7. Darwin's Ark

### Brand Essence
**One-line concept:** Millions of years in your hands—evolve species, dominate ecosystems, survive extinction.

**Mood/tone:** Epic-scientific, patient-strategic, primordial, competitive-natural, awe-inspiring

**Target emotional response:** Wonder at evolutionary complexity; satisfaction of long-term strategy; pride in species success; fascination with natural selection

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#2D5016` | Primordial Green | Life, evolution, natural selection |
| Secondary | `#8B4513` | Sediment Brown | Earth, geological time, fossil layers |
| Accent | `#FF6F00` | Mutation Orange | Evolution events, adaptation, genetic change |
| Background | `#E8E3D3` | Fossil Parchment | Natural history museum, scientific illustration |
| Text | `#1A1A1A` | Carbon Black | Field journal readability |
| Gradient | Vertical geological layers from Sediment Brown through Primordial Green | Strata showing time |

### Typography
- **Display/headline:** Freight Big Pro - Editorial serif with natural history gravitas
- **Body:** Crimson Text - Readable serif suggesting scientific journals
- **Accent/UI:** Roboto Condensed - Clean sans for stats, timelines, data
- **Character:** Scientific, authoritative, educational; natural history museum aesthetic

### Visual Motifs
- **Primary symbol:** DNA helix transforming into evolutionary tree; fossil spiral
- **Secondary patterns:** Phylogenetic trees; geological strata; cellular diagrams
- **Texture treatments:** Weathered paper; fossil imprints; microscope slides; field sketches
- **Recurring elements:** Evolution arrows; trait badges; ecosystem webs; timeline markers; extinction warnings

### Art Style
- **Illustration:** Scientific illustration meets modern infographic; Audubon-inspired creatures
- **Character design:** Creatures in evolutionary stages; anatomical accuracy with stylized appeal
- **Environment:** Ecosystem dioramas; geological cross-sections; habitat illustrations
- **UI aesthetic:** Natural history museum; scientific journal; field research interface

### Animation Style
- **Motion:** Organic growth; geological patience; evolutionary time-lapse
- **Transitions:** Morphing evolution; geological layer reveals; ecosystem blooms
- **Micro-interactions:** Organic responses; mutation sparkles; adaptation transformations
- **Loading states:** Evolution in progress; species adapting; geological time passing

### Sound Design Direction
- **Audio mood:** Natural ambience; primordial soundscapes; educational clarity
- **UI sounds:** Nature sounds; creature calls; geological rumbles; DNA synthesis beeps
- **Music:** Orchestral nature documentary; ambient evolution; world music with primordial percussion

### Taglines
1. "Evolution is your strategy. Survival is your victory."
2. "Millions of years. Countless species. One perfect adaptation."
3. "Evolve or perish. The ecosystem is watching."

---

## 8. Dignity

### Brand Essence
**One-line concept:** Walk in their shoes through history's hardest moments—powerful stories of human rights and resilience.

**Mood/tone:** Profound, empathetic, somber-hopeful, humanistic, thought-provoking

**Target emotional response:** Deep empathy; moral reflection; emotional catharsis; inspiration to act; understanding across divides

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#5D4E6D` | Thoughtful Plum | Serious reflection, complex humanity |
| Secondary | `#FFFAFF` | Gentle Hope | Light in darkness, human dignity |
| Accent | `#C85A54` | Beating Heart | Emotional moments, human connection, struggle |
| Background | `#2B2B2B` | Difficult Truth | Heavy subject matter, somber context |
| Text | `#F5F5F5` | Clear Voice | Readable testimony and narrative |
| Gradient | Dawn gradient from Difficult Truth to Gentle Hope | Hope emerging from darkness |

### Typography
- **Display/headline:** Spectral - Elegant serif with literary gravitas
- **Body:** Source Serif Pro - Highly readable for long-form narrative
- **Accent/UI:** Work Sans - Humanist sans for UI that doesn't distract
- **Character:** Literary, dignified, respectful; memoir-quality; testimonial clarity

### Visual Motifs
- **Primary symbol:** Raised hands in gestures of resilience; chain breaking into birds
- **Secondary patterns:** Historical document textures; handwritten letter aesthetics; photograph borders
- **Texture treatments:** Aged paper; photographic grain; ink textures; weathered materials
- **Recurring elements:** Timeline markers; perspective frames; choice consequence trees; testimonial quotes

### Art Style
- **Illustration:** Painterly realism with muted palettes; graphic novel emotional depth
- **Character design:** Deeply human, emotionally expressive; period-accurate; diverse representation
- **Environment:** Historical accuracy with artistic interpretation; emotional atmosphere
- **UI aesthetic:** Minimal and respectful; document-inspired; space for reflection

### Animation Style
- **Motion:** Deliberate and meaningful; gentle; respectful pacing
- **Transitions:** Fade to reflect; page turn; memory blur transitions
- **Micro-interactions:** Weighted choices; thoughtful confirmations; time to process
- **Loading states:** Contemplative moments; historical photo reveals; "remembering" text

### Sound Design Direction
- **Audio mood:** Intimate, acoustic, human; voice-forward; respectful silence
- **UI sounds:** Soft paper; pen on paper; gentle confirmations; heartbeat in tense moments
- **Music:** Acoustic minimalism; string quartets; solo piano; culturally authentic; protest songs reimagined

### Taglines
1. "Every choice echoes through history."
2. "See the world through their eyes. Feel the weight of their choices."
3. "Human rights aren't abstract. They're stories."

---

## 9. Masquerade Online

### Brand Essence
**One-line concept:** Behind every mask is a lie, a truth, or both—Victorian intrigue meets online deception.

**Mood/tone:** Mysterious, theatrical, seductive, paranoid, baroque

**Target emotional response:** Delicious suspicion; thrill of deception; satisfaction of unmasking truth; theatrical drama; social cleverness

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#8B0000` | Velvet Crimson | Passion, danger, aristocratic drama |
| Secondary | `#FFD700` | Gilded Gold | Opulence, masks, wealth, facade |
| Accent | `#E6E6FA` | Powder Lavender | Mystery, Victorian evening, uncertainty |
| Background | `#1A1110` | Ballroom Shadow | Dark intrigue, candlelit spaces |
| Text | `#F0E6D2` | Parchment Script | Period-appropriate readability |
| Gradient | Dramatic spotlight from Gilded Gold fading through Velvet Crimson to Ballroom Shadow | Masked figure in candlelight |

### Typography
- **Display/headline:** Bodoni Moda - High-contrast classical serif, dramatic fashion
- **Body:** Cormorant Garamond - Elegant readability with period flavor
- **Accent/UI:** Cinzel - Classical caps for player names, titles, accusations
- **Character:** Theatrical, elegant, high-contrast; masquerade ball invitation; dramatic serif

### Visual Motifs
- **Primary symbol:** Ornate Venetian mask with question mark negative space; eye peering through mask
- **Secondary patterns:** Baroque damask; theatrical curtains; playing card suits; lace patterns
- **Texture treatments:** Velvet; gold leaf; candlelight flicker; fog/mist; aged paper
- **Recurring elements:** Masks (different styles for roles); accusation fingers; secret note cards; trust meters

### Art Style
- **Illustration:** Baroque detail meets graphic novel drama; chiaroscuro lighting
- **Character design:** Elaborate period costumes; expressive masks; silhouette mystery
- **Environment:** Opulent Victorian ballrooms; gaslit streets; gothic mansions; theatrical staging
- **UI aesthetic:** Ornate frames; gilt edges; theatrical program layout; secret society documentation

### Animation Style
- **Motion:** Theatrical and dramatic; curtain reveals; mask-like transformations
- **Transitions:** Curtain sweeps; card flips; mask rotations; fog dissolves
- **Micro-interactions:** Dramatic reveals; suspicious hover effects; accusation drama
- **Loading states:** Guests arriving; masks being donned; ballroom filling

### Sound Design Direction
- **Audio mood:** Baroque chamber music; whispered secrets; dramatic string stings
- **UI sounds:** Mask ceramic clicks; paper rustles; quill scratches; gasps; violin stings
- **Music:** Baroque classical with dark twist; harpsichord; string quartet; period dance music with ominous undertones

### Taglines
1. "Everyone is lying. Everyone is watching. Everyone is someone else."
2. "Behind the mask, the truth dances."
3. "Trust no one. Suspect everyone. Unmask the truth."

---

## 10. Smash the Police State

### Brand Essence
**One-line concept:** Organize, resist, liberate—tactical strategy for toppling authoritarianism through people power.

**Mood/tone:** Defiant, urgent, empowering, tactical, solidarity-driven

**Target emotional response:** Righteous anger channeled to action; empowerment through collective action; tension of resistance; hope through organization

### Color Palette
| Token | Hex | Name | Usage |
|-------|-----|------|-------|
| Primary | `#E63946` | Revolution Red | Urgency, resistance, action, solidarity |
| Secondary | `#1D1D1D` | Riot Black | Underground movement, tactical stealth |
| Accent | `#F1F1F1` | Unity White | Clarity, truth, peaceful protest, transparency |
| Background | `#2D2D2D` | Concrete Gray | Urban environment, street-level reality |
| Text | `#FFFFFF` | Clear Message | Maximum readability, bold statements |
| Gradient | Rising gradient from Riot Black through Revolution Red to Unity White | Raised fist or uprising |

### Typography
- **Display/headline:** Bebas Neue - Bold, condensed, protest poster impact
- **Body:** Inter - Clear, accessible, no-nonsense communication
- **Accent/UI:** Oswald - Strong condensed caps for slogans, UI labels
- **Character:** Bold, urgent, accessible; protest poster aesthetic; street art influence

### Visual Motifs
- **Primary symbol:** Raised fist transforming into network nodes; crowd becoming movement
- **Secondary patterns:** Protest signs; megaphone broadcasts; solidarity chains; organizational charts
- **Texture treatments:** Spray paint; wheat-paste poster; stencil graffiti; concrete; newsprint
- **Recurring elements:** Protest icons; organization trees; support networks; tactical maps; resistance timelines

### Art Style
- **Illustration:** Bold propaganda poster meets street art; high-contrast stencil work
- **Character design:** Diverse solidarity; masked protesters; symbolic representation; empowered citizens
- **Environment:** Urban realism; protest spaces; underground hideouts; occupied streets
- **UI aesthetic:** Tactical command interface; movement organizing tools; resistance network maps

### Animation Style
- **Motion:** Urgent and energetic; spreading movements; network growth; crowd surges
- **Transitions:** Spray paint reveals; poster wheat-paste slaps; crowd surge transitions
- **Micro-interactions:** Satisfying resistance actions; network connections forming; recruitment spreads
- **Loading states:** "Organizing resistance"; "gathering supporters"; network spreading map

### Sound Design Direction
- **Audio mood:** Urban soundscape; protest energy; megaphone clarity; crowd power
- **UI sounds:** Spray paint; megaphone feedback; crowd chants; solidarity claps; footsteps marching
- **Music:** Protest music; punk energy; hip-hop resistance; folk rebellion; chant-based anthems

### Taglines
1. "Organize. Resist. Liberate."
2. "One voice can whisper. A million voices roar."
3. "The people united will never be defeated."

---

## IP Design System Summary

Each IP has been crafted with:
- **Unique color psychology** matching theme and emotional goals
- **Typography** that reinforces brand personality and use case
- **Visual language** distinct from other IPs in the portfolio
- **Animation and sound** creating cohesive experiences
- **Photography/imagery direction** for marketing consistency
- **Taglines** crystallizing the core value proposition

### SDK Products (1-6)
Emphasize technical capability while remaining approachable and developer-friendly. Each has unique emotional positioning while maintaining professional credibility.

### Investment IPs (7-10)
Create immersive worlds with deep thematic resonance, ready for full game development and rich narrative experiences.

### Cross-Application
All systems are designed to scale across:
- Marketing websites and materials
- In-app/game UI and UX
- Social media and advertising
- Merchandise and physical products
- Event presence and booth design
- Pitch decks and investor presentations

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Nov 2024 | Initial design system |
| 1.1.0 | Nov 2024 | Added IP-specific design systems for all 10 IPs |

---

*Compassionate Design - Design that gives a damn.*
