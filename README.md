# 📊 batch-tracking-library

A lightweight and scalable JavaScript library for tracking user interaction events (like button clicks) in web applications. Designed to reliably queue, batch, store, and send events to a backend server — even if the browser is closed or offline temporarily.

https://www.npmjs.com/package/batch-tracking-events-library

---

## 🚀 Installation

```bash
npm install batch-tracking-library
# or
yarn add batch-tracking-library
```

⚙️ Initialization

Before tracking any event, initialize the library with your project ID and configuration options:

```bash
import { init } from 'batch-tracking-library';

init({
  projectId: 'your-project-id',      // 🔐 Required
  endpoint: '/api/track',            // ✅ Your server endpoint
  batchSize: 5,                      // 📦 Events per batch (default: 5)
  maxBatchTimeout: 20 * 60 * 1000            // ⏱️ Max wait before auto-send (in ms)
});
```

🎯 Tracking Events

Use the track function to capture user interactions:

```bash
import { track } from 'batch-tracking-library';

track('button_click', {
  buttonName: 'Save',
  userId: '12345'
});
```

Each event automatically includes:
• A unique ID (uuid)
• A timestamp (Date.now())
• The project ID

📦 Features

✅ Queue-based batching of events (default 5 per batch)
✅ Auto-send on batch full or timeout (e.g. 20 minutes)
✅ Persistent localStorage storage for unsent events
✅ Retry with exponential backoff if request fails
✅ Framework-agnostic (works with React, Vue, Next.js, Angular, etc.)
✅ Easily extendable and backend-agnostic

📤 Backend Payload Example

The backend should receive POST requests with a JSON payload:

```bash
{
  "events": [
    {
      "id": "generated-uuid",
      "timestamp": 1723948739458,
      "eventName": "button_click",
      "payload": {
        "buttonName": "Save"
      },
      "projectId": "your-project-id"
    }
  ]
}
```

🧪 Testing

For local testing, you can simulate responses with mock endpoints:
• ✅ /api/success – always responds with 200 OK
• ❌ /api/error – always responds with 500 error

You can configure the endpoint like so:

```bash
init({
  projectId: 'test-project',
  endpoint: '/api/success',
  ...
});
```

📁 Internal Structure
• init – initializes the library and config
• track – creates and queues a new event
• getQueue – retrieves current events in queue
• QueueManager – handles localStorage
• BatchManager – handles batching logic and retries

🛠️ Requirements
• Modern browsers (supporting localStorage, fetch, etc.)
• Node-compatible if wrapped for server-side usage (optional)

👨‍💻 Author

Wellington Barêa – @wellingtonbarea
