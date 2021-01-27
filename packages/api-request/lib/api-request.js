import ky from'ky';

const prefixUrl = process.env.NODE_ENV === 'production'
    ? process.env.PREFIX_URL
    : 'http://localhost:3000';

const apiRequest = ky.create({
    prefixUrl,
    credentials: 'include'
});

export default apiRequest;
