export default defineNuxtConfig({
	css: [
		'primevue/resources/themes/arya-orange/theme.css',
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
})
