<template>
	<div class="relative min-h-screen lg:flex font-poppins">
        <tailwindhelper></tailwindhelper>
		<TopNav :open="nav_open" v-on:toggle_nav="toggleNav()"></TopNav>
		<SideNav :open="nav_open" v-on:toggle_nav="toggleNav()"></SideNav>
		<Nuxt class="flex-1" />
	</div>
</template>

<script>
export default {
    data() {
        return {
            nav_open: false
        }
    },
    methods: {
        toggleNav(){
            this.nav_open = !this.nav_open;
        }
    }
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
