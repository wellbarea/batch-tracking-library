import { MAX_BATCH_SIZE, MAX_BATCH_TIME_MS } from "./constants";
import { InitOptions, RetryOptions } from "./types";

const defaultRetry: RetryOptions = {
  attempts: 3,
  baseDelay: 1000, // 1 second
  backoffMultiplier: 2,
};

export const config: Required<InitOptions> = {
  projectId: "",
  endpoint: "",
  batchSize: MAX_BATCH_SIZE,
  maxBatchTimeout: MAX_BATCH_TIME_MS,
  retry: defaultRetry,
};

export function applyConfig(userConfig: Partial<InitOptions>) {
  config.projectId = userConfig.projectId ?? "";
  config.endpoint = userConfig.endpoint ?? "";
  config.batchSize = userConfig.batchSize ?? MAX_BATCH_SIZE;
  config.maxBatchTimeout = userConfig.maxBatchTimeout ?? MAX_BATCH_TIME_MS;

  config.retry = {
    attempts: userConfig.retry?.attempts ?? defaultRetry.attempts,
    baseDelay: userConfig.retry?.baseDelay ?? defaultRetry.baseDelay,
    backoffMultiplier:
      userConfig.retry?.backoffMultiplier ?? defaultRetry.backoffMultiplier,
  };
}
