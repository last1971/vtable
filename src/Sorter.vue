<template>
    <div @click="changeSortingOrder" class="header">
        <span v-if="value.orderBy === 'ASC'">\/</span>
        <span v-else-if="value.orderBy === 'DESC'">/\</span>
        <span v-else> -- </span>
    </div>
</template>

<script>
    export default {
        name: "Sorter",
        props: ['value'],
        methods: {
            changeSortingOrder() {
                // eslint-disable-next-line no-console
                console.log('1');
                const col = Object.assign({}, this.value);
                if (col.orderBy === 'ASC') col.orderBy = 'DESC';
                else if (col.orderBy === 'DESC') col.orderBy = 'NONE';
                else col.orderBy = 'ASC';
                this.$emit('input', col);
            }
        }
    }
</script>

<style scoped>

</style>