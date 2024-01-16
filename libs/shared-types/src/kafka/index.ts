/* eslint-disable @typescript-eslint/no-namespace */
export enum KafkaTopics {
  USER = 'user',
  ERROR = 'error',
}

/** User topic kafka types */
export namespace KafkaUser {
  export enum Keys {
    USER_VERIFIED = 'user_verified',
  }
}
