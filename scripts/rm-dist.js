import { rm } from 'node:fs/promises';

rm('./dist', { force: true, recursive: true }).catch((error) => {
  console.error(error);
  process.exit(1);
});
