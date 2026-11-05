---
name: Grant Precision System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#ae0010'
  on-tertiary: '#ffffff'
  tertiary-container: '#d52022'
  on-tertiary-container: '#ffecea'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000b'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
  metric-num:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system powers a government grant and subsidy discovery service that balances institutional reliability with high-velocity product execution. The target audience comprises citizens, small business owners, and startup operators who require immediate, unambiguous clarity regarding financial entitlements and eligibility deadlines. 

The aesthetic synthesizes the high-efficiency ergonomics of modern developer platforms with the hyper-accessible, high-trust frictionlessness of modern fintech. It deliberately rejects bureaucratic clutter, skeuomorphism, and heavy decorative gradients in favor of an ultra-clean, clinical canvas: pure white structural planes, razor-thin borders, disciplined vertical rhythm, and surgical typographic contrast. The UI communicates relentless precision, transparency, and operational calm.

## Colors

The palette is engineered for clinical contrast, institutional credibility, and functional signaling.

- **Primary (`#2563EB` - Royal Blue)**: Serves as the primary operational trigger. Used exclusively for high-intent interactive states, verified status badges, progress milestones, and active tab indicators. It carries zero decorative burden.
- **Secondary (`#0F172A` - Slate Black)**: Anchors high-priority data points, primary text hierarchy, deep-emphasis containers, and high-impact micro-headers. It replaces raw black to avoid uncalibrated visual fatigue.
- **Tertiary (`#DC2626` - Crimson Accent)**: Dedicated strictly to urgent utility: imminent application deadlines (D-Day countdowns), disqualification criteria, missing documentation flags, and irreversible destructive actions.
- **Neutral (`#64748B` - Slate Grey)**: Handles metadata labels, contextual hints, secondary timestamps, disabled borders, and inactive UI primitives.
- **Surface Foundations**: `#FFFFFF` acts as the pure baseline for elevated cards and modals, contrasted against `#F8FAFC` for base viewports, table track rails, and segmented pill backgrounds. Spatial separation is enforced via `#E2E8F0` at 1px razor stroke rather than heavy drop shadows.

## Typography

Typography prioritizes high information density, structural hierarchy, and instant scannability. Inter serves as the global structural driver, complemented by Pretendard in multilingual Korean typography contexts to preserve identical metrics, vertical weight optical distribution, and kerning pairs.

All numbers, subsidy amounts, dates, and quantitative criteria must strictly enable tabular figures (`font-variant-numeric: tabular-nums;` or `font-feature-settings: "tnum"`). This prevents jitter during dynamic calculations, guarantees vertical column alignment in tabular comparisons, and maintains the visual discipline of a precision financial interface. 

Tight negative tracking is calibrated onto all headline scales (`-0.01em` through `-0.03em`) to generate the authoritative, compact silhouette characteristic of modern software tools.

## Layout & Spacing

The layout is structured on a 12-column responsive fluid grid pinned to a maximum content width of 1200px to maintain reading ergonomics.

- **Desktop (>= 1024px)**: 12 columns, 24px (`1.5rem`) gutters, and 40px (`2.5rem`) outer canvas margins. Multi-column dashboards accommodate split views for grant search filters, live tabular output, and real-time eligibility side-panels.
- **Tablet (768px – 1023px)**: 8 columns, 16px (`1rem`) gutters, and 24px (`1.5rem`) outer margins. Side panels fold into progressive drawer overlays.
- **Mobile (< 768px)**: 4 columns, 16px (`1rem`) gutters, and 16px (`1rem`) outer margins. Content stacks strictly into a single vertical stream, with full-width horizontal segmented controls pinned above safe-area viewports.

Spacing is bound to a strict 4px/8px modular scale (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px). Element paddings within card clusters must maintain internal parity: card edge-to-content padding is uniform at 20px or 24px, ensuring mathematical precision across complex responsive reflows.

## Elevation & Depth

Visual depth avoids heavy drop shadows, blurred ambient blooms, or multi-stop gradients. Depth is established through flat, razor-clean boundaries, deliberate surface contrasts, and near-invisible ambient foundation shadows.

1. **Flat Baseline Plane**: `#F8FAFC` establishes the ground canvas.
2. **Elevated Surface (Cards, Panels, Inputs)**: Pure `#FFFFFF` resting atop `#F8FAFC`. Contrast is achieved via a hairline 1px solid border (`#E2E8F0`) backed by a micro ambient shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
3. **Hover & Interactive State**: Transition from default border to `#CBD5E1` with shadow shifting cleanly to `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
4. **Modals & Flyouts**: Elevated with absolute white background, bounded by a 1px `#E2E8F0` border, resting on `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. 
5. **Backdrop Overlays**: Dimmed with flat `rgba(15, 23, 42, 0.4)` without backdrop-blur filters, maintaining clinical sharpness and instantaneous rendering response.

## Shapes

The geometric framework applies consistent, calculated corner radii to distinguish outer structures from actionable touchpoints:

- **Large Structural Containers (Cards, Modals, Feed Banners)**: Radiused precisely at 16px (`1rem` / `rounded-lg`). This softens tabular data density while maintaining crisp layout architecture.
- **Action Primitives (Buttons, Input Fields, Dropdowns)**: Radiused consistently at 8px (`0.5rem` / `rounded-md`). This produces a disciplined, tool-like interaction surface distinct from the cards containing them.
- **Micro UI (Badges, Pills, Chips)**: Radiused at either 6px (`0.375rem`) or fully circular (9999px pill) depending on whether the element conveys static state or functional filter behavior.
- **Dividers & Strokes**: Set consistently to an exact 1px width with no anti-aliasing offsets or inner bevels.

## Components

### Buttons
- **Primary**: Solid `#2563EB` fill, `#FFFFFF` text, 8px (`0.5rem`) border-radius. Padding: 10px 16px (`body-md` bold). Subtle active state compresses down 0.5% scale with a hover fill of `#1D4ED8`.
- **Secondary**: `#FFFFFF` background, 1px solid `#E2E8F0` border, `#0F172A` text. Hover changes background to `#F8FAFC` and border to `#CBD5E1`.
- **Destructive / Urgent**: `#DC2626` background, `#FFFFFF` text, targeted at final cancellations or deadline confirmations.
- **Sizes**: Small (32px height, 12px text), Medium (40px height, 14px text), Large (48px height, 16px text).

### Cards (Grant & Subsidy Items)
- `#FFFFFF` background, 16px (`1rem`) border-radius, 1px solid `#E2E8F0`, subtle shadow `0 1px 2px rgba(15, 23, 42, 0.04)`. Internal padding: 20px mobile, 24px desktop.
- Header row hosts category pill, title (`headline-sm`), and bookmark utility.
- Center metadata grid utilizes tabular figures (`metric-num`) for subsidy amounts, separated with hairline vertical borders (`#E2E8F0`).
- Bottom rail hosts deadline status badge and primary eligibility CTA button.

### Form Inputs & Selects
- Height: 42px. `#FFFFFF` background, 8px (`0.5rem`) border-radius, 1px solid `#E2E8F0`. 
- Font: `body-md` in `#0F172A` with `#64748B` placeholder text.
- Focus State: 1px border shifts to `#2563EB` with a crisp outer focus ring: `0 0 0 3px rgba(37, 99, 235, 0.15)`. No default browser outlines.

### Chips & Badges
- **Status Badges**: 6px border-radius, 4px 8px padding (`label-sm`).
  - Active/Open: Background `#EFF6FF`, border 1px solid `#DBEAFE`, text `#1D4ED8`.
  - Closing Soon (D-Day): Background `#FEF2F2`, border 1px solid `#FEE2E2`, text `#DC2626`.
  - Closed: Background `#F1F5F9`, border 1px solid `#E2E8F0`, text `#64748B`.
- **Filter Chips**: Interactive pills (9999px border-radius), `#FFFFFF` surface with 1px `#E2E8F0` border. Active state flips to `#0F172A` fill with `#FFFFFF` text.

### Checkboxes & Radios
- Size: 18px by 18px square (checkbox: 4px radius) or circle (radio).
- 1px solid `#CBD5E1` border on `#FFFFFF`.
- Checked state: `#2563EB` solid fill, white checkmark glyph (2px stroke thickness). Focus outline matches the input focus ring token.

### Data Tables & Lists
- Table header row uses `#F8FAFC` background, 1px bottom border `#E2E8F0`, text `label-sm` in `#64748B`, uppercase tracking.
- Row items use `#FFFFFF` background, 1px bottom border `#F1F5F9`, 48px row height.
- Hover state: Entire row shifts to `#F8FAFC` smoothly over 150ms ease. Numbers align right using tabular figures.