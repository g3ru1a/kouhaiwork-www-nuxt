module.exports = {
	purge: [],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				theme: "#7191C0",
				"theme-light": "#D4E2FC",
				"theme-dark": "#274e87",
				dt: {
					"100": "#121212",
					"200": "#1e1e1e",
					"300": "#222222",
					"400": "#242424",
					"500": "#272727",
					"600": "#2c2c2c",
					"700": "#2e2e2e",
					"800": "#333333",
					"900": "#343434",
					"950": "#383838",
					theme: "#415269"
				},
				nothing: "#FF000000"
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
				"80s": "80vh"
			},
			backgroundOpacity: {
				"7": "0.07",
				"8": "0.08",
				"9": "0.09",
				"11": "0.11",
				"12": "0.12",
				"14": "0.14",
				"15": "0.15",
				"16": "0.16"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
