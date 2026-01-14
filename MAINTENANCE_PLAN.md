# Maintenance & Optimization Execution Plan

**Project:** Compassionate Design Website
**Date:** January 14, 2026
**Status:** Ready for Execution

---

## Executive Summary

| Category | Status | Action Items |
|----------|--------|--------------|
| Code Quality | ✅ Clean | 0 lint errors, 0 warnings |
| Dependencies | ⚠️ 16 Outdated | Updates available |
| Performance | ⚠️ Needs Optimization | ~410KB unused dependencies, code splitting opportunities |

---

## 1. Code Quality Report

### Lint Status: ✅ PASSED

```
npm run lint → 0 errors, 0 warnings
```

No action required. Codebase is clean.

---

## 2. Dependency Updates

### Outdated Packages (16 total)

| Package | Current | Latest | Priority | Risk |
|---------|---------|--------|----------|------|
| **@react-three/fiber** | 9.4.2 | 9.5.0 | Medium | Low |
| **@tailwindcss/postcss** | 4.1.17 | 4.1.18 | Low | Low |
| **@types/node** | 20.19.25 | 25.0.8 | Low | Medium (major) |
| **@types/react** | 19.2.7 | 19.2.8 | Low | Low |
| **@types/three** | 0.181.0 | 0.182.0 | Medium | Low |
| **eslint** | 9.39.1 | 9.39.2 | Low | Low |
| **eslint-plugin-prettier** | 5.5.4 | 5.5.5 | Low | Low |
| **framer-motion** | 12.23.24 | 12.26.2 | Medium | Low |
| **gsap** | 3.13.0 | 3.14.2 | ❌ REMOVE | N/A |
| **lenis** | 1.3.15 | 1.3.17 | Low | Low |
| **prettier** | 3.7.3 | 3.7.4 | Low | Low |
| **react** | 19.2.0 | 19.2.3 | High | Low |
| **react-dom** | 19.2.0 | 19.2.3 | High | Low |
| **sass** | 1.94.2 | 1.97.2 | Low | Low |
| **tailwindcss** | 4.1.17 | 4.1.18 | Low | Low |
| **three** | 0.181.2 | 0.182.0 | Medium | Medium |

### Execution Plan: Dependencies

#### Phase 1: Remove Unused Dependencies (HIGH PRIORITY)
```bash
npm uninstall gsap @gsap/react
```
**Impact:** Save ~410KB from bundle
**Risk:** None - these packages are NOT imported anywhere in the codebase

#### Phase 2: Safe Updates (patch versions)
```bash
npm update @tailwindcss/postcss @types/react eslint eslint-plugin-prettier lenis prettier sass tailwindcss
```
**Risk:** Low - patch updates only

#### Phase 3: Minor Updates (review changelogs first)
```bash
npm install @react-three/fiber@9.5.0 framer-motion@12.26.2 react@19.2.3 react-dom@19.2.3
```
**Risk:** Low - but test animations and Three.js scenes after

#### Phase 4: Evaluate Major Updates (optional)
- `@types/node` has major version 25 available - stay on 20.x for stability
- `three` 0.182.0 - check for breaking changes before updating

---

## 3. Performance Analysis

### Build Metrics
- **Compile time:** 1,670ms ✅
- **Static generation:** 164ms ✅
- **Routes:** 3 (2 static, 1 dynamic)

### Bundle Size Issues

#### 🔴 Critical: Unused Dependencies (~410KB)

| Package | Size | Status |
|---------|------|--------|
| gsap | ~360KB | NOT IMPORTED - Remove |
| @gsap/react | ~50KB | NOT IMPORTED - Remove |

**Action:** Remove immediately

#### 🔴 Critical: Large Components Needing Code Splitting

| File | Lines | Issue |
|------|-------|-------|
| `src/app/products/[id]/page.tsx` | 433 | Inline StatusBadge, heavy animations |
| `src/components/organisms/IPGallery/IPCard.tsx` | 379 | Multiple special effects embedded |
| `src/components/three/scenes/InteractiveParticles.tsx` | 374 | Large particle system |
| `src/data/ipThemes.ts` | 372 | All themes loaded upfront |
| `src/data/products.ts` | 395 | All product data loaded upfront |

#### 🟠 Medium: Export Pattern Issues

Multiple components export both named AND default exports:
```typescript
// Current (redundant)
export { Button, default } from "./Button";

// Should be (pick one)
export { Button } from "./Button";
```

Files affected: Button, AnimatedContainer, Footer, and others

#### 🟢 Good: Dynamic Import Already Implemented
- `Scene3D` correctly uses `next/dynamic` with `ssr: false`
- Three.js only loads client-side ✅

---

## 4. Execution Plan: Performance Optimization

### Phase 1: Quick Wins (30 min)

1. **Remove unused GSAP packages**
   ```bash
   npm uninstall gsap @gsap/react
   ```

2. **Update safe dependencies**
   ```bash
   npm update
   ```

3. **Verify build still works**
   ```bash
   npm run build
   ```

### Phase 2: Component Extraction (2-3 hours)

1. **Extract StatusBadge from product page**
   - Create: `src/components/atoms/StatusBadge/StatusBadge.tsx`
   - Move inline StatusBadge component out of page.tsx

2. **Extract IPCard special effects**
   - Create: `src/components/molecules/SpecialEffects/`
   - Move particle, scanline, noise, vignette, spotlight effects

3. **Split Icon component**
   - Create individual icon files or use dynamic imports
   - Current: 8+ icons bundled together

### Phase 3: Data Lazy Loading (1-2 hours)

1. **Lazy load theme definitions**
   - Only load theme data when product page is visited
   - Consider: `import()` for ipThemes based on route

2. **Split product data**
   - Separate SDK products from Investment products
   - Load based on category filter

### Phase 4: Import Cleanup (1 hour)

1. **Standardize export patterns**
   - Choose either named OR default exports
   - Update all index.ts barrel files

2. **Create animation re-export file**
   ```typescript
   // src/animations/framer.ts
   export { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
   ```

---

## 5. Priority Matrix

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| 🔴 P0 | Remove GSAP packages | 410KB saved | 5 min |
| 🔴 P0 | Update React to 19.2.3 | Security/stability | 10 min |
| 🟠 P1 | Update remaining dependencies | Maintenance | 15 min |
| 🟠 P1 | Extract StatusBadge component | Code organization | 30 min |
| 🟠 P1 | Extract IPCard special effects | Bundle optimization | 1 hour |
| 🟡 P2 | Lazy load theme data | Load time | 1 hour |
| 🟡 P2 | Standardize exports | Code quality | 30 min |
| 🟢 P3 | Split Icon component | Minor optimization | 30 min |

---

## 6. Risk Assessment

| Change | Risk Level | Mitigation |
|--------|------------|------------|
| Remove GSAP | None | Not used anywhere |
| Update patch versions | Low | Run tests after |
| Update React | Low | Well-tested upgrade path |
| Update Three.js | Medium | Test 3D scenes thoroughly |
| Component extraction | Low | No functional changes |
| Export cleanup | Low | Update imports accordingly |

---

## 7. Success Criteria

After execution:
- [ ] GSAP removed from package.json
- [ ] All dependencies at latest patch versions
- [ ] Build completes without errors
- [ ] Bundle size reduced by ~400KB
- [ ] No visual regressions on Vercel preview
- [ ] Lint passes with 0 errors

---

## 8. Commands Reference

```bash
# Phase 1: Remove unused
npm uninstall gsap @gsap/react

# Phase 2: Update safe packages
npm update

# Phase 3: Update minor versions
npm install @react-three/fiber@latest framer-motion@latest react@latest react-dom@latest

# Verify
npm run lint
npm run build
```

---

## Next Steps

1. Review this plan
2. Approve execution phases
3. Begin Phase 1 (Quick Wins)
4. Test on Vercel preview after each phase
5. Push to production when stable
