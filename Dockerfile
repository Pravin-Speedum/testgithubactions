FROM node:16 as build

ARG CLIENTID
ENV DEVELOPMENT=${CLIENTID}

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i --force
COPY . ./
RUN npm install --save-dev web-vitals

RUN npm run build


FROM nginx:1.19.0-alpine AS production


COPY --from=build /app/build/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]