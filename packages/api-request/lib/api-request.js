import ky from'ky';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const apiRequest = ky.create({
    prefixUrl: process.env.API_PREFIX,
    credentials: 'include'
});

export default apiRequest;
