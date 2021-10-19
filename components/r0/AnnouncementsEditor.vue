<template>
	<div class="panel panel-white">
		<client-only>
			<error-bubble v-show="error != ''" :text="error"></error-bubble>
            <success-bubble v-show="success != ''" :text="success"></success-bubble>
			<div class="form-group">
				<input v-model="title" type="text" class="form-input" placeholder="Announcement Title">
			</div>
			<quill-editor class="mb-4 shadow min-h-36" ref="editor" v-model="content" :options="editorOption">
			</quill-editor>
			<button @click.prevent="postAnnouncement" class="btn btn-block btn-theme">Post</button>
		</client-only>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
			error: '',
			success: '',
			editorOption: {
				// Some Quill options...
				theme: "snow",
				modules: {
					toolbar: [
						["bold", "italic", "underline", "strike"], // toggled buttons
						["blockquote", "code-block"],

						[{ list: "ordered" }, { list: "bullet" }],
						[{ script: "sub" }, { script: "super" }], // superscript/subscript
						[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
						[{ direction: "rtl" }], // text direction

						[{ color: [] }, { background: [] }], // dropdown with defaults from theme
						// [{ font: [] }],
						[{ align: [] }],

						["clean"]
					]
				}
			}
		};
	},
	methods: {
		postAnnouncement() {
			console.log(this.content);
            this.$axios({
                method: 'post',
                url: '/admins/announcements',
                data: {
                    title: this.title,
                    body: this.content,
                }
            }).then(() => {
                this.title = '';
                this.body = '';
                this.error = '';
                this.success = 'Announcement posted successfully. Refresh the page to view latest post.';
            })
            .catch(error => {
                this.success = '';
                if(error.response.data.title) this.error = error.response.data.title[0];
                if(error.response.data.body) this.error = error.response.data.body[0];
            });
		}
	}
};
</script>
