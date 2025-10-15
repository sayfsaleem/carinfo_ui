# CONTEXT_DB.MD
# Complete Project Context Database for CarInfo UI

**Project:** MOT Vehicle Check Platform
**Framework:** Next.js 15.5.5 (App Router)
**React Version:** 19.1.0
**Last Updated:** October 15, 2025
**Environment:** Windows (win32)

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Architecture & Technology Stack](#2-architecture--technology-stack)
3. [Directory Structure](#3-directory-structure)
4. [Configuration Files](#4-configuration-files)
5. [Dependencies](#5-dependencies)
6. [Routing & Pages](#6-routing--pages)
7. [Components Library](#7-components-library)
8. [Custom Hooks](#8-custom-hooks)
9. [Utilities & Libraries](#9-utilities--libraries)
10. [Data Models](#10-data-models)
11. [Styling System](#11-styling-system)
12. [Business Logic](#12-business-logic)
13. [Feature Matrix](#13-feature-matrix)
14. [Code Patterns](#14-code-patterns)
15. [Component Hierarchy](#15-component-hierarchy)
16. [State Management](#16-state-management)
17. [Animation System](#17-animation-system)
18. [SEO & Metadata](#18-seo--metadata)
19. [Development Workflow](#19-development-workflow)
20. [File Reference Index](#20-file-reference-index)

---

## 1. PROJECT OVERVIEW

### 1.1 Application Purpose
MOT Vehicle Check is a UK-focused vehicle intelligence platform that provides comprehensive vehicle data including MOT history, tax status, specifications, and market valuations. The platform uses a freemium model with three pricing tiers: Basic (Free), Silver (£2.99/month), and Gold (£5.99/month).

### 1.2 Business Model
- **Basic Tier:** Free access to MOT/Tax status and basic specifications
- **Silver Tier:** Full MOT history, mileage charts, environmental data
- **Gold Tier:** Keeper history, vehicle valuation, premium support

### 1.3 Target Users
- Private car buyers researching used vehicles
- Private sellers providing transparency
- Garages and mechanics verifying customer vehicles
- Car enthusiasts exploring vehicle specifications

### 1.4 Data Sources
- **DVLA** - Vehicle registration & licensing data
- **DVSA** - MOT history & test results
- **Police Database** - Stolen vehicle checks
- **Market Data** - Live valuation feeds (Gold tier)

### 1.5 Key Metrics (Demo)
- 150,000+ checks performed
- 99.9% accuracy rate
- 2 second average response time
- 50,000+ active users

---

## 2. ARCHITECTURE & TECHNOLOGY STACK

### 2.1 Framework
- **Next.js 15.5.5** - React framework with App Router architecture
- **Turbopack** - Build system for faster development and production builds
- **React 19.1.0** - UI library with modern concurrent features

### 2.2 Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processing pipeline
- **Custom CSS Variables** - Font families and design tokens
- **Framer Motion 12.23.24** - Animation library

### 2.3 Data Visualization
- **Recharts 3.2.1** - Charting library for mileage progression

### 2.4 Icons
- **React Icons 5.5.0** - Icon library (Font Awesome 6)
- **Lucide React 0.545.0** - Alternative icon set

### 2.5 Utilities
- **clsx 2.1.1** - Class name composition
- **tailwind-merge 3.3.1** - Tailwind class merging

### 2.6 Development Tools
- **TypeScript 5.9.3** - Type checking
- **ESLint 9** - Code linting
- **Git** - Version control (initialized repository)

### 2.7 Deployment
- **Vercel** - Recommended deployment platform (Next.js native)
- **Environment:** Node.js runtime

---

## 3. DIRECTORY STRUCTURE

```
carinfo_ui/
│
├── public/                          # Static assets
│   └── (images, fonts, favicon.ico)
│
├── src/                             # Source code
│   └── app/                         # Next.js App Router directory
│       ├── page.js                  # Home/Landing page
│       ├── layout.js                # Root layout (wraps all pages)
│       ├── loading.js               # Global loading state
│       ├── not-found.js             # 404 error page
│       ├── globals.css              # Global styles + Tailwind config
│       ├── favicon.ico              # Site favicon
│       │
│       ├── components/              # All React components
│       │   ├── layout/              # Layout components
│       │   │   ├── Navbar.js        # Header navigation
│       │   │   └── Footer.js        # Footer with links
│       │   │
│       │   ├── ui/                  # Base UI components
│       │   │   ├── Button.js        # Button variants
│       │   │   ├── Card.js          # Card container
│       │   │   ├── Input.js         # Form input
│       │   │   ├── Badge.js         # Status badges
│       │   │   ├── Tabs.js          # Tab interface
│       │   │   ├── Modal.js         # Modal dialog
│       │   │   ├── Accordion.js     # Expandable accordion
│       │   │   ├── Toast.js         # Toast notifications
│       │   │   ├── LoadingSpinner.js # Loading animation
│       │   │   └── SuccessAnimation.js # Success feedback
│       │   │
│       │   ├── home/                # Home page components
│       │   │   ├── FloatingInfoCard.js      # Animated info cards
│       │   │   ├── TrustStat.js             # Trust statistics
│       │   │   ├── ProcessStep.js           # Process step cards
│       │   │   ├── DataSourceCard.js        # Data source display
│       │   │   ├── StatCard.js              # Statistics card
│       │   │   ├── LiveCheckFeed.js         # Live check activity
│       │   │   └── MiniPricingCard.js       # Pricing preview
│       │   │
│       │   ├── vehicle/             # Vehicle check page components
│       │   │   ├── VehicleHeader.js         # Vehicle title/image
│       │   │   ├── StatusCard.js            # MOT/Tax status
│       │   │   ├── VehicleSpecs.js          # Specifications grid
│       │   │   ├── MOTHistoryTimeline.js    # MOT history
│       │   │   ├── MOTTestCard.js           # Single MOT test
│       │   │   ├── MileageChart.js          # Mileage chart
│       │   │   ├── KeeperHistoryTimeline.js # Keeper history
│       │   │   ├── EnvironmentalInfo.js     # CO2/emissions
│       │   │   ├── ValuationCard.js         # Vehicle valuation
│       │   │   ├── FeatureLock.js           # Paywall component
│       │   │   ├── QuickStat.js             # Quick stat display
│       │   │   ├── SectionHeader.js         # Section headers
│       │   │   └── UpgradePrompt.js         # Upgrade CTA
│       │   │
│       │   ├── pricing/             # Pricing page components
│       │   │   ├── PricingCard.js           # Pricing tier card
│       │   │   ├── ComparisonTable.js       # Feature comparison
│       │   │   ├── PricingFAQ.js            # Pricing FAQs
│       │   │   └── PaymentModal.js          # Payment form
│       │   │
│       │   ├── promotion/           # Promotional components
│       │   │   ├── TierUpgradePrompt.js     # Tier upgrade
│       │   │   ├── FeatureComparisonPopup.js # Feature popup
│       │   │   ├── FloatingUpgradeBanner.js # Floating banner
│       │   │   ├── ExitIntentModal.js       # Exit intent modal
│       │   │   └── StickyUpgradeBar.js      # Sticky bar
│       │   │
│       │   └── dashboard/           # Dashboard components
│       │       ├── VehicleCheckCard.js      # Check history card
│       │       ├── SavedVehicleCard.js      # Saved vehicles
│       │       └── StatCard.js              # Dashboard stats
│       │
│       ├── hooks/                   # Custom React hooks
│       │   ├── useCurrentTier.js    # Get/set user tier
│       │   └── useVehicleData.js    # Fetch vehicle data
│       │
│       ├── lib/                     # Utilities and libraries
│       │   ├── constants.js         # App constants
│       │   ├── utils.js             # Utility functions
│       │   ├── validation.js        # Form validation
│       │   ├── demoData.js          # Mock API data
│       │   ├── metadata.js          # SEO metadata
│       │   └── promotionUtils.js    # Promotion helpers
│       │
│       ├── check/                   # Vehicle check route
│       │   └── [vrm]/
│       │       ├── page.js          # Dynamic vehicle page
│       │       └── page_old_with_tabs.js # Legacy version
│       │
│       ├── pricing/                 # Pricing page route
│       │   └── page.js
│       │
│       ├── features/                # Features page route
│       │   └── page.js
│       │
│       ├── how-it-works/            # How It Works page route
│       │   └── page.js
│       │
│       ├── about/                   # About page route
│       │   └── page.js
│       │
│       ├── contact/                 # Contact page route
│       │   └── page.js
│       │
│       ├── blog/                    # Blog page route
│       │   └── page.js
│       │
│       └── dashboard/               # Dashboard page route
│           └── page.js
│
├── node_modules/                    # Installed dependencies
│
├── Configuration Files (root):
│   ├── package.json                 # Dependencies & scripts
│   ├── package-lock.json            # Dependency lock file
│   ├── next.config.mjs              # Next.js configuration
│   ├── postcss.config.mjs           # PostCSS config
│   ├── eslint.config.mjs            # ESLint rules
│   ├── jsconfig.json                # Path aliases (@/*)
│   ├── .gitignore                   # Git ignore rules
│   └── README.md                    # Project README
│
└── Documentation Files:
    ├── PROJECT_COMPLETE.md
    ├── PHASE_4_COMPLETION_SUMMARY.md
    ├── TAILWIND_V4_FIX.md
    ├── TAILWIND_V4_LAYER_FIX.md
    ├── FONT_AWESOME_6_FIX.md
    ├── DUPLICATE_KEY_FIX.md
    ├── VISUAL_ENHANCEMENTS_COMPLETE.md
    ├── PAGE_DIRECTORY.md
    └── CONTEXT_DB.MD                # This file
```

---

## 4. CONFIGURATION FILES

### 4.1 next.config.mjs
**Location:** `/next.config.mjs`

```javascript
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'totalcarcheck.co.uk',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
```

**Purpose:**
- Allows remote images from totalcarcheck.co.uk domain
- Optimizes image loading with Next.js Image component

### 4.2 postcss.config.mjs
**Location:** `/postcss.config.mjs`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**Purpose:**
- Configures Tailwind CSS v4 with PostCSS
- Processes CSS files through Tailwind

### 4.3 jsconfig.json
**Location:** `/jsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Purpose:**
- Sets up path alias `@/` to point to `./src/`
- Example: `import Button from '@/app/components/ui/Button'`

### 4.4 package.json
**Location:** `/package.json`

**Scripts:**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

## 5. DEPENDENCIES

### 5.1 Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.5.5 | React framework |
| react | 19.1.0 | UI library |
| react-dom | 19.1.0 | React DOM renderer |
| react-icons | ^5.5.0 | Icon library (Font Awesome 6) |
| recharts | ^3.2.1 | Data visualization charts |

### 5.2 Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @tailwindcss/postcss | ^4 | Tailwind CSS v4 PostCSS plugin |
| tailwindcss | ^4 | CSS framework |
| framer-motion | ^12.23.24 | Animation library |
| lucide-react | ^0.545.0 | Icon library |
| clsx | ^2.1.1 | Class name utility |
| tailwind-merge | ^3.3.1 | Merge Tailwind classes |
| typescript | ^5.9.3 | Type checking |
| @types/node | ^24.7.2 | Node.js type definitions |
| @types/react | ^19.2.2 | React type definitions |
| eslint | ^9 | Code linting |
| eslint-config-next | 15.5.5 | Next.js ESLint config |
| @eslint/eslintrc | ^3 | ESLint config helper |

---

## 6. ROUTING & PAGES

### 6.1 Route Structure

| Route | File Path | Purpose | Features |
|-------|-----------|---------|----------|
| `/` | `src/app/page.js` | Landing page | Hero, features, testimonials, FAQ |
| `/check/[vrm]` | `src/app/check/[vrm]/page.js` | Vehicle report | Dynamic route, tier-based content |
| `/pricing` | `src/app/pricing/page.js` | Pricing details | Tier comparison, payment modal |
| `/features` | `src/app/features/page.js` | Feature showcase | Product features |
| `/how-it-works` | `src/app/how-it-works/page.js` | Process guide | Step-by-step explanation |
| `/about` | `src/app/about/page.js` | Company info | About section |
| `/contact` | `src/app/contact/page.js` | Contact form | Contact information |
| `/blog` | `src/app/blog/page.js` | Blog posts | Articles listing |
| `/dashboard` | `src/app/dashboard/page.js` | User dashboard | Saved checks, stats |
| `*` | `src/app/not-found.js` | 404 page | Custom error page |

### 6.2 Root Layout
**File:** `src/app/layout.js`

**Key Features:**
- Wraps all pages with consistent layout
- Loads Geist Sans and Geist Mono fonts from Google Fonts
- Includes Navbar and Footer components
- Sets up metadata for SEO
- Smooth scroll behavior enabled

**Metadata:**
```javascript
{
  title: {
    default: "MOT Vehicle Check",
    template: "%s | MOT Vehicle Check"
  },
  description: "Unlock comprehensive vehicle intelligence...",
  keywords: ['MOT check', 'vehicle check', ...],
  openGraph: { type: 'website', locale: 'en_GB', ... },
  twitter: { card: 'summary_large_image', ... }
}
```

### 6.3 Home Page (page.js)
**File:** `src/app/page.js`
**Lines:** 672 lines of code

**Sections:**
1. Hero Section - Animated orbs, VRM search, trust stats
2. Features Section - 6 key features with cards
3. How It Works - 3-step process
4. Data Sources - DVLA, DVSA, Police, Market
5. Use Cases - 4 user types
6. Statistics Banner - Live stats with counters
7. Live Check Feed - Simulated activity
8. Testimonials - 3 customer reviews
9. Pricing Preview - Mini pricing cards
10. FAQ Section - 6 questions
11. CTA Section - Final call-to-action

**State Management:**
- `vrmInput` - VRM input value
- `vrmError` - Validation error message

**Key Functions:**
- `handleVrmSubmit()` - Validates and navigates to /check/[vrm]

### 6.4 Vehicle Check Page
**File:** `src/app/check/[vrm]/page.js`
**Lines:** 493 lines of code

**Sections:**
1. Vehicle Header - Make, model, image
2. Status Cards - MOT, Tax, Mileage (3 cards)
3. Tier Upgrade Prompt - Strategic placement
4. Vehicle Overview - Summary section
5. Detailed Specifications - Full specs grid
6. MOT History - Timeline (Silver+)
7. Mileage Analysis - Chart visualization (Silver+)
8. Environmental Info - CO2, fuel economy (Silver+)
9. Keeper History - Ownership timeline (Gold only)
10. Market Valuation - Price estimates (Gold only)

**State Management:**
- `tier` - Current user tier (from hook)
- `data` - Vehicle data (from hook)
- `showComparisonPopup` - Comparison modal visibility
- `lockedFeature` - Which feature was clicked
- `shareSuccess` - Share feedback state

**Key Functions:**
- `handleLockedFeatureClick()` - Opens comparison popup
- `handleUpgrade()` - Upgrades tier (demo: just sets localStorage)
- `handleShare()` - Shares page via Web Share API
- `handlePrint()` - Print/PDF functionality

**Dynamic Routing:**
- Uses `use(params)` to unwrap params
- VRM extracted from URL: `/check/WA67YSB`

---

## 7. COMPONENTS LIBRARY

### 7.1 Layout Components

#### Navbar.js
**Location:** `src/app/components/layout/Navbar.js`

**Purpose:** Main navigation header

**Features:**
- Logo and site title
- Navigation links (Home, Features, Pricing, etc.)
- Responsive mobile menu
- Sticky positioning
- CTA button for "Check Vehicle"

**Props:** None (uses constants)

#### Footer.js
**Location:** `src/app/components/layout/Footer.js`

**Purpose:** Site footer with links

**Features:**
- 3 column layout (Navigate, Resources, Legal)
- Social media links
- Copyright information
- Newsletter signup (placeholder)

**Props:** None (uses constants)

---

### 7.2 UI Components

#### Button.js
**Location:** `src/app/components/ui/Button.js`

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary'
- `size`: 'sm' | 'md' | 'lg'
- `children`: Button content
- `className`: Additional classes
- `...props`: Spread to button element

**Variants:**
- **Primary:** Blue gradient background
- **Secondary:** White background with border
- **Tertiary:** Transparent background

#### Card.js
**Location:** `src/app/components/ui/Card.js`

**Props:**
- `children`: Card content
- `className`: Additional classes
- `hover`: Boolean - enables hover effects
- `shadow`: 'sm' | 'md' | 'lg' | 'xl'

**Features:**
- White background with rounded corners
- Optional hover scale effect
- Configurable shadow depth

#### Input.js
**Location:** `src/app/components/ui/Input.js`

**Props:**
- `type`: Input type (text, email, etc.)
- `label`: Label text
- `error`: Error message string
- `required`: Boolean
- `...props`: Spread to input element

**Features:**
- Label support
- Error state styling
- Required field indicator

#### Badge.js
**Location:** `src/app/components/ui/Badge.js`

**Props:**
- `children`: Badge text
- `variant`: 'success' | 'warning' | 'danger' | 'info' | 'default'
- `size`: 'sm' | 'md' | 'lg'

**Variants:**
- **Success:** Green (MOT valid, taxed)
- **Warning:** Yellow (expiring soon)
- **Danger:** Red (expired, untaxed)
- **Info:** Blue (informational)

#### Modal.js
**Location:** `src/app/components/ui/Modal.js`

**Props:**
- `isOpen`: Boolean
- `onClose`: Close callback
- `title`: Modal title
- `children`: Modal content
- `size`: 'sm' | 'md' | 'lg' | 'xl'

**Features:**
- Backdrop click to close
- ESC key to close
- Framer Motion animations
- Scroll lock when open

#### Accordion.js
**Location:** `src/app/components/ui/Accordion.js`

**Props:**
- `items`: Array of { id, title, content }
- `allowMultiple`: Boolean (default false)
- `defaultOpen`: Array of IDs

**Features:**
- Smooth expand/collapse animations
- Single or multiple item expansion
- Keyboard navigation

#### LoadingSpinner.js
**Location:** `src/app/components/ui/LoadingSpinner.js`

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `text`: Loading text (optional)
- `fullScreen`: Boolean

**Features:**
- Animated spinner
- Optional loading text
- Fullscreen mode option

---

### 7.3 Home Page Components

#### FloatingInfoCard.js
**Purpose:** Animated info cards on hero section

**Props:**
- `icon`: Icon component
- `text`: Card text
- `className`: Position classes
- `delay`: Animation delay

**Animation:** Float effect with stagger

#### TrustStat.js
**Purpose:** Animated trust statistics

**Props:**
- `number`: Stat number (animated counter)
- `label`: Stat label
- `icon`: Icon component
- `suffix`: '+', '%', 's', etc.

**Animation:** Count-up animation on viewport enter

#### ProcessStep.js
**Purpose:** "How It Works" step cards

**Props:**
- `number`: Step number (1, 2, 3)
- `icon`: Icon component
- `title`: Step title
- `description`: Step description
- `gradient`: Tailwind gradient classes

**Features:**
- Gradient background
- Numbered badge
- Icon display

#### MiniPricingCard.js
**Purpose:** Compact pricing preview

**Props:**
- `tier`: 'basic' | 'silver' | 'gold'
- `price`: Price string
- `popular`: Boolean
- `features`: Array of feature strings
- `cta`: CTA text
- `highlight`: Boolean (for popular tier)

---

### 7.4 Vehicle Components

#### VehicleHeader.js
**Purpose:** Vehicle title, make, model, and image

**Props:**
- `vehicle`: Vehicle data object

**Displays:**
- VRM badge
- Make and model
- Vehicle image (from API or placeholder)
- Year and body type

#### StatusCard.js
**Purpose:** MOT/Tax/Mileage status display

**Props:**
- `title`: Card title
- `status`: 'valid' | 'invalid' | 'taxed' | 'untaxed' | 'sorn'
- `date`: Expiry date
- `icon`: Icon component
- `showDaysRemaining`: Boolean
- `value`: For mileage card
- `subtitle`: Additional info
- `variant`: 'info' (for mileage)

**Features:**
- Color-coded by status
- Days remaining calculation
- Icon display

#### VehicleSpecs.js
**Purpose:** Complete specifications grid

**Props:**
- `data`: Full vehicle data object

**Displays:**
- Make, Model, Year
- Engine, Fuel, Transmission
- Color, Body Type
- Seats, Doors
- BHP, Weight, Dimensions
- Insurance group
- Tax rates

#### MOTHistoryTimeline.js
**Purpose:** Visual MOT test timeline

**Props:**
- `tests`: Array of MOT test objects

**Features:**
- Chronological timeline (newest first)
- Pass/Fail indicators
- Advisories and failures display
- Mileage for each test
- Date formatting

#### MOTTestCard.js
**Purpose:** Individual MOT test result

**Props:**
- `test`: MOT test object
- `index`: Test index
- `isLatest`: Boolean

**Displays:**
- Test date
- Result (Pass/Fail)
- Mileage
- Advisory notices
- Failure reasons

#### MileageChart.js
**Purpose:** Line chart showing mileage progression

**Props:**
- `tests`: Array of MOT tests

**Features:**
- Recharts LineChart
- X-axis: Date
- Y-axis: Mileage
- Gradient fill
- Responsive design

#### KeeperHistoryTimeline.js
**Purpose:** Ownership history timeline (Gold only)

**Props:**
- `keeperData`: Keeper duration details object

**Displays:**
- Keeper number
- Acquisition date
- Disposal date
- Duration owned
- Gap between keepers

#### EnvironmentalInfo.js
**Purpose:** CO2 and fuel economy data

**Props:**
- `data`: Vehicle data object

**Displays:**
- CO2 emissions (g/km)
- Fuel economy (urban, extra-urban, combined)
- Euro status
- CO2 letter marker

#### ValuationCard.js
**Purpose:** Vehicle valuation estimates (Gold only)

**Props:**
- `valuationData`: Valuation information object

**Displays:**
- Trade average/good/excellent
- Private average/good/excellent
- Retail price
- Current mileage context

#### FeatureLock.js
**Purpose:** Paywall for locked features

**Props:**
- `feature`: Feature name
- `description`: Feature description
- `onUpgrade`: Upgrade callback
- `targetTier`: 'silver' | 'gold'
- `variant`: 'inline' | 'card'
- `showComparison`: Boolean

**Features:**
- Lock icon
- Upgrade CTA button
- Tier badge
- Optional comparison link

#### SectionHeader.js
**Purpose:** Consistent section titles

**Props:**
- `id`: Section ID (for anchors)
- `icon`: Icon component
- `title`: Section title
- `description`: Section description
- `badge`: Badge text (tier requirement)
- `badgeVariant`: Badge color variant

---

### 7.5 Pricing Components

#### PricingCard.js
**Purpose:** Pricing tier display card

**Props:**
- `tier`: 'basic' | 'silver' | 'gold'
- `title`: Tier name
- `price`: Price number or 'Free'
- `period`: '/month' or 'forever'
- `description`: Tier description
- `features`: Array of feature objects
- `popular`: Boolean
- `ctaText`: CTA button text
- `ctaAction`: Action type

**Features:**
- Popular badge
- Feature checkmarks
- Gradient accents
- Hover effects

#### ComparisonTable.js
**Purpose:** Feature comparison matrix

**Props:**
- `features`: Array from PRICING_FEATURES constant

**Displays:**
- Category rows
- Feature rows
- Checkmarks per tier
- "Coming Soon" indicators

#### PaymentModal.js
**Purpose:** Payment form (demo)

**Props:**
- `isOpen`: Boolean
- `onClose`: Close callback
- `tier`: Selected tier
- `onSubmit`: Submit callback

**Features:**
- Card number input
- Expiry and CVV fields
- Card brand detection
- Form validation

---

### 7.6 Promotion Components

#### TierUpgradePrompt.js
**Purpose:** Strategic upgrade prompts

**Props:**
- `currentTier`: User's tier
- `context`: 'unlock-mot-history' | 'unlock-valuation'
- `onUpgrade`: Upgrade callback
- `className`: Additional classes

**Features:**
- Context-aware messaging
- Feature preview
- Comparison link

#### FeatureComparisonPopup.js
**Purpose:** Modal showing feature comparison

**Props:**
- `isOpen`: Boolean
- `onClose`: Close callback
- `currentTier`: User's tier
- `lockedFeature`: Feature name
- `onUpgrade`: Upgrade callback

**Features:**
- Side-by-side tier comparison
- Upgrade CTA
- Feature highlights

#### FloatingUpgradeBanner.js
**Purpose:** Floating banner on vehicle page

**Props:**
- `currentTier`: User's tier
- `onUpgrade`: Upgrade callback

**Features:**
- Fixed positioning
- Appears after scroll
- Dismissible
- Animated entrance

#### ExitIntentModal.js
**Purpose:** Exit-intent upgrade modal

**Props:**
- `currentTier`: User's tier
- `onUpgrade`: Upgrade callback

**Features:**
- Detects mouse leaving viewport
- One-time per session
- Special offer messaging

#### StickyUpgradeBar.js
**Purpose:** Sticky bottom bar with actions

**Props:**
- `currentTier`: User's tier
- `onUpgrade`: Upgrade callback
- `onShare`: Share callback
- `onDownload`: Download callback
- `onSave`: Save callback
- `showActions`: Boolean

**Features:**
- Fixed bottom positioning
- Action buttons
- Upgrade CTA
- Responsive design

---

## 8. CUSTOM HOOKS

### 8.1 useCurrentTier
**Location:** `src/app/hooks/useCurrentTier.js`

**Purpose:** Get current user's pricing tier

**Returns:**
```javascript
{
  tier: 'basic' | 'silver' | 'gold',
  isLoading: boolean
}
```

**Behavior:**
- Reads from localStorage ('userTier' key)
- Defaults to 'silver' for demo
- Handles storage errors gracefully

**Usage:**
```javascript
const { tier, isLoading } = useCurrentTier();
```

### 8.2 useSetTier
**Location:** `src/app/hooks/useCurrentTier.js`

**Purpose:** Set user's pricing tier

**Returns:** Function `setTier(newTier)`

**Behavior:**
- Validates tier value
- Saves to localStorage
- Triggers storage event for cross-tab sync

**Usage:**
```javascript
const setTier = useSetTier();
setTier(PRICING_TIERS.GOLD);
```

### 8.3 useVehicleData
**Location:** `src/app/hooks/useVehicleData.js`

**Purpose:** Fetch vehicle data by VRM and tier

**Parameters:**
- `vrm`: Vehicle registration number
- `tier`: User's pricing tier

**Returns:**
```javascript
{
  data: VehicleData | null,
  isLoading: boolean,
  error: string | null
}
```

**Behavior:**
- Simulates API call with 500ms delay
- Calls `getVehicleDataByTier()` from demoData.js
- Filters data based on tier
- Returns null if vehicle not found

**Usage:**
```javascript
const { data, isLoading, error } = useVehicleData('WA67YSB', 'silver');
```

### 8.4 useVehicleCheck
**Location:** `src/app/hooks/useVehicleData.js`

**Purpose:** Higher-level vehicle check hook

**Parameters:**
- `tier`: User's pricing tier

**Returns:**
```javascript
{
  vrm: string | null,
  data: VehicleData | null,
  isLoading: boolean,
  error: string | null,
  checkVehicle: (vrm: string) => Promise<VehicleData>,
  reset: () => void
}
```

**Behavior:**
- Handles VRM validation and formatting
- Provides checkVehicle function
- Provides reset function

**Usage:**
```javascript
const { checkVehicle, data, error } = useVehicleCheck(tier);
await checkVehicle('WA67YSB');
```

---

## 9. UTILITIES & LIBRARIES

### 9.1 constants.js
**Location:** `src/app/lib/constants.js`
**Lines:** 477 lines

**Exports:**

#### Application Info
- `APP_NAME` - "MOT Vehicle Check"
- `APP_TAGLINE` - "Revolutionary UK Vehicle Intelligence"
- `APP_DESCRIPTION` - Full description string

#### Navigation
- `NAV_LINKS` - Array of navigation items
- `FOOTER_LINKS` - Object with navigate, resources, legal sections
- `SOCIAL_LINKS` - Social media links

#### Content Arrays
- `FEATURE_HIGHLIGHTS` - 6 feature cards for home page
- `USE_CASES` - 4 user types (buyers, sellers, garages, enthusiasts)
- `HOW_IT_WORKS_STEPS` - 3 process steps
- `TESTIMONIALS` - 3 customer testimonials
- `FAQ_ITEMS` - 6 FAQ questions for home page
- `PRICING_FAQ` - 8 pricing-specific FAQs
- `BLOG_POSTS` - 3 demo blog posts
- `ROADMAP_ITEMS` - 4 roadmap items (Q1-Q4 2025)

#### Pricing
- `PRICING_FEATURES` - Feature matrix by tier
- `PRICING_PLANS` - Complete pricing plan details

#### Configurations
- `SPEC_ICONS` - Icon mapping for specifications
- `STATUS_TYPES` - Status constants
- `PAYMENT_CARDS` - Demo card numbers
- `BREAKPOINTS` - Tailwind breakpoint values
- `DEFAULT_META` - SEO metadata

#### Animation Variants
- `FADE_IN_UP`, `FADE_IN`, `SCALE_IN`
- `SLIDE_IN_LEFT`, `SLIDE_IN_RIGHT`

### 9.2 utils.js
**Location:** `src/app/lib/utils.js`
**Lines:** 397 lines

**Functions:**

#### Date Utilities
- `formatDate(dateString, format)` - Format dates (short, long, relative, month-year)
- `getRelativeTime(date)` - Get relative time string ("2 days ago")
- `daysUntil(dateString)` - Calculate days until date

#### VRM Utilities
- `formatVRM(vrm)` - Format UK registration with proper spacing
- `isValidVRM(vrm)` - Validate UK VRM format
- `getYearFromVRM(vrm)` - Extract year from new-style plates

#### Formatting
- `formatCurrency(amount)` - Format as GBP currency
- `formatMileage(mileage)` - Format number with commas
- `formatFuelEconomy(fuelEconomyData)` - Format fuel economy object

#### Status Helpers
- `getStatusBadge(isValid, type)` - Get badge info for MOT/Tax
- `isSORN(vehicleData)` - Check if vehicle is SORN

#### Vehicle Utilities
- `parseMotResult(motResult)` - Parse MOT result to simplified format
- `getVehicleAge(manufactureDate)` - Calculate vehicle age

#### General Utilities
- `percentageDifference(value1, value2)` - Calculate percentage diff
- `truncate(text, maxLength)` - Truncate text with ellipsis
- `debounce(func, wait)` - Debounce function calls
- `cn(...classes)` - Combine class names
- `generateId()` - Generate unique ID
- `sleep(ms)` - Async sleep function

#### Payment Utilities
- `detectCardBrand(number)` - Detect card type from number
- `getCardBrandName(brand)` - Get card brand display name

### 9.3 demoData.js
**Location:** `src/app/lib/demoData.js`
**Lines:** 588 lines

**Exports:**

#### Demo Vehicle
- `DEMO_VEHICLE_VRM` - "WA67YSB" (2017 Skoda Octavia)

#### Vehicle Data Objects
- `goldCheckData` - Complete vehicle data (all features)
- `silverCheckData` - Excludes keeper history and valuation
- Basic data generated dynamically by `getVehicleDataByTier()`

#### Pricing Constants
- `PRICING_TIERS` - Object with BASIC, SILVER, GOLD keys
- `TIER_FEATURES` - Feature lists by tier

#### Helper Functions
- `getVehicleDataByTier(vrm, tier)` - Returns filtered data by tier
- `isFeatureAvailable(feature, tier)` - Check feature availability

**Data Structure (goldCheckData):**
```javascript
{
  Id: "WA67YSB-YyaloXtO",
  Report: {
    BasicVehicleInformation: { Make, Model, Colour, Fuel, ... },
    EnvironmentalInformation: { Co2, FuelEconomy, ... },
    ExtendedVehicleInformation: { Bhp, Doors, Seats, ... },
    ImportantChecks: {
      MotAndRoadTaxInformation: { DateMotDue, MotResults, ... },
      KeeperDurationDetails: { KeeperInformation: [...] },
      AdditionalMileageInformation: {...},
      IsStolen, IsWrittenOff, Exported, Imported
    },
    PreviousKeepersInformation: { PreviousKeepers: "2", ... },
    RoadTaxInformation: { SixMonthsRate, TwelveMonthsRate },
    ValuationInformation: {
      ValuationResults: { TradeAverage, PrivateGood, ... }
    }
  }
}
```

### 9.4 validation.js
**Location:** `src/app/lib/validation.js`

**Purpose:** Form validation functions

### 9.5 metadata.js
**Location:** `src/app/lib/metadata.js`

**Purpose:** SEO metadata definitions

### 9.6 promotionUtils.js
**Location:** `src/app/lib/promotionUtils.js`

**Purpose:** Promotion and upsell helper functions

---

## 10. DATA MODELS

### 10.1 Vehicle Data Model

```typescript
interface VehicleData {
  Id: string;
  Report: {
    BasicVehicleInformation: BasicInfo;
    EnvironmentalInformation: EnvironmentalInfo;
    ExtendedVehicleInformation: ExtendedInfo;
    ImportantChecks: ImportantChecks;
    PreviousKeepersInformation: KeeperInfo;
    RoadTaxInformation: TaxInfo;
    ValuationInformation: ValuationInfo;
    ReportMetaData: MetaData;
    ReportResult: Result;
  }
}

interface BasicInfo {
  Make: string;
  Model: string;
  Colour: string;
  Fuel: string;
  Body: string;
  Cc: string;
  VRM: string;
  VIN: string;
  ManufacturedDate: string;
  VehicleAge: string;
  AverageMileage: number;
  IsMileageAverageMessage: string;
}

interface MotTest {
  DateOfTest: string;
  Result: boolean;
  ResultText: string;
  TestNumber: string;
  OdometerModel: {
    OdometerReading: number;
    OdometerFormat: string;
  };
  AdvisoryNotices: string[];
  RefusalReasons: string[] | null;
  TestExpiryDate: string;
}

interface KeeperDuration {
  KeeperNumber: number;
  KeeperAcquired: string;
  KeeperDisposed: string | null;
  DaysBetweenKeeperAcquiredAndKeeperDisposed: number | null;
  DaysBetweenKeeperAcquiredAndKeeperDisposed_Description: string;
  IsLatestKeeper: boolean;
}

interface ValuationResults {
  TradeAverage: string;
  TradeGood: string;
  TradeExcellent: string;
  PrivateAverage: string;
  PrivateGood: string;
  PrivateExcellent: string;
  Retail: string;
}
```

### 10.2 Pricing Tier Model

```typescript
interface PricingTier {
  tier: 'basic' | 'silver' | 'gold';
  title: string;
  price: number | 'Free';
  period: string;
  description: string;
  popular: boolean;
  features: Feature[];
  ctaText: string;
  ctaAction: string;
}

interface Feature {
  text: string;
  included: boolean | 'Coming Soon';
  highlight?: boolean;
}
```

---

## 11. STYLING SYSTEM

### 11.1 Tailwind CSS v4 Configuration
**Location:** `src/app/globals.css`

#### Custom Colors
```css
--primary-50: #e6f2ff;
--primary-500: #007bff;
--primary-600: #0069d9;
--secondary-500: #495057;
--accent-500: #fd7e14;
--success-500: #198754;
--warning-500: #eab308;
--danger-500: #dc3545;
```

#### Custom Shadows
- `shadow-sm` - Subtle shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-2xl` - Ultra large shadow

#### Custom Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 123, 255, 0.4); }
  50% { box-shadow: 0 0 40px rgba(0, 123, 255, 0.8); }
}
```

#### Animation Classes
- `animate-float` - Floating animation (6s)
- `animate-float-delayed` - Delayed float (6s, 2s delay)
- `animate-float-slow` - Slow float (8s)
- `animate-count-up` - Count-up effect (1s)
- `animate-glow-pulse` - Glowing pulse (2s)
- `animate-slide-up` - Slide up fade (0.6s)

### 11.2 Typography
**Fonts:**
- **Geist Sans** - Primary font (variable font)
- **Geist Mono** - Monospace font for VRM, code

**Font Sizes (Tailwind defaults):**
- `text-sm` - 0.875rem
- `text-base` - 1rem
- `text-lg` - 1.125rem
- `text-xl` - 1.25rem
- `text-2xl` - 1.5rem
- `text-3xl` - 1.875rem
- `text-4xl` - 2.25rem
- `text-5xl` - 3rem
- `text-6xl` - 3.75rem
- `text-7xl` - 4.5rem

### 11.3 Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### 11.4 Custom Utilities
```css
.perspective-1000 { perspective: 1000px; }
.perspective-1500 { perspective: 1500px; }
.transform-3d { transform-style: preserve-3d; }
.container-custom { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
```

### 11.5 Color Usage Patterns

| Use Case | Color | Class |
|----------|-------|-------|
| Primary CTA | Blue | `bg-primary-600` |
| Success (MOT valid) | Green | `bg-success-500` |
| Warning (Expiring) | Yellow | `bg-warning-500` |
| Danger (Expired) | Red | `bg-danger-500` |
| Info | Blue | `bg-primary-500` |
| Accent | Orange | `bg-accent-500` |

---

## 12. BUSINESS LOGIC

### 12.1 Tier-Based Feature Access

**Basic Tier (Free):**
- MOT status (expiry date only)
- Tax status
- Basic specifications (Make, Model, Color, Fuel, Engine)
- Vehicle age and current mileage
- Email support

**Silver Tier (£2.99/month):**
- Everything in Basic +
- Full MOT history (all tests)
- MOT advisories and failures
- Mileage progression chart
- Environmental data (CO2, fuel economy)
- Previous keeper count
- Export/import status
- Stolen vehicle check
- Write-off check
- Color change history

**Gold Tier (£5.99/month):**
- Everything in Silver +
- Complete keeper duration history
- Vehicle valuation (trade, private, retail)
- Additional mileage records
- Mileage anomaly detection
- Time between keepers
- Premium support (24h response)
- API access (beta)
- PDF reports
- Save unlimited vehicles

### 12.2 Data Filtering by Tier

**Implementation:** `getVehicleDataByTier()` in demoData.js

```javascript
// Basic: Returns minimal data
{
  BasicVehicleInformation: {...},
  EnvironmentalInformation: { limited },
  ExtendedVehicleInformation: null,
  ImportantChecks: {
    MOT status only (no history),
    Basic security checks
  },
  ValuationInformation: null,
  KeeperDurationDetails: null
}

// Silver: Returns extended data
{
  ...Basic,
  ExtendedVehicleInformation: {...},
  ImportantChecks: {
    Full MOT history,
    Detailed checks
  }
}

// Gold: Returns complete data
{
  ...Silver,
  ValuationInformation: {...},
  KeeperDurationDetails: {...},
  AdditionalMileageInformation: {...}
}
```

### 12.3 Promotion Strategy

**Placement Points:**
1. **Home Page:** Exit-intent modal
2. **After Basic Check:** Silver upgrade prompt
3. **After Silver Check:** Gold upgrade prompt
4. **Locked Features:** Inline FeatureLock components
5. **Floating Banner:** Appears on scroll
6. **Sticky Bar:** Always visible bottom bar

**Conversion Funnel:**
```
Landing → Free Check → See Limited Data → Upgrade Prompt →
Silver Features → Use Service → Gold Features → Upgrade →
Full Access
```

### 12.4 localStorage Keys

| Key | Value | Purpose |
|-----|-------|---------|
| `userTier` | 'basic' \| 'silver' \| 'gold' | Current user tier |
| `exitModalShown` | boolean | Exit modal shown once |
| `savedVehicles` | JSON array | Saved vehicle searches |
| `lastCheck` | ISO date | Last check timestamp |

---

## 13. FEATURE MATRIX

### 13.1 Complete Feature List

| Feature | Basic | Silver | Gold | Component |
|---------|-------|--------|------|-----------|
| Unlimited Checks | ✓ | ✓ | ✓ | - |
| MOT Status | ✓ | ✓ | ✓ | StatusCard |
| Tax Status | ✓ | ✓ | ✓ | StatusCard |
| Current Mileage | ✓ | ✓ | ✓ | StatusCard |
| Core Specs | ✓ | ✓ | ✓ | VehicleSpecs |
| Vehicle Age | ✓ | ✓ | ✓ | VehicleHeader |
| Email Support | ✓ | ✓ | ✓ | - |
| Full MOT History | ✗ | ✓ | ✓ | MOTHistoryTimeline |
| MOT Advisories | ✗ | ✓ | ✓ | MOTTestCard |
| Mileage Chart | ✗ | ✓ | ✓ | MileageChart |
| Environmental Data | ✗ | ✓ | ✓ | EnvironmentalInfo |
| CO2 Emissions | ✗ | ✓ | ✓ | EnvironmentalInfo |
| Fuel Economy | ✗ | ✓ | ✓ | EnvironmentalInfo |
| Keeper Count | ✗ | ✓ | ✓ | - |
| Export/Import | ✗ | ✓ | ✓ | - |
| Stolen Check | ✗ | ✓ | ✓ | - |
| Write-Off Check | ✗ | ✓ | ✓ | - |
| Keeper History | ✗ | ✗ | ✓ | KeeperHistoryTimeline |
| Valuation | ✗ | ✗ | ✓ | ValuationCard |
| Mileage Anomaly | ✗ | ✗ | ✓ | - |
| PDF Reports | ✗ | ✗ | ✓ | - |
| Save Vehicles | ✗ | ✗ | ✓ | - |
| Priority Support | ✗ | ✗ | ✓ | - |
| API Access | ✗ | ✗ | Beta | - |

---

## 14. CODE PATTERNS

### 14.1 Component Structure Pattern

```javascript
'use client'; // For interactive components

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaIcon } from 'react-icons/fa6';

// Component imports
import ChildComponent from './ChildComponent';

// Hook imports
import useCustomHook from '@/app/hooks/useCustomHook';

// Utility imports
import { helperFunction } from '@/app/lib/utils';

/**
 * Component Description
 * Purpose and features
 */
export default function ComponentName({ prop1, prop2 }) {
  // State declarations
  const [state, setState] = useState(initialValue);

  // Custom hooks
  const { data, isLoading } = useCustomHook();

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render logic
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
}
```

### 14.2 Framer Motion Pattern

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

### 14.3 Conditional Rendering by Tier

```javascript
{isBasicTier ? (
  <FeatureLock
    feature="Feature Name"
    onUpgrade={handleUpgrade}
    targetTier="silver"
  />
) : (
  <ActualFeatureComponent data={data} />
)}
```

### 14.4 Loading State Pattern

```javascript
if (isLoading) {
  return <LoadingSpinner text="Loading..." />;
}

if (error) {
  return <ErrorDisplay message={error} />;
}

if (!data) {
  return <EmptyState />;
}

// Render actual content
return <Content data={data} />;
```

### 14.5 Form Handling Pattern

```javascript
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  setErrors(prev => ({ ...prev, [name]: '' }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate
  const newErrors = validate(formData);
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // Submit
  try {
    await submitData(formData);
  } catch (error) {
    setErrors({ submit: error.message });
  }
};
```

---

## 15. COMPONENT HIERARCHY

### 15.1 Page Component Tree

```
App (layout.js)
├── Navbar
├── Home Page (page.js)
│   ├── Hero Section
│   │   ├── FloatingInfoCard (x3)
│   │   ├── TrustStat (x3)
│   │   └── VRM Search Form
│   ├── Features Section
│   │   └── Card (x6)
│   ├── How It Works
│   │   └── ProcessStep (x3)
│   ├── Data Sources
│   │   └── DataSourceCard (x4)
│   ├── Use Cases
│   │   └── Card (x4)
│   ├── Statistics Banner
│   │   └── StatCard (x4)
│   ├── Live Check Feed
│   │   └── LiveCheckFeed
│   ├── Testimonials
│   │   └── Card (x3)
│   ├── Pricing Preview
│   │   └── MiniPricingCard (x3)
│   └── FAQ Section
│       └── Accordion
├── Vehicle Check Page (check/[vrm]/page.js)
│   ├── VehicleHeader
│   ├── StatusCard (x3)
│   ├── TierUpgradePrompt (conditional)
│   ├── Vehicle Overview Section
│   ├── Specifications Section
│   │   └── VehicleSpecs
│   ├── MOT History Section
│   │   ├── FeatureLock (Basic) OR
│   │   └── MOTHistoryTimeline (Silver+)
│   │       └── MOTTestCard (xN)
│   ├── Mileage Analysis Section
│   │   ├── FeatureLock (Basic) OR
│   │   └── MileageChart (Silver+)
│   ├── Environmental Section
│   │   ├── FeatureLock (Basic) OR
│   │   └── EnvironmentalInfo (Silver+)
│   ├── Keeper History Section
│   │   ├── FeatureLock (Basic/Silver) OR
│   │   └── KeeperHistoryTimeline (Gold)
│   ├── Valuation Section
│   │   ├── FeatureLock (Basic/Silver) OR
│   │   └── ValuationCard (Gold)
│   ├── FloatingUpgradeBanner
│   ├── StickyUpgradeBar
│   ├── FeatureComparisonPopup (modal)
│   └── ExitIntentModal (modal)
├── Pricing Page
│   ├── PricingCard (x3)
│   ├── ComparisonTable
│   ├── PricingFAQ
│   └── PaymentModal (conditional)
└── Footer
```

### 15.2 Component Dependencies

**High-level components depend on:**
- Low-level UI components (Button, Card, Badge)
- Layout components (Navbar, Footer)
- Custom hooks (useCurrentTier, useVehicleData)
- Utility functions (formatDate, formatCurrency, formatVRM)
- Constants (PRICING_TIERS, FEATURE_HIGHLIGHTS)

**Circular dependency prevention:**
- Utilities don't import components
- Hooks don't import page components
- Constants are pure data (no imports)

---

## 16. STATE MANAGEMENT

### 16.1 State Architecture

**No global state library** - Uses React hooks and localStorage

**State Locations:**

1. **Component State** (useState)
   - Form inputs
   - UI toggles (modals, dropdowns)
   - Loading states
   - Local errors

2. **localStorage** (via custom hooks)
   - `userTier` - Current pricing tier
   - `exitModalShown` - One-time modal flag
   - `savedVehicles` - Saved searches

3. **URL State** (Next.js routing)
   - VRM in `/check/[vrm]`
   - Query parameters (future: filters)

4. **Server State** (API data)
   - Vehicle data (via useVehicleData hook)
   - Simulated with demo data currently

### 16.2 State Flow Diagrams

**User Tier Flow:**
```
localStorage (userTier)
    ↓
useCurrentTier() hook
    ↓
Component reads tier
    ↓
Conditional rendering based on tier
    ↓
useSetTier() to update
    ↓
localStorage updated
    ↓
Page refresh (demo mode)
```

**Vehicle Data Flow:**
```
User enters VRM
    ↓
Navigate to /check/[vrm]
    ↓
useVehicleData(vrm, tier)
    ↓
getVehicleDataByTier() called
    ↓
Data filtered by tier
    ↓
Component receives filtered data
    ↓
Conditional rendering
```

---

## 17. ANIMATION SYSTEM

### 17.1 Framer Motion Animations

**Viewport Animations (whileInView):**
- Used for sections that animate when scrolled into view
- `viewport={{ once: true }}` ensures animation only happens once
- Common pattern: fade up on scroll

**Example:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**Stagger Animations:**
```javascript
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
))}
```

**Continuous Animations:**
```javascript
<motion.div
  animate={{
    rotateY: [0, 5, 0, -5, 0],
    rotateX: [0, -2, 0, 2, 0]
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: 'easeInOut'
  }}
>
```

### 17.2 CSS Animations

**Defined in globals.css:**

1. **Float Animation** - For floating orbs and cards
2. **Count-Up Animation** - For statistics counters
3. **Glow Pulse** - For CTA buttons
4. **Slide Up** - For page transitions

**Usage:**
```html
<div class="animate-float">Floating element</div>
<div class="animate-count-up">42</div>
<div class="animate-glow-pulse">CTA Button</div>
```

### 17.3 Transition Classes

**Tailwind Transition Utilities:**
- `transition-all` - Transition all properties
- `transition-colors` - Color transitions only
- `transition-transform` - Transform transitions
- `duration-300` - 300ms duration
- `ease-in-out` - Easing function

**Hover Effects:**
```html
<div class="hover:scale-105 transition-transform duration-300">
  Hover to scale
</div>
```

---

## 18. SEO & METADATA

### 18.1 Root Metadata (layout.js)

```javascript
export const metadata = {
  title: {
    default: "MOT Vehicle Check",
    template: "%s | MOT Vehicle Check"
  },
  description: "Unlock comprehensive vehicle intelligence...",
  keywords: [
    'MOT check', 'vehicle check', 'car history',
    'UK vehicle', 'DVLA', 'DVSA', 'vehicle history check'
  ],
  authors: [{ name: "MOT Vehicle Check" }],
  creator: "MOT Vehicle Check",
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: "MOT Vehicle Check",
    title: "MOT Vehicle Check",
    description: "Unlock comprehensive vehicle intelligence..."
  },
  twitter: {
    card: 'summary_large_image',
    title: "MOT Vehicle Check",
    description: "Unlock comprehensive vehicle intelligence..."
  }
};
```

### 18.2 Page-Specific Metadata

**Individual pages can override:**
```javascript
export const metadata = {
  title: "Pricing Plans",
  description: "Choose the right plan for your needs..."
};
```

**Dynamic metadata (for vehicle pages):**
```javascript
export async function generateMetadata({ params }) {
  return {
    title: `Vehicle Check - ${params.vrm}`,
    description: `Complete vehicle report for ${params.vrm}`
  };
}
```

### 18.3 Structured Data (Future Enhancement)

**Recommended Schema.org types:**
- `Organization` - Company info
- `Product` - Pricing tiers
- `FAQPage` - FAQ sections
- `BreadcrumbList` - Navigation breadcrumbs

---

## 19. DEVELOPMENT WORKFLOW

### 19.1 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Server runs at http://localhost:3000
```

### 19.2 Build & Deploy

```bash
# Build production bundle
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### 19.3 Git Workflow

**Current status:**
- Repository initialized
- On `master` branch
- No remote configured yet

**Tracked changes:**
- Modified: next.config.mjs, package.json, globals.css, etc.
- Untracked: All src/app directories and documentation

**Recommended workflow:**
```bash
git add .
git commit -m "Initial complete implementation"
git branch -M main
git remote add origin <url>
git push -u origin main
```

### 19.4 File Organization Best Practices

1. **Components:**
   - One component per file
   - PascalCase file names
   - Group by feature/domain

2. **Utilities:**
   - camelCase file names
   - Pure functions (no side effects)
   - Single responsibility

3. **Constants:**
   - UPPER_SNAKE_CASE for constant values
   - Group related constants
   - Export named constants

4. **Hooks:**
   - camelCase with 'use' prefix
   - One hook per file
   - Document parameters and returns

---

## 20. FILE REFERENCE INDEX

### 20.1 Quick File Lookup

**Configuration:**
- `/next.config.mjs` - Next.js config
- `/postcss.config.mjs` - PostCSS config
- `/jsconfig.json` - Path aliases
- `/package.json` - Dependencies

**Core App:**
- `/src/app/layout.js` - Root layout
- `/src/app/page.js` - Home page (672 lines)
- `/src/app/globals.css` - Global styles
- `/src/app/loading.js` - Loading state
- `/src/app/not-found.js` - 404 page

**Pages:**
- `/src/app/check/[vrm]/page.js` - Vehicle check (493 lines)
- `/src/app/pricing/page.js` - Pricing page
- `/src/app/features/page.js` - Features page
- `/src/app/how-it-works/page.js` - How it works
- `/src/app/about/page.js` - About page
- `/src/app/contact/page.js` - Contact page
- `/src/app/blog/page.js` - Blog page
- `/src/app/dashboard/page.js` - Dashboard

**Layout Components:**
- `/src/app/components/layout/Navbar.js`
- `/src/app/components/layout/Footer.js`

**UI Components:**
- `/src/app/components/ui/Button.js`
- `/src/app/components/ui/Card.js`
- `/src/app/components/ui/Input.js`
- `/src/app/components/ui/Badge.js`
- `/src/app/components/ui/Tabs.js`
- `/src/app/components/ui/Modal.js`
- `/src/app/components/ui/Accordion.js`
- `/src/app/components/ui/Toast.js`
- `/src/app/components/ui/LoadingSpinner.js`
- `/src/app/components/ui/SuccessAnimation.js`

**Home Components:**
- `/src/app/components/home/FloatingInfoCard.js`
- `/src/app/components/home/TrustStat.js`
- `/src/app/components/home/ProcessStep.js`
- `/src/app/components/home/DataSourceCard.js`
- `/src/app/components/home/StatCard.js`
- `/src/app/components/home/LiveCheckFeed.js`
- `/src/app/components/home/MiniPricingCard.js`

**Vehicle Components:**
- `/src/app/components/vehicle/VehicleHeader.js`
- `/src/app/components/vehicle/StatusCard.js`
- `/src/app/components/vehicle/VehicleSpecs.js`
- `/src/app/components/vehicle/MOTHistoryTimeline.js`
- `/src/app/components/vehicle/MOTTestCard.js`
- `/src/app/components/vehicle/MileageChart.js`
- `/src/app/components/vehicle/KeeperHistoryTimeline.js`
- `/src/app/components/vehicle/EnvironmentalInfo.js`
- `/src/app/components/vehicle/ValuationCard.js`
- `/src/app/components/vehicle/FeatureLock.js`
- `/src/app/components/vehicle/QuickStat.js`
- `/src/app/components/vehicle/SectionHeader.js`
- `/src/app/components/vehicle/UpgradePrompt.js`

**Pricing Components:**
- `/src/app/components/pricing/PricingCard.js`
- `/src/app/components/pricing/ComparisonTable.js`
- `/src/app/components/pricing/PricingFAQ.js`
- `/src/app/components/pricing/PaymentModal.js`

**Promotion Components:**
- `/src/app/components/promotion/TierUpgradePrompt.js`
- `/src/app/components/promotion/FeatureComparisonPopup.js`
- `/src/app/components/promotion/FloatingUpgradeBanner.js`
- `/src/app/components/promotion/ExitIntentModal.js`
- `/src/app/components/promotion/StickyUpgradeBar.js`

**Dashboard Components:**
- `/src/app/components/dashboard/VehicleCheckCard.js`
- `/src/app/components/dashboard/SavedVehicleCard.js`
- `/src/app/components/dashboard/StatCard.js`

**Hooks:**
- `/src/app/hooks/useCurrentTier.js` - Get/set user tier
- `/src/app/hooks/useVehicleData.js` - Fetch vehicle data

**Utilities:**
- `/src/app/lib/constants.js` - App constants (477 lines)
- `/src/app/lib/utils.js` - Utility functions (397 lines)
- `/src/app/lib/demoData.js` - Mock data (588 lines)
- `/src/app/lib/validation.js` - Validation functions
- `/src/app/lib/metadata.js` - SEO metadata
- `/src/app/lib/promotionUtils.js` - Promotion helpers

**Documentation:**
- `/README.md` - Project README
- `/PROJECT_COMPLETE.md` - Project completion
- `/PHASE_4_COMPLETION_SUMMARY.md` - Phase summary
- `/TAILWIND_V4_FIX.md` - Tailwind fixes
- `/FONT_AWESOME_6_FIX.md` - Icon fixes
- `/PAGE_DIRECTORY.md` - Page structure
- `/CONTEXT_DB.MD` - This file (complete context)

---

## APPENDIX: DEVELOPMENT NOTES

### A. Known Issues & Todos

1. **Backend Integration:**
   - Currently using demo data from demoData.js
   - Need to implement real API calls to DVLA/DVSA
   - Need authentication system for paid tiers

2. **Payment Integration:**
   - PaymentModal is demo only
   - Need Stripe/PayPal integration
   - Need subscription management

3. **Missing Pages:**
   - About page (placeholder)
   - Contact page (placeholder)
   - Blog page (placeholder)
   - Dashboard page (placeholder)

4. **Features Not Implemented:**
   - PDF report generation
   - Save vehicles functionality
   - User authentication
   - Email notifications
   - API access

### B. Performance Optimizations

1. **Image Optimization:**
   - Use Next.js Image component for all images
   - Configure remote patterns in next.config.mjs

2. **Code Splitting:**
   - Dynamic imports for heavy components
   - Route-based code splitting (automatic with Next.js)

3. **Caching Strategy:**
   - Cache vehicle data in localStorage
   - Implement stale-while-revalidate pattern

### C. Accessibility Considerations

1. **ARIA Labels:**
   - Add aria-label to icon-only buttons
   - Add aria-describedby for form errors

2. **Keyboard Navigation:**
   - Ensure all interactive elements are keyboard accessible
   - Implement focus trapping in modals

3. **Screen Reader Support:**
   - Add sr-only labels where needed
   - Ensure proper heading hierarchy

### D. Future Enhancements

1. **Mobile App:**
   - React Native version
   - Shared component library

2. **Advanced Features:**
   - Vehicle comparison tool
   - Price alerts for valuations
   - MOT reminder notifications
   - Fleet management dashboard

3. **AI Features:**
   - Chatbot for vehicle queries
   - Predictive maintenance suggestions
   - Market trend analysis

---

**END OF CONTEXT_DB.MD**

---

*This document serves as the single source of truth for the CarInfo UI project. All file paths, component structures, data models, and architectural decisions are documented here for AI context processing and developer reference.*

**Last Updated:** October 15, 2025
**Document Version:** 1.0
**Maintained By:** Development Team
