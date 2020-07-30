/**
 * @fn Options
 * @param configuration JS configuration object
 * @desc Complete the configuration object with default values
 */
let Options = function (configuration = {}) {
    // Copy attributes in final object
    let config = Object.assign(configuration, {});

    config.port = configuration.port ? configuration.port : (process.env.PORT ? process.env.PORT : 3030);
    config.development = configuration.development ? configuration.development : (process.env.NODE_ENV !== 'production' ? true : false);
    config.enableCors = configuration.enableCors ? configuration.enableCors : true;

    return config;
};

export default Options;