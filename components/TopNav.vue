<template>
	<div id="navbar" class="navbar" :class="{ stuck: stuck, blocked: !stuck }">
		<p class="navbar-brand">Kouhai.Work</p>
		<div class="flex">
			<button @click="toggleDarkMode" class="w-12 text-center hover:bg-theme dark:hover:bg-dt-theme">
				<svg v-if="$store.state.dark_theme" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<svg v-if="!$store.state.dark_theme" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
				</svg>
			</button>
			<button @click="$emit('toggle_nav')" class="navbar-menu">
				<img class="navbar-logo" src="/logo_crp.png" alt="" />
				<p class="text-sm uppercase">menu</p>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		open: Boolean,
		stuck: {
			default: true
		}
	},
	data() {
		return {
			lastScrollTop: 0
		};
	},
	beforeMount() {
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		toggleDarkMode(){
			this.$store.commit('toggleDarkTheme');
		},
		handleScroll(event) {
			let st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > this.lastScrollTop) {
				//scrolldown
				document.getElementById("navbar").classList.add("stuck");
				document.getElementById("navbar").classList.add("-mt-16");
				document.getElementById("navbar").classList.remove("blocked");
			} else {
				//scrollup
				document.getElementById("navbar").classList.add("stuck");
				document.getElementById("navbar").classList.remove("-mt-16");
				document.getElementById("navbar").classList.remove("blocked");
			}
			this.lastScrollTop = st <= 0 ? 0 : st;
		}
	}
};
</script>

<style scoped>
.navbar {
	@apply w-screen max-h-16 items-center justify-between text-white font-bold uppercase bg-gray-700 transition-all duration-300;
	@apply dark:bg-dt-200
}
.navbar.blocked {
	@apply z-50 absolute flex;
}
.navbar.stuck {
	@apply z-50 fixed flex;
}
.navbar-brand {
	@apply p-4;
}
.navbar-logo {
	@apply w-8 h-auto mx-auto;
}
.navbar-menu {
	@apply px-4 py-3 focus:outline-none flex items-center space-x-1 h-full;
}
.navbar-menu:hover {
	@apply bg-theme dark:bg-dt-theme;
}
</style>
