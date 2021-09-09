<template>
    <div class="form-success">
        <p v-html="text"></p>
    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>