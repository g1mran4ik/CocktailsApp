FROM node:16.17.1-buster-slim as builder

RUN userdel -r node

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} drinks && \
    useradd -l -m -u ${UID} -g ${GID} drinks -s /bin/bash

RUN mkdir /home/drinks/src && \
    chown ${UID}:${GID} /home/drinks/src

ENV NPM_CONFIG_PREFIX=/home/drinks/.npm-global
ENV PATH=$PATH:/home/drinks/.npm-global/bin

USER root

WORKDIR /home/drinks/src

COPY --chown=${UID}:${GID} ./src/package.json ./src/package.json

RUN cd src && npm install --quiet
COPY --chown=${UID}:${GID} . .

RUN cd src && npm run build

FROM nginx:1.17.2-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./docker/prod/nginx/conf.d /etc/nginx/conf.d

COPY --from=builder /home/drinks/src/src/build /usr/share/nginx/html

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]
