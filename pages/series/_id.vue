<template>
	<div class="bg-white">
        <div
            v-if="info"
            class="info">
            <div class="info-group">
                <!-- image -->
                <manga-info-cover
                    :url="info.cover.url"
                    v-on:toggle_chapters="show_chapters = !show_chapters"
                ></manga-info-cover>
                <!-- info -->
                <manga-info :info="info" class="-mt-20 md:mt-0 z-50"></manga-info>
            </div>
            <!-- chapters -->
            <manga-info-chapters :info="info"></manga-info-chapters>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			info: null,
			show_chapters: true
		};
	},
	beforeMount() {
		this.loadInfo();
	},
	methods: {
		loadInfo() {
			this.$axios
				.get("/mangas/" + Number(this.$route.params.id))
				.then(resp => (this.info = resp.data));
		}
	}
};
</script>

<style scoped>
.info {
    @apply min-h-screen flex flex-col items-stretch justify-evenly px-4 pb-12 bg-white;
    @apply md:px-0 xl:w-2/3 xl:mx-auto 3xl:w-1/2
}
.info-group {
    @apply flex flex-col md:flex-row md:items-start md:justify-evenly md:px-4
}
</style>
