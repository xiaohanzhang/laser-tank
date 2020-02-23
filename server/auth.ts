import axios from 'axios';

import config from './config';
import User, { IUser } from './models/User';


const github = async (query: any): Promise<IUser|string> => {
  const { identity_url, oauth_url, client_id, client_secret } = config.providers.github;
  const code = query?.code;
  if (code) {
    const headers = {
        Accept: 'application/json',
      };
    const { data: { access_token, scope } } = await axios.post(
      oauth_url, { client_id, client_secret, code, }, { headers }
    );
    if (access_token) {
      if (scope.split(', ').includes('user:email')) {
        const { data } = await axios.get(identity_url, {
          headers: {
            ...headers,
            Authorization: `token ${access_token}`,
          },
        });
        const { name, node_id, email } = data;
        let user = await User.findByProvider('github', node_id);
        if (!user) {
          user = await User.create({email, name, identities: [{
            provider: 'github',
            auth_id: node_id,
            email, name,
          }]})
        }
        return user;
      }
    }
  }
  return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${client_id}`;
}

export const authenticate = (query: any) => {
  const { provider } = query;
  const providers: {[key: string]: (query: any) => Promise<IUser|string>} = {
    github,
  };
  if (provider in providers) {
    return providers[provider](query);
  }
  return null;
} 
