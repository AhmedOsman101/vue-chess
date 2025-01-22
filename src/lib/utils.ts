export const getChar = (index: number): String => String.fromCharCode(index);
export const getFile = (file: number): String => getChar(97 + file);

export function* range(
  start = 0,
  end = Infinity,
  step = 1
): Generator<number, number, unknown> {
  let iterationCount = 0;
  // for (let i = start; i != end; i += step) {
  //   iterationCount++;
  //   yield i;
  // }
  let i = start;
  while (i != end) {
    iterationCount++;
    yield i;
    i += step;
  }
  return iterationCount;
}
