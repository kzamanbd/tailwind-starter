import { glob } from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const entries = glob.sync('./pages/**/*.html').reduce((acc, path) => {
    const name = path.split('/').join('-').split('.').shift();
    acc[name] = path;
    return acc;
}, {});
entries['main'] = resolve(__dirname, 'index.html');

export default defineConfig({
    optimizeDeps: {
        entries: Object.keys(entries),
    },
    plugins: [],
    build: {
        target: 'esnext',
        chunkSizeWarningLimit: 1000, // 1000KiB
    },
    server: {
        port: 6500,
        open: true,
    },
});
