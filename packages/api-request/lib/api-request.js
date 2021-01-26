const ky = require('ky');
require('dotenv').config();
module.exports = apiRequest;

const apiRequest = ky.extend({
    prefixUrl: process.env.API_PREFIX,
    credentials: 'include'
});
