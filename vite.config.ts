/// <reference types="vitest" />

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		react(),
		svgr({
			svgrOptions: { dimensions: false, exportType: "named", ref: true, svgo: false, titleProp: true },
			include: "**/*.svg",
		}),
	],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest-setup.ts",
	},
});
