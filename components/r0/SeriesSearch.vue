<template>
	<div class="form-group">
		<form @click.prevent="search" class="form-group-inline">
			<input
				type="text"
				v-model="search_input"
				class="form-input"
				placeholder="Series Name..."
			/>
			<button type="submit" class="btn btn-theme">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</form>
		<div class="">
			<div class="select-group nobar">
				<div class="select-parent">
					<label>Genres</label>
					<sselect
						title="genre"
						:options="genres"
						v-on:sel_change="
							selection.genres = $event;
							search();
						"
						:multiple="true"
					></sselect>
				</div>
				<div class="select-parent">
					<label>Themes</label>
					<sselect
						title="themes"
						:options="themes"
						v-on:sel_change="
							selection.themes = $event;
							search();
						"
						:multiple="true"
					></sselect>
				</div>
				<div class="select-parent">
					<label>Status</label>
					<sselect
						title="status"
						:options="status"
						v-on:sel_change="
							selection.status = $event;
							search();
						"
					></sselect>
				</div>
				<div class="select-parent">
					<label>Demographics</label>
					<sselect
						title="demographics"
						:options="demographics"
						v-on:sel_change="
							selection.demographics = $event;
							search();
						"
						:multiple="true"
					></sselect>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: ['genres', 'themes', 'demographics'],
	data() {
		return {
			search_input: "",
			status: [
				{ id: 0, name: "Ongoing" },
				{ id: 1, name: "Finished" },
				{ id: 2, name: "Axed/Dropped" }
			],
			selection: {
				genres: [],
				themes: [],
				demographics: [],
				status: null
			},
			cancel: null
		};
	},
	methods: {
		search() {
			console.log("searching");
			if (this.cancel !== null) this.cancel();
			let nct = null;
			this.$axios({
				method: "POST",
				url: "/manga/search",
				cancelToken: new axios.CancelToken(function executor(c) {
					nct = c;
				}),
				data: {
					search: this.search_input,
					tags: JSON.stringify(this.selection)
				}
			})
				.then(response => {
					//Cancel the cancel token
					this.cancel = null;
					nct = null;
					//Show results
					this.$emit('searched', response.data.data);
				})
				.catch(err =>
					err.response ? console.log(err.response) : null
				);
			this.cancel = nct;
		},
	}
};
</script>

<style scoped>
.select-parent,
.form-select > option {
	@apply min-w-3/4 md:min-w-1/3 lg:min-w-0 lg:w-full;
}
.select-group {
	@apply w-full flex items-stretch py-2 space-x-8 overflow-x-scroll lg:overflow-hidden pb-80 -mb-80;
}
</style>
