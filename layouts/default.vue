<template>
<div :class="{'dark': $store.state.dark_theme}">
	<div class="relative min-h-screen font-poppins overflow-x-hidden dark:bg-dt-100" :class="{'flex': !$device.isMobileOrTablet && nav_open}">
        <tailwindhelper></tailwindhelper>
		<TopNav :open="nav_open" v-on:toggle_nav="toggleNav()"></TopNav>
		<SideNav :open="nav_open" v-on:toggle_nav="toggleNav()"></SideNav>
		<Nuxt id="content" class="flex-1 transform transition-all duration-150 pt-16" :class="{'lg:pl-80': nav_open}" />
	</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            nav_open: false,
            touchstartX: 0,
            touchstartY: 0,
            touchendX: 0,
            touchendY: 0,
        }
    },
	mounted() {
		this.nav_open = !this.$device.isMobileOrTablet;
	},
	beforeMount() {
        let d = this;
		window.addEventListener("touchstart", this.startTouch);
        window.addEventListener('touchend', this.endTouch);
	},
	beforeDestroy() {
		window.removeEventListener("touchstart", this.startTouch);
        window.removeEventListener('touchend', this.endTouch);
	},
    methods: {
        toggleNav(){
            this.nav_open = !this.nav_open;
        },
        startTouch(){
            this.touchstartX = event.changedTouches[0].screenX;
            this.touchstartY = event.changedTouches[0].screenY;
        },
        endTouch(){
            this.touchendX = event.changedTouches[0].screenX;
            this.touchendY = event.changedTouches[0].screenY;
            this.handleGesture();
        },
        handleGesture() {
            let screenWidth = window.innerWidth;
            if (this.touchendX < this.touchstartX && this.touchstartX - this.touchendX > screenWidth / 2) {
                this.nav_open = false;
            }
            if (this.touchendX > this.touchstartX && this.touchendX - this.touchstartX > screenWidth / 2) {
                this.nav_open = true;
            }
        }
    },
}
</script>
