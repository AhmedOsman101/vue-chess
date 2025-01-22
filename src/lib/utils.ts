export const getChar = (index: number): String => String.fromCharCode(index);
export const getFile = (file: number): String => getChar(97 + file);

export function* range(
  start = 0,
  end = Infinity,
  step = 1
): Generator<number, void, unknown> {
  let i = start;
  while (i != end) {
    yield i;
    i += step;
  }
}
