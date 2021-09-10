<template>
	<div class="form-group">
		<div class="form-group-inline">
			<input
				type="text"
				class="form-input"
				placeholder="Series Name..."
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
		<div class="">
            <div class="form-group-inline py-2 space-x-8 nobar overflow-x-auto pb-80 -mb-80">
                <div class="select-parent">
                    <label>Genres</label>
                    <sselect title="genre" :options="genres" :multiple="true"></sselect>
                </div>
                <div class="select-parent">
                    <label>Genres</label>
                    <sselect title="genre" :options="genres"></sselect>
                </div>
                <div class="select-parent">
                    <label>Genres</label>
                    <sselect title="genre" :options="genres"></sselect>
                </div>
                <div class="select-parent">
                    <label>Genres</label>
                    <sselect title="genre" :options="genres"></sselect>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            genres: [],
        }
    },
    mounted(){
        this.loadFilters();
    },
    methods: {
        loadFilters() {
            this.$axios.get('/manga/genres')
            .then(resp => this.genres = resp.data)
        }
    }
}
</script>

<style scoped>
.select-parent, .form-select > option {
    @apply min-w-3/4 md:min-w-1/3
}

</style>
