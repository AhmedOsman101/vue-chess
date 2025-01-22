export const getChar = (index: number): String => String.fromCharCode(index);
export const char2num = (char: String): number => char.charCodeAt(0);

export const isNumber = (str: string): boolean => !isNaN(+str);

export function* range(
  start = 0,
  end = Infinity,
  step = 1,
): Generator<number, void, unknown> {
  let i = start;
  while (i != end) {
    yield i;
    i += step;
  }
}
