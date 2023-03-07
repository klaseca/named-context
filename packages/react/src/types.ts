import { Consumer, Provider } from 'react';

export type Params<
  Value,
  Name extends string,
  NullishAllowed extends boolean
> = {
  name: Name;
  defaultValue: Value;
  isNullishAllowed?: NullishAllowed;
};

export type ValueType<
  Value,
  NullishAllowed extends boolean = false
> = NullishAllowed extends true ? Value : NonNullable<Value>;

type Context<T> = {
  Provider: Provider<T>;
  Consumer: Consumer<T>;
};

type ContextValues<
  Value,
  Name extends string,
  NullishAllowed extends boolean
> = {
  context: {
    name: `${Name}Context`;
    value: Context<ValueType<Value, NullishAllowed>>;
  };
  provider: {
    name: `${Name}Provider`;
    value: Provider<ValueType<Value, NullishAllowed>>;
  };
  consumer: {
    name: `${Name}Consumer`;
    value: Consumer<ValueType<Value, NullishAllowed>>;
  };
  hook: { name: `use${Name}`; value: () => ValueType<Value, NullishAllowed> };
};

export type NamedContext<
  Value,
  Name extends string,
  NullishAllowed extends boolean
> = {
  [Key in keyof ContextValues<Value, Name, NullishAllowed> as ContextValues<
    Value,
    Name,
    NullishAllowed
  >[Key]['name']]: ContextValues<Value, Name, NullishAllowed>[Key]['value'];
};
