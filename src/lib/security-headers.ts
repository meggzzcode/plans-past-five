/**
 * Security headers for server-rendered HTML. public/_headers only reaches static assets, so
 * the SSR wrapper in src/server.ts applies these to HTML responses.
 * Deliberately NOT set: CSP, HSTS, X-Frame-Options (the Lovable editor previews in an iframe).
 */
export const HTML_SECURITY_HEADERS: Readonly<Record<string, string>> = {
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "X-Content-Type-Options": "nosniff",
};

/** Returns the response with the headers set when it is HTML; other responses pass through untouched. */
export function withSecurityHeaders(response: Response): Response {
  const type = response.headers.get("content-type") ?? "";
  if (!type.toLowerCase().includes("text/html")) return response;
  try {
    for (const [k, v] of Object.entries(HTML_SECURITY_HEADERS)) response.headers.set(k, v);
    return response;
  } catch {
    // Immutable headers (e.g. a redirect Response): rebuild with the same body and status.
    const headers = new Headers(response.headers);
    for (const [k, v] of Object.entries(HTML_SECURITY_HEADERS)) headers.set(k, v);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }
}
