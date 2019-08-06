interface Left<A> {
    kind: "left";
    value: A;
}

interface Right<B> {
    kind: "right";
    value: B;
}

type Either<A, B> = Left<A> | Right<B>

const newLeft = <A, B>(a: A): Either<A, B> => ({ kind: "left", value: a })
const newRight = <A, B>(b: B): Either<A, B> => ({ kind: "right", value: b })

const mapEither = <A, B, C>(f: (value: B) => C) => (either: Either<A, B>): Either<A, C> => {
    switch(either.kind) {
        case "left": return either;
        case "right": return { kind: "right", value: f(either.value) }
    }
}

const flatMapEither = <A, B, C>(f: (value: B) => Either<A, C>) => (either: Either<A, B>): Either<A, C> => {
    switch(either.kind) {
        case "left": return either;
        case "right": return f(either.value)
    }
}

const branch = <A, B>(condition: (value: B) => boolean, left: A) => flatMapEither((value: B) => condition(value) ? newLeft(left) : newRight(value))

const addProps = <A, B, C>(makeProps: (props: B) => C) => mapEither((props: B) => ({...props, ...makeProps(props)}))

const render = <A, B, C>(fromProps: (props: B) => C) => mapEither(fromProps)

const returns = <A, B, C>(f: (props: B) => C) => flatMapEither((props: B) => newLeft(f(props)))

const flow2 = <A, B, C>(f1: (a: A) => B, f2: (b: B) => C) => (a: A) => f2(f1( a))
const flow3 = <A, B, C, D>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D) => (a: A) => f3(f2(f1(a)))

const fromEither = <A>(either: Either<A, A>): A => either.value

const testFunc = (o: {x: number}) => `${o.x}`

const initialValue: Either<{}, {}> = newRight({})

const finalFunc = fromEither(flow3(
    addProps(() => ({x: 1})),
    addProps(() => ({y: "some string"})),
    render(testFunc)
)(initialValue))

