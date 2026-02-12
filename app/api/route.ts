import { getPostHogClient } from "@/lib/posthog-server";

export async function GET(request: Request) {
  const posthog = getPostHogClient();

  // Get distinct ID from headers if available (for client-server correlation)
  const distinctId =
    request.headers.get("X-POSTHOG-DISTINCT-ID") || "anonymous";

  // Capture server-side API request event
  posthog.capture({
    distinctId,
    event: "api_request_received",
    properties: {
      endpoint: "/api",
      method: "GET",
      source: "server",
    },
  });

  return Response.json({ message: "Hello from Next.js server!" });
}
