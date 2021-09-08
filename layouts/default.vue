<template>
	<div class="relative min-h-screen font-poppins overflow-x-hidden" :class="{'flex': !$device.isMobileOrTablet && nav_open}">
		<tailwindhelper></tailwindhelper>
		<TopNav :open="nav_open" v-on:toggle_nav="toggleNav()"></TopNav>
		<SideNav :open="nav_open" v-on:toggle_nav="toggleNav()"></SideNav>
		<Nuxt id="content" class="flex-1 transform transition-all duration-150 pt-16" :class="{'lg:pl-80': nav_open}" />
	</div>
</template>

<script>
export default {
    data() {
        return {
            nav_open: false
        }
    },
	mounted() {
		this.nav_open = !this.$device.isMobileOrTablet;
	},
    methods: {
        toggleNav(){
            this.nav_open = !this.nav_open;
        },
    },
}
</script>

<style>
/* width */
::-webkit-scrollbar {
	width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px grey;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: rgb(85, 85, 85);
	border-radius: 10px;
}
</style>
