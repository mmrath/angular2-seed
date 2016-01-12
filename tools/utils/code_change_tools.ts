import * as express from 'express';
import * as connectLivereload from 'connect-livereload';
import {ENABLE_HOT_LOADING, LIVE_RELOAD_PORT, HOT_LOADER_PORT, APP_SRC, APP_BASE, PROJECT_ROOT} from '../config';
import {API_BASE} from '../config';
import * as ng2HotLoader from 'angular2-hot-loader';
import * as tinylrFn from 'tiny-lr';
import {sep} from 'path';

let tinylr = tinylrFn();
let listen = () => {
  if (ENABLE_HOT_LOADING) {
    return ng2HotLoader.listen({
      port: HOT_LOADER_PORT,
      processPath: file => {
        return file.replace(`${PROJECT_ROOT}${sep}${APP_SRC}`, '/dist/dev/');
      }
    });
  } else {
    return tinylr.listen(LIVE_RELOAD_PORT);
  }
};

let changed = files => {
  if (!(files instanceof Array)) {
    files = [files];
  }
  if (ENABLE_HOT_LOADING) {
    ng2HotLoader.onChange(files);
  } else {
    tinylr.changed({
      body: { files }
    });
  }
};

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
    '^/api': '/api'      // rewrite paths
  },
  proxyTable: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    'dev.localhost:3000': 'http://localhost:8000'
  }
};

// create the proxy
var proxy = proxyMiddleware(context, options);

let tinylrMiddleware = connectLivereload({ port: LIVE_RELOAD_PORT });
let middleware = [
  APP_BASE,
  proxy,
  (req, res, next) => {
    if (ENABLE_HOT_LOADING) {
      next();
    } else {
      tinylrMiddleware(req, res, next);
    }
  },
  express.static(process.cwd())
];

export { listen, changed, middleware };
