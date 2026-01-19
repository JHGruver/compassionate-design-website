# SASS Optimization Plan

**Project:** Compassionate Design Website
**Date:** January 18, 2026
**Status:** Ready for Review

---

## Executive Summary

The current setup has **duplicate styling systems** - SASS files and CSS custom properties in `globals.css` define the same values. This creates maintenance overhead and potential inconsistencies.

| Issue | Impact | Priority |
|-------|--------|----------|
| Duplicate definitions (SASS + CSS) | Maintenance burden | 🔴 High |
| SASS files not imported in app | Unused code | 🔴 High |
| Tailwind + SASS overlap | Redundant styling | 🟠 Medium |
| No component-level SASS modules | Poor code splitting | 🟡 Low |

---

## Current Architecture Analysis

### File Structure
```
src/styles/
├── main.scss              # Master SASS file (NOT imported anywhere)
├── abstracts/
│   ├── _index.scss        # Barrel export
│   ├── _variables.scss    # 233 lines of SASS variables
│   ├── _mixins.scss       # 363 lines of mixins
│   └── _functions.scss    # Helper functions
├── base/
│   └── _typography.scss   # Typography styles
├── effects/
│   ├── _glass.scss        # Glassmorphism classes
│   ├── _glows.scss        # Glow effect classes
│   ├── _animations.scss   # Animation keyframes
│   └── _backgrounds.scss  # Background patterns
└── components/
    ├── _buttons.scss      # Button classes
    ├── _cards.scss        # Card classes
    ├── _badges.scss       # Badge classes
    └── _forms.scss        # Form classes
```

### Problem: Dual Styling Systems

**System 1: SASS (Not Used)**
- `main.scss` exports CSS custom properties from SASS variables
- Rich mixin library for glass, glow, responsive design
- Component classes defined (`.btn`, `.glass-card`, etc.)
- **NOT IMPORTED** in the application

**System 2: Tailwind + globals.css (Active)**
- `globals.css` manually defines CSS custom properties
- Tailwind uses these via `@theme inline`
- Same classes redefined (`.glass`, `.glass-card`, etc.)
- **ACTIVELY USED** in all components

### Duplication Examples

| Property | SASS (_variables.scss) | CSS (globals.css) |
|----------|------------------------|-------------------|
| Background | `$color-background: #0A0A0F` | `--background: #0A0A0F` |
| Accent Cyan | `$color-accent-cyan: #00F5FF` | `--accent-cyan: #00F5FF` |
| Glass Background | `$glass-background: rgba(...)` | `--glass-background: rgba(...)` |
| Glow Cyan | `$shadow-glow-cyan: 0 0 20px...` | `--glow-cyan: 0 0 20px...` |

---

## Optimization Options

### Option A: SASS-First Architecture (Recommended)

**Approach:** Use SASS as the single source of truth, compile to CSS custom properties.

**Benefits:**
- Single source of truth for all design tokens
- Access to SASS functions, mixins, and loops
- Better maintainability
- Can generate Tailwind config from SASS

**Implementation:**
1. Import `main.scss` in layout.tsx
2. Remove duplicate definitions from `globals.css`
3. Keep Tailwind for utility classes only
4. Use SASS mixins for complex components

```
src/app/layout.tsx
├── import '@/styles/main.scss'  # Design tokens + base styles
└── import './globals.css'       # Tailwind + minimal overrides
```

---

### Option B: Tailwind-First Architecture

**Approach:** Remove SASS, use Tailwind CSS + CSS custom properties only.

**Benefits:**
- Simpler build process (no SASS compilation)
- Tailwind handles all utilities
- Smaller dependency footprint

**Implementation:**
1. Delete `/src/styles/` directory entirely
2. Move any unique SASS mixins to Tailwind plugins
3. Keep all styling in `globals.css` + Tailwind classes

---

### Option C: Hybrid with Module SASS (Advanced)

**Approach:** Use CSS Modules with SASS for components, Tailwind for utilities.

**Benefits:**
- Scoped styles per component
- No class name collisions
- Tree-shaking for styles

**Implementation:**
1. Create `ComponentName.module.scss` files
2. Import specific styles in components
3. Use Tailwind for layout/spacing only

```tsx
// Button.tsx
import styles from './Button.module.scss';

<button className={styles.primary}>Click</button>
```

---

## Recommended Execution Plan (Option A)

### Phase 1: Connect SASS System

1. **Import main.scss in the app**
   ```tsx
   // src/app/layout.tsx
   import '@/styles/main.scss';
   import './globals.css';
   ```

2. **Update globals.css to avoid duplication**
   - Remove `:root` CSS properties (now from SASS)
   - Keep `@import "tailwindcss"`
   - Keep `@theme inline` block for Tailwind mapping

### Phase 2: Consolidate Design Tokens

1. **Single source in _variables.scss**
   - All colors, spacing, typography defined once
   - main.scss exports to CSS custom properties

2. **Update globals.css**
   ```css
   @import "tailwindcss";

   /* Remove duplicate :root definitions */
   /* SASS handles CSS custom properties via main.scss */

   @theme inline {
     /* Map CSS properties to Tailwind */
     --color-background: var(--background);
     /* ... */
   }

   /* Keep only Tailwind-specific overrides */
   ```

### Phase 3: Leverage SASS Mixins

**Currently Unused Mixins (High Value):**

| Mixin | Purpose | Use Case |
|-------|---------|----------|
| `@include glass($blur, $opacity)` | Customizable glassmorphism | Different blur levels per component |
| `@include glow-hover($color)` | Multi-layer glow on hover | Button/card interactions |
| `@include text-gradient($gradient)` | Gradient text | Headlines |
| `@include truncate($lines)` | Text truncation | Card descriptions |
| `@include respond-to($breakpoint)` | Media queries | Responsive layouts |
| `@include stagger-children($delay)` | Animation stagger | List animations |

**Example Migration:**
```scss
// Before (inline Tailwind classes)
<div className="bg-background-secondary/80 backdrop-blur-xl border border-white/10">

// After (SASS mixin)
.my-card {
  @include glass(24px, 0.8);
}
```

### Phase 4: Remove Duplicates from globals.css

**Delete from globals.css (handled by SASS):**
- `.glass` class (lines 137-142)
- `.glass-card` class (lines 144-157)
- `.glow-*` classes (lines 163-181)
- `.gradient-text` class (lines 126-131)
- `.display-*` classes (lines 106-123)
- Keyframe animations (lines 241-281)
- Animation utility classes (lines 283-302)

**Keep in globals.css:**
- `@import "tailwindcss"`
- `@theme inline` block
- Base `body` styles
- Lenis smooth scroll styles
- Scrollbar styles
- Selection styles
- Reduced motion media query

---

## File Changes Summary

### Files to Modify

| File | Action | Changes |
|------|--------|---------|
| `src/app/layout.tsx` | Add import | `import '@/styles/main.scss'` |
| `src/app/globals.css` | Reduce | Remove duplicate classes (~150 lines) |
| `src/styles/main.scss` | Keep | Already configured correctly |

### Files to Keep As-Is

| File | Reason |
|------|--------|
| `src/styles/abstracts/*` | Design tokens and mixins |
| `src/styles/effects/*` | Effect classes |
| `src/styles/components/*` | Component base styles |
| `src/styles/base/*` | Typography |

### Estimated Impact

| Metric | Before | After |
|--------|--------|-------|
| globals.css lines | 368 | ~150 |
| Duplicate definitions | 45+ | 0 |
| Maintenance points | 2 (SASS + CSS) | 1 (SASS only) |
| Build complexity | Same | Same |

---

## Migration Checklist

### Pre-Migration
- [ ] Verify SASS compiles without errors
- [ ] Document current class usage across components
- [ ] Create backup of globals.css

### Phase 1: Connect SASS
- [ ] Add `import '@/styles/main.scss'` to layout.tsx
- [ ] Verify styles still apply correctly
- [ ] Test all pages for visual regression

### Phase 2: Remove Duplicates
- [ ] Remove `:root` CSS properties from globals.css
- [ ] Remove duplicate utility classes from globals.css
- [ ] Keep Tailwind integration intact
- [ ] Test all components

### Phase 3: Verify
- [ ] Run `npm run build` successfully
- [ ] Check bundle size (should be similar or smaller)
- [ ] Visual regression test on Vercel preview
- [ ] Verify dark theme still works

### Post-Migration
- [ ] Update MAINTENANCE_PLAN.md
- [ ] Document SASS architecture for team
- [ ] Remove this plan file (or archive)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| SASS compilation errors | Low | High | Test build before deploy |
| Missing styles after migration | Medium | Medium | Visual regression testing |
| Tailwind class conflicts | Low | Low | Keep Tailwind utilities separate |
| Build time increase | Low | Low | SASS is already a dependency |

---

## Quick Win: Button Height Fix

**Issue:** "Explore Products" and "Learn More" buttons have different heights.

**Root Cause:** `outline` variant has `border-2` while `primary` variant has no border, causing 4px height difference.

**Fix Applied:** Added `border-2 border-transparent` to primary, secondary, and ghost variants in [Button.tsx](src/components/atoms/Button/Button.tsx:19-28).

---

## Decision Required

Choose one option:

| Option | Effort | Benefit | Recommendation |
|--------|--------|---------|----------------|
| **A: SASS-First** | Medium | High | ✅ Recommended |
| B: Tailwind-First | High | Medium | Good if removing SASS entirely |
| C: CSS Modules | High | High | Best for large teams |

**Recommended:** Option A - Connect the existing SASS system and remove duplicates. The SASS architecture is already well-designed with comprehensive mixins and variables. It just needs to be imported and used.

---

## Next Steps

1. Review this plan
2. Approve approach (A, B, or C)
3. Execute Phase 1 (connect SASS)
4. Test on Vercel preview
5. Execute remaining phases
