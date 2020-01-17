<template>
    <span v-if="col.type === 'string'">{{ cell }}</span>
    <span v-else-if="col.type === 'html'" v-html="cell" />
    <span v-else-if="col.type === 'number'" style="float: right">{{ cell }}</span>
    <component v-else :is="col.customRenderer" :value="cell" />
</template>

<script>
    export default {
        name: "CellRenderer",
        props: ['col', 'cell']
    }
</script>

<style scoped>

</style>