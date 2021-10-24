<template>
    <div v-show="text !== null" class="form-error">
        <p v-html="text"></p>
    </div>
</template>

<script>
export default {
    props: ['text']
}
</script>