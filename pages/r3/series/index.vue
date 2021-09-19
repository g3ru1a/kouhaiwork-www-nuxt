<template>
	<div>
		<div class="resp-container">
			<h1 class="page-title">Series</h1>
			<div class="panel panel-white">
				<div
					class="mb-2 flex flex-col md:flex-row items-stretch justify-between"
				>
					<div class="form-group-inline-nm">
						<input
							type="text"
							class="form-input"
							placeholder="Search Series"
                            v-model="search"
						/>
						<button class="btn btn-theme">
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
					</div>
					<div class="w-full">
						<button @click="$router.push('/r3/series/new')" class="float-right btn btn-green w-full mt-2 md:w-auto md:mt-0">
							+ New Series
						</button>
					</div>
				</div>
				<div v-if="series" class="">
                    <div class="flex flex-wrap items-start justify-evenly transition-all duration-150">
                        <div v-for="s in filteredSeries" :key="s.id" @click="$router.push('/r3/series/edit/'+s.id)" class="p-2 w-1/2 md:w-auto">
                            <div class="relative rounded shadow transform transition-all duration-150 hover:scale-105 cursor-pointer">
                                <img class="h-72 w-48 object-cover rounded" :src="s.cover.url" alt="">
                                <div class="absolute pin flex flex-col bg-black bg-opacity-50 rounded flat-t text-white">
                                    <div class="flex-1 flex items-center justify-center">
                                        <h2 class="text-center font-bold">{{s.title}}</h2>
                                    </div>
                                    <button class="btn btn-yellow">Modify</button>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    middleware: ['auth'],
	data() {
		return {
			series: [],
            search: '',
		};
	},
	mounted() {
		this.loadMangas();
	},
	methods: {
		loadMangas() {
			this.$axios
				.get("/admin/manga/all")
				.then(response => {
					this.series = response.data.reverse();
				})
				.catch(error => {
					console.log(error);
				});
		}
	},
    computed: {
        filteredSeries(){
            return this.series.filter(s => s.title.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
};
</script>
