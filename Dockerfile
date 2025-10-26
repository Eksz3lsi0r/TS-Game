# Dockerfile für R3F Game
FROM node:18-alpine AS base

# Installiere Abhängigkeiten nur wenn sich package.json ändert
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Installiere Abhängigkeiten basierend auf dem bevorzugten Package Manager
COPY package.json package-lock.json* ./
RUN npm ci

# Erstelle die Anwendung mit zwischengespeicherten Abhängigkeiten
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production Image, kopiere alle Dateien und führe Next.js aus
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Nutze Image mit automatisch optimierter Ausgabe
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
