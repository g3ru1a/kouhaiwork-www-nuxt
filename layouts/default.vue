<template>
    <div :class="{'dark': dark_mode}">
        <div class="relative min-h-screen font-poppins overflow-x-hidden dark:bg-dt-100" :class="{'flex': !$device.isMobileOrTablet && nav_open}">
            <tailwindhelper v-show="inDevMode"></tailwindhelper>
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
            inDevMode: process.env.NODE_ENV === 'development',
            dark_mode: false,
        }
    },
	mounted() {
		this.nav_open = !this.$device.isMobileOrTablet;
        this.dark_mode = this.darkModeEnabled;
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
            this.$store.commit('setSideBarOpen', this.nav_open);
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
            let swipeLengthMin = Math.min(screenWidth / 2, 250);
            // console.log(screenWidth /2, swipeLengthMin);
            if (this.touchendX < this.touchstartX && this.touchstartX - this.touchendX > swipeLengthMin) {
                // console.log(this.touchstartX - this.touchendX);
                this.nav_open = false;
            }
            if (this.touchendX > this.touchstartX && this.touchendX - this.touchstartX > swipeLengthMin) {
                // console.log(this.touchendX - this.touchstartX);
                this.nav_open = true;
            }
        }
    },
    computed: {
        darkModeEnabled(){
            return this.$store.state.dark_theme;
        }
    },
    watch: {
        darkModeEnabled: function(val) {
            this.dark_mode = val;
        }
    },
    head: {
        meta: [
			{
				hid: "description",
				name: "description",
				content:
					"The site made by a scans group for the scans groups, offering ad-free user experience and easy-to-use interface."
			},
			{
                hid: 'og-title',
				property: "og:title",
				content: "Kouhai Work"
			},
			{
                hid: 'og-description',
				property: "og:description",
				content:
					"The site made by a scans group for the scans groups, offering ad-free user experience and easy-to-use interface."
			},
			{
                hid: 'og-image',
				property: "og:image",
				content: "https://kouhai.work/logo.png"
			},
			{
                hid: 'og-url',
				property: "og:url",
				content: "https://kouhai.work"
			}
		],
    }
}
</script>
