// @flow

const nowErrorSym = Symbol("now-error");

export type NowError<Code, Meta> = {
  "@@nowError": Symbol,
  code: Code,
  meta?: Meta,
  err: Error
};

export function isNowError(obj: Object) /* : boolean %checks */ {
  return obj["@@nowError"] === nowErrorSym;
}

type NowErrorArgs<Code, Meta> = {
  code: Code,
  meta?: Meta,
  // You may want to wrap an error object to provide more context
  // Otherwise, createNowError will create an Error object, which
  // kinda preserves the stack-trace as well... the createNowError
  // call will be in the stack-trace though
  err?: Error
};

export function createNowError<Code, Meta>({
  code,
  meta,
  err
}: NowErrorArgs<Code, Meta>): NowError<Code, Meta> {
  return {
    "@@nowError": nowErrorSym,
    code,
    meta,
    err: err || new Error()
  };
}

/**
const myFun = () => {
  throw new Error("myFun failed hard");
};

const main = () => {
  try {
    myFun();
  } catch (err) {
    const nowErr = createNowError({
      code: "Test",
      meta: {
        foo: "bar"
      },
      err,
    });

    if (isNowError(nowErr)) {
      switch (nowErr.code) {
        case "Test":
          if (nowErr.meta != null) {
            const { foo } = nowErr.meta;
            console.log("hi");
            console.log(nowErr.err);
          }
          break;
      }
    }
  }
};

main();

**/
