module.exports = function (RED) {
  'use strict';

  /**
   * define node
   * @param {*} config properties of this node
   */
  function Node(config) {
    RED.nodes.createNode(this, config);

    this.appToken = '';
    this.listenEvents = config.listenEvents;

    if (config.tokenType === 'str') {
      // in str
      this.appToken = config.appToken;
    } else if (config.tokenType === 'global') {
      // in global context
      const globalContext = this.context().global;
      if (globalContext.hasOwnProperty(config.appToken)) {
        this.appToken = globalContext[config.appToken];
      } else {
        this.error(`"${config.appToken}" does not exist in global context`);
      }
    } else if (config.tokenType === 'env') {
      // in environment variable
      if (process.env.hasOwnProperty(config.appToken)) {
        this.appToken = process.env[config.appToken];
      } else {
        this.error(`"${config.appToken}" does not exist in environment variables`);
      }
    }
  }

  RED.nodes.registerType('slack-controller', Node);
};
