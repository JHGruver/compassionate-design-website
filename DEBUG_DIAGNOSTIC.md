# Debug Diagnostic Report

**Project:** Compassionate Design Website
**Date:** January 12, 2026
**Status:** 32 Errors, 4 Warnings

---

## Executive Summary

The application has **critical React purity violations** and **ESLint errors** that can cause:
- Unpredictable re-renders and UI glitches
- Server stopping/crashing behavior
- Hydration mismatches between server and client
- Performance degradation

---

## Critical Issues

### Issue #1: Impure Function Calls During Render (HIGH PRIORITY)

**Severity:** Critical
**Impact:** Server instability, unpredictable behavior, potential crashes

#### What's Happening
Multiple components call `Math.random()` directly during render. React expects components to be "pure" - meaning they produce the same output given the same inputs. `Math.random()` violates this rule because it returns different values on each call.

#### Why This Causes Problems
1. **Hydration Mismatch:** Server renders with one random value, client renders with another = React errors
2. **Infinite Re-renders:** Random values change on every render, potentially triggering more renders
3. **Memory Leaks:** Cascading renders can exhaust browser/server resources
4. **Server Crashes:** Turbopack/Next.js may terminate due to render loop detection

#### Affected Files

| File | Line(s) | Issue |
|------|---------|-------|
| `src/components/organisms/IPGallery/IPCard.tsx` | 81, 90, 92 | `Math.random()` in Framer Motion initial/transition props |
| `src/components/three/scenes/ParticleField.tsx` | 28-34 | `Math.random()` inside `useMemo` (6 occurrences) |
| `src/components/three/scenes/InteractiveParticles.tsx` | Multiple | `Math.random()` for particle generation |

#### How to Fix

**IPCard.tsx (lines 81, 90, 92):**
```
Problem: Math.random() called directly in JSX props

Solution: Pre-generate random values using useMemo with a stable seed,
or generate them once on mount using useEffect + useState.

Example approach:
1. Create an array of pre-computed random values at component mount
2. Use useId() or index as a stable seed for pseudo-random generation
3. Store random values in state, only set once on initial mount
```

**ParticleField.tsx (lines 28-34):**
```
Problem: Math.random() inside useMemo still runs on every render in React 18+ strict mode

Solution: Use a seeded random number generator, or generate values
outside the component and pass them as props.

Example approach:
1. Create a seeded PRNG function (e.g., using a simple LCG algorithm)
2. Pass a seed prop to ensure deterministic generation
3. Alternatively, generate positions in a useEffect on mount only
```

---

### Issue #2: setState Inside useEffect Causing Cascading Renders (HIGH PRIORITY)

**Severity:** Critical
**Impact:** Performance issues, potential infinite loops

#### What's Happening
In `MissionControl.tsx`, `setState` is called synchronously within a `useEffect`, which can trigger cascading renders.

#### Affected File

| File | Line | Issue |
|------|------|-------|
| `src/components/organisms/MissionControl/MissionControl.tsx` | 26 | `setIsPaused(!!selectedIP)` inside useEffect |

#### Why This Causes Problems
- Calling setState in useEffect triggers another render
- If the new render triggers the effect again, you get a render loop
- Can cause the server to become unresponsive

#### How to Fix

```
Problem:
useEffect(() => {
  setIsPaused(!!selectedIP);  // Triggers re-render
}, [selectedIP]);

Solution Options:

1. Derive state instead of syncing it:
   - Remove isPaused state entirely
   - Use: const isPaused = !!selectedIP (computed value)
   - Pass isPaused to children as a derived value

2. If state is truly needed, combine into single state object:
   - Use useReducer for complex state transitions
   - Or combine selectedIP and isPaused into one state update
```

---

### Issue #3: Unescaped Entities in JSX (MEDIUM PRIORITY)

**Severity:** Medium
**Impact:** Build warnings, potential rendering issues

#### What's Happening
Apostrophes (`'`) in text content need to be escaped in JSX to avoid parsing issues.

#### Affected Files

| File | Line(s) |
|------|---------|
| `src/components/organisms/About/About.tsx` | 34, 35 |
| `src/components/organisms/Contact/Contact.tsx` | 33, 47, 48, 108 |
| `src/components/organisms/Footer/Footer.tsx` | 44 |
| `src/components/organisms/MissionControl/IPDossier.tsx` | 207 |

#### How to Fix

```
Problem: Text like "We're building" or "company's vision"

Solution: Replace ' with one of:
- &apos;  (HTML entity)
- &rsquo; (right single quote - typographically correct)
- &#39;   (numeric entity)

Example:
Before: <p>We're excited</p>
After:  <p>We&apos;re excited</p>
```

---

### Issue #4: Anonymous Default Export (LOW PRIORITY)

**Severity:** Low
**Impact:** Code quality warning

#### Affected File

| File | Line |
|------|------|
| `src/components/atoms/Icon/Icon.tsx` | 239 |

#### How to Fix

```
Problem: export default { IconName1, IconName2, ... }

Solution: Assign to a variable first:
const Icons = { IconName1, IconName2, ... };
export default Icons;
```

---

## Warning: Outdated Dependency

### baseline-browser-mapping

**Message:** "The data in this module is over two months old"

This warning appears multiple times during build. While not critical, it can clutter logs.

#### How to Fix

```bash
npm i baseline-browser-mapping@latest -D
```

---

## Complete Error Summary

| Category | Count | Severity |
|----------|-------|----------|
| Impure function calls (Math.random) | 21 | Critical |
| setState in useEffect | 1 | Critical |
| Unescaped entities | 9 | Medium |
| Anonymous default export | 1 | Low |
| **Total Errors** | **32** | |
| **Total Warnings** | **4** | |

---

## Recommended Fix Order

1. **First Priority - Fix Critical Render Issues**
   - [ ] `IPCard.tsx` - Replace Math.random() with seeded/memoized values
   - [ ] `ParticleField.tsx` - Use seeded PRNG or generate on mount
   - [ ] `InteractiveParticles.tsx` - Same approach as ParticleField
   - [ ] `MissionControl.tsx` - Derive isPaused instead of syncing via useEffect

2. **Second Priority - Fix Build Errors**
   - [ ] `About.tsx` - Escape apostrophes
   - [ ] `Contact.tsx` - Escape apostrophes (4 locations)
   - [ ] `Footer.tsx` - Escape apostrophe
   - [ ] `IPDossier.tsx` - Escape apostrophe

3. **Third Priority - Code Quality**
   - [ ] `Icon.tsx` - Name the default export

4. **Optional - Clean Up Warnings**
   - [ ] Update baseline-browser-mapping package

---

## Testing After Fixes

After implementing fixes, verify by running:

```bash
# Check for lint errors
npm run lint

# Run development server
npm run dev

# Build for production (catches SSR issues)
npm run build

# Start production server
npm run start
```

**Expected Result:** All commands should complete without errors.

---

## Root Cause Analysis

The server instability you're experiencing is most likely caused by:

1. **React 19 Strict Mode** - More aggressive about detecting impure components
2. **Turbopack (Next.js 16)** - Faster hot reloading exposes render issues more quickly
3. **Hydration Mismatches** - Server/client random values differ, causing React to error
4. **Cascading Renders** - setState in useEffect creates render loops

The combination of these factors causes the dev server to become unresponsive or crash after running for a short period.

---

## Additional Notes

- The `[baseline-browser-mapping]` log message you mentioned is the outdated dependency warning
- The "something else" issue is likely the cascading render errors from impure functions
- All 32 errors need to be fixed for stable operation
