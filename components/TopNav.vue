<template>
    <div class="navbar" :class="{'absolute': open}">
			<p class="navbar-brand">Kouhai.Work</p>
			<button @click="$emit('toggle_nav');" class="navbar-menu">
				<svg
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
				</svg>
			</button>
		</div>
</template>

<script>
export default {
    props: {
        open: Boolean,
    },
}
</script>

<style scoped>
.navbar {
	@apply w-screen lg:hidden flex items-center justify-between text-white font-bold uppercase bg-theme-dark transform transition-all duration-300;
}
.navbar-brand {
    @apply p-4
}
.navbar-menu {
    @apply p-4 focus:outline-none
}
.navbar-menu:hover {
    @apply bg-theme
}
</style>