FROM nginx:1.21-alpine

ENV APP_USER=app
ENV APP_GROUP=app

RUN addgroup --system --gid 500 $APP_GROUP && adduser --system --uid 500 $APP_USER --ingroup $APP_GROUP

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY cbis.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx