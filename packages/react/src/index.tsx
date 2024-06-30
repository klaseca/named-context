import { ConsumerProps, createContext, useContext } from 'react';
import { NamedContext, Params, ValueType } from './types.js';

export const createNamedContext = <
  Value,
  Name extends string,
  NullishAllowed extends boolean = false
>({
  name,
  defaultValue,
  isNullishAllowed = false as NullishAllowed,
}: Params<Value, Name, NullishAllowed>): NamedContext<
  Value,
  Name,
  NullishAllowed
> => {
  if (typeof name !== 'string') {
    throw new TypeError('Property `name` should be a string');
  }

  const names = {
    context: `${name}Context`,
    provider: `${name}Provider`,
    consumer: `${name}Consumer`,
    hook: `use${name}`,
  };

  const Context = createContext(defaultValue);

  Context.displayName = names.context;

  const handleValue = (value: Value) => {
    if (isNullishAllowed === false && value == null) {
      throw new Error(
        `${names.hook} has to be used within <${names.context}.Provider>`
      );
    }

    return value as ValueType<Value, NullishAllowed>;
  };

  const NamedConsumer = ({
    children,
  }: ConsumerProps<ValueType<Value, NullishAllowed>>) => (
    <Context.Consumer>
      {(value) => children(handleValue(value))}
    </Context.Consumer>
  );

  const useNamedContext = () => {
    const context = useContext(Context);

    return handleValue(context);
  };

  return {
    [names.context]: { Provider: Context.Provider, Consumer: NamedConsumer },
    [names.provider]: Context.Provider,
    [names.consumer]: NamedConsumer,
    [names.hook]: useNamedContext,
  } as NamedContext<Value, Name, NullishAllowed>;
};

export const valueType = <T extends unknown = undefined>(): T | undefined =>
  undefined;
