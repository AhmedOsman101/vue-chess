export const getChar = (index: number): string => String.fromCharCode(index);
export const char2num = (char: string): number => char.charCodeAt(0);

export const isNumber = (str: string): boolean => !Number.isNaN(+str);

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
