# Citrate Landing Page - Design Guidelines

## Design Approach

**Selected Approach**: Hybrid Reference-Based + Custom Components

Drawing inspiration from:
- **Linear**: Precision typography, technical sophistication, clean layouts
- **Stripe**: Clarity in complex concepts, strategic use of diagrams, minimal animation
- **Ethereum.org**: Technical depth with accessibility, developer-first approach

**Core Design Principles**:
1. **Technical Precision**: Every visual element reinforces Citrate's innovation and rigor
2. **Restrained Elegance**: Black and white foundation with strategic orange accents creates focus
3. **Information Hierarchy**: Complex blockchain/AI concepts broken into digestible sections
4. **Motion with Purpose**: GSAP animations reveal concepts, not distract

---

## Typography

**Primary Font**: Superclarendon across all elements

**Type Scale & Usage**:
- **Hero Headline**: 72px (mobile: 40px) - Bold weight - "The First AI-Native Blockchain"
- **Section Headlines**: 48px (mobile: 32px) - Bold weight - Section titles
- **Subsection Headlines**: 32px (mobile: 24px) - Medium weight - Feature titles
- **Body Large**: 20px - Regular weight - Hero subheading, feature descriptions
- **Body Regular**: 16px - Regular weight - Standard content, cards
- **Code Snippets**: 14px - Superclarendon Regular - Inline code references
- **Small Text**: 14px - Regular weight - Captions, labels

**Line Height**: 1.5 for body text, 1.2 for headlines

---

## Color Palette

**Foundation**:
- **Primary Black**: `#0A0A0A` - Main backgrounds, text on white
- **Pure White**: `#FFFFFF` - Section backgrounds, text on black
- **Soft White**: `#F5F5F5` - Subtle section alternation

**Yellowish-Orange Accent** (used sparingly for emphasis):
- **Primary Orange**: `#FF9500` - CTA buttons, active states, key highlights
- **Orange Hover**: `#E68600` - Button hover states
- **Orange Subtle**: `#FFB84D` - Secondary accents, icons
- **Orange Glow**: `rgba(255, 149, 0, 0.15)` - Subtle borders, glows on interactive elements

**Semantic Grays**:
- **Text Gray**: `#666666` - Secondary text, descriptions
- **Border Gray**: `#E0E0E0` - Dividers, card borders
- **Code Background**: `#1A1A1A` - Code block backgrounds

**Application Rules**:
- No gradients (solid colors only)
- Orange reserved for: CTAs, active navigation, key metrics, interactive highlights
- Maintain minimum 4.5:1 contrast ratio for accessibility
- Use white sections to break up black backgrounds

---

## Layout System

**Spacing Primitives** (Tailwind units):
- **Micro spacing**: 2, 4 (p-2, m-4) - Tight internal padding, small gaps
- **Standard spacing**: 6, 8, 12 (p-6, gap-8, my-12) - Component padding, typical gaps
- **Section spacing**: 16, 20, 24 (py-20, mt-24) - Vertical section spacing
- **Hero spacing**: 32 (py-32) - Hero section vertical padding

**Container Widths**:
- **Full-width sections**: `w-full` with inner `max-w-7xl mx-auto px-6`
- **Content sections**: `max-w-6xl mx-auto`
- **Text content**: `max-w-4xl mx-auto` for optimal readability

**Grid System**:
- Hero: Single column centered content
- Features: 3-column grid (lg), 2-column (md), 1-column (mobile)
- Use Cases: 2-column split (code + explanation)
- Architecture: Full-width layered diagram

---

## Component Library

### Navigation
- Fixed top navigation, black background with subtle bottom border
- Logo (left), navigation links (center), CTAs (right)
- Orange underline animation on hover using GSAP
- Mobile: Hamburger menu with slide-in panel

### Hero Section
**Layout**: Centered single column, `py-32` spacing
**Elements**:
- Animated headline with word-by-word fade-in
- Subheadline (max-w-3xl centered)
- Dual CTAs: Primary (orange background) + Secondary (white border)
- Hero visual: Animated BlockDAG diagram showing parallel vs sequential block production (SVG with GSAP morphing)

**Image Strategy**: No large hero image - instead, custom SVG diagram showing BlockDAG concept animated with GSAP

### Problem Section
**Layout**: Black background, white text, `py-20`
**Format**: 2x2 grid of problem cards
**Card Design**:
- White border (2px)
- Icon in orange (48px)
- Headline (24px bold)
- Description (16px regular)
- Hover: Subtle orange border glow

### Solution/Core Innovations
**Layout**: White background, `py-24`
**Format**: Vertical stack of 3 innovations
**Each Innovation**:
- Large number (1, 2, 3) in orange (96px)
- Headline + description
- Visual diagram (GhostDAG flow, LVM architecture, MCP endpoints)
- Code snippet with syntax highlighting (black background)

### Technical Architecture Diagram
**Layout**: Full-width, black background
**Design**: Three stacked layers with connecting arrows
- Layer 3 (MCP) - Top
- Layer 2 (LVM) - Middle  
- Layer 1 (GhostDAG) - Bottom
Each layer: White border box with internal details
GSAP: Layers fade in sequentially on scroll

### Feature Cards (For Developers/Researchers/Validators)
**Layout**: 3-column grid, white background
**Card Design**:
- White card with subtle gray border
- Icon (64px, orange accent)
- Headline (24px)
- Bullet list of features
- "Learn More" link (orange)
- Hover: Orange border, slight lift (transform: translateY(-4px))

### Use Cases
**Layout**: 2-column sections alternating black/white backgrounds
**Left**: Use case description + benefits
**Right**: Interactive code example with tabs (Solidity/TypeScript)
Code blocks: Black background, syntax highlighting, copy button

### Roadmap
**Layout**: Vertical timeline, white background, orange line
**Design**:
- Orange vertical line (left side)
- Phase nodes (circles) on line
- Completed phases: Filled orange circle
- In-progress: Half-filled circle
- Future: Outlined circle
- GSAP: Phases animate in on scroll

### Tokenomics
**Layout**: Centered section, black background
**Visual**: Horizontal bar chart showing distribution
- Each allocation: White segment with orange divider
- Percentage labels above
- Hover: Segment lifts, shows details

### FAQ
**Layout**: Single column, white background, max-w-4xl
**Design**: Accordion with orange plus icons
- Question: Bold 20px
- Answer: Regular 16px, revealed with GSAP height animation
- Active question has orange left border

### Footer
**Layout**: Black background, white text, 3-column grid
**Columns**: Product links, Resources, Community
**Bottom**: Copyright + social icons (orange on hover)

---

## Animations (GSAP)

**Philosophy**: Purposeful, performance-focused animations that enhance understanding

**Hero Animations**:
- Headline: Words fade in sequentially (0.1s stagger)
- BlockDAG diagram: Blocks appear and connect with animated lines
- CTAs: Fade up after headline completes

**Scroll Trigger Animations**:
- Section headlines: Fade in + slide up when entering viewport
- Feature cards: Stagger animation (0.15s delay between cards)
- Architecture layers: Sequential reveal (top to bottom)
- Code blocks: Typing effect on first visible code line

**Micro-interactions**:
- Buttons: Smooth scale on hover (1.02x)
- Cards: Border color transition (0.3s ease)
- Links: Orange underline slide-in effect

**Performance**:
- Use `will-change` property sparingly
- Trigger animations only on elements in viewport
- Disable animations on mobile if performance issues

---

## Images

**Image Strategy**: Minimal reliance on photographic images; emphasis on diagrams and illustrations

**Where to Use Images**:
1. **Logo**: Clean wordmark with optional icon (top left navigation)
2. **Diagrams/Visualizations**: Custom SVG illustrations for:
   - BlockDAG vs traditional blockchain comparison
   - Three-layer architecture diagram
   - Network topology visualization
3. **Partner/Ecosystem Logos**: If showcasing integrations (Ethereum, IPFS, etc.) - grayscale with orange on hover

**Image Specifications**:
- SVG format for diagrams (scalable, animatable)
- PNG for logos (2x resolution for retina)
- No hero background image - clean black background with animated diagram instead
- All images optimized for web (compressed)

**No Large Hero Image**: Hero section uses animated SVG diagram instead of photographic background

---

## Page Structure (Landing Page)

1. **Navigation** (sticky)
2. **Hero** - Headline + BlockDAG animation + CTAs (py-32)
3. **Stats Bar** - 4 key metrics in orange (TPS, Finality, Models, Validators)
4. **Problem** - 2x2 grid, black background (py-20)
5. **Solution** - 3 core innovations, white background (py-24)
6. **Architecture Diagram** - Full-width, layered visualization (py-20)
7. **Features** - 3 columns (Developers/Researchers/Validators), white (py-20)
8. **Use Cases** - 4 use cases, alternating backgrounds (py-16 each)
9. **Roadmap** - Timeline visualization, white background (py-24)
10. **Tokenomics** - Distribution chart, black background (py-20)
11. **FAQ** - Accordion, white background (py-20)
12. **Final CTA** - Black background, centered CTA (py-24)
13. **Footer** - Links + social, black background (py-16)

**Total Sections**: 13 comprehensive sections creating a complete, professional landing experience