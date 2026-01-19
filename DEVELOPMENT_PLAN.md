# Development Plan - Major Features

**Date:** January 18, 2026
**Status:** APPROVED - Ready for Implementation

---

## Decisions Made

| Question | Decision |
|----------|----------|
| Loading animation | First visit per session only |
| Investor page | Password-protected |
| Newsletter | ConvertKit (recommended) + Medium link |
| PDF | Dynamic page with client-side PDF export |
| Content | Placeholder structure (content to be added later) |

---

## Overview

Four major feature sets to implement:

| # | Feature | Complexity | Status |
|---|---------|------------|--------|
| 1 | Button Connections | Low | Pending |
| 2 | Newsletter Subscription | Medium | Pending |
| 3 | Investor Package Page | High | Pending |
| 4 | Home Loading Animation | High | Pending |

---

## Feature 1: Button Connections

### Tasks

| Button | File | Action |
|--------|------|--------|
| Logo | Header.tsx | Link to "/" (verify) |
| Get Started (Desktop) | Header.tsx | Scroll to #contact |
| Get Started (Mobile) | Header.tsx | Scroll to #contact + close menu |
| Explore Products | Hero.tsx | Scroll to #portfolio |
| Learn More | Hero.tsx | Scroll to #about |
| Request Investor Package | IPGallery.tsx | Navigate to /investors |

### Files to Create/Modify
- `src/lib/scroll.ts` (new - scroll utility)
- `src/components/organisms/Header/Header.tsx` (modify)
- `src/components/organisms/Hero/Hero.tsx` (modify)
- `src/components/organisms/IPGallery/IPGallery.tsx` (modify)
- `src/components/organisms/Footer/Footer.tsx` (cleanup broken links)

---

## Feature 2: Newsletter Subscription

### Approach
- **Primary:** ConvertKit for email collection & automation
- **Secondary:** Link to Medium (medium.com/@jgruver) for existing content
- **Fallback:** Store emails in a simple database if ConvertKit not set up

### Implementation

```
User Flow:
1. Enter email in Contact section
2. Form validates email
3. POST to /api/subscribe
4. ConvertKit API adds subscriber
5. Show success message
6. Optional: Redirect to Medium or show welcome content
```

### Files to Create
- `src/app/api/subscribe/route.ts` (API endpoint)
- `src/lib/convertkit.ts` (ConvertKit wrapper)
- Update `src/components/organisms/Contact/Contact.tsx`

### Environment Variables Needed
```
CONVERTKIT_API_KEY=xxx
CONVERTKIT_FORM_ID=xxx
```

### Medium Integration
- Add "Read our latest on Medium" link in newsletter section
- Link: medium.com/@jgruver

---

## Feature 3: Investor Package Page (Password Protected)

### Authentication Flow

```
User clicks "Request Investor Package"
         ↓
Redirect to /investors
         ↓
Password gate appears (modal or page)
         ↓
User enters password
         ↓
Password verified → Show content
         ↓
Session stored (stays unlocked during session)
```

### Password Options
- **Simple:** Single shared password (stored in env var)
- **Advanced:** Request access form → you approve → send password

**Recommendation:** Start with simple shared password, upgrade later if needed.

### Page Structure

```
/investors (password protected)
│
├── Password Gate (if not authenticated)
│
└── Content (if authenticated)
    ├── Hero: "Investor Package 2026"
    ├── Download PDF button (sticky)
    ├── Executive Summary (placeholder)
    ├── The Opportunity (placeholder)
    ├── Portfolio Overview (from existing IP data)
    ├── IP Showcases (pulled from investmentIPs)
    ├── Team Section (placeholder)
    ├── Financials (placeholder)
    └── Contact CTA (schedule meeting)
```

### PDF Generation
- Use `html2pdf.js` for client-side PDF export
- "Download PDF" button triggers export
- PDF includes all visible sections
- Print-optimized styles applied during export

### Files to Create
```
src/app/investors/
├── page.tsx (main page with auth check)
├── layout.tsx (custom layout, no main header)
└── components/
    ├── PasswordGate.tsx
    ├── InvestorHero.tsx
    ├── ExecutiveSummary.tsx
    ├── OpportunitySection.tsx
    ├── PortfolioOverview.tsx
    ├── IPShowcase.tsx
    ├── TeamSection.tsx
    ├── FinancialsSection.tsx
    └── InvestorCTA.tsx

src/data/investorContent.ts (placeholder content)
src/lib/investorAuth.ts (password check utility)
```

### Environment Variables
```
INVESTOR_PASSWORD=your-secure-password
```

---

## Feature 4: Home Loading Animation

### Trigger
- First visit per session (check sessionStorage)
- Skip if `sessionStorage.getItem('hasVisited')` exists
- Set flag after animation completes

### Animation Timeline

| Phase | Time | Description |
|-------|------|-------------|
| 1. Initial | 0s | Black screen |
| 2. Grid | 0-1.5s | Grid lines draw from center outward |
| 3. Particles | 1.5-3.5s | Particles spawn and multiply |
| 4. Content | 3.5-5s | Hero text, nav, buttons reveal |
| 5. Complete | 5s+ | Page interactive, flag set |

### Skip Functionality
- "Skip" button appears after 1s
- Click skips to complete state immediately
- Keyboard: Press any key or Escape to skip

### Reduced Motion
- Check `prefers-reduced-motion` media query
- If true, skip animation entirely

### Files to Create
```
src/components/organisms/LoadingSequence/
├── LoadingSequence.tsx (main orchestrator)
├── GridReveal.tsx (animated grid)
├── useLoadingSequence.ts (hook for state)
└── loadingSequence.module.scss (styles)

src/contexts/LoadingContext.tsx (global loading state)
```

### Integration Points
- Wrap app in LoadingContext
- LoadingSequence renders in layout.tsx
- Hero/Header listen to loading state for coordinated reveals

---

## Implementation Order

### Phase 1: Button Connections ✓
Quick wins to make site functional.

### Phase 2: Newsletter System
Get email collection working.

### Phase 3: Loading Animation
Create the "wow" first impression.

### Phase 4: Investor Package
Build the protected investor page with PDF export.

---

## Placeholder Content Structure

Since you don't have investor content yet, I'll create a complete structure with placeholder text that you can easily replace later.

### Executive Summary Placeholder
```
Mission: [Your mission statement]
Founded: [Year]
Team Size: [Number]
IPs in Development: 10
Investment Seeking: $[Amount]
```

### Team Section Placeholder
```
Founder/CEO: [Name]
- Bio placeholder
- Relevant experience

Technical Lead: [Name]
- Bio placeholder
- Relevant experience
```

### Financials Placeholder
```
Current Stage: [Seed/Series A/etc.]
Runway: [X months]
Use of Funds:
- Development: XX%
- Marketing: XX%
- Operations: XX%
```

---

## Next Steps

1. **I'll start coding Feature 1 (Button Connections)** - Quick win
2. Then move through Features 2, 3, 4 in order
3. You can fill in placeholder content anytime
4. Each feature will be committed and deployed separately

Ready to begin?
