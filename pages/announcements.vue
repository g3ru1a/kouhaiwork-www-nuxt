<template>
	<div>
		<div class="resp-container">
			<h1 class="panel-title my-4 dark:text-white">Announcements</h1>
			<announcements-editor
				v-show="$store.getters.isRank3"
			></announcements-editor>
			<announcements-list :announcements="list"></announcements-list>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	async asyncData(context) {
		if(process.client) return;
		let l;
		let listCache = await context.$redis.get("announcements");
		if(listCache != null){
			l = JSON.parse(listCache);
		}else{
			await context.$axios
				.get("/announcements")
				.then(response => {
					l = response.data;
					context.$redis.set("announcements", JSON.stringify(l), {EX: process.env.redisExpireTime});
				})
				.catch(error => alert(error.response.data));
		}
		
		return { list: l };
	},
	head: {
		title: "Announcements | Kouhai Work"
	}
};
</script>
