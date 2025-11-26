# Basis-Image
FROM node:22 AS build

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package.json package-lock.json ./
RUN npm install

# Projektdateien kopieren
COPY . .

# Build-Argumente empfangen
ARG VITE_BACKEND_API_URL
ARG VITE_FRONTEND_SUBPATH

# Als Umgebungsvariablen setzen
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_FRONTEND_SUBPATH=$VITE_FRONTEND_SUBPATH

# Build erstellen
RUN npm run build

# Produktions-Image
FROM nginx:stable-alpine

# Build-Output kopieren
COPY --from=build /app/dist /usr/share/nginx/html 


# Eigene Nginx-Konfiguration
#COPY nginx.conf /etc/nginx/conf.d/default.conf

#pt1/2 config mit umgebungsvariable
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

  
# Exponiere Port 80
EXPOSE 80

#pt2/2 of konfig mit umgebungsvariable
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]