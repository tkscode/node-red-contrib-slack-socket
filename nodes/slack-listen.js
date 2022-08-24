module.exports = function (RED) {
  'use strict';

  const { SocketModeClient } = require('@slack/socket-mode');

  /**
   * define node
   * @param {*} config properties of this node
   */
  function Node(config) {
    RED.nodes.createNode(this, config);

    const node = this;
    const slack = RED.nodes.getNode(config.slack);
    node.controller = null;

    /**
     * disconnect from Slack
     */
    node.disconnect = () => {
      (async () => {
        await node.controller.disconnect();
      })();
    };

    /**
     * add event handler
     */
    function addEventHandler() {
      node.controller.on('connecting', () => {
        node.log('connecting...');

        node.status({ fill: 'green', shape: 'ring', text: 'connecting' });
      });

      node.controller.on('reconnecting', () => {
        node.log('reconnecting...');

        node.status({ fill: 'yellow', shape: 'ring', text: 'reconnecting' });
      });

      node.controller.on('connected', () => {
        node.log('connected');

        node.status({ fill: 'green', shape: 'dot', text: 'connected' });
      });

      node.controller.on('disconnected', () => {
        node.log('disconnected');

        node.status({ fill: 'red', shape: 'dot', text: 'disconnected' });
      });

      node.controller.on('unable_to_socket_mode_start', (error) => {
        node.error(error);

        node.status({ fill: 'red', shape: 'dot', text: 'unable to start' });
      });

      node.controller.on('error', (error) => {
        node.error(error);

        node.status({ fill: 'red', shape: 'dot', text: 'error' });
      });

      if (slack.listenEvents) {
        for (const e of slack.listenEvents.split(',')) {
          node.log(`listen event - ${e}`);
          ((targetEvent) => {
            node.controller.on(targetEvent, async ({ event, body, ack }) => {
              try {
                await ack();

                node.send({ payload: body });
              } catch (error) {
                node.error(error);
              }
            });
          })(e);
        }
      }
    }

    if (slack.appToken) {
      try {
        node.controller = new SocketModeClient({ appToken: slack.appToken });
      } catch (e) {
        node.controller = null;
        node.status({ fill: 'red', shape: 'dot', text: 'client error' });
        node.error(e);
      }

      if (node.controller) {
        addEventHandler();

        (async () => {
          try {
            await node.controller.start();
          } catch (e) {
            node.controller.removeAllListeners();
            node.controller = null;
          }
        })();
      }
    }

    node.on('close', (done) => {
      if (node.controller && node.controller.connected) {
        node.disconnect();
        node.controller = null;
      }

      done();
    });
  }

  RED.nodes.registerType('slack-listen', Node);
};
