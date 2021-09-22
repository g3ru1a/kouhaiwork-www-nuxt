<template>
	<div class="w-full">
		<div
			v-for="(page, index) in chapter.pages"
			:key="`item-${index}`"
			class="relative flex"
            :class="{'mb-4': settings.vertical_padding}">
            <div class="mx-auto w-screen xl:w-auto xl:h-screen">
                <img class="w-full h-full" :src="page.media" alt="" />
            </div>
		</div>
        <div id="vert-settings" class="flex fixed top-1/2 right-0 transform-all duration-150">
            <button @click="toggleOpen(false)" class="bg-theme-dark text-white rounded-l-lg" :class="[open?'opacity-100':'opacity-50']">
                <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <svg v-if="open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <div class="w-36 flex flex-col transition-all duration-150 flat" :class="{'-mr-36': !open}">
                <button v-if="next_id" @click="nextChap" class="w-full btn btn-theme">Next Chapter</button>
                <p class="w-full py-2 bg-white border border-theme text-theme text-center dark:bg-dt-300 dark:border-dt-theme">Ch {{chapter.number}}</p>
                <button v-if="prev_id" @click="prevChap" class="w-full btn btn-theme">Prev Chapter</button>
            </div>
        </div>
	</div>
</template>

<script>
export default {
	props: ["settings", "chapter", "next_id", "prev_id"],
    data(){
        return {
            open: false,
        }
    },
	beforeMount() {
		window.addEventListener("scroll", this.carryVert);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.carryVert);
	},
    mounted() {
        this.carryVert();
        this.open = this.$store.state.vert_reader_drawer_open;
    },
	methods: {
		carryVert(event) {
			let st = window.pageYOffset || document.documentElement.scrollTop;
            let scrollMaxY = window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            document.querySelector("#vert-settings").style.top = st + (window.innerHeight - 200) + 'px';
			if(st >= scrollMaxY) this.toggleOpen(true);
		},
        toggleOpen(forceOpen = false){
            if(forceOpen) {
                this.open = true;
            }else this.open = !this.open;
            this.$store.commit('setVertReaderDrawer', this.open);
        },
        nextChap(){
            window.location.replace("/read/" + this.next_id);
        },
        prevChap(){
            window.location.replace("/read/" + this.prev_id);
        }
	}
};
</script>
