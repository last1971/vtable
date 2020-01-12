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
                <td v-for="(col, i) in sortTableCols" :key="i">
                    <div v-if="isEditing(i, j)">
                        <cell-editor :value="cell(i, j)" @endEditing="endEditing" />
                    </div>
                    <div v-else @click="setEditing(i, j)">
                        <cell-renderer :cell="cell(i, j)" :col="col" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import _ from 'lodash';
    import TableCol from "./TableCol";
    import CellRenderer from "./CellRenderer";
    import CellEditor from "./CellEditor";
    export default {
        name: "VTable",
        components: {CellEditor, CellRenderer },
        props: {
            columns: { type: Array },
            rows: { type: Array, required: true },
        },
        data() {
            return {
                tableCols: [],
                cellEditing: { i: -1, j: -1 },
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
            endEditing(value) {
                const { originalIndex, alias } = this.sortTableCols[this.cellEditing.i];
                const i = !(this.rows[this.cellEditing.j] instanceof Array) && alias ? alias : originalIndex;
                this.$emit('newValue', value, i, this.cellEditing.j);
                this.cellEditing = { i: -1, j: -1 }
            },
            isEditing(i, j) {
                return this.cellEditing.i === i && this.cellEditing.j === j;
            },
            setEditing(i, j) {
                if (i >=0 && this.sortTableCols[i].editable) this.cellEditing = { i, j };
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