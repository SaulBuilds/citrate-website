# Citrate - AI-Native Blockchain Landing Page

## Overview

Citrate is a marketing landing page for an AI-native Layer-1 blockchain that combines GhostDAG consensus, EVM compatibility, and Model Context Protocol (MCP) integration. The project is a single-page application showcasing Citrate's features, architecture, use cases, roadmap, tokenomics, and FAQ through an animated, visually striking interface.

The application serves as a marketing tool to communicate complex blockchain and AI concepts to developers, AI researchers, validators, and general users through clear hierarchical information design, technical precision, and restrained elegance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Stack

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing (currently single-page with a 404 fallback).

**UI Component Library**: Shadcn/ui (New York style variant) built on Radix UI primitives. This provides accessible, unstyled components that are customized through Tailwind CSS. Components include accordions, dialogs, buttons, cards, forms, and navigation elements.

**Styling**: Tailwind CSS with custom theme extensions defined in `tailwind.config.ts`. The design system uses CSS custom properties for theming, supporting light/dark modes and a specific color palette (black/white foundation with yellowish-orange accents at `#FF9500`).

**Typography**: Roboto Slab as the primary font family (replacing the design guideline's Superclarendon), with JetBrains Mono for code snippets. Font weights range from 300-900, loaded from Google Fonts.

**Animation**: GSAP (GreenSock Animation Platform) with ScrollTrigger plugin for scroll-based animations. Each major section component implements entrance animations, staggered reveals, and parallax effects triggered as users scroll.

**State Management**: React Query (TanStack Query v5) for server state management and API data fetching. Local component state handled through React hooks.

### Backend Stack

**Server Framework**: Express.js running on Node.js with TypeScript.

**Build Process**: 
- Frontend: Vite compiles React/TypeScript to static assets in `dist/public`
- Backend: esbuild bundles server code as ESM to `dist/index.js`
- Development: tsx executes TypeScript directly without compilation

**Development Environment**: Vite dev server with HMR, runtime error overlays, and Replit-specific plugins (cartographer for agent integration, dev banner).

**API Structure**: RESTful endpoints under `/api/*`:
- `GET /api/stats` - Returns network statistics (TPS, finality, compatibility)
- `GET /api/faq` - Returns frequently asked questions

**Data Storage**: Currently uses in-memory storage (`MemStorage` class) with hardcoded seed data. Schema is defined in `shared/schema.ts` using Drizzle ORM types, prepared for PostgreSQL migration via Neon serverless driver.

### Database Architecture (Prepared but Not Active)

**ORM**: Drizzle ORM configured for PostgreSQL with schema definitions in `shared/schema.ts`.

**Connection**: Configured to use Neon serverless PostgreSQL (`@neondatabase/serverless`) via `DATABASE_URL` environment variable.

**Schema Tables**:
- `users` - User authentication (id, username, password)
- `network_stats` - Network performance metrics (tps, finality, compatibility, AI support)

**Migration Strategy**: Drizzle Kit configured with `drizzle.config.ts` to generate migrations in `./migrations` directory. Push-based workflow via `npm run db:push`.

**Current State**: Database connection logic exists but storage currently uses in-memory implementation. The application is prepared to switch to PostgreSQL by updating the storage implementation without changing API contracts.

### Component Architecture

**Page Structure**: Single route (`/`) rendering the Home page component, which composes multiple section components in sequence:
- Navigation (sticky header)
- Hero (animated headline with CTA buttons)
- StatsBar (network metrics)
- ProblemSection (current blockchain limitations)
- SolutionSection (Citrate's innovations)
- ArchitectureDiagram (three-layer system visualization)
- FeatureCards (developer, researcher, validator benefits)
- UseCases (code examples with TypeScript/Solidity tabs)
- Roadmap (phased development timeline)
- Tokenomics (allocation visualization)
- FAQ (expandable accordion from API data)
- Footer (links and branding)

**Animation Pattern**: Each section uses the same GSAP pattern:
1. Create section ref
2. Register ScrollTrigger on mount
3. Animate children elements with stagger delays
4. Clean up on unmount with `ctx.revert()`

**Responsive Design**: Mobile-first approach with Tailwind breakpoints (md: 768px). Navigation collapses to hamburger menu, grid layouts stack vertically, font sizes reduce on mobile.

### Design System

**Color Scheme**:
- Primary: `#FF9500` (yellowish-orange for CTAs and emphasis)
- Background: Black (`#0A0A0A`) and white alternating sections
- Borders: CSS custom properties (`--border`, `--card-border`, etc.)
- Semantic colors: Destructive, muted, accent variants

**Component Variants**: Class Variance Authority (CVA) defines variants for buttons, badges, alerts. Example: buttons have `default`, `destructive`, `outline`, `secondary`, `ghost` variants and `sm`, `default`, `lg`, `icon` sizes.

**Elevation System**: Custom Tailwind utilities (`hover-elevate`, `active-elevate-2`) apply background darkening on interaction using CSS custom properties (`--elevate-1`, `--elevate-2`).

## External Dependencies

### Third-Party Services

**Google Fonts**: Loads Roboto Slab (weights 300-900) and JetBrains Mono (weights 400-700) for typography.

**Future Database**: Neon PostgreSQL (serverless) intended for production data storage, currently not provisioned.

### Key NPM Packages

**UI Framework**:
- `react` / `react-dom` - Core React library
- `@radix-ui/*` - 20+ unstyled accessible UI primitives
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Type-safe component variants
- `clsx` / `tailwind-merge` - Conditional className utilities

**Animation**:
- `gsap` - Animation library for scroll-triggered effects

**Data Fetching**:
- `@tanstack/react-query` - Async state management
- `wouter` - Lightweight routing (2kb alternative to React Router)

**Forms** (installed but not actively used):
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Validation integration
- `zod` - Schema validation

**Database Layer** (prepared, not active):
- `drizzle-orm` - TypeScript ORM
- `drizzle-zod` - Zod schema generation from Drizzle schemas
- `@neondatabase/serverless` - Serverless Postgres client
- `connect-pg-simple` - PostgreSQL session store for Express

**Development Tools**:
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React Fast Refresh support
- `tsx` - TypeScript execution for development
- `esbuild` - Fast bundler for production builds
- `@replit/vite-plugin-*` - Replit-specific development plugins

### Build and Deployment

**Scripts**:
- `dev` - Run development server with tsx
- `build` - Compile frontend (Vite) and backend (esbuild) to `dist/`
- `start` - Run production server from `dist/index.js`
- `check` - TypeScript type checking without emit
- `db:push` - Push Drizzle schema changes to database

**Path Aliases**:
- `@/*` - Maps to `client/src/*`
- `@shared/*` - Maps to `shared/*`
- `@assets/*` - Maps to `attached_assets/*`

**Asset Strategy**: Marketing content (whitepaper, FAQ, landing page copy) stored as Markdown files in `attached_assets/`. Design guidelines documented separately. These inform the UI but are not directly rendered.