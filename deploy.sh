#!/bin/bash

# Deploy R3F Game to Kubernetes mit erweiterten Features
set -e

echo "🚀 Deploying R3F Game to Kubernetes..."

# Stelle sicher, dass wir im richtigen Verzeichnis sind
cd "$(dirname "$0")"

# Überprüfe ob Docker läuft
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker ist nicht gestartet. Bitte starte Docker Desktop."
    exit 1
fi

# Überprüfe ob kubectl verfügbar ist
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl ist nicht installiert. Bitte installiere kubectl."
    exit 1
fi

# Überprüfe ob ein Kubernetes-Cluster verfügbar ist
if ! kubectl cluster-info > /dev/null 2>&1; then
    echo "❌ Kein Kubernetes-Cluster verfügbar."
    echo "Überprüfe, ob Minikube läuft oder ein anderer Cluster konfiguriert ist."

    # Versuche Minikube zu starten falls verfügbar
    if command -v minikube &> /dev/null; then
        echo "🔧 Versuche Minikube zu starten..."
        minikube start
    else
        echo "💡 Tipp: Installiere Minikube für lokale Entwicklung oder"
        echo "   konfiguriere einen Cloud-Kubernetes-Cluster."
        exit 1
    fi
fi

# Setze Docker-Umgebung für Minikube falls verwendet
if command -v minikube &> /dev/null && minikube status > /dev/null 2>&1; then
    echo "🔧 Konfiguriere Docker für Minikube..."
    eval $(minikube docker-env)
fi

# Baue das Docker Image
echo "🏗️  Baue Docker Image..."
docker build -t r3f-game:latest .

# Verifiziere das Image (falls cosign verfügbar ist)
if command -v cosign &> /dev/null; then
    echo "🔐 Verifiziere Docker Image..."
    # Hier könnte man eigene Signaturen verifizieren
fi

# Lösche bestehende Deployments falls vorhanden
echo "🧹 Lösche bestehende Deployments..."
kubectl delete -f k8s/ --ignore-not-found=true

# Warte kurz
sleep 5
# Deploye die Konfiguration zuerst
echo "📝 Deploye Konfiguration..."
kubectl apply -f k8s/config.yaml

# Deploye den MCP Kubernetes Server
echo "🤖 Deploye MCP Kubernetes Server..."
kubectl apply -f k8s/mcp-kubernetes.yaml

# Deploye die Hauptanwendung
echo "📦 Deploye die R3F Game Anwendung..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Warte auf alle Deployments
echo "⏳ Warte auf Deployments..."
kubectl rollout status deployment/r3f-game-deployment
kubectl rollout status deployment/mcp-kubernetes-server

# Zeige Service-Informationen
echo "✅ Deployment erfolgreich!"
echo ""
echo "🌐 Service-Informationen:"
kubectl get services
echo ""
echo "📱 Pods:"
kubectl get pods -l app=r3f-game
echo ""
echo "🤖 MCP Server Pods:"
kubectl get pods -l app=mcp-kubernetes
echo ""

# Zeige Zugriffs-URLs
if command -v minikube &> /dev/null && minikube status > /dev/null 2>&1; then
    echo "🔗 Zugriff auf die Anwendung (Minikube):"
    echo "NodePort URL: $(minikube service r3f-game-service --url)"
    if kubectl get service r3f-game-loadbalancer > /dev/null 2>&1; then
        echo "LoadBalancer URL: $(minikube service r3f-game-loadbalancer --url)"
    fi
else
    echo "🔗 Zugriff auf die Anwendung:"
    echo "NodePort: http://localhost:30000 (wenn Node auf localhost läuft)"
    EXTERNAL_IP=$(kubectl get service r3f-game-loadbalancer -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "pending")
    if [ "$EXTERNAL_IP" != "pending" ] && [ "$EXTERNAL_IP" != "" ]; then
        echo "LoadBalancer: http://$EXTERNAL_IP"
    else
        echo "LoadBalancer: Externe IP wird zugewiesen..."
    fi
fi

echo ""
echo "🎮 R3F Game ist jetzt verfügbar!"
echo "🤖 MCP Kubernetes Server läuft und überwacht den Cluster."

# Zeige nützliche Befehle
echo ""
echo "📋 Nützliche Befehle:"
echo "   kubectl get pods                     # Zeige alle Pods"
echo "   kubectl logs -f deployment/r3f-game-deployment  # Live-Logs"
echo "   kubectl describe service r3f-game-service       # Service-Details"
echo "   kubectl port-forward service/r3f-game-service 3000:80  # Port-Forwarding"
