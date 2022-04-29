import { Block } from '../types';

export const generateBlocksArray = ({
  length,
  minAllowedNumber = 0,
  maxAllowedNumber = 100,
}: {
  length: number;
  minAllowedNumber?: number;
  maxAllowedNumber?: number;
}): Block[] =>
  Array(length)
    .fill(0)
    .map((_, index) => ({
      key: index,
      number: Math.round(Math.random() * (maxAllowedNumber - minAllowedNumber) + minAllowedNumber),
      x: 0,
      y: 0,
      classNames: [],
    }));
