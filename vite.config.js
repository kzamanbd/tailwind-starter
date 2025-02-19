import { glob } from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const entries = glob.sync('./pages/**/*.html').reduce((acc, path) => {
    const name = path.split('/').join('-').split('.').shift();
    acc[name] = path;
    return acc;
}, {});

export default defineConfig({
    plugins: [],
    optimizeDeps: {
        entries: Object.keys(entries),
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                ...entries,
                main: resolve(__dirname, 'index.html'),
            },
        },
        chunkSizeWarningLimit: 1000, // 1000KiB
    },
    server: {
        port: 6500,
        open: true,
    },
});
