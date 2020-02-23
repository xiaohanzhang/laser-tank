import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '..', '.env.local')});

const env = process.env;

export default {
    keys: [env.SERVER_KEY],
    providers: {
        github: {
            oauth_url: 'https://github.com/login/oauth/access_token',
            identity_url: 'https://api.github.com/user',
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
        }
    },
    mongodb: {
        uri: env.MONGODB_URI,
    }
}
