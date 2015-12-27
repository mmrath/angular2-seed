import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as tinylrFn from 'tiny-lr';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import {resolve} from 'path';
import {APP_BASE, APP_DEST, DOCS_DEST, LIVE_RELOAD_PORT, DOCS_PORT, PORT, API_BASE} from '../config';

let tinylr = tinylrFn();


export function serveSPA() {
  let server = express();
  tinylr.listen(LIVE_RELOAD_PORT);

  //not in DefinitelyTyped
  var proxyMiddleware = require('http-proxy-middleware');

  // configure proxy middleware context
  var context = '/api';                     // requests with this path will be proxied
  // configure proxy middleware options
  var options = {
          target: API_BASE, // target host
          changeOrigin: true,               // needed for virtual hosted sites
          ws: true,                         // proxy websockets
          pathRewrite: {
              '^/api' : '/api'      // rewrite paths
          },
          proxyTable: {
              // when request.headers.host == 'dev.localhost:3000',
              // override target 'http://www.example.org' to 'http://localhost:8000'
              'dev.localhost:3000' : 'http://localhost:8000'
          }
      };

  // create the proxy
  var proxy = proxyMiddleware(context, options);

  server.use(
    APP_BASE,
    proxy,
    connectLivereload({ port: LIVE_RELOAD_PORT }),
    express.static(process.cwd())
  );

  server.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_BASE + APP_DEST)
  );
}

export function notifyLiveReload(e) {
  let fileName = e.path;
  tinylr.changed({
    body: { files: [fileName] }
  });
}

export function serveDocs() {
  let server = express();

   server.use(
    APP_BASE,
    serveStatic(resolve(process.cwd(), DOCS_DEST))
  );

   server.listen(DOCS_PORT, () =>
    openResource('http://localhost:' + DOCS_PORT + APP_BASE)
  );
}
