import { createContext, useContext } from 'solid-js';
import { NamedContext, Params } from './types.js';

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
    hook: `use${name}`,
  };

  const Context = createContext(defaultValue);

  const useNamedContext = () => {
    const context = useContext(Context);

    if (isNullishAllowed === false && context == null) {
      throw new Error(
        `${names.hook} has to be used within <${names.context}.Provider>`
      );
    }

    return context;
  };

  return {
    [names.context]: Context,
    [names.provider]: Context.Provider,
    [names.hook]: useNamedContext,
  } as NamedContext<Value, Name, NullishAllowed>;
};

export const valueType = <T = undefined>(): T | undefined => undefined;
