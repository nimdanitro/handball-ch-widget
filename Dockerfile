FROM docker.io/library/nginx:alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80