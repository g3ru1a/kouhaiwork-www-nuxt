export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		__dangerouslyDisableSanitizers: ["script"],
		title: "Kouhai Work",
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ name: "format-detection", content: "telephone=no" }
		],
		link: [
			{ rel: "icon", type: "image/png", href: "/logo_crp.png" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
			},
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
			}
		],
		script: [
			{
				src: "https://www.googletagmanager.com/gtag/js?id=G-SX1SY7E2RS",
				async: true
			},
			{
				type: "text/javascript",
				hid: "ga",
				innerHTML: `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-SX1SY7E2RS');`
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"~/assets/custom.css",

		"quill/dist/quill.core.css",
		// for snow theme
		"quill/dist/quill.snow.css"
		// for bubble theme
		// "quill/dist/quill.bubble.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: "~plugins/nuxt-quill-plugin", ssr: false },
		{ src: "~plugins/vuex-persist.js", ssr: false },
		"~/plugins/axios",
		"~/plugins/directives"
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: {
		dirs: [
			"~/components",
			"~/components/dev",
			"~/components/r0",
			"~/components/r2",
			"~/components/r3"
		]
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/tailwindcss
		"@nuxtjs/tailwindcss",
		"@nuxtjs/device"
		// "@nuxtjs/google-analytics"
	],

	// googleAnalytics: {
	// 	id: "G-SX1SY7E2RS"
	// },

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ["@nuxtjs/axios"],

	axios: {
		baseURL: process.env.APP_API_URL || "https://api.kouhai.work/api/"
		// baseURL: "http://localhost:8000/api/"
	},

	env: {
		apiURL: process.env.APP_API_URL || "https://api.kouhai.work/api/",
		appVersion: process.env.APP_VERSION || "2.0.0"
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
};
