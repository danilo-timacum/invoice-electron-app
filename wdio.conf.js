// wdio.conf.js
import { join } from 'path';
import fs from 'fs';
import { getDirname } from 'cross-dirname';

const dirname = getDirname();
const packageJson = JSON.parse(fs.readFileSync('./package.json'));
const {
	build: { productName },
} = packageJson;

export const config = {
	outputDir: 'all-logs',
	// ...
	services: [
		[
			'electron',
			{
				appPath: join(dirname, 'dist'),
				appName: productName,
				appArgs: ['foo', 'bar=baz'],
				chromedriver: {
					port: 9519,
					logFileName: 'wdio-chromedriver.log',
				},
				electronVersion: '26.2.0',
			},
		],
	],
	// ...
};
