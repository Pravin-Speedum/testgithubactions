FROM node:16 as build

ARG CLIENTID
ENV DEVELOPMENT=${CLIENTID}

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i --force
COPY . ./

RUN npm run build


FROM nginx:1.19.0-alpine AS production


COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]