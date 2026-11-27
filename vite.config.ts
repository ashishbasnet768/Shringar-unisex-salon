import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const mapsApiKey =
    env.VITE_GOOGLE_MAPS_API_KEY ||
    env.GOOGLE_MAPS_API_KEY ||
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';

  return {
    publicDir: false,
    plugins: [
      {
        name: 'inject-maps-meta',
        transformIndexHtml(html) {
          if (!mapsApiKey || mapsApiKey === 'MY_GOOGLE_MAPS_API_KEY') {
            return html;
          }
          const safeKey = mapsApiKey.replace(/"/g, '&quot;');
          return html.replace(
            '</head>',
            `    <meta name="google-maps-api-key" content="${safeKey}" />\n  </head>`,
          );
        },
      },
      {
        name: 'serve-public-static-dev',
        configureServer(server) {
          const mimeTypes: Record<string, string> = {
            '.css': 'text/css; charset=utf-8',
            '.js': 'application/javascript; charset=utf-8',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.zip': 'application/zip',
          };
          server.middlewares.use((req, res, next) => {
            const urlPath = (req.url || '').split('?')[0];
            if (!urlPath.startsWith('/public/')) return next();
            const rel = urlPath.slice(1);
            const filePath = path.resolve(__dirname, rel);
            if (!filePath.startsWith(path.resolve(__dirname, 'public')) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
              return next();
            }
            const ext = path.extname(filePath).toLowerCase();
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            fs.createReadStream(filePath).pipe(res);
          });
        },
      },
      {
        name: 'copy-public-dir-to-dist',
        apply: 'build',
        closeBundle() {
          const srcDir = path.resolve(__dirname, 'public');
          const destDir = path.resolve(__dirname, 'dist', 'public');
          for (const sub of ['css', 'js', 'images']) {
            const subSrc = path.join(srcDir, sub);
            if (fs.existsSync(subSrc)) {
              fs.cpSync(subSrc, path.join(destDir, sub), {recursive: true});
            }
          }
          const zipSrc = path.join(srcDir, 'shringar-salon-html-css-js.zip');
          if (fs.existsSync(zipSrc)) {
            fs.copyFileSync(zipSrc, path.join(destDir, 'shringar-salon-html-css-js.zip'));
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          services: path.resolve(__dirname, 'services.html'),
          hair: path.resolve(__dirname, 'hair.html'),
          men: path.resolve(__dirname, 'men.html'),
          makeup: path.resolve(__dirname, 'makeup.html'),
          nails: path.resolve(__dirname, 'nails.html'),
          beauty: path.resolve(__dirname, 'beauty.html'),
          facial: path.resolve(__dirname, 'facial.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
