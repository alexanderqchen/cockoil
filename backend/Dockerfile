# Build dist from Typescript
FROM node:alpine as base

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
RUN npm install

COPY src ./src
RUN npm run build

# Build production image
FROM node:alpine

WORKDIR /app
COPY --from=base node_modules ./node_modules
COPY --from=base prisma ./prisma
COPY --from=base dist ./dist
COPY --from=base package.json ./package.json

CMD ["npm", "start"]