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
		if(process.client) return;
		let w, a, l;
		let latestCache = await context.$redis.get("homepage-latest");
		if (latestCache != null) {
			console.log('Loaded Latest from redis');
			l = JSON.parse(latestCache);
		} else {
			console.log('Latest cache not found, requesting from api');
			await context.$axios
				.get("/manga/latest")
				.then(response => {
					l = response.data.data;
					context.$redis.set("homepage-latest",JSON.stringify(l),{EX: process.env.redisExpireTime});
				})
				.catch(err => console.log(err));
		}

		let allCache = await context.$redis.get("homepage-all");
		if(allCache != null){
			a = JSON.parse(allCache);
		}else {
			await context.$axios
				.get("/manga/all")
				.then(async response => {
					a = response.data.data.map(obj => ({
						id: obj[0],
						title: obj[1],
						cover: obj[2]
					}));
					context.$redis.set("homepage-all",JSON.stringify(a),{EX: process.env.redisExpireTime});
				})
				.catch(err => console.log(err));
		}
		
		let weekCache = await context.$redis.get("homepage-week");
		if(weekCache != null){
			w = JSON.parse(weekCache);
		}else {
			await context.$axios
				.get("/manga/week")
				.then(async response => {
					w = response.data.data.map(obj => ({
						id: obj[0],
						title: obj[1],
						latest_chapter_number: obj[2],
						cover: obj[3]
					}));
					context.$redis.set("homepage-week",JSON.stringify(w),{EX: process.env.redisExpireTime});
				})
				.catch(err => console.log(err));
		}
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
