import { ISignupForm } from '.';

/** User service available RPC endpoints. */
export enum UserURIs {
  USER = 'user',
}

export type SignupVerified = Omit<ISignupForm, 'password'> & {
  passwordHash: string;
};
