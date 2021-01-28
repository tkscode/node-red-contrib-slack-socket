const helper = require('node-red-node-test-helper');
const slackControllerNode = require('../nodes/slack-controller.js');
const slackListenNode = require('../nodes/slack-listen.js');

describe('slack-listen Node', () => {
  beforeEach((done) => {
    helper.init(require.resolve('node-red'), {
      functionGlobalContext: {}
    });

    helper.startServer(done);
  });

  afterEach((done) => {
    helper.unload();
    helper.stopServer(done);
  });

  it("should be loaded", (done) => {
    const flow = [
      { id: 'n1', type: 'slack-controller', name: 'slack-controll test', appToken: 'SLACK_APP_TOKEN', tokenType: 'env', listenEvents: 'app_mention' },
      { id: 'n2', type: 'slack-listen', name: 'slack-listen test', slack: 'n1' }
    ];

    helper.load([slackControllerNode, slackListenNode], flow, () => {
      let n2 = helper.getNode('n2');
      n2.disconnect();

      done();
    });
  });
});