import { reactive, ref, toValue } from 'vue';
import Guest from '../entities/Guest';
import { checkIsUserLoggedIn, decodeUsername } from '../utils';
import User from '../entities/User';

const isUserLoggedIn = ref(checkIsUserLoggedIn());

/** @description Do not use destructuring because of `reactive` usage. */
export const useUser = () => {
  if (toValue(isUserLoggedIn)) {
    const username = decodeUsername();
    return reactive(new User(username));
  }

  return reactive(new Guest());
};
