// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  input: path.resolve(__dirname, 'src/index.html'), // Specify the path to your index.html
  output: {
    dir: path.resolve(__dirname, 'dist'),
    format: 'es',
  },
});
