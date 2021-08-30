import { writeFile } from 'fs';

const targetPath = './src/environment/environment.ts';

const envConfigFile = `export const environment = {
  SERVER_BASE_URL: '${process.env.SERVER_BASE_URL}',
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.error(err);
  }
});
