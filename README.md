# David Baraka Portfolio

## Social Media & Content Manager Portfolio

### Local Development
Simply open `index.html` in your browser or use a local server:
```bash
npx serve .
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

Or deploy via Git:
1. Push this folder to a Git repository
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel will auto-detect the static site and deploy

### File Structure
```
├── index.html          # Main HTML file
├── style.css           # All styles
├── script.js           # All JavaScript
├── vercel.json         # Vercel deployment config
├── assets/
│   ├── images/
│   │   ├── profile.jpg         # Hero profile image
│   │   ├── about.jpg           # About section image
│   │   ├── portfolio-1.jpg   # Portfolio item 1
│   │   ├── portfolio-2.jpg   # Portfolio item 2
│   │   ├── portfolio-3.jpg   # Portfolio item 3
│   │   ├── portfolio-4.jpg   # Portfolio item 4
│   │   ├── portfolio-5.jpg   # Portfolio item 5
│   │   ├── portfolio-6.jpg   # Portfolio item 6
│   │   ├── brand-wendo.jpg   # Wendo Dresses logo
│   │   ├── brand-tatu.jpg    # Tatu Ankara logo
│   │   ├── brand-maseno.jpg  # Maseno Fashion logo
│   │   └── og-image.jpg      # Social sharing image
│   └── icons/              # (for future custom icons)
```

### Features
- Dark/Light theme toggle
- Responsive design (mobile, tablet, desktop)
- Animated counters, skill bars, typing effect
- Portfolio filtering with lightbox
- Contact form with validation
- SEO optimized with meta tags and structured data
- Accessibility friendly (ARIA labels, keyboard nav)
