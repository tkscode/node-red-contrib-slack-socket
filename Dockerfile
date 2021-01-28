FROM nodered/node-red:1.0.4-12-minimal

COPY --chown=node-red:node-red . /tmp/slack_node

USER node-red

RUN set -ex \
    && cp -r /tmp/slack_node . \
    && npm install slack_node
