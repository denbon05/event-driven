import { createHash } from 'crypto';

export const hashValue = (text: string): string =>
  createHash('sha256').update(text).digest('hex');
