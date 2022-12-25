import Components from "unplugin-vue-components/vite";
import {  PrimeVueResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
	css: [
		'primevue/resources/themes/arya-blue/theme.css',
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'primeflex/primeflex.css',
		'~/assets/scss/theme.scss'
	],

	build: {
		transpile: ['primevue']
	},

	modules: [
		'@pinia/nuxt'
	],

	vite: {
		plugins: [
		  	Components({
				dts: true,
				resolvers: [
					PrimeVueResolver()
				]
		  	})
		],
	},
})
