export type EventPayload = Record<string, unknown>;

export interface TrackedEvent {
  id: string;
  createdDate: number;
  eventName: string;
  payload: EventPayload;
  projectId: string;
}

export interface RetryOptions {
  attempts?: number;
  baseDelay?: number;
  backoffMultiplier?: number;
}

export interface InitOptions {
  projectId: string;
  endpoint?: string;
  batchSize?: number;
  maxBatchTimeout?: number;
  retry?: RetryOptions;
}
