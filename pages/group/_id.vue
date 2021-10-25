<template>
    <div v-if="group">
        <div class="mb-2 relative w-full h-48 shadow">
            <img class="w-full h-full object-cover" :src="group.banner ? $mediaPage(group.banner) : '/pattern.jpg'" alt="">
            <div class="absolute pin bg-black bg-opacity-25 flex items-center justify-center">
                <h2 class="text-2xl font-black uppercase text-white">{{group.name}}</h2>
            </div>
        </div>
        <div class="series-container">
			<div class="series" v-for="(s, index) in series" :key="index">
				<div class="series-inner" @click="redirectToSeries(s)">
                    <img class="series-cover" :src="$mediaPage(s.cover)" alt="" />
                    <div class="series-info">
                        <h1 class="series-title">{{ s.title }}</h1>
                    </div>
                </div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    async asyncData(context){
        if(process.client) return;
        let g, series;

        await context.$axios.get('/groups/'+context.params.id+'/series')
        .then(response => {
            series = response.data.data;
        })
		.catch(err => console.log(err));

        await context.$axios.get('/groups/get/'+context.params.id)
        .then(response => {
            g = response.data.data;
        })
		.catch(err => console.log(err.response));

        return {
            group: g,
            series: series,
        };
    },
    methods:{

		redirectToSeries(series){
			window.location = '/series/'+series.id;
		},
    },
	head() {
		return {
			title: this.group.name + ' Uploads',
			meta: [
				{
					hid: "description",
					name: "description",
					content: 'Series uploaded by ' + this.group.name,
				},
				{
					hid: "og-title",
					property: "og:title",
					content: this.group.name + ' Uploads',
				},
				{
					hid: "og-description",
					property: "og:description",
					content: 'Series uploaded by ' + this.group.name,
				},
				{
					hid: "og-image",
					property: "og:image",
					content: "https://api.kouhai.work/v3/"+this.group.banner
				},
				{
					hid: "og-url",
					property: "og:url",
					content: "https://kouhai.work" + this.$route.path
				}
			]
		};
	}
}
</script>

<style scoped>
.series-container {
	@apply mb-6 px-4 flex flex-row flex-wrap justify-center items-stretch;
}
.series {
	@apply w-full md:w-1/2 lg:w-1/3 xl:w-1/4 3xl:w-1/5 p-2;
}
.series-inner:hover {
	@apply shadow-2xl z-50 scale-105
}
.series-inner {
    @apply h-full flex flex-col items-center transform transition-all duration-150 rounded-lg z-10 cursor-pointer shadow-lg;
	@apply dark:bg-dt-600 dark:text-white
}
.series-info {
    @apply py-2  bottom-0 text-center  bg-opacity-50 text-black w-full rounded-b-lg z-10 dark:text-white
}
.series-cover {
    @apply w-full h-72 object-cover rounded-lg z-0
}
.series-title {
    @apply text-lg font-semibold
}
</style>