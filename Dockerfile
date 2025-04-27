FROM node:23-slim AS base
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g vite
RUN npm install
COPY . .
RUN npm run build
FROM base AS dev
# Expose le port Vite (par défaut 5173)
EXPOSE 5173
# Démarre le serveur Vite en mode dev
CMD ["npm", "run", "dev"]
FROM base AS build
RUN npm run build
# Production : on utilise Nginx pour servir les fichiers
FROM nginx:stable-alpine AS prod
# Copier le build dans nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Optionnel : Nginx config pour les routes SPA
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
