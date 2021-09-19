<template>
    <div>
        <div class="resp-container">
            <h1 class="page-title">Edit Chapter</h1>
            <edit-chapter></edit-chapter>
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
}
</script>