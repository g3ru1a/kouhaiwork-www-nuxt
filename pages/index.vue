<template>
	<div>
		<Banner :latest="latest"></Banner>
		<UpdatedThisWeek class="week-section" :week="week"></UpdatedThisWeek>
		<AllSeries class="week-section" :all="all"></AllSeries>
	</div>
</template>

<script>
export default {
	async asyncData(context) {
		let w, a, l;
		await context.$axios
			.get("/manga/latest")
			.then(response => {
				l = response.data.data;
			})
			.catch(err => console.log(err));
		await context.$axios
			.get("/manga/all")
			.then(response => {
				a = response.data.data.map(obj => ({
					id: obj[0],
					title: obj[1],
					cover: obj[2]
				}));
			})
			.catch(err => console.log(err));
		await context.$axios
			.get("/manga/week")
			.then(response => {
				w = response.data.data.map(obj => ({
					id: obj[0],
					title: obj[1],
					latest_chapter_number: obj[2],
					cover: obj[3]
				}));
			})
			.catch(err => console.log(err));
		return {
			all: a,
			week: w,
			latest: l,
		};
	}
};
</script>

<style>
.week-section:nth-child(0) {
	@apply text-red-300;
}
.week-section:last-child {
	@apply lg:mx-auto lg:w-4/5;
}
.week-section {
	@apply pb-4;
}
</style>
