FROM node:alpine AS build
ENV NODE_ENV=development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY *.json ./
COPY src .

RUN npm run build

FROM node:alpine
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist .
COPY --from=build /app/node_modules .

RUN npm prune

EXPOSE 3000

USER node

CMD [ "node", "main.js" ]
