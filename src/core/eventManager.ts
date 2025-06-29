import { uuid } from "uuidv4";
import { EventPayload, InitOptions, TrackedEvent } from "../types";
import { QueueManager } from "./queueManager";
import { BatchManager } from "./batchManager";
import { applyConfig, config } from "../config";

let projectId: string | null = null;
let queueManager: QueueManager;
let batchManager: BatchManager;

export function init(options: InitOptions) {
  if (!options.projectId) {
    throw new Error("Project ID is required for initialization.");
  }

  projectId = options.projectId;

  applyConfig(options);

  queueManager = new QueueManager(config.projectId);
  batchManager = new BatchManager(queueManager);

  console.log(`[Analytics] 🔧 Inicializado com projectId: ${projectId}`);
}

export function track(
  eventName: string,
  payload: EventPayload = {}
): TrackedEvent {
  if (!projectId) {
    throw new Error("Lib not initialized. Call init() first.");
  }

  const event: TrackedEvent = {
    id: uuid(),
    createdDate: Date.now(),
    eventName,
    payload,
    projectId: projectId,
  };

  batchManager.add(event);
  console.log("[Analytics] 🎯 Evento capturado:", event);

  return event;
}

export function getQueue() {
  return queueManager.getAll();
}
