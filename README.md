<div align="center">

# ✦ Purva Gupta — Portfolio

**A calm, considered personal portfolio.**
Moonlight lavender, soft aurora light, and a quiet piece of 3D.

<br/>

![React](https://img.shields.io/badge/React-19-D3D3FF?style=for-the-badge&logo=react&logoColor=12121D&labelColor=161622)
![Vite](https://img.shields.io/badge/Vite-7-EFC3E4?style=for-the-badge&logo=vite&logoColor=12121D&labelColor=161622)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-A9A2FA?style=for-the-badge&logo=tailwindcss&logoColor=12121D&labelColor=161622)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-E8CFB5?style=for-the-badge&logo=framer&logoColor=12121D&labelColor=161622)
![Three.js](https://img.shields.io/badge/Three.js-R3F-D3D3FF?style=for-the-badge&logo=threedotjs&logoColor=12121D&labelColor=161622)

</div>

<br/>

---

## ⟡ What this is

A single-page portfolio for **Purva Gupta** — a Computer Science undergraduate at Chitkara
University working across the MERN stack, Java, SQL and DSA.

The brief was simple to say and hard to do: build something that looks like it came out of a
design studio, not out of a template. So the whole thing is built around one idea —
**restraint**. A dark lavender canvas, one serif italic used sparingly as an accent, generous
whitespace, and motion that supports the content instead of competing with it.

Every section earns its place. Nothing blinks, spins or slides just because it can.

<br/>

## ⟡ Features

### Interface

| | |
|---|---|
| **Curtain loader** | The name rises letter-by-letter over a progress line, then the panel lifts away |
| **Custom cursor** | A crisp dot, a lagging ring that swells over interactive targets, and a soft ambient light that drifts behind the content |
| **Aurora background** | Three blurred gradient blobs drifting on independent timings — lavender, rose and sand |
| **Scroll progress** | A hairline gradient bar across the top, spring-smoothed |
| **Magnetic buttons** | Primary actions lean gently toward the pointer |
| **Spotlight cards** | Every card carries an inner radial glow that tracks the mouse |
| **Active-section nav** | A glass pill with a spring-animated indicator that follows the section you're reading |
| **Full-screen mobile menu** | Oversized serif links, staggered in, with socials and résumé pinned to the base |

### The 3D

A distorted icosahedron rendered with **React Three Fiber**, lit by three coloured directional
lights drawn from the site palette. It leans toward your cursor with heavy damping so it
never feels twitchy, and it floats on a slow idle drift.

It is also deliberately well-behaved:

- The entire WebGL bundle is **lazy-loaded** and only mounts once the browser is idle
- The render loop **pauses completely** when the hero scrolls out of view
- Per-frame rotation is **delta-clamped**, so resuming after a pause can never produce a catch-up spin
- A static CSS glow stands in while it loads, and for reduced-motion users it never mounts at all

### Content sections

`Hero` → `Ticker` → `About` → `Skills` → `Work` → `Journey` → `Milestones` → `Contact`

- **About** — a bento grid mixing a bio panel, stat cards and a live IST clock
- **Skills** — five accent-coloured category cards, each with tinted, icon-led pills
- **Work** — project cards with a serif watermark numeral and stack chips
- **Journey** — a chronological timeline whose gradient rail draws itself as you scroll
- **Milestones** — counters that animate up on reveal, plus certifications
- **Contact** — one-tap copy buttons for email and phone with an animated check state

<br/>

## ⟡ Design system

Dark-only, built on a lavender-and-moonlight palette with warm sand and rose as counterweights.

| Token | Value | Role |
|---|---|---|
| `bg` | `#0C0C14` | Page canvas |
| `surface` | `#12121D` | Raised sections |
| `card` | `#161622` | Card fill |
| `raised` | `#1D1D2E` | Highest surface |
| `lav` | `#D3D3FF` | Primary accent |
| `iris` | `#A9A2FA` | Secondary accent |
| `rose` | `#EFC3E4` | Warm accent |
| `sand` | `#E8CFB5` | Tertiary accent |
| `snow` | `#EFEEF8` | Headings |
| `fog` | `#AAA8C5` | Body copy |
| `mist` | `#8A8AA8` | Muted / meta |
| `ink` | `#14142B` | Text on light fills |

**Type** — three families, each with one job:

- **Manrope** — all UI and headings, tight tracking at display sizes
- **Instrument Serif** *(italic)* — accent words only, never full sentences
- **JetBrains Mono** — eyebrows, counts, timestamps and metadata

Design tokens live as CSS custom properties in a Tailwind v4 `@theme` block, so
`bg-card`, `text-lav` and friends are generated straight from the palette above.

<br/>

## ⟡ Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 19** | Component model, hooks, mature ecosystem |
| Build | **Vite 7** | Instant HMR, ESM-native, tiny config |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` tokens, no config file needed |
| Motion | **Framer Motion 12** | Declarative variants, `whileInView`, layout animations |
| 3D | **React Three Fiber 9** + **drei 10** | Three.js as JSX, with ready-made helpers |
| Icons | **react-icons 5** | Tree-shaken, one consistent API |
| Linting | **ESLint 9** flat config | React Hooks + Refresh rules |

<br/>

## ⟡ Architecture

```
src/
├── App.jsx                  # Composition root, loader state, ambient background
├── main.jsx                 # Entry point
├── index.css                # @theme tokens, utilities, keyframes
│
├── data/
│   └── profile.js           # ← Single source of truth for ALL content
│
├── context/
│   └── SmoothScroll.jsx     # Scroll provider (reduced-motion aware)
│
└── components/
    ├── sections/            # Page sections, in render order
    │   ├── Navbar.jsx       Hero.jsx        Ticker.jsx
    │   ├── About.jsx        Skills.jsx      Projects.jsx
    │   └── Journey.jsx      Achievements.jsx Contact.jsx  Footer.jsx
    │
    ├── three/
    │   └── HeroScene.jsx    # Lazy-loaded WebGL canvas
    │
    └── ui/                  # Reusable primitives
        ├── Reveal.jsx       # Reveal / Stagger / StaggerItem
        ├── GlowCard.jsx     # Pointer-tracking spotlight card
        ├── Magnetic.jsx     # Pointer-attracted wrapper
        ├── SectionHeading.jsx
        ├── Cursor.jsx       Loader.jsx      ScrollProgress.jsx
```

**The one rule that matters:** no copy is hardcoded in a component. Every name, date, bullet,
link and skill lives in [`src/data/profile.js`](src/data/profile.js). Updating the portfolio
means editing one file — sections re-render themselves from the data.

<br/>

## ⟡ How it was made

A few decisions worth explaining, because they're the difference between "looks nice" and
"actually holds up":

**Motion is a system, not a pile of one-offs.**
Three primitives — `Reveal`, `Stagger`, `StaggerItem` — handle every entrance on the site,
all sharing one easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`). That's why scrolling feels
consistent rather than like a tour of different animation libraries.

**Reduced motion is respected properly.**
`<MotionConfig reducedMotion="user">` covers Framer Motion, a CSS media query neutralises
every keyframe, the loader short-circuits, the marquee becomes a static wrapped list, counters
render their final value immediately, and the 3D scene never mounts.

**Smooth scrolling is native — on purpose.**
The build originally used Lenis. During testing it wedged mid-animation and froze *all*
scrolling on the page — wheel, keyboard and nav clicks alike. For a portfolio a recruiter
might open once, that risk isn't worth the polish, so it was replaced with
`scroll-behavior: smooth` plus `scroll-margin-top` on sections. Same feel, zero failure mode.

**The nav is optically centred, not just mathematically.**
Centring the links on the pill's midpoint measured perfectly but *looked* wrong, because the
filled "Résumé" button is far wider than the "P." mark, leaving a lopsided gap. `justify-between`
across three flex children equalises the two gaps instead — which is what the eye actually reads
as centred.

**Performance is designed in, not bolted on.**
Three.js is code-split into its own chunk and lazy-imported behind `requestIdleCallback`, so
first paint never waits on WebGL. Framer Motion is split out too. The initial JS payload is
**~31 KB gzipped**; the 297 KB Three.js chunk only arrives after the page is interactive, and
only for users whose device and motion settings warrant it.

**Accessibility isn't an afterthought.**
Semantic landmarks and a single `<h1>`, a skip link, labelled icon buttons, `aria-current` on
the active nav item, decorative layers hidden with `aria-hidden`, visible focus rings even on a
custom-cursor site, and copy buttons that announce their copied state.

<br/>

## ⟡ Running it

```bash
# install
npm install

# dev server → http://localhost:5173
npm run dev

# production build
npm run build

# preview the build
npm run preview

# lint
npm run lint
```

**Build output**

```
index.html          2.93 kB │ gzip:   1.14 kB
index.css          37.81 kB │ gzip:   7.61 kB
index.js           87.51 kB │ gzip:  31.30 kB   ← initial payload
motion.js         151.88 kB │ gzip:  50.69 kB
three.js        1,071.34 kB │ gzip: 297.09 kB   ← lazy, post-interactive
HeroScene.js        1.38 kB │ gzip:   0.73 kB   ← lazy
```

<br/>

## ⟡ Making it yours

1. Edit **`src/data/profile.js`** — bio, links, skills, projects, timeline, certifications
2. Replace **`public/resume.pdf`**
3. Recolour by changing the `@theme` block at the top of **`src/index.css`**
4. Update the meta tags and JSON-LD `Person` schema in **`index.html`**

<br/>

---

<div align="center">

### Connect

[![Email](https://img.shields.io/badge/Email-D3D3FF?style=for-the-badge&logo=gmail&logoColor=12121D&labelColor=161622)](mailto:purva.gupta1520@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-A9A2FA?style=for-the-badge&logo=github&logoColor=12121D&labelColor=161622)](https://github.com/Purva1520)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-EFC3E4?style=for-the-badge&logo=linkedin&logoColor=12121D&labelColor=161622)](https://www.linkedin.com/in/purva3107)
[![LeetCode](https://img.shields.io/badge/LeetCode-E8CFB5?style=for-the-badge&logo=leetcode&logoColor=12121D&labelColor=161622)](https://leetcode.com/u/Purva3107/)

<br/>

<sub>Designed and built with care · © 2026 Purva Gupta</sub>

</div>
