import { screen } from '@testing-library/react';
import { expect } from 'vitest';

const testText = 'Value is:';

const testTextRegex = new RegExp(`^${testText}`);

const expectResult = (value: unknown) => `${testText} ${value}`;

export const testExpect = (value: unknown) =>
  expect(screen.getByText(testTextRegex).textContent).toBe(expectResult(value));

export const renderFn = (value: unknown) => <>{`Value is: ${value}`}</>;

export const createTestHookComponent =
  <T,>(useContextHook: () => T) =>
  () => {
    const value = useContextHook();

    return renderFn(value);
  };
