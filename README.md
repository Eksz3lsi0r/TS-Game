# TS-Game 🎮

Ein TypeScript Game Development Projekt mit React Three Fiber, Next.js und modernen Web-Technologien.

## 🚀 Features

- **React Three Fiber** - 3D Grafiken und Spiel-Engine
- **Next.js 14** - Full-Stack React Framework
- **TypeScript** - Type-safe Entwicklung
- **Tailwind CSS** - Utility-First CSS Framework
- **@react-three/drei** - Hilfs-Komponenten für R3F
- **@react-three/rapier** - Physics Engine Integration
- **PlayroomKit** - Multiplayer Funktionalität

## 🎯 Game Components

- **Character.tsx** - Spielercharakter Steuerung
- **Scene.tsx** - 3D Szenen Management
- **Experience.tsx** - Haupt-Spiel-Loop
- **Map.tsx** - Level und Umgebung

## 🛠️ Installation

```bash
# Repository klonen
git clone https://github.com/Eksz3lsi0r/TS-Game.git
cd TS-Game

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

## 📜 Verfügbare Scripts

```bash
npm run dev      # Development Server (mit Turbo)
npm run build    # Production Build
npm run start    # Production Server
npm run lint     # Code Linting
```

## 🎮 Development

Das Spiel läuft standardmäßig auf `http://localhost:3000`

### VS Code Setup

- Launch-Konfigurationen für Debugging verfügbar
- TypeScript InlayHints aktiviert
- Auto-Formatierung und ESLint Integration
- Optimiert für 3D Development

### 3D Assets

- Modelle: `/public/models/`
- Texturen: `/public/textures/`
- Sounds: `/public/sounds/`

## 🏗️ Projekt Struktur

```
TS-Game/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Character.tsx
│       ├── Experience.tsx
│       ├── Map.tsx
│       └── Scene.tsx
├── public/
├── .vscode/
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
└── [config files]
```

## 🎨 Technologie Stack

- **Frontend:** React 18, Next.js 14, TypeScript
- **3D Engine:** Three.js, React Three Fiber
- **Styling:** Tailwind CSS
- **Physics:** Rapier Physics Engine
- **Multiplayer:** PlayroomKit
- **Development:** ESLint, Prettier, VS Code

## 🚀 Deployment

Das Projekt kann auf verschiedene Weise deployed werden:

- Vercel (empfohlen für Next.js)
- Netlify
- Custom Server

## 📄 Lizenz

Dieses Projekt ist unter der MIT Lizenz verfügbar.

## 🤝 Contributing

Beiträge sind willkommen! Bitte erstelle einen Pull Request oder öffne ein Issue.

---

**Happy Gaming! 🎮✨**
