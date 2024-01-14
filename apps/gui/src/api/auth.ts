import Axios, { HttpStatusCode } from 'axios';
import type { ILoginForm, ISignupForm } from '@gui-bastion-types';
import { BastionURIs } from '@gui-bastion-types';
import { bastionApiURL } from '../constants';

// ? Alternative API declaration:
// ? https://nx.dev/recipes/node/application-proxies#set-up-application-proxies

const bastionService = Axios.create({
  url: 'api',
  baseURL: new URL('api/v1/auth', bastionApiURL).toString(),
});

export const signup = async (userData: ISignupForm) => {
  const { status } = await bastionService.post(BastionURIs.SIGNUP, userData);
  console.log('status', status);

  if (status !== HttpStatusCode.Ok) {
    throw Error('BOOM');
  }
};

export const login = async (userData: ILoginForm) => {
  const { status } = await bastionService.post(BastionURIs.LOGIN, userData);
  console.log('status', status);

  if (status !== HttpStatusCode.Ok) {
    throw Error('BOOM');
  }
};
