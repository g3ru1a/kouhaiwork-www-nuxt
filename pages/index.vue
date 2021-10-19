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
		if (process.client) return;
		let w, a, l;

		await context.$axios
			.get("/chapters/latest")
			.then(response => {
				if (response.data.error) {
					l = null;
					return;
				}
				l = response.data.data;
			})
			.catch(err => console.log(err));

		await context.$axios
			.get("/manga/recent")
			.then(async response => {
				a = response.data.data;
			})
			.catch(err => console.log(err));

		await context.$axios
			.get("/chapters/recent")
			.then(async response => {
				w = response.data.data;
			})
			.catch(err => console.log(err));
		return {
			all: a,
			week: w,
			latest: l
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
