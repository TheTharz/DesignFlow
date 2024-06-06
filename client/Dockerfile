FROM node:latest AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rg ./*
COPY --from=build /app/build/ .

ENTRYPOINT [ "nginx","-g","daemon off;"]