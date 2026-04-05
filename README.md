# My Portfolio

A modern personal portfolio built with **Next.js 14** (App Router), **Tailwind CSS**, and animated mesh gradient background.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main portfolio page
├── components/
│   ├── layout/
│   │   └── Navbar.tsx      # Navigation bar
│   ├── sections/
│   │   ├── hero/
│   │   │   └── Hero.tsx    # Hero section
│   │   ├── about/
│   │   │   └── About.tsx   # About section
│   │   ├── skills/
│   │   │   └── Skills.tsx  # Skills section
│   │   ├── projects/
│   │   │   └── Projects.tsx # Projects section
│   │   └── contact/
│   │       └── Contact.tsx # Contact section
│   └── ui/
│       └── MeshGradientBackground.tsx # Animated background
├── lib/
│   └── utils.ts            # Utility functions (cn)
├── styles/
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .eslintrc.json
└── README.md
```

## Features

- ✨ Animated mesh gradient background with smooth animations
- 🎨 Dark theme with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 (App Router)
- 🧩 Modular component structure
- ♿ Accessible navigation
- 🔍 SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Adding New Content

Each section is located in its own directory for easy editing:

- **Hero**: `components/sections/hero/Hero.tsx`
- **About**: `components/sections/about/About.tsx`
- **Skills**: `components/sections/skills/Skills.tsx`
- **Projects**: `components/sections/projects/Projects.tsx`
- **Contact**: `components/sections/contact/Contact.tsx`

Update the components with your content, and they'll automatically appear on the page.

### Customizing the Background

The mesh gradient background can be customized in `app/page.tsx`:

```tsx
<MeshGradientBackground
  colors={["#7c3aed", "#2563eb", "#06b6d4", "#8b5cf6"]}
  speed={1}
  backgroundColor="#030014"
>
  {/* content */}
</MeshGradientBackground>
```

### Styling

All styles use Tailwind CSS. Global styles are in `styles/globals.css`.

## Build & Deploy

Build for production:

```bash
npm run build
npm start
```

The project is ready to deploy to Vercel, Netlify, or any Next.js-compatible hosting.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **clsx & tailwind-merge** - Utility functions for className management

## License

MIT

## Getting Help

For questions or issues, feel free to create an issue or check the [Next.js documentation](https://nextjs.org/docs).
