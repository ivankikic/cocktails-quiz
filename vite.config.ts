import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions  } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
	includeAssets: ["manifest-icon-192.maskable.png", "apple-icon-180.png", "logo512.png", "logo192.png"],
	manifest: {
		name: "Cocktail Quiz",
		short_name: "Cocktail Quiz",
		description: "An app that can show weather forecast for your city.",
		icons: [
			{
				src: "/logo192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/logo512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/apple-icon-180.png",
				sizes: "180x180",
				type: "image/png",
				purpose: "apple touch icon",
			},
			{
				src: "/manifest-icon-192.maskable.png",
				sizes: "225x225",
				type: "image/png",
				purpose: "any maskable",
			},
		],
		theme_color: "#171717",
		background_color: "#e8ebf2",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
