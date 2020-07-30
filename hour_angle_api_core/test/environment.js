/*eslint no-console: "off"*/
/* Create the environment that allow to start the server on global Setup for testing */
const AngleServer = require('../src/hourAngleApp').default;
const NodeEnvironment = require('jest-environment-node');

let angleServer = null;
let angleRouter = null;

class AngleNodeEnvironment extends NodeEnvironment {

    constructor(config, context) {
        super(config, context);
    }

    static async globalSetup() {
        process.env.NODE_ENV = 'test';
        angleServer = new AngleServer({});
        angleRouter = await angleServer.start();
    }

    async setup(__unused__jestConfig) {
        this.global.angleRouter = angleRouter;
    }

    async teardown(__unused__jestConfig) {
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = AngleNodeEnvironment;