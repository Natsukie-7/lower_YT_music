import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import laravel from 'laravel-vite-plugin';
import solid from 'vite-plugin-solid'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/scss/index.scss',
                'resources/ts/main.ts'
            ],
            refresh: true,
        }),
        solid(),
        checker({ typescript: true })
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
