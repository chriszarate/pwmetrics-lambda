const PWMetrics = require('pwmetrics');
const getOptions = require('./src/get-options');

module.exports = (url, options) => new PWMetrics(url, getOptions(options)).start();
