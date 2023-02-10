FROM node:16.17.1-buster-slim

RUN userdel -r node

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} drinks && \
    useradd -l -m -u ${UID} -g ${GID} drinks -s /bin/bash

RUN mkdir /home/drinks/.vscode-server && \
    chown ${UID}:${GID} /home/drinks/.vscode-server
RUN mkdir /home/drinks/src && \
    chown ${UID}:${GID} /home/drinks/src

ENV NPM_CONFIG_PREFIX=/home/drinks/.npm-global
ENV PATH=$PATH:/home/drinks/.npm-global/bin

USER root

RUN apt update && apt install git -y

WORKDIR /home/drinks/src

COPY --chown=${UID}:${GID} ./src/package.json ./src/package.json

RUN cd src && npm install --quiet
COPY --chown=${UID}:${GID} . .

WORKDIR /home/drinks/src/src

