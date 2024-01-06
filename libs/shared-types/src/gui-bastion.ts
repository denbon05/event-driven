export interface ILoginForm {
  name: string;
  password: string;
}

export type ISignupForm = ILoginForm & {
  email: string;
};

export enum CookieKeys {
  JWT = 'jwt',
}

export interface IJwtPayload {
  sub: number;
  exp: number;
  iat: number;
  name: string;
}

/** Bastion service available REST endpoints. */
export enum BastionURIs {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
