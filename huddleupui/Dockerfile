FROM node:21-alpine AS build
WORKDIR /app
COPY . .
RUN ls -al
RUN npm install
RUN npm run build
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
ENV APP_USER=app
ENV APP_GROUP=app
RUN addgroup --system --gid 500 $APP_GROUP && adduser --system --uid 500 $APP_USER --ingroup $APP_GROUP
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY nginx/huddleup.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx