<template>
	<div>
		<div class="resp-container">
			<h1 class="page-title">Chapters</h1>
			<div class="panel panel-white">
				<p class="mb-2 text-center font-light italic">
					You can search for: Chapter Name, Chapter Number, Series
					Name, Volume Number
				</p>
				<form @submit.prevent="search" class="form-group-inline">
					<input
						v-model="input"
						type="text"
						class="form-input"
						placeholder="Search for Chapter"
					/>
					<button @click.prevent="search" class="btn btn-theme">
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
			</div>
			<div
				v-show="!searching && results && results.length == 0"
				class="panel panel-white"
			>
				<p>No chapters found.</p>
			</div>
			<div v-show="searching" class="panel panel-white flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					class="dark:bg-dt-100 dark:text-white"
					style="display: block;"
					width="15px"
					height="15px"
					viewBox="0 0 100 100"
					preserveAspectRatio="xMidYMid"
				>
					<circle
						cx="50"
						cy="50"
						fill="none"
						class="stroke-current"
						stroke-width="10"
						r="35"
						stroke-dasharray="164.93361431346415 56.97787143782138"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							repeatCount="indefinite"
							dur="1s"
							values="0 50 50;360 50 50"
							keyTimes="0;1"
						></animateTransform>
					</circle>
				</svg>
				<p class="mx-1 py-1 dark:text-white">
					Searching
				</p>
			</div>
            <div v-show="results && results.length > 0" class="">
            <div v-for="res in results" :key="res.id" @click="select(res)" class="panel panel-white result">
                <img class="h-24" :src="res.manga.cover.url" alt="" />
                <div class="px-2 flex flex-col items-start justify-center">
                    <p class="text-xl">
                        Chapter {{ res.number }} <span v-if="res.name">- {{ res.name }}</span>
                    </p>
                    <p class="text-lg" v-if="res.volume">Volume {{ res.volume }}</p>
                    <p class="font-light italic">{{ res.manga.title }}</p>
                    <p>{{ res.pages_count }} Pages</p>
                </div>
            </div>
        </div>
		</div>
	</div>
</template>

<script>
export default {
	middleware: ["auth"],
	data() {
		return {
			input: "",
			results: null,
			searching: false
		};
	},
	methods: {
		select(opt) {
            this.$router.push('/r2/chapter/edit/'+opt.id);
		},
		search() {
			if (this.input == "") return;
			this.searching = true;
			this.$axios
				.post("/chapters/search/", {
					search: this.input.split(" ").join("_")
				})
				.then(response => {
					this.results = response.data;
					this.searching = false;
					console.log(response.data);
				})
				.catch(error => {
					this.results = [];
					this.searching = false;
					console.log(error.response.data);
				});
		}
	}
};
</script>


<style scoped>
.result {
    @apply flex flex-row transform hover:scale-105 transition-all duration-150 cursor-pointer;
}
.option {
    @apply flex flex-row border-b-4 border-green-400 duration-150 cursor-pointer;
}
</style>