# Planning Guide

Hogar Belén is an integrated SaaS platform connecting families with elder care services through a day care center (Centro de Vida) and a network of verified healthcare professionals. The platform combines in-person care, home services, AI-assisted health monitoring, and family coordination tools.

**Experience Qualities**:
1. **Compassionate** - Design should evoke warmth, trust, and family connection while maintaining professionalism in healthcare services
2. **Integrated** - Seamlessly connects day care activities, professional services, and family communication in one ecosystem
3. **Intelligent** - AI-powered care recommendations, health monitoring, and professional matching that feels proactive and helpful

**Complexity Level**: Complex Application (advanced functionality with multiple views)
The application manages user authentication (families/professionals), day care center services, professional directory with booking, AI care assistant, health monitoring dashboard, messaging system, and service plan management.

## Essential Features

### Home Page with Hero & Services
- **Functionality**: Landing page showcasing day care center services, professional network, testimonials, and value proposition
- **Purpose**: Educate visitors about integrated care model and drive registrations
- **Trigger**: Initial page load or navigation to home
- **Progression**: Hero with background image → Services carousel (Centro Vida/Professionals/Technology) → Trust badges → Testimonials → Inspirational quotes
- **Success criteria**: Clear value proposition, compelling visuals, strong CTAs to register or explore services

### User Authentication System
- **Functionality**: Registration and login for families and professionals with role-based access
- **Purpose**: Personalize experience and gate dashboard features
- **Trigger**: Click "Registrarse" or "Ingresar" buttons
- **Progression**: User selects role (family/professional) → fills form → creates account → redirected to appropriate dashboard
- **Success criteria**: Smooth registration flow, persistent authentication, role-appropriate dashboard access

### Family Dashboard
- **Functionality**: Centralized control panel for families showing health metrics, appointments, activities, subscription management, and quick actions
- **Purpose**: Give families visibility and control over their loved one's care and subscription
- **Trigger**: Login as family member
- **Progression**: Overview tab (health metrics, upcoming appointments, recent activity) → Professionals tab (search/filter/contact) → Appointments → Subscription (manage plan, view payments) → Reports → Messages
- **Success criteria**: All relevant information at-a-glance, easy navigation between sections, quick action buttons functional, subscription management seamless

### Professional Directory with Search & Filters
- **Functionality**: Browse healthcare professionals by specialty, availability, ratings, with search and filtering
- **Purpose**: Help families find and connect with appropriate care professionals
- **Trigger**: Navigate to Professionals section in dashboard or landing page
- **Progression**: View all professionals → Apply filters (specialty, availability, rating) → Search by name → View details → Contact
- **Success criteria**: Fast filtering, clear professional cards, availability status accurate, smooth contact flow

### Day Care Center (Centro de Vida) Services
- **Functionality**: Display integrated day care services including therapeutic activities, nutrition, garden therapy, guided exercise
- **Purpose**: Showcase the comprehensive daily care program available at the physical center
- **Trigger**: Navigate to Services page or view service carousel
- **Progression**: View service categories → Explore details → See pricing plans → Request information
- **Success criteria**: Clear service descriptions, appealing visuals, easy plan comparison

### AI Care Assistant
- **Functionality**: Intelligent assistant that analyzes health situations and recommends appropriate professionals/services
- **Purpose**: Help families make informed care decisions through AI-powered analysis
- **Trigger**: Click "Evaluación IA" button from hero or dashboard
- **Progression**: Describe situation → AI analyzes → Receives recommendations → View suggested professionals/plan → Book service
- **Success criteria**: Natural language input, relevant recommendations, smooth handoff to booking

### Service Plans & Pricing
- **Functionality**: Display three tier plans (Básico, Premium, Empresarial) with features and pricing, integrated online payment system
- **Purpose**: Clear pricing transparency and plan comparison to drive conversions with seamless payment processing
- **Trigger**: Navigate to pricing page or click plan CTAs
- **Progression**: View plans side-by-side → Compare features → Select plan → Complete secure payment form → Instant subscription activation → Access premium features
- **Success criteria**: Clear feature differentiation, popular plan highlighted, secure payment processing, instant activation, subscription management dashboard

### Online Payment System
- **Functionality**: Secure credit card payment processing for Premium plans with validation, encryption, and instant activation
- **Purpose**: Enable seamless subscription purchases with professional payment experience
- **Trigger**: Click "Suscribirse Ahora" on Premium plan
- **Progression**: User authenticated → Payment modal opens → Enter card details → Validate form → Process payment → Show success confirmation → Activate subscription → Update user access
- **Success criteria**: Form validation, secure data handling, payment confirmation, subscription stored in KV, email confirmation displayed, instant access to premium features

### Subscription Management
- **Functionality**: Complete dashboard for managing active subscriptions, viewing payment history, and canceling plans
- **Purpose**: Give users full control and transparency over their subscription lifecycle
- **Trigger**: Navigate to Suscripción tab in Family Dashboard
- **Progression**: View active subscription details → See next billing date → Review payment method → Download invoices → Cancel if needed with confirmation
- **Success criteria**: Clear subscription status, payment history visible, invoice downloads functional, cancel flow with confirmation, data persisted correctly

### Real-Time Availability System
- **Functionality**: Calculate and display professional availability based on schedules and current time
- **Purpose**: Show families which professionals can help immediately
- **Trigger**: Continuous calculation on professional cards
- **Progression**: Parse schedule → Compare to current time → Display status badge → Update dynamically
- **Success criteria**: Accurate status (Disponible, Ocupado, Ausente, Urgencias), real-time updates

### WhatsApp Contact Integration
- **Functionality**: Direct WhatsApp messaging to professionals with context-aware pre-filled messages
- **Purpose**: Enable immediate communication between families and care providers
- **Trigger**: Click contact button on professional card
- **Progression**: Click button → WhatsApp opens → Message pre-filled with context → Send message
- **Success criteria**: Correct number, appropriate message based on availability status, new window opens

## Edge Case Handling
- **No Search Results**: Friendly empty state with suggestion to adjust filters or try different search terms
- **Unauthenticated Access**: Redirect to login when trying to access dashboard or payments, preserve intended destination
- **Missing User Data**: Graceful fallbacks for avatar, name fields with placeholder values
- **API Failures**: Toast notifications for errors, simulated responses for AI assistant if needed
- **Invalid Schedule Data**: Default to "Estado Desconocido" with graceful error handling
- **Image Loading Errors**: Fallback to color-coded placeholder with initials
- **Mobile Navigation**: Collapsible menu with smooth animations, touch-friendly tap targets
- **Payment Form Validation**: Real-time validation with clear error messages for card number, expiry, CVV, and email
- **Card Expiration**: Prevent submission of expired cards with clear feedback
- **Payment Processing Errors**: Graceful error handling with retry option and support contact
- **Duplicate Subscriptions**: Prevent multiple active subscriptions for same user
- **No Active Subscription**: Show upgrade prompts with clear benefits in subscription manager
- **Invoice Generation**: Handle missing data gracefully in invoice downloads

## Design Direction
The design should feel warm, trustworthy, and family-oriented while maintaining healthcare professionalism. It should evoke compassion through soft colors, rounded corners, and welcoming imagery of seniors in care settings. The interface balances emotional connection (family photos, testimonials) with functional healthcare tools (dashboards, metrics, professional credentials).

## Color Selection
A warm, trustworthy palette centered around teal/turquoise tones that communicate healthcare, compassion, and vitality.

- **Primary Color**: Teal (oklch(0.55 0.15 200)) - Represents healthcare trust, calmness, and professional care
- **Secondary Colors**: 
  - Soft Gray (oklch(0.97 0.005 240)) - Clean, peaceful background
  - Warm Orange (oklch(0.68 0.18 50)) - Energy, warmth for accent elements
- **Accent Color**: 
  - Indigo/Purple (oklch(0.55 0.2 270)) - For AI/tech features
  - Status colors: Green (available), Yellow (busy), Red (unavailable/urgent)
- **Foreground/Background Pairings**:
  - Soft Gray Background (oklch(0.97 0.005 240)): Dark text (oklch(0.15 0.02 200)) - Ratio 15.1:1 ✓
  - Teal Primary (oklch(0.55 0.15 200)): White text (oklch(0.99 0 0)) - Ratio 6.8:1 ✓
  - Indigo AI Accent (oklch(0.55 0.2 270)): White text (oklch(0.99 0 0)) - Ratio 7.8:1 ✓
  - Warm Orange Accent (oklch(0.68 0.18 50)): Dark text (oklch(0.2 0.02 250)) - Ratio 8.2:1 ✓

## Font Selection
Inter as the primary typeface provides modern professionalism with warmth through its rounded forms. It maintains excellent readability for healthcare content while feeling approachable for families.

- **Primary**: Inter for all text - modern, humanist, highly legible across all devices

**Typographic Hierarchy**:
- H1 (Hero Title): Inter Bold/56-72px/tight letter spacing (-0.02em)
- H2 (Section Headers): Inter Bold/36-48px/tight letter spacing
- H3 (Card Titles): Inter Bold/20-24px/normal spacing
- Body (Descriptions): Inter Regular/16-18px/relaxed line height (1.6)
- Small (Labels/Metadata): Inter Medium/14px/normal spacing
- Badges: Inter SemiBold/12px/slight uppercase

## Animations
Animations should feel gentle and reassuring, never jarring. Page transitions use subtle fade-ins. Card reveals stagger slightly for polish. Hover states include gentle lifts and scale. The AI assistant uses a pulsing indicator during analysis. Dashboard metrics count up on reveal. All animations respect prefers-reduced-motion.

## Component Selection
- **Components**: 
  - Button (shadcn) - Primary actions, ghost buttons for nav, AI variant with gradient
  - Card (shadcn) - Professional cards, service cards, dashboard widgets
  - Badge (shadcn) - Status indicators, category labels, plan features
  - Input (shadcn) - Search bars, forms with floating labels
  - Avatar (shadcn) - User profiles, professional photos with fallbacks
  - Tabs (shadcn) - Dashboard navigation between sections
  - Toast (sonner) - Notifications for actions, errors, success messages
  - Framer Motion - Page transitions, card animations, layout shifts
  
- **Customizations**: 
  - Hero section with background image overlay
  - Service carousel with category tabs
  - Professional cards with availability badges
  - Dashboard with quick action tiles
  - AI assistant chat-like interface with gradient background
  - Testimonial cards with quote styling
  
- **States**: 
  - Buttons: Default, hover (lift), active, disabled (for unavailable), loading (spinner)
  - Navigation: Active page highlighted, mobile menu animated slide-in
  - Professional cards: Hover shadow lift, availability badge color-coded
  - Form inputs: Focus ring (teal), error state (red), success (green)
  - Dashboard tabs: Active underline, inactive muted
  
- **Icon Selection**: 
  - Heart - Logo, love/care features
  - Users - Team, professionals
  - Home - Day care center
  - Brain/Bot - AI assistant
  - Shield - Security, verification
  - Calendar - Appointments
  - MessageCircle - Messaging/WhatsApp
  - Star - Ratings
  - CheckCircle/XCircle/MinusCircle - Availability status
  - Stethoscope, Activity - Healthcare services
  - Music, Utensils, Sprout - Day care activities
  
- **Spacing**: 
  - Page wrapper: max-w-7xl mx-auto px-4 py-12
  - Section gaps: space-y-20 between major sections
  - Grid: gap-6 for cards, gap-8 for feature blocks
  - Card internal: p-6 with space-y-4
  - Button spacing: px-6 py-3 for large, px-4 py-2 for medium
  
- **Mobile**: 
  - Navigation: Hamburger menu with slide-in drawer
  - Hero: Single column with stacked content, smaller text
  - Service carousel: Horizontal scroll on mobile
  - Professional grid: 1 column mobile → 2 tablet → 3 desktop
  - Dashboard: Tabs scroll horizontally, cards stack
  - Forms: Full width inputs with larger touch targets (min 44px)
