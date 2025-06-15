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

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install --only=production
RUN npm install prisma@6.6.0 @prisma/client@6.6.0 --no-save
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["sh", "-c", "npx prisma generate && node dist/src/main.js"]
