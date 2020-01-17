<template>
    <string-editor :value="value" @endEditing="endEditind"/>
</template>

<script>
    import _ from 'lodash';
    import StringEditor from "@/StringEditor";
    export default {
        name: "NumberEditor",
        components: { StringEditor },
        props: ['value'],
        methods: {
            endEditind(value) {
                let ret = _.toNumber(value.replace(',', '.'));
                ret = _.isNaN(ret) ? 0 : ret;
                this.$emit('endEditing', ret);
            }
        }
    }
</script>

<style scoped>

</style>