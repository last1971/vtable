<template>
    <div contenteditable="true"
         @keypress.enter="endEditing"
         @blur="endEditing"
         @keypress.esc="$emit('endEditing', value)"
         ref="StringEditor"
    >
        {{ editingValue }}
    </div>
</template>

<script>
    export default {
        name: "CellEditor",
        props: ['value'],
        data() {
            return {
                editingValue: this.value,
            }
        },
        methods: {
            endEditing() {
                this.$emit('endEditing', this.$refs['StringEditor'].textContent.trim());
            }
        }
    }
</script>

<style scoped>

</style>