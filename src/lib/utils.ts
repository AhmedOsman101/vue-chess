export const getChar = (index: number): string => String.fromCharCode(index);
export const char2num = (char: string): number => char.charCodeAt(0);

export const isNumber = (value: string | number) => !Number.isNaN(+value);

export function* range(
  start = 0,
  end = Number.POSITIVE_INFINITY,
  step = 1
): Generator<number, void, unknown> {
  let i = start;
  while (i !== end) {
    yield i;
    i += step;
  }
}

export const getUnique = (arr: number[]): number | undefined => {
  let zeroCount = 0;
  const unique = arr.reduce((a, b) => {
    if (b === 0) zeroCount++;
    return a ^ b;
  });
  if (zeroCount > 1 && unique === 0) return undefined;

  return unique;
};

// Function to generate random integers within a range
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
