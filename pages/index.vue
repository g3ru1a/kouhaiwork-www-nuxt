<template>
	<div>
		<Banner></Banner>
		<UpdatedThisWeek class="week-section"></UpdatedThisWeek>
		<AllSeries class="week-section"></AllSeries>
	</div>
</template>

<script>
export default {
};
</script>

<style>
.week-section:nth-child(0){
	@apply text-red-300
}
.week-section:last-child {
	@apply lg:mx-auto lg:w-4/5 
}
.week-section {
	@apply pb-4
}
</style>