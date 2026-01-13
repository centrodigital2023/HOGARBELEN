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

### Intelligent Professional Registration System ✅ IMPLEMENTED
- **Functionality**: Multi-step registration form for healthcare professionals with real-time validation, AI-powered test generation, document upload, and automated verification analysis
- **Purpose**: Streamline professional onboarding while ensuring quality and legitimacy through intelligent verification
- **Trigger**: Professional clicks "Registrarse como Profesional" from landing page or navigation
- **Progression**: Step 1 (Profile data with validation) → Step 2 (Document upload with AI coherence check) → Step 3 (Adaptive competency test) → Step 4 (Digital contract and authorizations) → AI analysis generation → Pending verification state → Admin review
- **Success criteria**: ✅ ALL MET
  - ✅ Progressive disclosure reduces form abandonment (4-step wizard with progress tracking)
  - ✅ Real-time validation prevents submission errors (immediate feedback on all fields)
  - ✅ AI-generated tests accurately assess competency for each specialty (20 adaptive questions)
  - ✅ Document requirements clearly communicated (guided upload with visual feedback)
  - ✅ Digital signature validates identity (must match registered name exactly)
  - ✅ Comprehensive AI analysis aids admin decision-making (detailed report with confidence score)
  - ✅ Professional cannot self-approve or see AI analysis (stored separately, admin-only access)
  - ✅ High completion rate with quality applicants (clear UX, field-level progress indicators)
- **Implementation**: See `/src/pages/RegistroProfesionalInteligente.tsx` and `FORMULARIO-REGISTRO-PROFESIONAL.md`

### Admin Professional Verification Dashboard
- **Functionality**: Administrative interface to review pending professional registrations with full AI analysis, verification suggestions, and approve/reject actions
- **Purpose**: Enable administrators to efficiently verify professional credentials with AI-powered insights before activating profiles
- **Trigger**: Admin navigates to "Verificar Profesionales" from admin dashboard
- **Progression**: View pending profiles with AI confidence scores → Select profile → Review complete details and AI analysis → See verification suggestions (LinkedIn, Google searches) → Review coherence analysis → Approve or reject → Professional becomes visible in directory or receives rejection notice
- **Success criteria**:
  - All AI analysis data visible only to admins
  - Clear risk indicators and recommendations
  - One-click approval/rejection
  - Verification search suggestions actionable
  - Approved profiles automatically added to public directory
  - Audit trail of all decisions

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

### Interactive Service Booking Calendar
- **Functionality**: Full calendar interface for booking appointments with professionals, showing real availability based on professional schedules
- **Purpose**: Enable families to easily schedule appointments and professionals to manage their availability
- **Trigger**: Click "Reservar Cita" button on professional card in Family Dashboard
- **Progression**: Opens calendar modal → Select available date → View time slots for that date → Choose time → Review booking details → Confirm reservation → Booking saved to KV store → Success notification
- **Success criteria**: Calendar shows only available dates, time slots filtered by professional schedule, past dates disabled, bookings persist in KV, appointments appear in appointments view, professionals see booked slots in their availability manager

### Appointments Management View
- **Functionality**: Comprehensive view of all bookings with filtering by status (upcoming, completed, cancelled) and statistics
- **Purpose**: Give families visibility into all their scheduled and past appointments
- **Trigger**: Navigate to Appointments tab in Family Dashboard
- **Progression**: View statistics dashboard → Filter by appointment status → See upcoming appointments with contact options → Review past appointments
- **Success criteria**: All bookings displayed accurately, filters work correctly, statistics update in real-time, booking details clear and complete

### Professional Availability Manager
- **Functionality**: Interactive weekly schedule grid where professionals can enable/disable time slots and view bookings
- **Purpose**: Allow professionals to control when they are available for bookings
- **Trigger**: Professional navigates to availability management section
- **Progression**: View weekly schedule grid → Toggle individual time slots on/off → Use quick actions to enable/disable entire days → View booked slots (non-editable) → Changes auto-save to KV
- **Success criteria**: Grid shows all time slots, toggle functionality works smoothly, booked slots are locked, day-level enable/disable works, changes persist correctly

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

### Promotional Code System
- **Functionality**: Create, manage, and apply discount codes with percentage or fixed amount discounts
- **Purpose**: Enable marketing campaigns and customer acquisition through promotional offers
- **Trigger**: Admin creates codes in dashboard, users apply during checkout
- **Progression**: Admin creates code → Sets parameters (discount, expiry, max uses, applicable plans) → Code displayed publicly if desired → User enters code at checkout → System validates → Discount applied → Usage tracked
- **Success criteria**: Code validation works correctly, discounts calculate accurately, usage limits enforced, expired codes rejected, public display of active codes, admin can edit/deactivate codes

### Public Promotional Display
- **Functionality**: Showcase active promotional codes on public pages to drive conversions
- **Purpose**: Increase visibility of offers and encourage plan purchases
- **Trigger**: User views pricing or home page
- **Progression**: Active codes fetched → Displayed in attractive cards → Show discount amount, expiry, and usage limits → User copies code for checkout
- **Success criteria**: Only active, non-expired codes shown, urgency indicators for expiring/limited codes, responsive grid layout

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
- **Invalid Promo Codes**: Clear error messages for expired, exhausted, inactive, or non-existent codes
- **Discount Calculation**: Handle edge cases where discount exceeds price (never go below $0)
- **Concurrent Usage**: Track promo code usage to prevent exceeding max uses
- **Plan Restrictions**: Validate promo codes against applicable plans before applying
- **Card Expiration**: Prevent submission of expired cards with clear feedback
- **Payment Processing Errors**: Graceful error handling with retry option and support contact
- **Duplicate Subscriptions**: Prevent multiple active subscriptions for same user
- **No Active Subscription**: Show upgrade prompts with clear benefits in subscription manager
- **Invoice Generation**: Handle missing data gracefully in invoice downloads
- **Past Date Booking**: Prevent booking in past dates with error toast notification
- **No Available Time Slots**: Show helpful message when professional has no availability for selected date
- **Conflicting Bookings**: Prevent double-booking same time slot across multiple users
- **Empty Appointments List**: Show encouraging message to book first appointment with CTA to professionals section
- **Professional Schedule Parsing**: Handle various schedule formats (ranges, individual days, 24-hour format)
- **Availability Grid State**: Preserve scroll position when toggling slots in availability manager
- **Booked Slot Protection**: Prevent professionals from disabling already-booked time slots

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
