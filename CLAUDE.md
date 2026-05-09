# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 SEO-first landing page codebase with two independent deployment variants built from a single repository:
- **B2B** (English, business travelers)
- **B2C** (Vietnamese, leisure travelers)

Both variants share the same codebase but maintain separate component compositions and content sources.

## Development Commands

```bash
# Install dependencies
npm install

# Start local development server (default variant based on LANDING_VARIANT)
npm run dev

# Build variants
npm run build           # Builds default variant (LANDING_VARIANT from environment)
npm run build:b2b       # Builds B2B deployment variant
npm run build:b2c       # Builds B2C deployment variant

# Run production server after build
npm run start

# Governance sync (regenerates structure snapshot)
npm run sync:governance
```

### TypeScript Validation

```bash
# Type check only (no emit)
./node_modules/.bin/tsc --noEmit
```

### Preview Routes

- `/` - Root route, variant selected by `LANDING_VARIANT` environment variable
- `/b2b` - Direct B2B preview (English, fixed lang="en")
- `/b2c` - Direct B2C preview (Vietnamese, fixed lang="vi")

## Architecture

### Variant Selection Pattern

The codebase uses Next.js route groups to separate variant routing:

- `app/(default)/` - Root deployment that resolves `LANDING_VARIANT` and renders the matching variant
- `app/(b2b-preview)/` - Direct B2B preview route with fixed `lang="en"`
- `app/(b2c-preview)/` - Direct B2C preview route with fixed `lang="vi"`

Variant resolution happens in `lib/variant.ts`:
```typescript
const variant = resolveVariant(process.env.LANDING_VARIANT);
// Returns "b2b" or "b2c", defaults to "b2b"
```

### Component Structure

```
components/
  shared/
    landing-primitives.tsx   # Neutral layout primitives (PageShell, HeroCopy, StatGrid, etc.)
    responsive-nav.tsx       # Shared navigation behavior
    tracked-cta-link.tsx     # CTA wrapper with analytics tracking
  b2b/
    landing-page.tsx         # B2B composition and section order
    lead-capture-form.tsx    # B2B inline lead form with validation
  b2c/
    landing-page.tsx         # B2C composition and section order
```

**Key principle:** Shared components in `components/shared/` must NOT encode variant-specific layout, copy, or visual hierarchy. B2B and B2C differences belong in their own `components/b2b/` and `components/b2c/` directories.

### Content Architecture

```
lib/
  landing-content.ts    # Shared content type definitions (interfaces)
  content.ts            # Barrel export layer only
  variant.ts            # Variant resolution logic
  metadata.ts           # Next.js metadata builder
  analytics.ts          # Analytics helper (no-op by default)
  b2b/content.ts        # B2B-specific copy, stats, CTAs, lead form config
  b2c/content.ts        # B2C-specific copy, stats, CTAs
```

Content types define the complete landing page schema in `lib/landing-content.ts` (LandingContent, LandingHeroContent, LandingLeadFormContent, etc.). Each variant content file exports a complete implementation of these types.

### Design Authority

Design specifications are the source of truth for visual decisions:
- `docs/design/b2b/DESIGN.md` - Canonical B2B design spec
- `docs/design/b2c/DESIGN.md` - Canonical B2C design spec

**Before editing any B2B/B2C component or content, read the matching design file.** If implementation conflicts with design, the design file takes precedence.

## Governance and Documentation

- `docs/architecture/landing-page-variant-sources.md` - Architecture source of truth explaining variant separation principles
- `docs/architecture/current-structure.md` - Generated snapshot of repository structure (run `npm run sync:governance` to update)
- `docs/superpowers/specs/` - Approved design specs before implementation
- `docs/plan/b2b/` - B2B execution tracking and task files

## Code Style

- TypeScript with strict mode
- Functional React components
- camelCase for variables and functions
- PascalCase for components and interfaces
- 2-space indentation
- Prefer immutable patterns (spread operator for object updates)
- No `console.log` in production code
- Explicit types on public APIs

## Testing

No test framework is currently configured. Validate changes by running:

```bash
./node_modules/.bin/tsc --noEmit
npm run build
npm run build:b2b
npm run build:b2c
```

If adding tests later, use `.test.tsx` naming convention aligned with feature area.

## Security

- Never hardcode secrets - use environment variables
- Validate all user inputs (see lead-capture-form.tsx for validation pattern)
- The analytics helper (`lib/analytics.ts`) is currently a no-op; switch to a real provider through explicit configuration

## Commit & PR Guidelines

Use clear imperative commit messages (e.g., "Add B2B hero section", "Update B2C FAQ styling").

Pull requests should include:
- Summary of changes
- Which variant(s) are affected
- Screenshots for visual updates
- Notes on SEO or performance impact if relevant

## Important Rules

1. **Keep B2B and B2C separate** - Do not merge them into shared components. Keep variant-specific layout and content in their own directories.
2. **Shared code only for neutral primitives** - `components/shared/` and `lib/` should not encode variant decisions.
3. **Design files are authoritative** - When editing variant-specific UI, align with `docs/design/{b2b|b2c}/DESIGN.md`.
4. **Refresh governance docs** - Run `npm run sync:governance` after structural changes.
5. **Route groups govern deployment** - Root `(default)` uses `LANDING_VARIANT`; preview routes are fixed.
