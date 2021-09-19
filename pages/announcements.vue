<template>
	<div>
		<div class="resp-container">
			<h1 class="panel-title my-4 dark:text-white">Announcements</h1>
			<announcements-editor v-show="$store.getters.isRank3"></announcements-editor>
			<announcements-list></announcements-list>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	}
};
</script>
