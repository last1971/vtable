<template>
    <span v-if="col.type === 'string'">{{ cell }}</span>
    <span v-else-if="col.type === 'html'" v-html="cell"></span>
    <strong v-else-if="col.type === 'number'">{{ cell }}</strong>
    <component v-else :is="col.customRenderer" :value="cell"></component>
</template>

<script>
    export default {
        name: "CellRenderer",
        props: ['col', 'cell']
    }
</script>

<style scoped>

</style>