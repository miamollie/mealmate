// You could use the Standalone Adapter for local development, and a different adapter when deployed.

import { createHTTPServer } from '@trpc/server/adapters/standalone';
 
import { appRouter } from './routers';
import {createContext } from './context';
 
const server = createHTTPServer({
  router: appRouter,
  createContext,
});
 
server.listen(3000);