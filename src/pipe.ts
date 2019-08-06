function pipe<TInput, TResult>(
  input: TInput,
  transform: (value: TInput) => TResult
): TResult;
function pipe<TInput, T1, TResult>(
  input: TInput,
  transform1: (value: TInput) => T1,
  transform2: (value: T1) => TResult
): TResult;
function pipe<TInput, T1, T2, TResult>(
  input: TInput,
  transform1: (value: TInput) => T1,
  transform2: (value: T1) => T2,
  transform3: (value: T2) => TResult
): TResult;
function pipe<TInput, T1, T2, T3, TResult>(
  input: TInput,
  transform1: (value: TInput) => T1,
  transform2: (value: T1) => T2,
  transform3: (value: T2) => T3,
  transform4: (value: T3) => TResult
): TResult;
function pipe<TInput, T1, T2, T3, T4, TResult>(
  input: TInput,
  transform1: (value: TInput) => T1,
  transform2: (value: T1) => T2,
  transform3: (value: T2) => T3,
  transform4: (value: T3) => T4,
  transform5: (value: T4) => TResult
): TResult;
function pipe<TInput, T1, T2, T3, T4, T5, TResult>(
  input: TInput,
  transform1: (value: TInput) => T1,
  transform2: (value: T1) => T2,
  transform3: (value: T2) => T3,
  transform4: (value: T3) => T4,
  transform5: (value: T4) => T5,
  transform6: (value: T5) => TResult
): TResult;

function pipe() {
  return Array.prototype.reduce.call(
    arguments,
    (acc: any, elem: Function, index: number) =>
      index === 0 ? acc : elem(acc),
    arguments[0]
  );
}

export default pipe;
