# STEP 1: Build
FROM nginx:1.13.5-alpine

LABEL authors="se7en <se7enmfk2@outlook.com>"

COPY nginx.conf /etc/nginx/

ADD webapp /usr/share/nginx/html

RUN echo 'Asia/Shanghai' >/etc/timezone