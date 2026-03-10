import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apps = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/apps.json'), 'utf8'));
const baseUrl = 'https://javid-space.cloud';
const today = new Date().toISOString().split('T')[0];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
  
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

apps.forEach(app => {
  const imageTitle = `${app.name} - Application par Javid Mougamadou, Javid Spaces`;
  const imageCaption = `${app.name}. Application développée par Javid Mougamadou. Javid Spaces - applications web Javid Mougamadou.`;
  sitemap += `  <url>
    <loc>${baseUrl}/apps/${app.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(app.background_image)}</image:loc>
      <image:title>${escapeXml(imageTitle)}</image:title>
      <image:caption>${escapeXml(imageCaption)}</image:caption>
    </image:image>
  </url>
`;
});

sitemap += '</urlset>\n';

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${apps.length + 1} URLs`);
