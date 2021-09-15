module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				theme: "#7191C0",
				"theme-light": "#D4E2FC",
				"theme-dark": "#274e87"
			},
			fontFamily: {
				montseratt: ["Montseratt", "sans-serif"],
				poppins: ["Poppins", "serif"]
			},
			boxShadow: {
				"2xl": "0 5px 30px 5px rgba(0, 0, 0, 0.5)"
			},
			margin: {
				"-screen": "-100vw"
			},
			screens: {
				"3xl": "2000px"
			},
			scale: {
				"200": "2"
			},
			minWidth: {
				"0": "0",
				"1/4": "25%",
				"1/2": "50%",
				"1/3": "33%",
				"3/4": "75%",
				full: "100%",
				screen: "100vw"
			},
			zIndex: {
				"70": 70,
				"80": 80,
				"90": 90,
				"100": 100
			},
			spacing: {
				'80s': '80vh',
			},
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
