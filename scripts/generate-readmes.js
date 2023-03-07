import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { configure, renderFile } from 'eta';

configure({
  tags: ['{{', '}}'],
});

const createReadme = async (templatePathRelative, packagePathRelative) => {
  const templatePath = fileURLToPath(
    new URL(templatePathRelative, import.meta.url)
  );

  const readme = await renderFile(templatePath, {});

  const readmePath = fileURLToPath(
    new URL(join(packagePathRelative, 'README.md'), import.meta.url)
  );

  await writeFile(readmePath, readme);
};

const readmeConfigList = [
  {
    templatePath: '../templates/readme.eta',
    packagePath: '../',
  },
  {
    templatePath: '../templates/readme-react.eta',
    packagePath: '../packages/react',
  },
  {
    templatePath: '../templates/readme-solid.eta',
    packagePath: '../packages/solid',
  },
];

for (const { templatePath, packagePath } of readmeConfigList) {
  await createReadme(templatePath, packagePath);
}
