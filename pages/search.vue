<template>
    <div>
        <div class="resp-container">
            <h1 class="panel-title my-4">Search Series</h1>
            <series-search v-on:searched="results = $event"></series-search>
            <series-search-results v-if="results.length > 0" :results="results"></series-search-results>
            <h2 v-if="results.message">{{results.message}}</h2>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            results: [],
        }
    },
}
</script>