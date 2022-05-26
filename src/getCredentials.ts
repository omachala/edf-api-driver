import { Credentials } from '../types';

const getCredentials = (): Credentials => {
  const { EMAIL: email, PASSWORD: password } = process.env;
  if (!email || !password) { throw new Error('EMAIL and PASSWORD are required .env variables'); }
  return { email, password };
};

export default getCredentials;
