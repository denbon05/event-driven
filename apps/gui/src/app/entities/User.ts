import { IPerson } from '../../types/person';

export default class User extends IPerson {
  isGuest = false;

  constructor(name: string) {
    super(name);
  }
}
