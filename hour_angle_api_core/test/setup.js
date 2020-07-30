/* To Setup the environment before testing using Jest */
const AngleNodeEnvironment = require('./environment');

module.exports = async (jestConfig) => await AngleNodeEnvironment.globalSetup(jestConfig);