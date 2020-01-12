<template>
    <div contenteditable="true"
         @keydown.esc="escEditing"
         @keydown.enter="endEditing"
         @blur="endEditing"
         ref="StringEditor"
    >
        {{ value }}
    </div>
</template>

<script>
    export default {
        name: "StringEditor",
        props: ['value'],
        data() {
            return {
                endEditingFlag: true,
            }
        },
        methods: {
            endEditing() {
                if (this.endEditingFlag) {
                    this.endEditingFlag = false;
                    this.$emit('endEditing', this.$refs['StringEditor'].textContent.trim());
                }
            },
            escEditing() {
                this.$refs['StringEditor'].textContent = this.value;
            }
        },
        watch: {
            value() {
                this.$refs['StringEditor'].textContent = this.value;
            }
        }
    }
</script>

<style scoped>

</style>