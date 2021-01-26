import ky from'ky';
require('dotenv').config();

console.log(ky.create);
const apiRequest = ky.create({
    prefixUrl: process.env.API_PREFIX,
    credentials: 'include'
});

export default apiRequest;
