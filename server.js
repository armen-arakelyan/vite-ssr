import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function startServer() {
  const app = express();


  if (isProduction) {
    app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets')));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      let render;

      if (!isProduction) {
        const vite = await createViteServer({
          server: { middlewareMode: 'ssr' },
        });
        app.use(vite.middlewares);

        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const appHtml = renderToString(render(url));

      const html = template.replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      console.error("SSR rendering error:", error);
      res.status(500).end(error.message);
    }
  });

  const port = process.env.PORT || 3005;
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

startServer();
