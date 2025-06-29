import { TrackedEvent } from "../types";
import { storage } from "../utils/storage";

export class QueueManager {
  private queue: TrackedEvent[] = [];
  private storageKey: string;

  constructor(projectId: string) {
    this.storageKey = `analytics_queue_${projectId}`;
    this.load();
  }

  private load() {
    const data = storage.get<TrackedEvent[]>(this.storageKey);
    this.queue = data || [];
  }

  private save() {
    storage.set(this.storageKey, this.queue);
  }

  add(event: TrackedEvent) {
    this.queue.push(event);
    this.save();
  }

  remove(eventId: string) {
    this.queue = this.queue.filter(({ id }) => id !== eventId);
    this.save();
  }

  getAll(): TrackedEvent[] {
    return [...this.queue];
  }

  clear() {
    this.queue = [];
    this.save();
  }
}
