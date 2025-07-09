# 📝 Offline-First Reading Assistant

A **progressive web application** (PWA) designed for **students and professionals** to view and annotate documents **even with poor or no internet connectivity**. Built with **React**, the app uses modern web APIs to ensure seamless offline functionality, annotation syncing, and optimized loading for enhanced performance.

🌐 **Live Demo**: [offline-first-reading-assistant.vercel.app](https://offline-first-reading-assistant.vercel.app/)

---

## 📸 Preview

### Universal Document Viewer
![UI Preview](src/assests/image.png)



---

## 🚀 Features

- 📂 **Universal Document Viewer** – View images and documents with annotation capabilities.
- ✏️ **Annotation Tools** – Draw, erase, and label directly on documents using the Canvas API.
- 🌐 **Offline Mode** – Works seamlessly offline and syncs changes automatically when online.
- 📶 **Network Aware** – Monitors network quality using the **Network Information API**.
- 📄 **Lazy Loading** – Uses **Intersection Observer API** to lazily load documents, improving performance.
- ✅ **Sync Status UI** – Displays real-time sync status via a smart UI indicator.

---

## 🧩 Tech Stack

| Tech | Description |
|------|-------------|
| **React.js (Vite)** | Frontend framework |
| **Canvas API** | Drawing annotations |
| **Network Information API** | Detects connection type |
| **Intersection Observer API** | Lazy loads document components |
| **IndexedDB** | Offline-first data persistence |
| **Vercel** | Deployment |

---

## 📁 Project Structure
```bash
src/
├── assets/ # Static images/assets
├── components/
│ ├── Connection_Status/ # Network detection UI
│ ├── DocumentViewer/
│ │ └── Annotation/ # Canvas-based annotation logic
│ │ ├── AnnotationLayer.jsx
│ │ └── annotationStorage.js
│ ├── LazyLoadPage/ # Lazy document loading
│ └── SyncManager/ # Sync indicator components
├── App.jsx # Main entry component
├── Home.jsx # Home landing
├── index.js # ReactDOM entry
└── index.css # Global styles
```
## 🛠️ Setup & Run Locally

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/your-username/offline-first-reading-assistant.git
cd offline-first-reading-assistant

# Install dependencies
npm install

# Run the development server
npm run dev
```
```Bash
🧠 Key APIs in Action
API	Role
Canvas API	Annotation/drawing features
navigator.connection	Detects slow/fast network
BackgroundSync	Schedules sync in idle time
IntersectionObserver	Loads documents lazily
localStorage	Saves annotations offline
```

### 📌 Tips:

1. Replace `./assets/ui-preview.png` and `./assets/folder-structure.png` with your actual images or uploaded GitHub image URLs.
2. Customize the GitHub repo URL under `git clone ...`.
3. Add a `LICENSE` file if not yet included.
