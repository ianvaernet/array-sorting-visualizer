import { Sleep } from '../types';

export const sleep: Sleep = (miliseconds) => new Promise((resolve) => setTimeout(resolve, miliseconds));
