import { config } from "../config";
import { TrackedEvent } from "../types";
import { sendToBackendWithRetry } from "../service/sendToBackend";
import { QueueManager } from "./queueManager";

export class BatchManager {
  private queueManager: QueueManager;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(queueManager: QueueManager) {
    this.queueManager = queueManager;
    this.initialize();
  }

  private initialize() {
    const queue = this.queueManager.getAll();
    if (queue.length >= config.batchSize) {
      this.sendBatch();
      return;
    }
  }

  add(event: TrackedEvent) {
    this.queueManager.add(event);
    const queue = this.queueManager.getAll();

    if (queue.length >= config.batchSize) {
      this.sendBatch();
      return;
    }

    this.clearTimer();
    this.startTimer();
  }

  private startTimer() {
    if (this.timer) {
      return;
    }

    this.timer = setTimeout(() => this.sendBatch(), config.maxBatchTimeout);
    console.log("[Analytics] ⏳ Timer started (20 minutes)");
  }

  private clearTimer() {
    if (!this.timer) {
      return;
    }

    clearTimeout(this.timer);
    this.timer = null;
    console.log("[Analytics] 🔥 Timer canceled");
  }

  private async sendBatch() {
    const events = this.queueManager.getAll();
    if (events.length === 0) {
      return;
    }

    try {
      await sendToBackendWithRetry(events);
      events.forEach((event) => this.queueManager.remove(event.id));
    } catch (error) {
      console.error("[Analytics] ❌ Error sending:", error);
    } finally {
      this.clearTimer();
    }
  }
}
