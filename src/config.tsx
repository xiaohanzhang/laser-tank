const env = process.env;

export default {
    auth_url: env.REACT_APP_AUTH_URL || 'http://localhost:4000/auth',
}