import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { createNamedContext, valueType } from 'named-context-react';
import {
  createTestHookComponent,
  renderFn,
  testExpect,
} from './testHelpers.js';

afterEach(cleanup);

describe('Context with defined default value and without allowed nullish value', () => {
  const defaultValue = 0;

  const { TestContext, TestConsumer, TestProvider, useTest } =
    createNamedContext({ name: 'Test', defaultValue });

  const TestHook = createTestHookComponent(useTest);

  describe('Use default value', () => {
    it.each([TestContext.Consumer, TestConsumer])(
      'Value from consumer %#',
      (Consumer) => {
        render(<Consumer>{renderFn}</Consumer>);

        testExpect(defaultValue);
      }
    );

    it('Value from hook', () => {
      render(<TestHook />);

      testExpect(defaultValue);
    });
  });

  describe.each([
    [TestContext.Provider, 21],
    [TestProvider, 1234],
  ])('Use value from provider %#', (Provider, value) => {
    const providerRender = (ui: JSX.Element) =>
      render(<Provider value={value}>{ui}</Provider>);

    it.each([TestContext.Consumer, TestConsumer])(
      'Value from consumer %#',
      (Consumer) => {
        providerRender(<Consumer>{renderFn}</Consumer>);

        testExpect(value);
      }
    );

    it('Value from hook', () => {
      providerRender(<TestHook />);

      testExpect(value);
    });
  });
});

describe('Context without defined default value and without allowed nullish value', () => {
  const { TestContext, TestConsumer, TestProvider, useTest } =
    createNamedContext({ name: 'Test', defaultValue: valueType<string>() });

  const TestHook = createTestHookComponent(useTest);

  describe('Use default value', () => {
    it.each([TestContext.Consumer, TestConsumer])(
      'Consumer should throw an error %#',
      (Consumer) => {
        expect(() => render(<Consumer>{renderFn}</Consumer>)).toThrowError();
      }
    );

    it('Hook should throw an error', () => {
      expect(() => render(<TestHook />)).toThrowError();
    });
  });

  describe.each([
    [TestContext.Provider, 'value'],
    [TestProvider, ''],
  ])('Use value from provider %#', (Provider, value) => {
    const providerRender = (ui: JSX.Element) =>
      render(<Provider value={value}>{ui}</Provider>);

    it.each([TestContext.Consumer, TestConsumer])(
      'Value from consumer %#',
      (Consumer) => {
        providerRender(<Consumer>{renderFn}</Consumer>);

        testExpect(value);
      }
    );

    it('Value from hook', () => {
      providerRender(<TestHook />);

      testExpect(value);
    });
  });
});

describe('Context without defined default value and with allowed nullish value', () => {
  const { TestContext, TestConsumer, TestProvider, useTest } =
    createNamedContext({
      name: 'Test',
      defaultValue: valueType<boolean>(),
      isNullishAllowed: true,
    });

  const TestHook = createTestHookComponent(useTest);

  describe('Use default value', () => {
    it.each([TestContext.Consumer, TestConsumer])(
      'Value from consumer %#',
      (Consumer) => {
        render(<Consumer>{renderFn}</Consumer>);

        testExpect(undefined);
      }
    );

    it('Value from hook', () => {
      render(<TestHook />);

      testExpect(undefined);
    });
  });

  describe.each([
    [TestContext.Provider, true],
    [TestProvider, false],
  ])('Use value from provider %#', (Provider, value) => {
    const providerRender = (ui: JSX.Element) =>
      render(<Provider value={value}>{ui}</Provider>);

    it.each([TestContext.Consumer, TestConsumer])(
      'Value from consumer %#',
      (Consumer) => {
        providerRender(<Consumer>{renderFn}</Consumer>);

        testExpect(value);
      }
    );

    it('Value from hook', () => {
      providerRender(<TestHook />);

      testExpect(value);
    });
  });
});
