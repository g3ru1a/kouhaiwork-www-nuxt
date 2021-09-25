<template>
    <div>
        <div class="resp-container">
            <h1 class="page-title">Upload Chapters</h1>
            <upload-chapter :latest="latest"></upload-chapter>
            <upload-guidelines></upload-guidelines>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data() {
        return {
            
        }
    },
	async asyncData(context){
		if(process.client) return;
		let latest = await context.$redis.get("homepage-latest");
		return {latest: JSON.parse(latest)};
	},
}
</script>