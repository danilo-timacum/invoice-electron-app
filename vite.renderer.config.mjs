import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config
// export default defineConfig({});
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main_window: path.resolve(__dirname, 'index.html'),
				modal_window: path.resolve(__dirname, 'test.html'),
			},
		},
	},
});
