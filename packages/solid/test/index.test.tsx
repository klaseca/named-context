import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@solidjs/testing-library';
import { JSX } from 'solid-js';
import { createNamedContext, valueType } from 'named-context-solid';
import { createTestHookComponent, testExpect } from './testHelpers.js';

afterEach(cleanup);

describe('Context with defined default value and without allowed nullish value', () => {
  const defaultValue = 0;

  const { TestContext, TestProvider, useTest } = createNamedContext({
    name: 'Test',
    defaultValue,
  });

  const TestHook = createTestHookComponent(useTest);

  it('Use default value', () => {
    render(() => <TestHook />);

    testExpect(defaultValue);
  });

  it.each([
    [TestContext.Provider, 21],
    [TestProvider, 1234],
  ])('Use value from provider %#', (Provider, value) => {
    const providerRender = (ui: () => JSX.Element) =>
      render(() => <Provider value={value}>{ui}</Provider>);

    providerRender(() => <TestHook />);

    testExpect(value);
  });
});

describe('Context without defined default value and without allowed nullish value', () => {
  const { TestContext, TestProvider, useTest } = createNamedContext({
    name: 'Test',
    defaultValue: valueType<string>(),
  });

  const TestHook = createTestHookComponent(useTest);

  it('Hook should throw an error', () => {
    expect(() => render(() => <TestHook />)).toThrowError();
  });

  it.each([
    [TestContext.Provider, 'value'],
    [TestProvider, ''],
  ])('Use value from provider %#', (Provider, value) => {
    const providerRender = (ui: () => JSX.Element) =>
      render(() => <Provider value={value}>{ui}</Provider>);

    providerRender(() => <TestHook />);

    testExpect(value);
  });
});

describe('Context without defined default value and with allowed nullish value', () => {
  const { TestContext, TestProvider, useTest } = createNamedContext({
    name: 'Test',
    defaultValue: valueType<boolean>(),
    isNullishAllowed: true,
  });

  const TestHook = createTestHookComponent(useTest);

  const defaultValue = undefined;

  it('Value from hook', () => {
    render(() => <TestHook />);

    testExpect(defaultValue);
  });

  it.each([
    [TestContext.Provider, true],
    [TestProvider, false],
  ])('Use value from provider %#', (Provider, value) => {
    const providerRender = (ui: () => JSX.Element) =>
      render(() => <Provider value={value}>{ui}</Provider>);

    providerRender(() => <TestHook />);

    testExpect(value);
  });
});
