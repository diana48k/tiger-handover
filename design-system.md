# TGX (Tiger OpenSpace) — Shared Design System

> **Source:** Figma file `Zd6MerJKdD2PIswaz5rKu3` ([Prototype] TGX - 20/80)
> **Last updated:** 2026-03-19
> **Last verified:** 2026-04-06
> **Scope:** All TigerSoft products — Wellbeing, Recruitment, People Analytics, PMS, HRD

All projects in this workspace share this design system. This file is the **canonical source of truth** for all tokens, components, and patterns. Each project CLAUDE.md carries a compact inline "Design System Quick Reference" (~60 lines) for scoped sessions — those are derived from this file. See root `CLAUDE.md` § "Design System — Architecture & Update Protocol" for the sync process. Visual reference: `../TGX_Design_System.html` (16-section interactive HTML).

---

## 1. Color Tokens

### Brand Colors

| Token Name       | Hex       | Usage                                              |
|------------------|-----------|-----------------------------------------------------|
| Tiger Red        | `#C10016` | Primary brand accent, active nav items, selected states, checkboxes, breadcrumb active text, CTA buttons |
| Tiger Red Light  | `#FEF2F2` | Active icon backgrounds, subtle red tints           |
| Tiger Red Hover  | `#A30013` | Darker red for hover states                         |

### Neutral Palette

| Token Name       | Hex       | Usage                                              |
|------------------|-----------|-----------------------------------------------------|
| Semi Black       | `#3A3A3A` | Primary text color (body, headings, labels)         |
| Grey             | `#9C9C9C` | Secondary text, labels, search placeholder          |
| Semi Grey        | `#BFBFBF` | Placeholder text, disabled/muted counts, tertiary text |
| Border           | `#E8E8E8` | Card borders, dividers, section separators          |
| Hover Border     | `#E6E6E6` | Input borders, card dividers, checkbox unselected   |
| Background       | `#FAFAFA` | Page background                                     |
| White            | `#FFFFFF` | Card backgrounds, sidebar, topbar                   |

### Surface / Background Colors

| Token Name           | Hex                              | Usage                                 |
|----------------------|----------------------------------|---------------------------------------|
| Page Background      | `#FAFAFA`                        | Main content area background          |
| Card / Panel         | `#FFFFFF`                        | Side menu, cards, toolbars            |
| Input Background     | `#F0F0F0`                        | Dropdown/input field fill             |
| Search Background    | `#F5F5F5`                        | Sidebar search input fill             |
| List Item Hover/Alt  | `#F6F6F6`                        | Alternate list-item background        |
| Badge Background     | `#EFEFEF`                        | Count badges in tree list             |
| Sidebar Shadow       | `rgba(191,191,191,0.25)`         | `box-shadow: 1px 1px 8px`            |
| Dock Shadow          | `rgba(239,239,239,0.4)`          | `box-shadow: 0px 4px 4px`            |

### Status Colors (Health / Data Visualization)

| Status     | Dark       | Light      | Background | Usage                     |
|------------|------------|------------|------------|---------------------------|
| Good       | `#16A34A`  | `#22C55E`  | `#F0FDF4`  | Normal/optimal range      |
| Okay       | `#CA8A04`  | `#EAB308`  | `#FEFCE8`  | Acceptable, could improve |
| Attention  | `#EA580C`  | `#F97316`  | `#FFF7ED`  | Borderline, needs monitoring |
| Risk       | `#DC2626`  | `#EF4444`  | `#FEF2F2`  | Out of range, clinical concern |

**Key rule:** Colors represent STATUS only — not categories. No per-category accent colors. This was explicit user feedback.

**Variant usage:**
- **Dark** — text labels, solid indicator dots, badge text, icon fills
- **Light** — chart lines, ring chart fills, medium-emphasis elements
- **Background** — card fills, tag backgrounds, subtle range zone tints

**Transparency for range bars (Whoop-style):**
- Small range bars: `{statusHex}30` to `{statusHex}40` (30–40% opacity)
- Large/modal range bars: `{statusHex}40` to `{statusHex}55` (40–55% opacity)
- Apply as gradients: `linear-gradient(90deg, {hex}{alphaLow}, {hex}{alphaHigh})`

### Semantic Colors (Buttons)

| Token Name              | Hex       | Usage                           |
|-------------------------|-----------|----------------------------------|
| Primary Blue 600        | `#2563EB` | Primary action button fill (CTA)|

---

## 2. Typography

### Font Families

| Token                        | Family Stack                                        | Usage                            |
|------------------------------|-----------------------------------------------------|----------------------------------|
| English Primary              | `'Poppins', sans-serif`                            | All English UI text              |
| Thai Primary                 | `'Noto Sans Thai', sans-serif`                     | All Thai UI text                 |
| Mixed / Fallback             | `'Poppins', 'Noto Sans Thai', sans-serif`          | Bilingual contexts               |
| Button / Data (secondary)    | `'Inter', sans-serif`                              | Button labels in component lib   |

**Font weights available:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Type Scale

| Style Name                   | Size   | Weight          | Line Height | Usage                            |
|------------------------------|--------|-----------------|-------------|----------------------------------|
| Page Title (TH)              | 20px   | SemiBold (600)  | normal      | Section titles                   |
| Subheading                   | 16px   | Regular (400)   | 100%        | Dropdown labels, sub-navigation  |
| Body                         | 14px   | Regular (400)   | 100%        | General body text, breadcrumbs   |
| Body Medium                  | 14px   | Medium (500)    | 100%        | Breadcrumb current page, header  |
| Footnote                     | 12px   | Regular (400)   | normal      | Sidebar nav labels, list names   |
| Button Text (Inter)          | 14px   | Regular (400)   | 20px        | Button labels                    |

---

## 3. Spacing & Sizing

### Base Spacing Scale

| Token  | Value | Common Usage                          |
|--------|-------|---------------------------------------|
| xs     | 2px   | Tight padding (breadcrumb separators) |
| sm     | 4px   | Button vertical padding, small gaps   |
| md     | 6px   | List-item padding, search icon gap    |
| base   | 10px  | Universal gap, card padding, section spacing |
| lg     | 16px  | Icon-to-label gap in sidebar          |
| xl     | 20px  | Navigation items vertical gap         |
| 2xl    | 24px  | Sidebar top padding, toolbar spacing  |

### Border Radius Scale

| Token        | Value     | Usage                                |
|--------------|-----------|--------------------------------------|
| sm           | 4px       | Checkbox corners                     |
| md           | 5px       | Tree-list item selection, tag badges |
| lg           | 10px      | Input fields, cards, sidebar items   |
| xl           | 14px      | Profile bar wrapper                  |
| 2xl          | 20px      | Logo container pill                  |
| full / pill  | 100px     | Avatar circles, icon containers      |
| button       | 1000px    | Fully-rounded pill buttons           |

### Fixed Component Sizes

| Component                | Width      | Height   | Notes                              |
|--------------------------|------------|----------|------------------------------------|
| Side Menu (collapsed)    | 60px       | 100vh    | Icon-only mode                     |
| Side Menu (expanded)     | 298px      | 100vh    | Full labels + icons                |
| Top Header Bar           | full-width | ~80px    | 10px padding, breadcrumb + profile |
| Search Input (sidebar)   | 250px      | 42px     | Rounded, with icon                 |
| Dropdown Input           | 200px      | 32px     | Standard form field                |
| Icon (sidebar nav)       | 24px       | 24px     | Standard nav icon                  |
| Icon (action toolbar)    | 20px       | 20px     | Add/Edit/Delete/Save/Close/Search  |
| Avatar (small/list)      | 26px       | 26px     | Employee list thumbnails           |
| Header Icon Button       | 40px       | 40px     | Circle container, 10px padding     |
| Checkbox                 | 18px       | 18px     | Rounded 4px corners                |

---

## 4. Shadows & Elevation

| Level    | CSS Value                                  | Usage                   |
|----------|--------------------------------------------|-------------------------|
| Level 1  | `1px 1px 8px 0px rgba(191,191,191,0.25)`  | Sidebar panel           |
| Level 2  | `0px 4px 4px 0px rgba(239,239,239,0.4)`   | Action toolbar dock     |
| Card     | `0 1px 3px rgba(0,0,0,.06)`               | Default card shadow     |
| Card Hover | `0 4px 14px rgba(0,0,0,.09)` + `translateY(-1px)` | Hover elevation |
| Modal    | `0 20px 60px rgba(0,0,0,0.15)`            | Modal/popup overlay     |

---

## 5. Icon System

- **Style:** Outline only (stroke, no fill), stroke-width 1.8–2
- **Active:** Tiger Red (`#C10016`) for feature icons
- **Inactive:** Grey (`#9C9C9C`) for inactive nav
- **NO emojis** — they introduce uncontrollable colors and are inconsistent across platforms
- **Naming:** `WP / icons/{style}/{name}` pattern
- **Sizes:** 16px (search), 20px (action toolbar), 24px (sidebar nav), 32px (header utility)
- **Source:** Prefer Lucide (lucide.dev) or similar outline icon set
- **Inline SVG:** `stroke="currentColor"`, `fill="none"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`

---

## 6. Component Patterns

### Side Menu (Navigation Sidebar)

**Collapsed (60px):** White bg, full-height, icon-only. Active = Tiger Red icon tint. Shadow Level 1.

**Expanded (298px):** White bg. Logo (~147x50) + search bar (250x42, `#F5F5F5` fill, `rounded-[10px]`). Nav items: icon (24px) + label (12px Poppins) + optional chevron. Active text: Tiger Red. Items gap: 20px vertical. Padding: 24px horizontal.

**Key rule:** White sidebar with subtle border/shadow. NOT dark navy. This was a v1 mistake — never repeat.

### Top Header Bar

Full-width flex row, `padding: 10px`. Left: Breadcrumb (14px Poppins Medium), active in Tiger Red. Right: Profile icons in 40px white circles, 20px gap. Language toggle (TH/EN).

### Cards

White bg, 1px `#E8E8E8` border, `rounded-[10px]`, 10px padding. Shadow: Card level. Hover: Card Hover level.

### Buttons

Primary = `#2563EB` bg + white text, pill-shaped (`rounded-[1000px]`). Secondary = white bg + Tiger Red text + Tiger Red border.

### Action Toolbar

White container, Shadow Level 2, `rounded-[10px]`, 16px h-padding, 10px v-padding. Row of 20px outline icons, 24px gap. Actions: Add, Edit, Delete, Save, Close, Search.

### Input / Dropdown Field

Background: `#F0F0F0`. Border: `1px solid #F0F0F0`. Radius: `10px`. Padding: `12px`. Placeholder: `#BFBFBF`, 14px Poppins. Size: 200x32px.

### Checkbox

18x18px, radius 4px. Unselected: white + `#E6E6E6` border. Selected: Tiger Red fill + white check.

### Badges / Status Tags

Background: status background color (e.g., `#F0FDF4` for good). Text: status dark color (e.g., `#16A34A`). Font: 11px SemiBold (600). Padding: `2px 8px`. Border radius: `16px` (full pill).

### Modals / Popups

Overlay: `rgba(0,0,0,0.5)`. Background: `#FFFFFF`. Border radius: `12px`. Shadow: Modal level. Max width: 700–800px (detail), 500px (confirmation). Padding: `24px`. Close: top-right `×`, `#9C9C9C`, hover `#3A3A3A`. Animation: fade-in overlay + scale content (`scale(0.95)` → `scale(1)`).

**Rule:** Use modals for drill-down detail views, NOT side panels. Side panels compete with main content.

---

## 7. Layout System

### Page Structure

```
+----------------------------------------------+
| +------+ +----------------------------------+|
| | Side | | Top Header (breadcrumb + profile) ||
| | Menu | +----------------------------------+|
| |      | | Sub-nav / Action Toolbar          ||
| | 60px | +----------------------------------+|
| |  or  | |                                   ||
| |298px | | Content Area                      ||
| |      | | (cards, tables, forms)            ||
| +------+ +----------------------------------+|
+----------------------------------------------+
```

- **Canvas:** 1440px design width (desktop-first)
- **Content Area:** `flex: 1`, fills remaining width
- **Content padding:** 10px all around
- **Section gaps:** 10px between stacked sections
- **Form layouts:** Label (120px fixed) + Input (200px), ~58px row spacing

---

## 8. Data Visualization

### Chart Styling

| Property | Value |
|----------|-------|
| Chart background | transparent (inherits card white) |
| Grid lines | `#E8E8E8`, 1px, dashed or solid |
| Axis labels | 11px, `#9C9C9C`, Poppins |
| Data line width | 2–2.5px |
| Data point radius | 3–4px (with 6px on hover) |
| Tooltip | White bg, `#E8E8E8` border, 8px radius, small shadow |

### Ring Chart (Overall Score)

Do NOT use Chart.js doughnut — it creates broken/split segments. Use Canvas 2D API:

```javascript
const ctx = canvas.getContext('2d');
const grad = ctx.createLinearGradient(0, 0, w, h);
grad.addColorStop(0, '#22C55E');
grad.addColorStop(0.5, '#16A34A');
grad.addColorStop(1, '#15803D');

// Background track
ctx.beginPath();
ctx.arc(cx, cy, radius, 0, Math.PI * 2);
ctx.strokeStyle = '#ECECEC';
ctx.lineWidth = lineWidth;
ctx.lineCap = 'round';
ctx.stroke();

// Score arc — gradient WITHIN the stroke
ctx.beginPath();
ctx.arc(cx, cy, radius, startAngle, endAngle);
ctx.strokeStyle = grad;
ctx.lineWidth = lineWidth;
ctx.lineCap = 'round';
ctx.stroke();
```

### Range Bars (Whoop-style)

Horizontal segmented bars showing where a value falls within metric ranges:
- Each segment = one range zone (e.g., "Low", "Normal", "High", "Critical")
- Segment fill = transparent status color with gradient (see transparency rules in §1)
- Value marker = white downward-pointing triangle (`border-top-color: {statusHex}`)
- Range labels = below each segment, 10–11px, `#9C9C9C`

### Historical Trend Charts

- Use Chart.js with `chartjs-plugin-annotation`
- Background range zones = box annotations with `backgroundColor: '{statusHex}15'` (very subtle)
- Each data point individually colored by its status at that time
- Always show range zone annotations — never display a bare line chart

### Data Visualization Rules

- **Bidirectional ranges are mandatory** — every metric must define both "too low" AND "too high"
- **No category-specific colors** — use only the 4-tier status palette across all categories
- **Chart.js CDN may fail** in sandboxed environments — have a fallback to embed inline

---

## 9. Interaction Patterns

### Hover States

| Element | Hover Effect |
|---------|-------------|
| Cards | Lift (`translateY(-1px)`) + deeper shadow (Card Hover level) |
| Primary buttons | Darken background |
| Secondary buttons | Add `#FEF2F2` tint |
| Nav icons | Color shift to `#C10016` |
| Links | Underline or color shift |
| Table rows | `#F6F6F6` background |

### Transitions

- Default: `all 0.2s ease`
- Cards: `box-shadow 0.2s ease, transform 0.2s ease`
- Modals: fade-in overlay + scale-up content (`scale(0.95)` → `scale(1)`)

### Scroll Behavior

- Sidebar: fixed, does not scroll with content
- Topbar: sticky, remains at top of content area
- Content area: scrolls naturally
- Modals: body scroll locked when open

---

## 10. Bilingual Support (TH/EN)

- All screens have Thai and English variants
- Font stacks always include both Poppins (EN) and Noto Sans Thai (TH)
- Language toggle in top-right header bar (pill buttons)
- Thai text uses Noto Sans Thai at matching weight/size to Poppins

### i18n Pattern

```javascript
const lang = { en: { /* ... */ }, th: { /* ... */ } };
let curLang = 'en';

function t(path) {
  return path.split('.').reduce((o, k) => o?.[k], lang[curLang]) || path;
}
```

### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 11. Design Principles

1. **Clean and light** — White backgrounds, minimal shadows, generous whitespace
2. **Red as accent only** — Tiger Red for active states and CTAs, never for large area backgrounds
3. **Consistent iconography** — Outline icons only, consistent stroke width. No emojis.
4. **Information hierarchy** — Font weight and size drive hierarchy, not color overload
5. **Professional tone** — Corporate SaaS aesthetic, not consumer/playful
6. **Bilingual** — All user-facing text supports EN and TH
7. **Mobile-first for employee-facing** — 60%+ Thai workers interact from mobile. Progressive disclosure for power users.
8. **Design for the least technical user** — HR coordinators at Thai manufacturing companies who use LINE and spreadsheets.

---

## 12. Known Gotchas — DO NOT Repeat

### Dashboard / Visualization
- **Chart.js doughnut for ring charts:** Creates broken segments. Use Canvas 2D `arc()` with `lineCap:'round'` for continuous arcs
- **Unidirectional ranges:** Every metric MUST have BOTH upper AND lower danger bounds. 0 BP = dead. 0% attrition = toxic retention.
- **Emojis as icons:** NO. Uncontrollable colors. Use outline SVG icons only.
- **Per-category colors:** Don't. Use status-only colors (good/okay/attention/risk).
- **Side panel for detail views:** Use popup modals, not persistent side panels.
- **Missing range zones on charts:** Historical trend charts must show colored range zone annotations as background.

### Design System
- **Dark sidebar:** TigerSoft uses WHITE sidebar with subtle borders, NOT dark navy.
- **Ring gradient location:** Gradient goes WITHIN the ring stroke, not as background behind it.
- **Font weight hierarchy:** Use weight and size for hierarchy, not color overload.

### Design System
- **Primary button color confusion:** Primary CTA buttons are Blue (`#2563EB`). Tiger Red is for nav/brand accents, NOT primary CTAs.

### Technical
- **Chart.js CDN in sandboxed environments:** May not work. Embed Chart.js inline when needed.
- **JavaScript apostrophes:** Use backtick template literals for strings with English contractions.
- **HTML script ordering:** Body DOM elements MUST appear BEFORE `<script>` tags. Chart.js before app script.

---

## CSS Custom Properties

```css
:root {
  /* Brand */
  --tiger-red: #C10016;
  --tiger-red-light: #FEF2F2;
  --tiger-red-hover: #A30013;

  /* Neutrals */
  --text-primary: #3A3A3A;
  --text-secondary: #9C9C9C;
  --text-tertiary: #BFBFBF;
  --border: #E8E8E8;
  --border-hover: #E6E6E6;
  --bg-page: #FAFAFA;
  --bg-card: #FFFFFF;
  --bg-input: #F0F0F0;
  --bg-search: #F5F5F5;
  --bg-list-hover: #F6F6F6;
  --bg-badge: #EFEFEF;

  /* Status */
  --status-good: #16A34A;
  --status-good-light: #22C55E;
  --status-good-bg: #F0FDF4;
  --status-okay: #CA8A04;
  --status-okay-light: #EAB308;
  --status-okay-bg: #FEFCE8;
  --status-attention: #EA580C;
  --status-attention-light: #F97316;
  --status-attention-bg: #FFF7ED;
  --status-risk: #DC2626;
  --status-risk-light: #EF4444;
  --status-risk-bg: #FEF2F2;

  /* Semantic */
  --primary-blue-600: #2563EB;

  /* Shadows */
  --shadow-sidebar: 1px 1px 8px 0px rgba(191,191,191,0.25);
  --shadow-dock: 0px 4px 4px 0px rgba(239,239,239,0.4);
  --shadow-card: 0 1px 3px rgba(0,0,0,.06);
  --shadow-card-hover: 0 4px 14px rgba(0,0,0,.09);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.15);

  /* Spacing */
  --space-xs: 2px;
  --space-sm: 4px;
  --space-md: 6px;
  --space-base: 10px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 5px;
  --radius-lg: 10px;
  --radius-xl: 14px;
  --radius-2xl: 20px;
  --radius-full: 100px;
  --radius-button: 1000px;
}
```

### CSS Reset Baseline

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Poppins', 'Noto Sans Thai', sans-serif;
  background: var(--bg-page);
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```
