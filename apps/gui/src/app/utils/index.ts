import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { IJwtPayload } from '@gui-bastion-types';
import { CookieKeys } from '@gui-bastion-types';

export const checkIsJwtExpired = (jwt: string) => {
  const decoded = jwtDecode<IJwtPayload>(jwt);

  console.log('decoded', decoded);
  return decoded.exp >= new Date().valueOf();
};

export const decodeUsername = () => {
  const jwt = Cookie.get(CookieKeys.JWT);

  if (!jwt) {
    console.warn('There is no specified JWT in cookies.');
    return '';
  }

  const decoded = jwtDecode<IJwtPayload>(jwt);
  return decoded.name;
};

export const checkIsUserLoggedIn = () => {
  const jwt = Cookie.get(CookieKeys.JWT);

  if (!jwt) {
    return false;
  }

  return checkIsJwtExpired(jwt);
};
