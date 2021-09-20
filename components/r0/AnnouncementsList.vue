<template>
	<div class="">
		<div class="panel panel-white" v-for="(ann, index) in list" :key="index">
			<div class="post-heading">
				<h1 class="post-title">
					{{ ann.title }}
				</h1>
				<span
					v-show="$store.getters.isRank3"
					@click="deletePost(ann.id)"
					class="tag tag-red float-right cursor-pointer">
					Delete
				</span>
			</div>
			<p class="post-date">{{ prettyDate(ann.created_at) }}</p>
			<div class="post-body" v-html="ann.body"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	mounted() {
		this.loadAnnouncements();
	},
	methods: {
		loadAnnouncements() {
			this.$axios
				.get("/announcements")
				.then(response => {
					this.list = response.data;
					console.log(this.list);
				})
				.catch(error => alert(error.response.data));
		},
		prettyDate(uglyDate) {
			let date = new Date(uglyDate);
			let options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric"
			};
			return date.toLocaleString("en-US", options);
		},
        deletePost(id){
            this.$axios.delete('/announcements/delete/'+id)
            .then(() => {
                this.list = this.list.filter(e => e.id != id);
            })
            .catch(error => alert(error.response.data));
        }
	}
};
</script>

<style scoped>
.post-heading {
	@apply flex items-start
}
.post-title {
	@apply mb-2 w-full text-xl font-semibold
}
.post-date {
	@apply mb-3 text-sm italic
}
</style>