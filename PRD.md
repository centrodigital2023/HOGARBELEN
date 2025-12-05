# Planning Guide

A welcoming, professional website for Hogar Belén that provides information about the facility, services, and contact details while creating an atmosphere of warmth, care, and community.

**Experience Qualities**:
1. **Welcoming** - The site should feel like an invitation, making visitors feel comfortable and cared for from the first moment
2. **Trustworthy** - Professional presentation that instills confidence in the quality of care and services provided
3. **Accessible** - Clear information architecture that makes it easy for families and individuals to find what they need quickly

**Complexity Level**: Content Showcase (information-focused)
This is primarily an informational website designed to communicate services, values, and facilitate contact with Hogar Belén.

## Essential Features

### Hero Section
- **Functionality**: Presents the main message and visual identity of Hogar Belén
- **Purpose**: Creates immediate emotional connection and communicates core mission
- **Trigger**: Page load
- **Progression**: User lands on page → sees hero image/message → understands organization's purpose → scrolls or clicks CTA
- **Success criteria**: Clear value proposition visible above fold, compelling call-to-action present

### About Section
- **Functionality**: Describes the history, mission, and values of Hogar Belén
- **Purpose**: Builds trust and emotional connection with visitors
- **Trigger**: User scrolls down from hero or clicks navigation link
- **Progression**: User views hero → scrolls to about → reads mission/history → understands organization values
- **Success criteria**: Compelling narrative that communicates care philosophy clearly

### Services Section
- **Functionality**: Details the specific services and care options available
- **Purpose**: Informs potential residents and families about what's offered
- **Trigger**: User navigates to services section or scrolls naturally
- **Progression**: User seeks information → views service cards → understands offerings → considers next steps
- **Success criteria**: Clear categorization of services with descriptive details

### Gallery/Visual Section
- **Functionality**: Showcases facilities, activities, and community life through images
- **Purpose**: Provides visual proof of quality and creates emotional appeal
- **Trigger**: User scrolls through page or clicks gallery navigation
- **Progression**: User curious about environment → views photos → visualizes life at facility → builds confidence
- **Success criteria**: High-quality images displaying various aspects of daily life and facilities

### Contact Section
- **Functionality**: Provides multiple ways to get in touch (phone, email, address, form)
- **Purpose**: Facilitates inquiries and visits from interested families
- **Trigger**: User ready to reach out after reviewing information
- **Progression**: User interested → scrolls to contact → chooses method → initiates communication
- **Success criteria**: Multiple contact methods clearly displayed, optional contact form that's easy to use

## Edge Case Handling
- **Empty Form Submission**: Validate required fields and show helpful error messages
- **Long Content**: Implement smooth scrolling and clear section breaks for easy navigation
- **Mobile Navigation**: Collapse navigation into hamburger menu on smaller screens
- **Image Loading**: Show graceful placeholders while images load
- **Failed Form Submission**: Display user-friendly error message with retry option

## Design Direction
The design should evoke feelings of warmth, safety, and professionalism - like a caring home rather than an institutional facility. The aesthetic should balance modern web design trends with timeless, accessible elements that appeal to both elderly residents and their adult children making decisions about care.

## Color Selection
A warm, inviting palette that balances professionalism with comfort, using nature-inspired tones that suggest peace and healing.

- **Primary Color**: Soft Sage Green (oklch(0.75 0.08 150)) - Communicates growth, health, and tranquility while maintaining professionalism
- **Secondary Colors**: 
  - Warm Cream (oklch(0.96 0.02 80)) - Creates a soft, welcoming background
  - Terracotta Accent (oklch(0.65 0.15 35)) - Adds warmth and energy without overwhelming
- **Accent Color**: Golden Amber (oklch(0.72 0.14 75)) - For CTAs and important elements, suggesting care and value
- **Foreground/Background Pairings**:
  - Background Cream (oklch(0.96 0.02 80)): Dark Slate text (oklch(0.25 0.01 220)) - Ratio 12.5:1 ✓
  - Primary Sage (oklch(0.75 0.08 150)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Accent Amber (oklch(0.72 0.14 75)): Dark Slate text (oklch(0.25 0.01 220)) - Ratio 6.8:1 ✓
  - Terracotta (oklch(0.65 0.15 35)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓

## Font Selection
Typography should feel both professional and approachable - sophisticated enough for credibility but warm enough to feel personal and caring.

- **Primary**: Newsreader for headings - elegant serif that communicates tradition and trust
- **Secondary**: Outfit for body text - clean, modern sans-serif with excellent readability

**Typographic Hierarchy**:
- H1 (Hero Title): Newsreader Bold/48px/tight letter spacing/-1px
- H2 (Section Headers): Newsreader SemiBold/36px/normal letter spacing
- H3 (Subsections): Newsreader Medium/24px/normal letter spacing
- Body Text: Outfit Regular/17px/relaxed line height (1.7)
- Small Text/Captions: Outfit Regular/14px/normal line height

## Animations
Animations should be gentle and purposeful, reinforcing the sense of calm and care. Use subtle fade-ins as sections enter viewport to create a sense of discovery without overwhelming visitors. Hover states on interactive elements should feel responsive but not aggressive - gentle scale transforms and color transitions. Navigation scrolling should be smooth and natural.

## Component Selection
- **Components**: 
  - Card (for services display with gentle shadows and rounded corners)
  - Button (primary for CTAs, secondary for less critical actions)
  - Separator (to create visual breaks between sections)
  - Sheet (for mobile navigation drawer)
  - Textarea/Input (for contact form with proper labels and validation)
- **Customizations**: 
  - Custom hero section with overlaid text on background image/gradient
  - Custom gallery grid with responsive columns
  - Custom footer with multi-column layout for information organization
- **States**: 
  - Buttons: subtle lift on hover (translateY(-2px)), pressed state with slight scale
  - Form inputs: gentle border color change on focus with smooth transition
  - Cards: subtle shadow increase on hover
  - Navigation links: underline animation on hover with color transition
- **Icon Selection**: 
  - Phone (for contact)
  - MapPin (for address)
  - Envelope (for email)
  - Heart (for mission/care emphasis)
  - Users (for community)
  - Home (for facilities)
  - Sparkle (for services highlight)
- **Spacing**: 
  - Section padding: py-16 lg:py-24
  - Container: max-w-7xl with px-6 lg:px-8
  - Card padding: p-6 lg:p-8
  - Gap between elements: gap-6 for related items, gap-12 for distinct groups
- **Mobile**: 
  - Single column layouts stack naturally
  - Navigation collapses to sheet drawer with hamburger icon
  - Hero text scales down appropriately (text-4xl to text-2xl)
  - Service cards flow from 3 columns → 2 columns → 1 column
  - Contact form maintains full width on mobile with adjusted spacing
