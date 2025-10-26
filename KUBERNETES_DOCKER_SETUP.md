# Kubernetes & Docker Integration - R3F Game

## Übersicht

Diese R3F (React Three Fiber) Game Anwendung ist vollständig für Kubernetes und Docker optimiert und integriert den verifizierten MCP Kubernetes Server für erweiterte Cluster-Verwaltung.

## 🏗️ Architektur

```
┌─────────────────────────────────────┐
│           Load Balancer             │
├─────────────────────────────────────┤
│              Service                │
├─────────────────────────────────────┤
│         Pod 1        Pod 2          │
│    ┌─────────────┐ ┌─────────────┐   │
│    │ R3F Game    │ │ R3F Game    │   │
│    │ Container   │ │ Container   │   │
│    └─────────────┘ └─────────────┘   │
├─────────────────────────────────────┤
│        MCP Kubernetes Server        │
│      (Cluster Management)           │
└─────────────────────────────────────┘
```

## 🐳 Docker

### Lokale Entwicklung mit Docker Compose

```bash
# Starte alle Services
npm run docker:compose:up

# Zeige Logs
npm run docker:compose:logs

# Stoppe alle Services
npm run docker:compose:down
```

### Manueller Docker Build

```bash
# Baue das Image
npm run docker:build

# Führe Container aus
npm run docker:run
```

## ☸️ Kubernetes

### Schnellstart

```bash
# Deploye alles nach Kubernetes
npm run k8s:deploy

# Überprüfe den Status
npm run k8s:status

# Zeige Logs
npm run k8s:logs
```

### Manuelle Deployment-Schritte

1. **Konfiguration anwenden:**

   ```bash
   kubectl apply -f k8s/config.yaml
   ```

2. **MCP Kubernetes Server deployen:**

   ```bash
   kubectl apply -f k8s/mcp-kubernetes.yaml
   ```

3. **Hauptanwendung deployen:**
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

### Zugriff auf die Anwendung

- **NodePort (lokal):** http://localhost:30000
- **LoadBalancer (Cloud):** Automatisch zugewiesene externe IP
- **Port-Forwarding:** `kubectl port-forward service/r3f-game-service 3000:80`

## 🤖 MCP Kubernetes Server

Der verifizierte MCP Kubernetes Server bietet erweiterte Cluster-Verwaltung:

- **Image:** `mcp/kubernetes:latest` (cosign-verifiziert)
- **Port:** 8080
- **Health Check:** `/health` und `/ready` Endpunkte
- **RBAC:** Vollständige Berechtigungen für Pod/Service-Verwaltung

### Zugriff auf MCP Server

```bash
# Port-Forwarding zum MCP Server
kubectl port-forward service/mcp-kubernetes-service 8080:8080

# Health Check
curl http://localhost:8080/health
```

## 📋 Verfügbare Services

| Service                | Port    | Beschreibung                  |
| ---------------------- | ------- | ----------------------------- |
| r3f-game-service       | 80→3000 | Hauptanwendung (NodePort)     |
| r3f-game-loadbalancer  | 80→3000 | Hauptanwendung (LoadBalancer) |
| mcp-kubernetes-service | 8080    | MCP Kubernetes Server         |

## 🔧 Konfiguration

### Environment Variables (ConfigMap)

```yaml
NODE_ENV: 'production'
PORT: '3000'
HOSTNAME: '0.0.0.0'
GAME_TITLE: 'R3F Mario Game'
MAX_PLAYERS: '4'
GAME_MODE: 'multiplayer'
NEXT_TELEMETRY_DISABLED: '1'
LOG_LEVEL: 'info'
```

### Ressourcen-Limits

- **R3F Game Container:**

  - Memory: 256Mi (request) / 512Mi (limit)
  - CPU: 250m (request) / 500m (limit)

- **MCP Kubernetes Server:**
  - Memory: 128Mi (request) / 256Mi (limit)
  - CPU: 100m (request) / 200m (limit)

## 🔍 Monitoring & Health Checks

### R3F Game Health Checks

```yaml
livenessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### MCP Server Health Checks

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 20
```

## 🔐 Sicherheit

### Container Security

- **Non-root User:** Container läufen als User 1000
- **Read-only Root Filesystem:** Verhindert Schreibzugriffe
- **Dropped Capabilities:** Alle Capabilities entfernt
- **Security Context:** Privilege Escalation deaktiviert

### RBAC (Role-Based Access Control)

Der MCP Server hat minimale, aber notwendige Berechtigungen:

- Pods, Services, ConfigMaps, Secrets: CRUD
- Deployments, ReplicaSets: CRUD
- Ingresses: CRUD
- Metrics: Read-only

## 🚀 Deployment-Strategien

### Lokale Entwicklung

1. **Minikube:** `minikube start`
2. **Deploy:** `npm run k8s:deploy`
3. **Zugriff:** `minikube service r3f-game-service --url`

### Cloud-Deployment

1. **Cluster vorbereiten:** AWS EKS, GKE, oder AKS
2. **kubectl konfigurieren:** Verbindung zum Cluster
3. **Deploy:** `npm run k8s:deploy`
4. **DNS konfigurieren:** LoadBalancer IP mit Domain verknüpfen

## 🛠️ Troubleshooting

### Häufige Probleme

1. **Pod startet nicht:**

   ```bash
   kubectl describe pod <pod-name>
   kubectl logs <pod-name>
   ```

2. **Service nicht erreichbar:**

   ```bash
   kubectl get endpoints
   kubectl describe service r3f-game-service
   ```

3. **MCP Server Probleme:**
   ```bash
   kubectl logs deployment/mcp-kubernetes-server
   kubectl describe deployment mcp-kubernetes-server
   ```

### Nützliche Debug-Befehle

```bash
# Alle Ressourcen anzeigen
kubectl get all -l app=r3f-game

# Events anzeigen
kubectl get events --sort-by='.lastTimestamp'

# Pod-Details
kubectl describe pod <pod-name>

# In Container einsteigen
kubectl exec -it <pod-name> -- /bin/sh
```

## 📈 Skalierung

### Horizontale Pod-Skalierung

```bash
# Replicas erhöhen
kubectl scale deployment r3f-game-deployment --replicas=5

# Auto-Scaling aktivieren
kubectl autoscale deployment r3f-game-deployment --cpu-percent=70 --min=2 --max=10
```

### Cluster-Autoscaling

Bei Cloud-Providern kann Cluster-Autoscaling aktiviert werden, um automatisch Nodes hinzuzufügen/entfernen.

## 🔄 CI/CD Integration

Das Setup ist bereit für CI/CD-Pipelines:

1. **Build:** `docker build -t r3f-game:${VERSION} .`
2. **Push:** `docker push registry/r3f-game:${VERSION}`
3. **Deploy:** `kubectl set image deployment/r3f-game-deployment r3f-game=registry/r3f-game:${VERSION}`

## 📚 Weiterführende Ressourcen

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [MCP Server GitHub](https://github.com/Flux159/mcp-server-kubernetes)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
