import { Context } from 'solid-js';

type Provider<T> = Context<T>['Provider'];

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

export type ContextValues<
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
