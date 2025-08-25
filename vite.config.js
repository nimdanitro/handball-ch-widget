/// <reference types="vitest" />

import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";
import { VitePWA } from "vite-plugin-pwa";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	build: {
		outDir: "build",
		sourcemap: true,
		minify: "esbuild",
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			treeshake: {
				preset: "recommended",
			},
			output: {
				minifyInternalExports: true,
				assetFileNames: "assets/[name]-[hash][extname]",
				chunkFileNames: "assets/[name]-[hash].js",
				entryFileNames: "assets/[name]-[hash].js",
			},
		},
	},
	define: {
		global: "globalThis",
	},
	plugins: [
		react({ devTarget: "es2022" }),
		viteTsconfigPaths(),
		svgrPlugin(),
		biomePlugin(),
		VitePWA({
			registerType: "autoUpdate",
			strategies: "generateSW",
			injectRegister: "auto",
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,pbf,json}"],
				navigateFallbackDenylist: [/^\/oauth2/, /^\/api/],
				maximumFileSizeToCacheInBytes: 3145728, // 3MB
			},
			manifest: {
				short_name: "Handball Resultate",
				name: "Handball Resultate",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				start_url: ".",
				theme_color: "#000000",
				background_color: "#ffffff",
			},
		}),
	],
	server: {
		// this ensures that the browser opens upon server start
		open: true,
		port: 3000,
		proxy: {
			"/rest": {
				target: "https://clubapi-test.handball.ch/rest",
				changeOrigin: true,
				auth: process.env.VITE_API_AUTH_TOKEN,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
});
