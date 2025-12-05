# Planning Guide

A comprehensive platform for discovering and validating healthcare professionals in Colombia, featuring real-time availability tracking, AI-powered credential validation, and direct WhatsApp contact integration.

**Experience Qualities**:
1. **Trustworthy** - Users need to feel confident in the credentials and availability of healthcare professionals through transparent ratings, schedules, and AI validation
2. **Efficient** - Quick filtering and instant availability status help users find the right professional without delays
3. **Connected** - Seamless WhatsApp integration enables immediate communication between patients and professionals

**Complexity Level**: Light Application (multiple features with basic state)
The application manages professional data, implements real-time availability calculations, integrates with external APIs (Gemini AI, WhatsApp), and provides sophisticated filtering and sorting mechanisms.

## Essential Features

### Professional Directory Grid
- **Functionality**: Displays healthcare professionals with photos, credentials, ratings, and real-time availability
- **Purpose**: Provides comprehensive information to help users make informed decisions about healthcare providers
- **Trigger**: Page load and filter changes
- **Progression**: User lands on page → sees grid of professionals → views detailed cards → assesses availability → takes action
- **Success criteria**: All professional information clearly displayed, images load properly, availability status calculated accurately

### Real-Time Availability System
- **Functionality**: Calculates current availability status based on professional schedules and current time
- **Purpose**: Shows users which professionals are available right now versus occupied or off-duty
- **Trigger**: Continuous calculation based on browser time and schedule data
- **Progression**: System reads schedule → parses time slots → compares to current time → displays status badge
- **Success criteria**: Accurate status display (Disponible, Ocupado, Ausente, Urgencias), updates reflect actual schedule

### Category Filtering
- **Functionality**: Filter professionals by category (Enfermería, Cuidadores, Terapia, Médicos, Otros) or availability status
- **Purpose**: Helps users quickly narrow down to relevant professionals
- **Trigger**: User clicks filter button
- **Progression**: User views all professionals → selects filter → grid updates → relevant professionals shown
- **Success criteria**: Instant filtering, maintains sort order, "Disponible Ahora" shows only currently available

### AI Validation System
- **Functionality**: Generates AI-powered summaries using Gemini API with grounding sources about professional credentials and salary ranges
- **Purpose**: Provides additional validation and context about healthcare professionals in Colombia
- **Trigger**: User clicks "Validación IA" button on a professional card
- **Progression**: User clicks button → API call initiated → loading state shown → summary generated with sources → displayed in card
- **Success criteria**: Relevant summary generated, grounding sources displayed, graceful error handling, fallback simulation if no API key

### WhatsApp Contact Integration
- **Functionality**: Opens WhatsApp chat with pre-filled context-aware message to professional
- **Purpose**: Enables immediate, convenient communication between users and professionals
- **Trigger**: User clicks "Contactar por WhatsApp" button
- **Progression**: User clicks button → WhatsApp opens in new tab → message pre-filled → user can send
- **Success criteria**: Correct phone number dialed, appropriate message based on status (urgencias vs normal), opens in new window

## Edge Case Handling
- **Empty Filter Results**: Display friendly message indicating no professionals match the criteria with suggestion to try different filter
- **AI API Failure**: Show error message, implement exponential backoff retry logic, provide simulated fallback response if API key missing
- **Invalid Schedule Data**: Handle parsing errors gracefully, default to "Estado Desconocido" status
- **Missing Images**: Fallback to placeholder with professional's initials and category color
- **Disabled Actions**: Disable WhatsApp button when professional is unavailable (except for urgencias status)
- **Loading States**: Show spinner and "Analizando..." text during AI generation

## Design Direction
The design should feel modern, professional, and tech-forward while maintaining approachability. It should evoke trust through clean information hierarchy, use of validation badges, and transparent display of credentials. The interface should feel efficient and data-rich without overwhelming users.

## Color Selection
A professional, tech-forward palette centered around indigo/purple tones that communicate trust, intelligence, and healthcare professionalism.

- **Primary Color**: Indigo (oklch(0.55 0.2 265)) - Represents professionalism, trust, and healthcare technology
- **Secondary Colors**: 
  - Light Gray (oklch(0.97 0.005 240)) - Clean, minimal background
  - Purple Accent (oklch(0.68 0.25 305)) - For AI/tech features
- **Accent Color**: Various status colors - Green for available, Yellow for occupied, Red for absent/urgencias
- **Foreground/Background Pairings**:
  - Light Background (oklch(0.97 0.005 240)): Dark text (oklch(0.2 0.02 250)) - Ratio 14.2:1 ✓
  - Indigo Primary (oklch(0.55 0.2 265)): White text (oklch(0.99 0 0)) - Ratio 7.8:1 ✓
  - Purple Accent (oklch(0.68 0.25 305)): White text (oklch(0.99 0 0)) - Ratio 5.1:1 ✓
  - Green Success: White text - Status indicators
  - Red Warning: White text - Urgencias/unavailable indicators

## Font Selection
Inter as the sole typeface provides a modern, tech-forward aesthetic with excellent readability across all weights and maintains professional credibility.

- **Primary**: Inter for all text - modern, highly legible, tech-industry standard

**Typographic Hierarchy**:
- H1 (Page Title): Inter ExtraBold/36-48px/tight letter spacing
- H3 (Professional Name): Inter ExtraBold/20px/normal spacing
- Body (Role/Details): Inter Regular/14-16px/relaxed line height
- Labels: Inter Medium/12-14px/normal spacing
- Badges: Inter SemiBold/12px/uppercase for categories

## Animations
Animations should feel snappy and purposeful, reinforcing the tech-forward nature of the platform. Card entries use scale + fade for polish. Layout shifts when filtering use Framer Motion's layout animations for smooth repositioning. Loading states use spinning indicators. AI summary reveals use slide-up motion to feel like information appearing. All hover states include subtle scale transforms and shadow increases.

## Component Selection
- **Components**: 
  - Card (shadcn) - Professional profile cards with extensive customization
  - Button (shadcn) - Primary actions (contact, AI validation), secondary (filters)
  - Badge (shadcn) - Category labels, status indicators, schedule chips
  - Framer Motion AnimatePresence/motion.div - For smooth filtering animations
  - Lucide Icons - Status icons (CheckCircle, XCircle, MinusCircle, Zap), feature icons (Star, MapPin, MessageCircle)
  
- **Customizations**: 
  - Professional cards with image headers, status badges, schedule displays
  - Custom filter bar with sticky positioning
  - AI summary expansion with source citations
  - Status calculation system with time parsing
  
- **States**: 
  - Buttons: Disabled state for unavailable professionals, loading state with spinner for AI
  - Cards: Hover shadow lift, smooth layout repositioning during filter changes
  - Filter buttons: Active state (filled indigo), inactive (gray), "Disponible Ahora" (green accent)
  - AI Summary: Collapsed by default, expands on generation with sources list
  
- **Icon Selection**: 
  - CheckCircle - Available status
  - MinusCircle - Occupied status
  - XCircle - Absent status
  - Zap - Urgencias status and AI features
  - Star - Ratings display
  - MapPin - Location
  - MessageCircle - WhatsApp contact
  - UserCheck - Main app icon
  - Loader2 - Loading states
  
- **Spacing**: 
  - Grid: gap-6 between professional cards
  - Card internal: p-6 with mb-4 between sections
  - Filter bar: gap-2 between buttons, p-4 container padding
  - Page wrapper: p-4 sm:p-8
  
- **Mobile**: 
  - Grid: 1 column mobile → 2 columns tablet → 3 columns desktop
  - Cards: Full width on mobile with stacked action buttons
  - Filter bar: Wraps buttons on smaller screens, remains sticky
  - Header: Text scales down appropriately
  - Status badges: Remain visible but may stack on very small screens
