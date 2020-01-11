<template>
    <table>
        <thead>
            <tr>
                <th v-for="(col, i) in sortTableCols" :key="i">
                    <div>{{ col.name }}</div>
                    <div v-if="col.sortable" @click="sorting(i)">
                        <span v-if="col.orderBy === 'ASC'">\/</span>
                        <span v-else-if="col.orderBy === 'DESC'">/\</span>
                        <span v-else>--</span>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, j) in rows" :key="j">
                <td v-for="(col, i) in sortTableCols" :key="i">{{ cell(i, j) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import _ from 'lodash';
    import TableCol from "@/TableCol";
    export default {
        name: "VTable",
        props: {
            columns: { type: Array },
            rows: { type: Array, required: true },
        },
        data() {
            return {
                tableCols: [],
            }
        },
        created() {
            this.tableCols = this.columns
                ? this.columns.map((col, i) => new TableCol(col, i))
                : this.rows[0].map((col, i) => new TableCol({}, i));
        },
        computed: {
            sortTableCols() {
               return _.sortBy(this.tableCols.filter((col) => col.visible), ['index']);
            }
        },
        methods: {
            cell(i, j) {
                const { originalIndex, alias } = this.sortTableCols[i];
                const row = this.rows[j];
                return !(row instanceof Array) && alias ? row[alias] : row[originalIndex];
            },
            sorting(i) {
                const col = this.sortTableCols[i];
                if (col.orderBy === 'ASC') col.orderBy = 'DESC';
                else if (col.orderBy === 'DESC') col.orderBy = 'NONE';
                else col.orderBy = 'ASC';
                this.$emit('orderBy', col.alias || col.originalIndex, col.orderBy);
            }
        }
    }
</script>

<style scoped>

</style>