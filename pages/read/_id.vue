<template>
	<div
		v-if="chapter && settings"
		class="w-full h-full"
		:class="{ 'bg-black': settings.dark, 'bg-white': !settings.dark }"
	>
		<reader-settings
			:settings="settings"
			:manga_id="chapter.manga_id"
			v-on:update-settings="updateSettings($event)"
		></reader-settings>
		<reader-pages
			v-show="settings.direction != 'ver'"
			:chapter="chapter"
			:next_id="next_id"
			:prev_id="prev_id"
			:settings="settings"
		></reader-pages>
		<reader-vertical
			v-show="settings.direction == 'ver'"
			:chapter="chapter"
			:settings="settings"
			:next_id="next_id"
			:prev_id="prev_id"
		></reader-vertical>
	</div>
</template>

<script>
export default {
	//ltr = left to right
	//rtl = right to left
	//ver = vertical
	data() {
		return {
			// chapter: null,
			// next_id: null,
			// prev_id: null,
			settings: null
		};
	},
	async asyncData(context) {
		if (process.client) {
			return;
		}
		let ch, next, prev;
		await context.$axios
			.get("/chapters/get/" + Number(context.params.id))
			.then(response => {
				ch = response.data.chapter;
				next = response.data.next_id;
				prev = response.data.prev_id;
				context.$redis.set(
					"chapter_" + context.params.id,
					JSON.stringify(response.data),
					{ EX: process.env.redisExpireTime }
				);
			})
			.catch(err => console.log(err));

		return { chapter: ch, next_id: next, prev_id: prev };
	},
	mounted() {
		// this.loadPages();
		this.settings = { ...this.$store.state.reader_settings };
		if (this.settings == null || this.settings == undefined) {
			this.settings = {
				dark: this.$store.state.dark_theme,
				direction: "ltr",
				vertical_padding: false
			};
			this.$store.dispatch("setReaderSettingsA", { ...this.settings });
		}
		if (this.$store.state.dark_theme) {
			this.settings.dark = true;
			this.$store.dispatch("setReaderSettingsA", { ...this.settings });
		}
	},
	methods: {
		loadPages() {
			this.$axios
				.get("/chapters/" + Number(this.$route.params.id))
				.then(response => {
					this.chapter = response.data.chapter;
					this.next_id = response.data.next_id;
					this.prev_id = response.data.prev_id;
				})
				.catch(err => alert(err));
		},
		updateSettings(newSettings) {
			this.settings = newSettings;
			this.$store.dispatch("setReaderSettingsA", { ...this.settings });
		}
	},
	head() {
		return {
			title:
				"Chapter " +
				this.chapter.number +
				" | " +
				this.chapter.manga.title,
			meta: [
				{
					hid: "description",
					name: "description",
					content: `${this.chapter.manga.title} chapter ${
						this.chapter.number
					} ${this.chapter.name ? this.chapter.name : ""}`
				},
				{
					hid: "og-title",
					property: "og:title",
					content:
						"Chapter " +
						this.chapter.number +
						" | " +
						this.chapter.manga.title
				},
				{
					hid: "og-description",
					property: "og:description",
					content: `${this.chapter.manga.title} chapter ${
						this.chapter.number
					} ${this.chapter.name ? this.chapter.name : ""}`
				},
				{
					hid: "og-image",
					property: "og:image",
					content: "https://api.kouhai.work/v3"+this.chapter.manga.cover
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
