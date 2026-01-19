# Button Audit - Landing Page

**Date:** January 18, 2026
**Status:** Proposal - Awaiting Approval

---

## Summary

Found **14 buttons/CTAs** across the landing page. Many are non-functional or have placeholder actions.

| Section | Button | Current State | Proposed Action |
|---------|--------|---------------|-----------------|
| Header | Get Started | No action | Scroll to Contact |
| Hero | Explore Products | No action | Scroll to Portfolio |
| Hero | Learn More | No action | Scroll to About |
| IPGallery | Filter Pills (3) | Working | Keep as-is |
| IPGallery | IP Cards | Working | Navigate to /products/[id] |
| IPGallery | Request Investor Package | No action | Open email/modal |
| ServicesShowcase | Service Tier CTAs (3) | Working | Scroll to Contact |
| ServicesShowcase | Get Your Free Audit | Working | Scroll to Contact |
| Contact | Subscribe (Newsletter) | Form submit only | Connect to email service |
| Footer | Links | Working | Keep as-is |

---

## Detailed Audit

### 1. HEADER

**File:** `src/components/organisms/Header/Header.tsx`

| Button | Line | Current | Proposed Action |
|--------|------|---------|-----------------|
| **Get Started** (Desktop) | 63-65 | `<Button variant="outline">` - No action | Smooth scroll to `#contact` section |
| **Get Started** (Mobile) | 126 | `<Button size="lg">` - No action | Smooth scroll to `#contact` section + close mobile menu |

**Implementation:**
- Add `onClick` handler to scroll to contact section
- Mobile version should also call `setIsMobileMenuOpen(false)`

---

### 2. HERO SECTION

**File:** `src/components/organisms/Hero/Hero.tsx`

| Button | Line | Current | Proposed Action |
|--------|------|---------|-----------------|
| **Explore Products** | 69-71 | `<Button size="md" glowEffect>` - No action | Smooth scroll to `#portfolio` section |
| **Learn More** | 72-74 | `<Button variant="outline">` - No action | Smooth scroll to `#about` section |

**Implementation:**
- Add `onClick` handlers with smooth scroll behavior
- Consider adding `href` as anchor links for accessibility

---

### 3. IP GALLERY (Portfolio Section)

**File:** `src/components/organisms/IPGallery/IPGallery.tsx`

| Button | Line | Current | Proposed Action |
|--------|------|---------|-----------------|
| **All IPs** (filter) | 59-71 | Working | Keep as-is (filter toggle) |
| **SDK Products** (filter) | 59-71 | Working | Keep as-is (filter toggle) |
| **Investment Opportunities** (filter) | 59-71 | Working | Keep as-is (filter toggle) |
| **Request Investor Package** | 166-168 | No action | Open mailto link OR modal with contact form |

**IP Cards** (`src/components/organisms/IPGallery/IPCard.tsx`)
- Cards already navigate to `/products/[id]` via `onClick` prop

**Implementation for Investor Package:**
- Option A: `mailto:investors@compassionate-design.com?subject=Investor Package Request`
- Option B: Open modal with specialized contact form
- Option C: Scroll to contact section with pre-filled "Investor" topic

---

### 4. SERVICES SHOWCASE

**File:** `src/components/organisms/ServicesShowcase/ServicesShowcase.tsx`

| Button | Line | Current | Proposed Action |
|--------|------|---------|-----------------|
| **Get Your Free Audit** | 263-273 | Has `onClick={scrollToContact}` | Working - Keep as-is |

**Service Tier CTAs** (`src/components/organisms/ServicesShowcase/ServiceTier.tsx`)

| Button | Line | Current | Proposed Action |
|--------|------|---------|-----------------|
| **Service Tier CTA** (Free Audit) | 127-144 | Has `onCtaClick` prop | Working - Keep as-is |
| **Service Tier CTA** (Sprint) | 127-144 | Has `onCtaClick` prop | Working - Keep as-is |
| **Service Tier CTA** (Retainer) | 127-144 | Has `onCtaClick` prop | Working - Keep as-is |

All service buttons already scroll to contact section.

---

### 5. CONTACT SECTION

**File:** `src/components/organisms/Contact/Contact.tsx`

| Button | Line | Current | Proposed Action |
|--------|------|---------|-----------------|
| **Subscribe** (Newsletter) | 120-122 | Form `onSubmit` sets `isSubmitted=true` | Connect to actual email service (Mailchimp, ConvertKit, etc.) |

**Implementation Options:**
- Option A: Mailchimp embed/API integration
- Option B: ConvertKit API
- Option C: Custom backend endpoint → email service
- Option D: Formspree/Netlify Forms (simplest)

**Current behavior:** Shows "Subscribed!" for 3 seconds, then resets. No actual subscription occurs.

---

### 6. FOOTER

**File:** `src/components/organisms/Footer/Footer.tsx`

All footer links are standard `<Link>` components:
- **Products links**: Anchor scrolls (`#products`, `#featured`, `#new`)
- **Company links**: Anchor scrolls (`#about`, `#team`, `#careers`)
- **Connect links**: External links (LinkedIn, Twitter, GitHub)
- **Legal links**: Navigate to `/privacy` and `/terms`

**Issues:**
- `#featured`, `#new`, `#team`, `#careers` sections don't exist on the page
- `/privacy` and `/terms` pages likely don't exist

---

## Proposed Click Actions Summary

### Primary CTAs (Most Important)

| Button | Action | Type |
|--------|--------|------|
| **Explore Products** (Hero) | Scroll to `#portfolio` | Anchor scroll |
| **Learn More** (Hero) | Scroll to `#about` | Anchor scroll |
| **Get Started** (Header) | Scroll to `#contact` | Anchor scroll |
| **Subscribe** (Contact) | Submit to email service | API call |

### Secondary CTAs

| Button | Action | Type |
|--------|--------|------|
| **Request Investor Package** | `mailto:investors@compassionate-design.com` | Email link |
| **Get Your Free Audit** | Already working | Anchor scroll |
| **Service Tier CTAs** | Already working | Anchor scroll |

### Navigation/Filter (Working)

| Element | Action | Status |
|---------|--------|--------|
| Filter pills | Toggle filter state | Working |
| IP Cards | Navigate to product page | Working |
| Footer links | Various | Partially working (some anchors missing) |

---

## Implementation Priority

### Phase 1: Critical (Non-functional primary buttons)
1. **Hero "Explore Products"** → Scroll to `#portfolio`
2. **Hero "Learn More"** → Scroll to `#about`
3. **Header "Get Started"** (Desktop + Mobile) → Scroll to `#contact`

### Phase 2: Important (Complete user journey)
4. **IPGallery "Request Investor Package"** → Email link or modal
5. **Contact "Subscribe"** → Connect to email service

### Phase 3: Cleanup (Polish)
6. Remove or fix non-existent footer anchor links (`#featured`, `#new`, `#team`, `#careers`)
7. Create `/privacy` and `/terms` pages OR remove links

---

## Technical Implementation Notes

### Scroll Function (Reusable)
```typescript
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
```

### Email Service Options for Newsletter
1. **Formspree** (easiest) - Just point form action to Formspree URL
2. **ConvertKit** - Free for first 1000 subscribers
3. **Mailchimp** - Free tier available
4. **Resend** - Developer-friendly API

### Investor Package Options
1. Simple mailto link (immediate)
2. Modal with Calendly embed (scheduling)
3. Dedicated `/investors` page with more info

---

## Questions for Decision

1. **Newsletter service preference?** (Mailchimp, ConvertKit, Formspree, custom?)
2. **Investor Package flow?** (Simple email, modal, dedicated page?)
3. **Should footer links to non-existent sections be removed or should those sections be created?**
4. **Should `/privacy` and `/terms` pages be created?**

---

## Ready for Implementation

Approve this plan and I'll implement all button actions in order of priority.
