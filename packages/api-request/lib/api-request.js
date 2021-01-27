import ky from'ky';

const prefixUrl = process.env.NODE_ENV === 'production'
    ? 'https://exclusive-clubhouse-api.herokuapp.com/'
    : 'http://localhost:3000/';

const apiRequest = ky.create({
    prefixUrl,
    credentials: 'include'
});

export default apiRequest;
