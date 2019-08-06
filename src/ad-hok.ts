import pipe from "./pipe";

interface Left<A> {
  kind: "left";
  value: A;
}

interface Right<B> {
  kind: "right";
  value: B;
}

type Either<A, B> = Left<A> | Right<B>;

const newLeft = <A, B>(value: A): Either<A, B> => ({ kind: "left", value });
const newRight = <A, B>(value: B): Either<A, B> => ({ kind: "right", value });

const mapEither = <A, B, C>(f: (value: B) => C) => (
  either: Either<A, B>
): Either<A, C> => {
  switch (either.kind) {
    case "left":
      return either;
    case "right":
      return { kind: "right", value: f(either.value) };
  }
};

const flatMapEither = <A, B, C>(f: (value: B) => Either<A, C>) => (
  either: Either<A, B>
): Either<A, C> => {
  switch (either.kind) {
    case "left":
      return either;
    case "right":
      return f(either.value);
  }
};

const branch = <A, B>(
  condition: (value: B) => boolean,
  left: (value: B) => A
): ((either: Either<A, B>) => Either<A, B>) =>
  flatMapEither((value: B) =>
    condition(value) ? newLeft(left(value)) : newRight(value)
  );

const addProps = <A, B, C>(makeProps: (props: B) => C) =>
  mapEither((props: B) => ({ ...props, ...makeProps(props) }));

const render = <A, B, C>(fromProps: (props: B) => C) => mapEither(fromProps);

const returns = <A, B>(f: (props: B) => A) =>
  flatMapEither((props: B) => newLeft(f(props)));

const fromEither = <A>(either: Either<A, A>): A => either.value;

const initialValue: Either<{}, {}> = newRight({});

const finalFunc = fromEither(
  pipe(
    initialValue,
    addProps(() => ({ x: 1 })),
    branch(({ x }) => x > 10, ({ x }) => `${x} is too big`),
    addProps(() => ({ y: "some string" })),
    render(({ x }) => `x is ${x}`)
  )
);
