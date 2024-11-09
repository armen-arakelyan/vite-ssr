import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function startServer() {
  const app = express();

  console.log(222, isProduction);

  if (isProduction) {
    // Serve static assets under the "/assets" path in production
    app.use('/assets', express.static(path.resolve(__dirname, 'dist/client/assets')));
  }

  app.use('*', async (req, res) => {
    console.log(2233);
    try {
      const url = req.originalUrl;

      let template;
      let render;

      if (!isProduction) {
        // In development mode, use Vite’s middleware for HMR
        const vite = await createViteServer({
          server: { middlewareMode: 'ssr' },
        });
        app.use(vite.middlewares);

        // Read and transform the root index.html in development
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        // In production mode, load pre-built files from dist
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        render = (await import('./dist/server/entry-server.js')).render;
      }

      // Render the app to a string
      const appHtml = renderToString(render(url));

      // Inject the rendered app HTML into the template
      const html = template.replace(`<!--app-html-->`, appHtml);

      // Send the response
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
