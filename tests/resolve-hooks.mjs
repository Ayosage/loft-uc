/**
 * Next ships `next/server.js` without an "exports" map, so Node's ESM resolver
 * will not find the extensionless `next/server` specifier that the app uses
 * (Next's own bundler adds the extension). This hook adds it, which is all the
 * route handler needs to run under `node --test` with no test framework.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('next/') && !/\.[a-z]+$/.test(specifier)) {
    try {
      return await nextResolve(`${specifier}.js`, context);
    } catch {
      // Fall through to the default resolution and let it report the error.
    }
  }
  return nextResolve(specifier, context);
}
