<template>
	<div>
		<div class="resp-container dark:text-white">
			<h1 class="panel-title my-4">Search Series</h1>
			<series-search 
                v-on:searched="results = $event" 
                :genres="genres"
                :themes="themes"
                :demographics="demographics"
                ></series-search>
			<series-search-results
				v-if="results.length > 0"
				:results="results"
			></series-search-results>
			<h2 v-if="results.message">{{ results.message }}</h2>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			results: []
		};
	},
	async asyncData(context) {
		let options;
		await context.$axios
			.get("/search/parameters")
			.then(resp => (options = resp.data))
			.catch(err => console.log(err.response));
        return {
            genres: options.g.map(e => ({id: e[0], name:e[1]})),
            themes: options.t.map(e => ({id: e[0], name:e[1]})),
            demographics: options.d.map(e => ({id: e[0], name:e[1]})),
        }
	},
	head: {
		title: "Search | Kouhai Work"
	}
};
</script>
