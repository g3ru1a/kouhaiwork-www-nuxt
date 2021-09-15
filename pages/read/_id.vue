<template>
	<div
		v-if="chapter && settings"
		class="w-full h-full"
		:class="{ 'bg-black': settings.dark }"
	>
		<reader-settings
			:settings="settings"
			:manga_id="chapter.manga_id"
			v-on:update-settings="updateSettings($event)"
		></reader-settings>
		<reader-pages
			v-if="settings.direction != 'ver'"
			:chapter="chapter"
			:next_id="next_id"
			:prev_id="prev_id"
			:settings="settings"
		></reader-pages>
		<reader-vertical
			v-if="settings.direction == 'ver'"
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
			chapter: null,
			next_id: null,
			prev_id: null,
			settings: null
		};
	},
	mounted() {
		this.loadPages();
		console.log(this.$store.state.reader_settings);
		this.settings = this.$store.state.reader_settings;
		if (this.settings == null || this.settings == undefined) {
			this.settings = {
				dark: false,
				direction: "ltr",
				vertical_padding: false
			};
			this.$store.commit('setReaderSettings', this.settings);
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
			this.$store.commit('setReaderSettings', this.settings);
		}
	}
};
</script>
