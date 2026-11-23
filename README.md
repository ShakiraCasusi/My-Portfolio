# Shakira Angela | Portfolio

A modern personal portfolio built with **Next.js 14** (App Router), **Tailwind CSS**, **TypeScript**, and React Three Fiber for interactive 3D elements. Single-language (English) deployment optimized for Vercel.

## Features

- ✨ Interactive 3D animations (Aurora effect, Lanyard model)
- 🎨 Dark theme with Tailwind CSS and custom animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Built with Next.js 14 App Router (no locale routing)
- 🧩 Modular component structure
- ♿ Accessible navigation and UI
- 🔍 SEO optimized with metadata
- 📧 Contact form with Resend email integration
- 🚀 Production-ready for Vercel deployment

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Main portfolio page
│   ├── not-found.tsx                 # 404 page
│   └── api/
│       └── send-email/
│           └── route.ts              # Email API endpoint (Resend)
├── components/
│   ├── layout/
│   │   └── Navbar.tsx                # Navigation bar
│   ├── sections/
│   │   ├── hero/
│   │   │   ├── Hero.tsx              # Hero section with profile card
│   │   │   └── HeroHelpers.tsx       # Typing effect, scrolling text
│   │   ├── about/
│   │   │   ├── About.tsx             # About section with 3D Lanyard
│   │   │   ├── Certifications.tsx    # Certifications display
│   │   │   └── Lanyard.tsx           # 3D Lanyard model
│   │   ├── skills/
│   │   │   ├── Skills.tsx            # Creative and technology skills
│   │   │   └── Skills.module.css     # Skill icon tooltips and layout
│   │   ├── projects/
│   │   │   ├── Projects.tsx          # Projects gallery
│   │   │   └── Projects.css          # Project styles
│   │   ├── contact/
│   │   │   ├── Contact.tsx           # Contact form section
│   │   │   └── Contact.css           # Contact styles
│   ├── ui/
│   │   ├── Aurora.tsx                # Animated gradient background
│   │   └── ProfileCard.tsx           # Profile card component
├── lib/
│   └── utils.ts                      # Utility functions (cn)
├── styles/
│   └── globals.css                   # Global styles
├── public/
│   ├── assets/                       # 3D models and assets
│   └── pictures/                     # Portfolio images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── .eslintrc.json
├── components.json                   # Shadcn/ui config
└── README.md
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + PostCSS
- **3D Graphics**: React Three Fiber, Three.js, OGL
- **Icons**: React Icons (lucide-react, radix-ui)
- **Email Service**: Resend API
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd portfolio

# Install dependencies
npm install

# Create .env.local with required variables
cp .env.example .env.local
```

### Local Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Check for lint errors
npm run lint

# Build the application
npm run build

# Start production server (local)
npm run start
```

## Environment Variables

### Required for Email Functionality (Production)

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Key (from https://resend.com)
# Required for contact form to work
RESEND_API_KEY=re_your_api_key_here

# Recipient email address for contact form submissions
# Where portfolio owner receives contact messages
CONTACT_TO_EMAIL=your-email@example.com

# (Optional) Sender email address for contact form
# Must be verified in Resend dashboard if not using default
CONTACT_FROM_EMAIL=noreply@yourdomain.com
```

### Getting Resend API Key

1. Visit [resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys in the dashboard
4. Copy your API key and add to `.env.local`
5. Verify your email domain in Resend dashboard

## Vercel Deployment Checklist

### Pre-Deployment Steps

- [x] Remove all internationalization (i18n) setup
- [x] Use standard App Router routing (no locale prefixes)
- [x] Implement email API with Resend
- [x] Create `.env.example` with required variables
- [x] Update README with deployment instructions
- [x] Run `npm run lint` (all checks pass)
- [x] Run `npm run build` (no errors)
- [x] Test locally: `npm run dev` and `npm run start`

### Deployment to Vercel

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Finalize for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the project folder (if monorepo)

3. **Set Environment Variables**
   - In Vercel dashboard: **Settings → Environment Variables**
   - Add the following variables:
     - `RESEND_API_KEY` → Your Resend API key
     - `CONTACT_TO_EMAIL` → Your email address
     - `CONTACT_FROM_EMAIL` → (Optional) Your verified sender email
   
   **Note**: Environment variables are automatically available to the Next.js app at build time and runtime.

4. **Deploy**
   - Click "Deploy" button
   - Vercel will automatically:
     - Install dependencies
     - Run build (`npm run build`)
     - Deploy to production
     - Provide deployment URL

5. **Post-Deployment**
   - Test contact form functionality
   - Verify all sections load correctly
   - Check responsive design on mobile
   - Monitor deployment logs for errors

### Production Considerations

- **Email Domain**: For production Resend emails, verify your domain in Resend dashboard
- **CORS**: Contact form is server-to-server (no CORS issues)
- **Rate Limiting**: Consider implementing rate limiting on `/api/send-email` if needed
- **Error Handling**: Contact form returns user-friendly error messages
- **Security**: Environment variables are never exposed to the client

### Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| Contact form returns 500 error | Verify `RESEND_API_KEY` is set in Vercel Environment Variables |
| Email not sending | Check `CONTACT_TO_EMAIL` is set and valid |
| Build fails | Run `npm run lint` and `npm run build` locally to identify issues |
| Styling looks broken | Clear Vercel cache in deployment settings |

## Scripts

```bash
# Development
npm run dev              # Start development server (localhost:3000)

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint to check code quality
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact Form Flow

1. User fills contact form on portfolio
2. Form data sent to `/api/send-email/route.ts`
3. Server validates input (name, email, message)
4. Server calls Resend API with environment variables
5. Email sent to `CONTACT_TO_EMAIL`
6. User receives success/error message
7. Success: Form clears, user sees "Message sent successfully!"
8. Error: User sees "Error sending message. Please try again."

## Performance Optimizations

- Dynamic imports for 3D components (Lanyard)
- Image optimization with Next.js Image component
- CSS-in-JS for animations (no animation libraries)
- Tailwind CSS purging unused styles
- Tree-shaking for unused code

## Security

- All sensitive data (API keys) stored in environment variables
- No API keys exposed to client-side code
- Email validation on both client and server
- Rate limiting recommended for production email endpoint
- Next.js built-in XSS protection

## License

This project is personal and not publicly licensed. All rights reserved.

## Author

**Shakira Angela Agudo Casusi**
- Developer & Designer
- Portfolio: `https://yourdeployedurl.vercel.app`
- Email: casusishakira28@gmail.com

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
