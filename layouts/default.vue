<template>
    <div :class="{'dark': dark_mode}">
        <div class="relative min-h-screen font-poppins overflow-x-hidden dark:bg-dt-100" :class="{'flex': !$device.isMobileOrTablet && nav_open}">
            <tailwindhelper v-show="inDevMode"></tailwindhelper>
            <TopNav :open="nav_open" v-on:toggle_nav="toggleNav()"></TopNav>
            <SideNav :open="nav_open" v-on:toggle_nav="toggleNav()"></SideNav>
            <Nuxt id="content" class="flex-1 transform transition-all duration-150 pt-16" :class="{'lg:pl-80': nav_open}" />
        </div>
        <div v-show="show_cookie_banner" class="fixed bottom-0 left-0 right-0 bg-theme-light shadow-lg z-100">
            <div class="w-full flex flex-col md:flex-row items-center justify-evenly p-4">
                <h1 class="text-lg font-bold">Let us know if you agree to cookies</h1>
                <p class="text-center">We use <nuxt-link to="/cookies" class="text-yellow-600">cookies</nuxt-link> to give you the best online experience and to monitor the websites performance.</p>
                <div class="flex space-x-2">
                    <button class="btn btn-theme" @click="updateCookies(true)">Yes, I agree</button>
                    <button class="btn btn-theme-inv" @click="cookie_settings.show = true">No, see cookie options </button>
                </div>
            </div>
        </div>
        <div v-show="cookie_settings.show" class="fixed pin z-100 flex items-center justify-center bg-black bg-opacity-50 px-2 md:p-0">
            <div class="bg-white p-4 rounded shadow-lg w-full md:w-2/3 lg:w-1/2">
                <h1 class="mb-2 text-center text-xl">Cookie settings</h1>
                <p class="mb-2 font-semibold">Required Cookies</p>
                <p class="mb-2 pl-2">These cookies are essential so that you can move around the website and use its features.</p>
                <p class="mb-2 font-semibold">Functional Cookies</p>
                <p class="mb-2 pl-2">These cookies are used for customizing your experience. (i.e Saving your Reader configuration)</p>
                <p class="mb-2 font-semibold">Performance Cookies
                    <span @click="cookie_settings.use_cookies = false" v-show="cookie_settings.use_cookies == true" class="bg-red-500 px-4 py-2 text-white cursor-pointer">Opt Out</span>
                    <span @click="cookie_settings.use_cookies = true" v-show="cookie_settings.use_cookies == false" class="bg-green-500 px-4 py-2 text-white cursor-pointer">Opt In</span>
                </p>
                <p class="mb-2 pl-2">We use Google Analytics to monitor our websites performance.</p>
                <p class="my-2 text-lg text-center">See our full cookie policy <nuxt-link to="/cookies" target="_blank" class="text-yellow-600">here</nuxt-link></p>
                <button @click="updateCookies(cookie_settings.use_cookies);cookie_settings.show = false" class="btn btn-block btn-theme">Save Cookie Settings</button>
            </div>
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
            show_cookie_banner: false,
            cookie_settings: {
                show: false,
                use_cookies: true,
            }
        }
    },
	mounted() {
		this.nav_open = !this.$device.isMobileOrTablet;
        this.dark_mode = this.darkModeEnabled;
        this.show_cookie_banner = !this.$store.state.acknowledged_cookies;
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
        },
        updateCookies(approved){
            if(approved != null){
                this.$store.commit('setUseCookies', approved);
                this.$store.commit('setAcknowledgedCookies', true);
            }else{
                this.$store.commit('setAcknowledgedCookies', true);
            }
            if(approved == true){
                window.location.reload();
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
    head() {
        let met = {
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
        };
        return met;
    }
}
</script>
