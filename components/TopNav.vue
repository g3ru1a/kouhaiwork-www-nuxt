<template>
	<div id="navbar" class="navbar" :class="{ stuck: stuck, blocked: !stuck }">
		<p class="navbar-brand">Kouhai.Work</p>
		<button @click="$emit('toggle_nav')" class="navbar-menu">
			<!-- <svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16" />
				</svg> -->
			<img class="navbar-logo" src="/logo_crp.png" alt="" />
			<p class="text-sm uppercase">menu</p>
		</button>
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
	@apply bg-theme;
}
</style>
