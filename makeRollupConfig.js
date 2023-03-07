import { readFileSync } from 'node:fs';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export const makeRollupConfig = (ext) => {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

  const externals = new Set(
    [pkg.dependencies, pkg.peerDependencies, pkg.peerDependenciesMeta]
      .filter(Boolean)
      .flatMap(Object.keys)
  );

  return defineConfig([
    {
      input: `./src/index.${ext}`,
      output: [
        { format: 'esm', file: './dist/index.mjs' },
        { format: 'cjs', file: './dist/index.cjs' },
      ],
      plugins: [typescript({ tsconfig: './tsconfig.build.json' })],
      external: (source) => externals.has(source.replace(/\/.*/, '')),
    },
    {
      input: `./src/index.${ext}`,
      output: [
        { format: 'esm', file: './dist/index.d.mts' },
        { format: 'cjs', file: './dist/index.d.cts' },
      ],
      plugins: [dts({ tsconfig: './tsconfig.build.json' })],
    },
  ]);
};
