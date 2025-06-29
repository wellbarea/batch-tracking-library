import { init, track } from "./src";

init({
  projectId: "meu-projeto",
  endpoint: "https://webhook.site/1234...",
  batchSize: 3,
  timeout: 10000,
  retry: {
    attempts: 5,
    baseDelay: 1000,
    backoffMultiplier: 2,
  },
});

track("click_button", { label: "Comprar agora" });
