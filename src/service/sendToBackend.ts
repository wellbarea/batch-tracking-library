import { TrackedEvent } from "../types";
import { config } from "../config";

export async function sendToBackendWithRetry(
  events: TrackedEvent[]
): Promise<void> {
  const { endpoint, retry } = config;

  if (!endpoint) {
    console.warn(
      "[Analytics] ⚠️ Endpoint not configured. Events will not be sent."
    );
    return;
  }

  let attempt = 0;
  let delay = retry.baseDelay ?? 0;

  while (attempt < (retry.attempts ?? 0)) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
      });

      if (res.ok) {
        console.log(
          `[Analytics] ✅ Events sent successfully. (attempt ${attempt + 1})`
        );
        return;
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (error) {
      attempt++;
      console.warn(`[Analytics] ❌ Attempt ${attempt} failed:`, error);

      if (attempt >= (retry.attempts ?? 0)) {
        console.error(
          "[Analytics] ⚠️ Maximum attempts reached. Aborting sending."
        );
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= retry.backoffMultiplier ?? 0;
    }
  }
}
