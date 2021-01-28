const helper = require('node-red-node-test-helper');
const slackControllerNode = require('../nodes/slack-controller.js');

describe('slack-controller Node', () => {
  beforeEach(() => {
    // set global context
    helper.init(require.resolve('node-red'), { 
      functionGlobalContext: { appToken: 'test token global' }
    });

    // set environment variable
    process.env["TEST_SLACK_APP_TOKEN"] = "test token env";
  });

  afterEach(() => {
    helper.unload();
  });

  it('should be loaded', (done) => {
    const flow = [{ id: 'n1', type: 'slack-controller', name: 'test name', listenEvents: 'test events' }];

    helper.load(slackControllerNode, flow, () => {
      const n1 = helper.getNode('n1');
      n1.should.have.property('name', 'test name');
      n1.should.have.property('listenEvents', 'test events');

      done();
    });
  });

  it('should be set Slack app token', (done) => {
    const flow = [
      { id: 'n1', type: 'slack-controller', name: 'test name', appToken: 'test token str', tokenType: 'str'},
      { id: 'n2', type: 'slack-controller', name: 'test name', appToken: 'appToken', tokenType: 'global'},
      { id: 'n3', type: 'slack-controller', name: 'test name', appToken: 'TEST_SLACK_APP_TOKEN', tokenType: 'env' },
      { id: 'n4', type: 'slack-controller', name: 'test name', appToken: 'no_appToken', tokenType: 'global'},
      { id: 'n5', type: 'slack-controller', name: 'test name', appToken: 'NO_SLACK_APP_TOKEN', tokenType: 'env' }
    ];

    helper.load(slackControllerNode, flow, () => {
      // from str
      const n1 = helper.getNode('n1');
      n1.should.have.property('appToken', 'test token str');
      // from global context
      const n2 = helper.getNode('n2');
      n2.should.have.property('appToken', 'test token global');
      // from environment variable
      const n3 = helper.getNode('n3');
      n3.should.have.property('appToken', 'test token env');
      // no global context
      const n4 = helper.getNode('n4');
      n4.should.have.property('appToken', '');
      // no environment variable
      const n5 = helper.getNode('n5');
      n5.should.have.property('appToken', '');

      done();
    });
  });
});