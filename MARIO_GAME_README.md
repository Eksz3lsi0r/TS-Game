# 🍄 2.5D Mario Clone - React Three Fiber

Ein New Super Mario Bros. inspirierter 2.5D Platformer erstellt mit React Three Fiber und Rapier Physics.

## 🎮 Gameplay Features

### Mario Character System

- **3 Power-Up Zustände**: Small Mario, Super Mario, Fire Mario
- **2.5D Bewegung**: Nur horizontale Bewegung (links/rechts) wie im originalen Mario
- **Mario-Physik**: Realistische Sprung-Mechanik mit verschiedenen Sprungstärken
- **Ducken**: Super/Fire Mario kann sich ducken (S-Taste)
- **Ground Pound**: Halte S beim Springen für einen Ground Pound

### Level Design

- **Side-scrolling Level**: Horizontales Level-Design im Mario-Stil
- **Plattformen**: Verschiedene Höhen und Sprungherausforderungen
- **Mario-Pipes**: Grüne Röhren als Hindernisse
- **Question Blocks**: Goldene Blöcke (zukünftig: enthalten Power-ups)
- **Brick Blocks**: Braune Blöcke zum Zerstören
- **Castle**: Schloss am Level-Ende

### Collectibles & Power-ups

- **Münzen**: Rotierende goldene Münzen (+100 Punkte)
- **Super Mushroom**: Macht Small Mario zu Super Mario (+1000 Punkte)
- **Fire Flower**: Verwandelt Mario in Fire Mario (+1000 Punkte)

### Gegner

- **Goombas**: Braune Pilz-Gegner die sich bewegen
- **KI-Verhalten**: Gegner drehen um wenn sie Hindernisse treffen
- **Defeat-Mechanik**: Springe auf Gegner um sie zu besiegen (+200 Punkte)

### Level-Ziel

- **Flagpole**: Flagge am Ende des Levels
- **Level Complete**: Berühre die Flagge um das Level zu beenden (+5000 Punkte)

## 🎯 Steuerung

| Taste             | Aktion                        |
| ----------------- | ----------------------------- |
| **A** / **←**     | Nach links bewegen            |
| **D** / **→**     | Nach rechts bewegen           |
| **Leertaste**     | Springen                      |
| **S** / **↓**     | Ducken (nur Super/Fire Mario) |
| **S + Leertaste** | Ground Pound (in der Luft)    |

## 🛠️ Technische Features

### 2.5D Grafik-System

- **3D Modelle auf 2D Bewegung**: Charaktere und Objekte sind 3D, bewegen sich aber nur in 2D
- **Side-scrolling Kamera**: Folgt Mario horizontal durch das Level
- **Moderne Beleuchtung**: DirectionalLight und AmbientLight für realistische Schatten

### Physics Engine

- **Rapier Physics**: Realistische Kollisionserkennung und Physik
- **Mario-spezifische Physik**: Angepasste Sprungkraft und Bewegungsgeschwindigkeit
- **Collision Detection**: Präzise Kollisionserkennung für alle Spielelemente

### React Three Fiber Integration

- **Komponentenbasiert**: Jedes Spielelement ist eine wiederverwendbare React-Komponente
- **State Management**: React Hooks für Spielzustand und Mario-Status
- **Performance**: Optimierte Rendering-Pipeline für flüssiges Gameplay

## 📁 Projekt Struktur

```
src/components/
├── Scene.tsx           # 3D Canvas Setup + Keyboard Controls
├── Experience.tsx      # Haupt-Game-Loop + State Management
├── Character.tsx       # Mario Character mit Power-Up System
├── Map.tsx            # Level-Design mit Plattformen und Pipes
├── Coin.tsx           # Sammelbare Münzen
├── PowerUp.tsx        # Super Mushroom & Fire Flower
├── Enemy.tsx          # Goomba Gegner mit KI
└── FlagPole.tsx       # Level-Ziel Flagge
```

## 🚀 Installation & Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Spiel öffnet sich auf http://localhost:3000 (oder 3001)
```

## 🎨 Anpassungen

Das Spiel kann einfach erweitert werden durch:

- **Neue Power-ups**: Weitere Power-up-Typen in `PowerUp.tsx`
- **Mehr Gegner**: Verschiedene Gegner-Typen in `Enemy.tsx`
- **Level-Editor**: Dynamische Level-Generierung
- **Sound-Effekte**: Web Audio API Integration
- **Multiplayer**: Mehrere Mario-Charaktere

## 🏆 Score System

- Münzen sammeln: **+100 Punkte**
- Gegner besiegen: **+200 Punkte**
- Power-up sammeln: **+1000 Punkte**
- Level abschließen: **+5000 Punkte**

## 🎮 Inspiration

Dieses Projekt ist inspiriert von **New Super Mario Bros.** (Nintendo DS, 2006) und nutzt die gleichen 2.5D Design-Prinzipien:

- 3D Charaktere auf 2D Bewegungsebene
- Klassische Mario-Physik und -Mechaniken
- Side-scrolling Kamera-System
- Authentisches Mario-Level-Design

Entwickelt mit ❤️ und React Three Fiber!
