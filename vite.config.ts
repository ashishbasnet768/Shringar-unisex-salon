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
