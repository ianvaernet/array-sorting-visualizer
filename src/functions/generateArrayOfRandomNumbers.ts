export const generateArrayOfRandomNumbers = ({
  length,
  minAllowedNumber = 0,
  maxAllowedNumber = 100,
}: {
  length: number;
  minAllowedNumber?: number;
  maxAllowedNumber?: number;
}) =>
  Array(length)
    .fill(0)
    .map(() => Math.round(Math.random() * (maxAllowedNumber - minAllowedNumber) + minAllowedNumber));
