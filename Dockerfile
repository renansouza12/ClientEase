
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM development AS build

RUN npm run build -- --configuration production

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist/clients/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80