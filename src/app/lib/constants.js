// Application constants

export const APP_NAME = "CarInfo UK";
export const APP_TAGLINE = "Free UK Vehicle History Check – MOT, Tax & Mileage + Full HPI Upgrade";
export const APP_DESCRIPTION = "Get instant DVLA-powered MOT, tax, and mileage data for free. Upgrade for a full HPI-level report — finance, write-offs, theft & more. Trusted UK vehicle history check service.";

// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/features", label: "Features", external: false },
  { href: "/pricing", label: "Pricing", external: false },
  { href: "/how-it-works", label: "How It Works", external: false },
  { href: "/about", label: "About", external: false },
  { href: "/contact", label: "Contact", external: false }
];

// Footer links
export const FOOTER_LINKS = {
  navigate: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" }
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/contact", label: "Support" },
    { href: "#", label: "API Documentation" }
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
    { href: "#", label: "Data Sources" }
  ]
};

// Social media links
export const SOCIAL_LINKS = [
  { platform: "Twitter", href: "#", icon: "FaTwitter" },
  { platform: "Facebook", href: "#", icon: "FaFacebook" },
  { platform: "LinkedIn", href: "#", icon: "FaLinkedin" },
  { platform: "Instagram", href: "#", icon: "FaInstagram" }
];

// Feature highlights for home page
export const FEATURE_HIGHLIGHTS = [
  {
    icon: "FaBolt",
    title: "Instant Checks",
    description: "Get real-time MOT, Tax, and specification data directly from official UK databases in milliseconds."
  },
  {
    icon: "FaFileLines",
    title: "Full V5C Details",
    description: "Access key information from the V5C logbook, including date of registration, colour, and engine size."
  },
  {
    icon: "FaBrain",
    title: "Comprehensive History",
    description: "View complete MOT history, previous owners, mileage progression, and more."
  },
  {
    icon: "FaShield",
    title: "Security Checks",
    description: "Verify stolen vehicle status, write-off records, and outstanding finance information."
  },
  {
    icon: "FaChartLine",
    title: "Vehicle Valuation",
    description: "Get accurate market valuations based on current condition, mileage, and market trends."
  },
  {
    icon: "FaUsers",
    title: "Keeper History",
    description: "See detailed ownership timeline with dates and duration between keepers."
  }
];

// Use cases
export const USE_CASES = [
  {
    icon: "FaCartShopping",
    title: "Car Buyers",
    description: "Avoid costly mistakes. Verify a car's legal status and key details before you commit to buying."
  },
  {
    icon: "FaTag",
    title: "Private Sellers",
    description: "Build trust with potential buyers by providing a transparent and verifiable vehicle report upfront."
  },
  {
    icon: "FaWrench",
    title: "Garages & Mechanics",
    description: "Instantly confirm vehicle details when booking in a new customer for service or repair."
  },
  {
    icon: "FaHeart",
    title: "Enthusiasts",
    description: "Quickly look up specs and details for projects, forums, or just out of sheer curiosity."
  }
];

// How it works steps
export const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    title: "Enter Registration",
    description: "Type the vehicle's registration number into our secure search bar.",
    icon: "FaMagnifyingGlass"
  },
  {
    number: 2,
    title: "We Fetch The Data",
    description: "Our system instantly queries official databases for the latest information.",
    icon: "FaDatabase"
  },
  {
    number: 3,
    title: "View Full Report",
    description: "Receive a clear, easy-to-read report with all the key details you need.",
    icon: "FaFileLines"
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    content: "This tool is brilliant! I was about to view a car and did a last-minute check. Found out the MOT was expired, which the seller 'forgot' to mention. Saved me a wasted trip.",
    author: "Mark Jennings",
    role: "Private Car Buyer",
    avatar: "MJ"
  },
  {
    content: "Super fast and accurate. As a small garage, it's incredibly helpful for quickly verifying customer vehicle details over the phone. The interface is clean and so easy to use.",
    author: "Sarah Knight",
    role: "Owner, SK Auto Repairs",
    avatar: "SK"
  },
  {
    content: "The keeper history feature is a game-changer. Helped me negotiate a better price when I discovered the car had 5 owners in 3 years. Worth every penny!",
    author: "David Chen",
    role: "Car Enthusiast",
    avatar: "DC"
  }
];

// FAQ items
export const FAQ_ITEMS = [
  {
    question: "Where does the vehicle data come from?",
    answer: "Our data is sourced in real-time from official UK government agencies, including the DVLA and DVSA, ensuring the highest level of accuracy and timeliness."
  },
  {
    question: "What's the difference between Silver and Gold?",
    answer: "Silver includes full MOT history, detailed specs, and previous owner counts. Gold adds keeper duration history, vehicle valuation data, and additional mileage anomaly detection."
  },
  {
    question: "How quickly are the results available?",
    answer: "Results are typically available instantly, usually within 1-2 seconds of you submitting the registration number. Our system is optimized for speed and efficiency."
  },
  {
    question: "Can I check any UK registered vehicle?",
    answer: "Yes, you can check any car, van, or motorcycle that is registered with the DVLA in the United Kingdom."
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use industry-standard encryption and never store your full payment details. All transactions are processed through secure payment gateways."
  },
  {
    question: "Can I download or print the report?",
    answer: "Yes! All Silver and Gold checks include the ability to download a PDF report or print directly from your browser."
  }
];

// Blog posts (demo)
export const BLOG_POSTS = [
  {
    id: 1,
    title: "UK Used Car Market Outlook for 2025",
    excerpt: "Discover how changing economic factors are shaping the used car market and what buyers should look out for.",
    category: "Market Trends",
    date: "2025-01-10",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070",
    slug: "uk-used-car-market-outlook-2025"
  },
  {
    id: 2,
    title: "10 Essential Pre-Purchase Checks",
    excerpt: "Our comprehensive guide to inspecting a used car before you buy - beyond just the vehicle history.",
    category: "Maintenance",
    date: "2024-12-28",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1549399542-7e9fdb6b1f2f?q=80&w=2070",
    slug: "10-essential-pre-purchase-checks"
  },
  {
    id: 3,
    title: "The Future of Electric Vehicles in the UK",
    excerpt: "How government policies and technological advancements are accelerating EV adoption across Britain.",
    category: "EV Insights",
    date: "2024-12-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070",
    slug: "future-of-electric-vehicles-uk"
  }
];

// Roadmap timeline
export const ROADMAP_ITEMS = [
  {
    quarter: "Q1 2025",
    title: "Enhanced Valuation Engine",
    description: "AI-powered valuations with real-time market data integration and condition-based pricing."
  },
  {
    quarter: "Q2 2025",
    title: "Mobile Applications",
    description: "Check vehicles on the go with our dedicated iOS and Android applications."
  },
  {
    quarter: "Q3 2025",
    title: "Fleet Management Tools",
    description: "Business dashboard for managing multiple vehicles, MOT reminders, and batch checks."
  },
  {
    quarter: "Q4 2025",
    title: "Predictive Maintenance",
    description: "AI-powered alerts for upcoming maintenance based on vehicle model and mileage patterns."
  }
];

// Vehicle specification icons mapping
export const SPEC_ICONS = {
  make: "FaCar",
  model: "FaCar",
  colour: "FaPalette",
  fuel: "FaGasPump",
  engine: "FaGear",
  transmission: "FaGears",
  doors: "FaDoorOpen",
  seats: "FaChair",
  year: "FaCalendar",
  mileage: "FaGauge",
  co2: "FaSmog",
  tax: "FaReceipt",
  mot: "FaClipboardCheck",
  bhp: "FaBolt",
  weight: "FaWeightHanging",
  length: "FaRuler",
  width: "FaArrowsLeftRight",
  height: "FaArrowsUpDown",
  insurance: "FaShield"
};

// Status types
export const STATUS_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info'
};

// Card payment demo (for PaymentModal)
export const PAYMENT_CARDS = {
  VISA: { name: 'Visa', icon: 'FaCcVisa' },
  MASTERCARD: { name: 'Mastercard', icon: 'FaCcMastercard' },
  AMEX: { name: 'American Express', icon: 'FaCcAmex' }
};

// Animation variants for framer-motion
export const FADE_IN_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

export const SLIDE_IN_LEFT = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export const SLIDE_IN_RIGHT = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Meta information for SEO
export const DEFAULT_META = {
  siteName: APP_NAME,
  siteUrl: "https://carinfo.co.uk", // Update with actual domain
  twitterHandle: "@carinfo_uk",
  defaultImage: "/og-image.png",
  defaultDescription: APP_DESCRIPTION,
  keywords: [
    'free car check UK',
    'free MOT check',
    'free tax check car',
    'UK number plate check free',
    'car history check UK',
    'HPI check UK',
    'full car history report',
    'vehicle history report',
    'check a used car before buying',
    'used car checker UK',
    'outstanding finance check',
    'write off check car',
    'stolen car check',
    'mileage check clocking',
    'DVLA car check',
    'DVLA vehicle data',
    'DVLA MOT history',
    'vehicle history report upgrade'
  ]
};

// Pricing tiers and features
export const PRICING_FEATURES = [
  {
    category: 'Basic Checks',
    features: [
      { name: 'Unlimited Checks', basic: true, silver: true, gold: true },
      { name: 'MOT Status', basic: true, silver: true, gold: true },
      { name: 'Tax Status', basic: true, silver: true, gold: true },
      { name: 'Core Specifications', basic: true, silver: true, gold: true },
      { name: 'Vehicle Age & Mileage', basic: true, silver: true, gold: true },
    ]
  },
  {
    category: 'History & Records',
    features: [
      { name: 'Full MOT History', basic: false, silver: true, gold: true },
      { name: 'MOT Test Details', basic: false, silver: true, gold: true },
      { name: 'Mileage Chart', basic: false, silver: true, gold: true },
      { name: 'Environmental Data', basic: false, silver: true, gold: true },
      { name: 'Export/Import History', basic: false, silver: true, gold: true },
      { name: 'Color Change History', basic: false, silver: true, gold: true },
      { name: 'Previous Keeper Count', basic: false, silver: true, gold: true },
      { name: 'Complete Keeper History', basic: false, silver: false, gold: true },
    ]
  },
  {
    category: 'Premium Features',
    features: [
      { name: 'Vehicle Valuation', basic: false, silver: false, gold: true },
      { name: 'Additional Mileage Checks', basic: false, silver: false, gold: true },
      { name: 'Save Unlimited Vehicles', basic: false, silver: false, gold: true },
      { name: 'PDF Reports', basic: false, silver: false, gold: true },
      { name: 'API Access', basic: false, silver: false, gold: 'Coming Soon' },
    ]
  },
  {
    category: 'Support',
    features: [
      { name: 'Email Support', basic: true, silver: true, gold: true },
      { name: 'Priority Support (24h)', basic: false, silver: false, gold: true },
    ]
  }
];

// Pricing plans data
export const PRICING_PLANS = {
  basic: {
    tier: 'basic',
    title: 'Basic',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for casual checks',
    popular: false,
    features: [
      { text: 'Unlimited basic checks', included: true },
      { text: 'MOT & tax status', included: true },
      { text: 'Core specifications', included: true },
      { text: 'Vehicle age & mileage', included: true },
      { text: 'Email support', included: true },
      { text: 'Full MOT history', included: false },
      { text: 'Vehicle valuation', included: false },
      { text: 'PDF reports', included: false },
    ],
    ctaText: 'Get Started Free',
    ctaAction: 'free'
  },
  silver: {
    tier: 'silver',
    title: 'Silver',
    price: 2.99,
    period: '/month',
    description: 'Most popular for buyers & sellers',
    popular: true,
    features: [
      { text: 'Everything in Basic', included: true, highlight: true },
      { text: 'Full MOT history', included: true, highlight: true },
      { text: 'MOT test details', included: true, highlight: true },
      { text: 'Mileage progression chart', included: true, highlight: true },
      { text: 'Environmental data', included: true, highlight: true },
      { text: 'Export/import history', included: true, highlight: true },
      { text: 'Previous keeper count', included: true, highlight: true },
      { text: 'Priority email support', included: true, highlight: true },
      { text: 'Vehicle valuation', included: false },
      { text: 'Complete keeper history', included: false },
    ],
    ctaText: 'Start Silver Plan',
    ctaAction: 'upgrade'
  },
  gold: {
    tier: 'gold',
    title: 'Gold',
    price: 5.99,
    period: '/month',
    description: 'Ultimate vehicle intelligence',
    popular: false,
    features: [
      { text: 'Everything in Silver', included: true, highlight: true },
      { text: 'Complete keeper history', included: true, highlight: true },
      { text: 'Vehicle valuation', included: true, highlight: true },
      { text: 'Additional mileage checks', included: true, highlight: true },
      { text: 'Save unlimited vehicles', included: true, highlight: true },
      { text: 'PDF reports', included: true, highlight: true },
      { text: 'Priority support (24h)', included: true, highlight: true },
      { text: 'API access', included: 'Coming Soon', highlight: true },
    ],
    ctaText: 'Start Gold Plan',
    ctaAction: 'upgrade'
  }
};

// Pricing FAQ items
export const PRICING_FAQ = [
  {
    id: 'pricing-faq-1',
    question: 'Is Basic really free forever?',
    content: 'Yes! Our Basic plan is completely free with no time limit. You can run unlimited checks and access core vehicle information including MOT status, tax status, and specifications. No credit card required to get started.'
  },
  {
    id: 'pricing-faq-2',
    question: 'How does billing work?',
    content: 'Silver and Gold plans are billed monthly. You can cancel anytime and continue using the service until the end of your current billing period. We accept all major credit and debit cards, and all payments are processed securely through industry-standard payment gateways.'
  },
  {
    id: 'pricing-faq-3',
    question: 'Can I cancel anytime?',
    content: 'Absolutely. There are no contracts or commitments. You can cancel your subscription at any time from your account settings. If you cancel, you\'ll retain access to your paid features until the end of your current billing period.'
  },
  {
    id: 'pricing-faq-4',
    question: 'What payment methods do you accept?',
    content: 'We accept all major credit and debit cards including Visa, Mastercard, and American Express. All transactions are encrypted and processed through secure payment gateways. We never store your full card details.'
  },
  {
    id: 'pricing-faq-5',
    question: 'Do you offer refunds?',
    content: 'We offer a 7-day money-back guarantee on all paid plans. If you\'re not satisfied with your purchase, contact our support team within 7 days for a full refund, no questions asked.'
  },
  {
    id: 'pricing-faq-6',
    question: 'Can I switch plans?',
    content: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you\'ll get immediate access to new features and be charged a prorated amount. When downgrading, the change takes effect at the end of your current billing period.'
  },
  {
    id: 'pricing-faq-7',
    question: 'Do you offer discounts for annual billing?',
    content: 'We\'re currently working on annual billing options with significant discounts. Join our mailing list or check back soon for updates on yearly plans that can save you up to 20%!'
  },
  {
    id: 'pricing-faq-8',
    question: 'Is there a trial period for paid plans?',
    content: 'While we don\'t offer a traditional trial, our 7-day money-back guarantee means you can try any paid plan risk-free. Plus, you can always start with our free Basic plan to get familiar with the service before upgrading.'
  }
];

// Demo card numbers for testing
export const DEMO_CARDS = [
  { number: '4242 4242 4242 4242', brand: 'Visa', description: 'Successful payment' },
  { number: '5555 5555 5555 4444', brand: 'Mastercard', description: 'Successful payment' },
  { number: '3782 822463 10005', brand: 'American Express', description: 'Successful payment' }
];
