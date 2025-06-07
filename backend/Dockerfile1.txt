# Etapa 1: Build
FROM --platform=linux/amd64 node:18-slim AS builder
WORKDIR /app

COPY package*.json prisma ./
RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate

# Etapa 2: Producción
FROM --platform=linux/amd64 node:18-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
RUN npm install prisma --no-save
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && node dist/main.js"]
