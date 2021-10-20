<template>
	<div class="bg-white dark:bg-dt-100">
		<div v-if="info" class="info">
			<div class="info-group">
				<!-- image -->
				<manga-info-cover
					:url="info.cover"
					v-on:toggle_chapters="show_chapters = !show_chapters"
				></manga-info-cover>
				<!-- info -->
				<manga-info
					:info="info"
					class="-mt-20 md:mt-0 z-50"
				></manga-info>
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
			// info: null,
			show_chapters: true
		};
	},
	mounted() {
		console.log(this.$route.path);
	},
	async asyncData(context) {
		if (process.client) {
			return;
		}
		let inf = null;
		await context.$axios
			.get("/manga/get/" + Number(context.params.id))
			.then(resp => {
				inf = resp.data.data;
				context.$redis.set(
					"series-" + context.params.id,
					JSON.stringify(inf),
					{ EX: process.env.redisExpireTime }
				);
			});
		if(inf.authors && inf.authors.length > 0) inf.authors = inf.authors.map(e => e.name);
		if(inf.artists && inf.artists.length > 0) inf.artists = inf.artists.map(e => e.name);
		if(inf.genres && inf.genres.length > 0) inf.genres = inf.genres.map(e => e.name);
		if(inf.themes && inf.themes.length > 0) inf.themes = inf.themes.map(e => e.name);
		if(inf.demographics && inf.demographics.length > 0) inf.demographics = inf.demographics.map(e => e.name);
		return { info: inf };
	},
	head() {
		return {
			title: this.info.title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.info.synopsis
				},
				{
					hid: "og-title",
					property: "og:title",
					content: this.info.title
				},
				{
					hid: "og-description",
					property: "og:description",
					content: this.info.synopsis
				},
				{
					hid: "og-image",
					property: "og:image",
					content: "https://api.kouhai.work/v3"+this.info.cover
				},
				{
					hid: "og-url",
					property: "og:url",
					content: "https://kouhai.work" + this.$route.path
				}
			]
		};
	}
};
</script>

<style scoped>
.info {
	@apply min-h-screen flex flex-col items-stretch justify-evenly px-4 pb-12 bg-white;
	@apply md:px-0 xl:w-2/3 xl:mx-auto 3xl:w-1/2;
	@apply dark:bg-dt-100 dark:text-white;
}
.info-group {
	@apply flex flex-col md:flex-row md:items-start md:justify-evenly md:px-4;
}
</style>
