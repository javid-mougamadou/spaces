# Javid Spaces

A modern Progressive Web App (PWA) showcasing a collection of web applications developed by Javid Mougamadou. Built with React, TypeScript, and Vite, featuring offline support, automatic updates, and comprehensive SEO optimization.

## 🌟 Features

- **Progressive Web App (PWA)**: Full offline support with service worker caching and automatic update notifications
- **SEO Optimized**: Dynamic meta tags, structured data (JSON-LD), sitemap generation, and robots.txt
- **Google Analytics**: Page view and event tracking with react-ga4 (production only)
- **Dark Mode**: Toggle between light and dark themes with persistent user preference
- **Responsive Design**: Mobile-first design with Tailwind CSS and DaisyUI
- **Dynamic Routing**: Individual pages for each application with slug-based URLs
- **Iframe Integration**: View applications directly within the site using iframe mode
- **Modular Architecture**: Reusable components and hooks for maintainability
- **TypeScript**: Full type safety throughout the application

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS, DaisyUI
- **Analytics**: react-ga4 for Google Analytics integration
- **PWA**: Service Worker, Web App Manifest
- **SEO**: Dynamic meta tags, JSON-LD structured data, XML sitemap

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

This will:
- Generate the sitemap automatically
- Build the production-ready application
- Output to the `dist` directory

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Note**: Google Analytics is only initialized in production mode. In development, tracking is disabled.

### Adding Applications

Edit `src/apps.json` to add or modify applications:

```json
{
  "uuid": "unique-uuid",
  "slug": "application-slug",
  "name": "Application Name",
  "description": "Application description",
  "background_image": "https://image-url.com/image.jpg",
  "url": "https://application-url.com"
}
```

### Generating Sitemap

The sitemap is automatically generated during build, or manually:

```bash
npm run generate:sitemap
```

## 📱 PWA Features

- **Offline Support**: The app works offline after the first visit
- **Automatic Updates**: Notifications when new versions are available
- **Installable**: Can be installed as a native app on mobile and desktop
- **Background Sync**: Automatic cache updates in the background

## 🔍 SEO Features

- Dynamic meta tags per application page
- Structured data (Schema.org) for better search engine understanding
- XML sitemap with all application pages
- Robots.txt configuration
- Open Graph and Twitter Card support
- Breadcrumb navigation

## 📄 License

Private project by Javid Mougamadou

## 👤 Author

**Javid Mougamadou**

- Website: [javid-mougamadou.pro](https://javid-mougamadou.pro/)
- Project URL: [javid-space.cloud](https://javid-space.cloud)


