# Vista and Void - Astrophotography Team Blog

A team astrophotography portfolio and blog built with Astro, featuring automatic EXIF extraction and auto-discovery of photo projects.

## Features

- 📸 **Auto-Discovering Portfolio**: Projects automatically discovered from photos
- 📝 **Blog**: Markdown-based blog posts with full formatting support
- 🎨 **Minimalist Design**: Clean, distraction-free presentation
- 📊 **EXIF Data**: Automatic extraction and display with rating-based cover selection
- 🚀 **Performance**: Static site generation with optimized images
- 🐳 **Docker Ready**: Production deployment with Docker + nginx

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:4321
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Photo Storage
```
src/content/photos/        # Photo projects with images and metadata
├── Nebulae/               # Auto-discovered as project
│   ├── project.md         # Project metadata
│   ├── orion-nebula.jpg
│   └── crab-nebula.jpg
├── Galaxies/
│   ├── project.md
│   ├── andromeda.jpg
│   └── whirlpool.jpg
├── StarTrails/
│   ├── project.md
│   └── desert-trails.jpg
└── DeepSky/
    └── Messier/           # Nested folders = separate projects
        ├── project.md
        └── m31.jpg
```

## Project Behavior

### Without Metadata
Projects automatically work with:
- **Title**: Auto-generated from folder name ("nebulae" → "Nebulae")
- **Cover**: Highest EXIF-rated photo, then first alphabetically  
- **Date**: Newest photo's EXIF date
- **Description**: None
- **Featured**: No (won't show on homepage)

### With Metadata
Override any auto-generated values in `project.md`:
```yaml
---
title: "Orion Nebula"
description: "Deep sky captures of the Orion constellation"
date: 2024-01-01
featured: true           # Show on homepage
coverImage: "orion-nebula.jpg"  # Override auto-selection
exifDisplay: "on"
---

Additional markdown content here...
```

## Adding Content

### New Photo Project
1. Create a folder in `src/content/photos/`
2. Add your images (`.jpg`, `.jpeg`)
3. Optionally add a `project.md` for metadata
4. **Done!** Project appears automatically

### Featured Project
```bash
mkdir -p src/content/photos/andromeda-galaxy
cat > src/content/photos/andromeda-galaxy/project.md << EOF
---
title: "Andromeda Galaxy"
description: "M31 - Our nearest spiral galaxy neighbor"
date: 2024-12-09
featured: true
---
EOF
# Add your images to the folder
```

### Blog Post
```bash
# Create: src/content/blog/my-post.md
---
title: "Post Title"
description: "Post description"
pubDate: 2024-12-09
author: "Vista and Void Team"
tags: ["astrophotography"]
---

Your content here...
```

## Configuration

### EXIF Display
Edit `src/config/exif.ts`:
```typescript
export const exifConfig = {
  defaultDisplay: true,
  defaultFields: ['model', 'lens', 'focalLength', 'fNumber', 'exposureTime', 'iso'],
  // ...
};
```

### Site Settings
Edit `astro.config.mjs`:
```javascript
export default defineConfig({
  site: "https://vistaandvoid.com",
  // ...
});
```

## Deployment

### Docker
```bash
# Build image
docker build -t vista-and-void .

# Run container
docker run -p 80:80 vista-and-void
```

### Static Hosting
Deploy the `dist/` directory to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Project Structure

```
/
├── src/
│   ├── content/
│   │   ├── photos/        # Photo projects with images
│   │   └── blog/          # Blog posts
│   ├── components/        # UI components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes
│   ├── utils/             # EXIF extraction, project discovery
│   └── config/            # Configuration
├── scripts/               # Helper scripts
├── public/                # Static assets
└── astro.config.mjs       # Astro configuration
```

## Tech Stack

- **Framework**: [Astro 5](https://astro.build)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **EXIF**: [exifr](https://www.npmjs.com/package/exifr)
- **Deployment**: Docker + nginx
- **Content**: Markdown with frontmatter

## Key Features Explained

### Auto-Discovery
- Every folder in `photos/` becomes a project
- Nested folders = separate projects (`DeepSky/Messier` is different from `DeepSky`)
- No manual configuration required

### Cover Image Selection
1. Manual: `coverImage` in project.md
2. Automatic: Highest EXIF Rating
3. Fallback: First alphabetically

### EXIF Display Cascade
1. Project-level: `exifDisplay` in project.md
2. Global: `defaultDisplay` in src/config/exif.ts

### Featured Projects
- Requires metadata file with `featured: true`
- Shows on homepage (up to 3 projects)
- All other projects visible on /portfolio

## Development

```bash
# Start dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Type check
npm run astro check
```

## License

© 2024 Vista and Void. All rights reserved.
