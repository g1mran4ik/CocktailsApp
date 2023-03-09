FROM python:3.10.6-slim-bullseye

ARG UID=1000
ARG GID=1000

RUN groupadd -g ${GID} drinks && \
    useradd -l -m -u ${UID} -g ${GID} drinks -s /bin/bash

RUN mkdir /home/drinks/.vscode-server && \
    chown ${UID}:${GID} /home/drinks/.vscode-server
RUN mkdir /home/drinks/src && \
    chown ${UID}:${GID} /home/drinks/src

WORKDIR /home/drinks/src

COPY ./docker/prod/pip.txt .
RUN pip install -r pip.txt

COPY --chown=${UID}:${GID} ../../src .

CMD [ "/bin/bash", "./startserver.sh" ] 