import {
APP_BASE, APP_DEST, APP_ROOT, APP_TITLE, SYSTEM_CONFIG, API_BASE, VERSION, HOT_LOADER_PORT, BOOTSTRAP_MODULE
} from '../config';

// TODO: Add an interface to register more template locals.
export function templateLocals() {
  return {
    APP_BASE,
    APP_DEST,
    APP_ROOT,
    APP_TITLE,
    SYSTEM_CONFIG,
    API_BASE,
    VERSION,
    BOOTSTRAP_MODULE,
    HOT_LOADER_PORT
  };
}
