<template>
    <input v-model="editingValue" @keypress.enter="endEditing" @keypress.tab="endEditing" @blur="endEditing" />
</template>

<script>
    export default {
        name: "TestCellEditor",
        props: ['value'],
        data() {
            return {
                editingValue: this.value,
            }
        },
        methods: {
            endEditing() {
                this.$emit('endEditing', this.editingValue);
            }
        }
    }
</script>

<style scoped>

</style>