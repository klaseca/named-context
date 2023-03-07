# Named context

Work with contexts without boilerplate code, in [react](https://github.com/facebook/react) and [solid](https://github.com/solidjs/solid)

## React

### Installation

```sh
npm i named-context-react
```

### API

```typescript
const values = createNamedContext(params);
```

#### params

| Property           | Default value | Description                                                       |
| ------------------ | ------------- | ----------------------------------------------------------------- |
| `name`             | -             | Name of your context. Use as prefix or postfix in returned values |
| `defaultValue`     | -             | Default value of your context                                     |
| `isNullishAllowed` | `false`       | Property that allows the use of `nullish` values in context       |

#### values

| Property                 | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `${params.name}Context`  | Object that includes `Provider` and `Consumer` components                |
| `${params.name}Provider` | `Context.Provider` component. Alias for `${params.name}Context.Provider` |
| `${params.name}Consumer` | `Context.Consumer` component. Alias for `${params.name}Context.Consumer` |
| `use${params.name}`      | Hook to work with data from `${params.name}Context`                      |

### Usage

#### Create context with defined `defaultValue`

```typescript
import { createNamedContext } from 'named-context-react';

const { DataContext, DataProvider, DataConsumer, useData } = createNamedContext(
  { name: 'Data', defaultValue: 0 }
);
```

#### Create context without defined `defaultValue`

If you do not want to pass `defaultValue` when creating a context, use helper function `valueType` to specify type of value you expect

```tsx
import { createNamedContext, valueType } from 'named-context-react';

const { DataContext, DataProvider, DataConsumer, useData } = createNamedContext(
  { name: 'Data', defaultValue: valueType<number>() }
);

// ...

<DataContext.Provider value={1} />
// or
<DataProvider value={1} />
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  `value` prop expects a value of type `number` (as specified in `valueType` function)
*/

// ...

const data = useData();
/* ^^^^^^^^^^^^^^^^^^^^
  `data` is of type `number` (as specified in `valueType` function)
  If `useData` is used outside `DataContext.Provider` or `DataProvider` or if `value` prop is not passed, an error will be throw
*/
```

If `undefined` or `null` value should be allowed, set `isNullishAllowed` param to `true`

```tsx
import { createNamedContext, valueType } from 'named-context-react';

const { NullishContext, NullishProvider, NullishConsumer, useNullish } = createNamedContext(
  { name: 'Nullish', defaultValue: valueType<string>(), isNullishAllowed: true }
);

// ...

<NullishContext.Provider value={undefined} />
// or
<NullishProvider value={''} />
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  `value` prop expects a value of type `string` (as specified in `valueType` function) or `undefined` (because `isNullishAllowed` is `true`)
*/

// ...

const data = useNullish();
/* ^^^^^^^^^^^^^^^^^^^^^^^
  `data` is of type `string` (as specified in `valueType` function) or `undefined` (because `isNullishAllowed` is `true`)
*/
```

## Solid

### Installation

```sh
npm i named-context-solid
```

### API

```typescript
const values = createNamedContext(params);
```

#### params

| Property           | Default value | Description                                                       |
| ------------------ | ------------- | ----------------------------------------------------------------- |
| `name`             | -             | Name of your context. Use as prefix or postfix in returned values |
| `defaultValue`     | -             | Default value of your context                                     |
| `isNullishAllowed` | `false`       | Property that allows the use of `nullish` values in context       |

#### values

| Property                 | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `${params.name}Context`  | `Context` component from `createContext` from `solid-js`                 |
| `${params.name}Provider` | `Context.Provider` component. Alias for `${params.name}Context.Provider` |
| `use${params.name}`      | Hook to work with data from `${params.name}Context`                      |

### Usage

#### Create context with defined `defaultValue`

```typescript
import { createNamedContext } from 'named-context-solid';

const { DataContext, DataProvider, useData } = createNamedContext({
  name: 'Data',
  defaultValue: 0,
});
```

#### Create context without defined `defaultValue`

If you do not want to pass `defaultValue` when creating a context, use helper function `valueType` to specify type of value you expect

```tsx
import { createNamedContext, valueType } from 'named-context-solid';

const { DataContext, DataProvider, useData } = createNamedContext(
  { name: 'Data', defaultValue: valueType<number>() }
);

// ...

<DataContext.Provider value={1} />
// or
<DataProvider value={1} />
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  `value` prop expects a value of type `number` (as specified in `valueType` function)
*/

// ...

const data = useData();
/* ^^^^^^^^^^^^^^^^^^^^
  `data` is of type `number` (as specified in `valueType` function)
  If `useData` is used outside `DataContext.Provider` or `DataProvider` or if `value` prop is not passed, an error will be throw
*/
```

If `undefined` or `null` value should be allowed, set `isNullishAllowed` param to `true`

```tsx
import { createNamedContext, valueType } from 'named-context-solid';

const { NullishContext, NullishProvider, useNullish } = createNamedContext(
  { name: 'Nullish', defaultValue: valueType<string>(), isNullishAllowed: true }
);

// ...

<NullishContext.Provider value={undefined} />
// or
<NullishProvider value={''} />
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  `value` prop expects a value of type `string` (as specified in `valueType` function) or `undefined` (because `isNullishAllowed` is `true`)
*/

// ...

const data = useNullish();
/* ^^^^^^^^^^^^^^^^^^^^^^^
  `data` is of type `string` (as specified in `valueType` function) or `undefined` (because `isNullishAllowed` is `true`)
*/
```
