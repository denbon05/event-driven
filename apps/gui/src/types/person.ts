export abstract class IPerson {
  isGuest: boolean = true;

  readonly name: string = '';

  constructor(name = '') {
    this.name = name;
  }
}
