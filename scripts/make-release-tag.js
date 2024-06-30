import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

try {
  const packageText = readFileSync('./package.json', { encoding: 'utf8' });

  const packageJson = JSON.parse(packageText);

  const { name, version } = ['name', 'version'].reduce(
    (acc, packageJsonProperty) => {
      const value = packageJson[packageJsonProperty];

      if (!value) {
        throw new Error(
          `Not found '${packageJsonProperty}' property in package.json`
        );
      }

      acc[packageJsonProperty] = value;

      return acc;
    },
    {}
  );

  execSync(`git tag ${name}@${version}`, { encoding: 'utf8' });
} catch (error) {
  console.error(error);
  process.exit(1);
}
