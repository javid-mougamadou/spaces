import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import appsData from '../apps.json';
import { App } from '../types';

function SEOHead() {
  const location = useLocation();
  const apps = appsData as App[];
  const baseUrl = 'https://javid-space.cloud';

  useEffect(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const viewMode = searchParams.get('view');

    const updateOrCreateMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty 
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', nameOrProperty);
        } else {
          meta.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateOrCreateLink = (rel: string, href: string, type?: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        if (type) {
          link.setAttribute('type', type);
        }
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    if (path.startsWith('/apps/')) {
      const slug = path.split('/apps/')[1]?.split('?')[0];
      const app = apps.find((a) => a.slug === slug);

      if (app) {
        const fullUrl = `${baseUrl}${path}`;
        const isIframe = viewMode === 'iframe';
        
        const enhancedDescription = `${app.description} Application développée par Javid Mougamadou. Découvrez cette application et d'autres outils pratiques sur Javid Spaces.`;

        document.title = isIframe 
          ? `${app.name} - Javid Spaces`
          : `${app.name} - Application par Javid Mougamadou | Javid Spaces`;

        updateOrCreateMeta('description', enhancedDescription);

        const keywords = [
          app.name,
          'Javid Mougamadou',
          'Javid Spaces',
          'application web',
          'PWA',
          'application gratuite',
          'applications Javid Mougamadou',
          'développeur web',
          'développeur fullstack',
          ...app.description.split(' ').slice(0, 5)
        ].join(', ');
        updateOrCreateMeta('keywords', keywords);

        updateOrCreateMeta('og:title', `${app.name} - Javid Spaces`, true);
        updateOrCreateMeta('og:description', enhancedDescription, true);
        updateOrCreateMeta('og:url', fullUrl, true);
        updateOrCreateMeta('og:image', app.background_image, true);
        updateOrCreateMeta('og:type', 'website', true);
        updateOrCreateMeta('og:locale', 'fr_FR', true);

        updateOrCreateMeta('twitter:card', 'summary_large_image', true);
        updateOrCreateMeta('twitter:title', `${app.name} - Javid Spaces`, true);
        updateOrCreateMeta('twitter:description', enhancedDescription, true);
        updateOrCreateMeta('twitter:image', app.background_image, true);

        updateOrCreateLink('canonical', fullUrl);

        updateOrCreateMeta('application-url', app.url);
        
        let alternateLink = document.querySelector('link[rel="alternate"][type="application"]');
        if (!alternateLink) {
          alternateLink = document.createElement('link');
          alternateLink.setAttribute('rel', 'alternate');
          alternateLink.setAttribute('type', 'application');
          document.head.appendChild(alternateLink);
        }
        alternateLink.setAttribute('href', app.url);

        let existingScript = document.getElementById('app-structured-data');
        if (existingScript) {
          existingScript.remove();
        }

        const structuredData = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": app.name,
          "description": app.description,
          "url": app.url,
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "softwareVersion": "1.0",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
          },
          "author": {
            "@type": "Person",
            "name": "Javid Mougamadou",
            "url": "https://javid-mougamadou.pro/"
          },
          "image": app.background_image,
          "screenshot": app.background_image,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "1"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
          }
        };

        const script = document.createElement('script');
        script.id = 'app-structured-data';
        script.setAttribute('type', 'application/ld+json');
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        let breadcrumbScript = document.getElementById('breadcrumb-schema') as HTMLScriptElement | null;
        if (!breadcrumbScript) {
          breadcrumbScript = document.createElement('script');
          breadcrumbScript.id = 'breadcrumb-schema';
          breadcrumbScript.setAttribute('type', 'application/ld+json');
          document.head.appendChild(breadcrumbScript);
        }

        const breadcrumbData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": `${baseUrl}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Applications",
              "item": `${baseUrl}/apps`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": app.name,
              "item": fullUrl
            }
          ]
        };

        breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      }
    } else {
      document.title = 'Javid Spaces - Applications développées par Javid Mougamadou';
      updateOrCreateMeta('description', 
        'Collection d\'applications web développées par Javid Mougamadou. Applications pratiques pour simplifier votre quotidien : gestion de finances, productivité, outils développeur et plus encore.'
      );
      const homeKeywords = [
        'Javid Mougamadou',
        'Javid Spaces',
        'applications web',
        'PWA',
        'applications pratiques',
        'outils développeur',
        'productivité',
        'applications gratuites',
        'web apps',
        'React',
        'Django',
        'développeur fullstack',
        'développeur web',
        'applications Javid Mougamadou'
      ].join(', ');
      updateOrCreateMeta('keywords', homeKeywords);
      updateOrCreateLink('canonical', `${baseUrl}/`);
    }
  }, [location, apps, baseUrl]);

  return null;
}

export default SEOHead;

