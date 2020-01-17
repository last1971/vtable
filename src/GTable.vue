<template>
    <table>
        <thead>
            <tr>
                <th v-for="(col, i) in sortTableCols" :key="i">
                    <div class="header">{{ col.name }}</div>
                    <sorter :value="sortTableCols[i]" @input="sorting"/>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, j) in rows" :key="j">
                <td v-for="(col, i) in sortTableCols" :key="i">
                    <div v-if="isEditing(i, j)">
                        <component :is="cellEditor(i)" :value="cell(i, j)" @endEditing="endEditing" />
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
    import StringEditor from "./StringEditor";
    import NumberEditor from "./NumberEditor";
    import Sorter from "@/Sorter";
    export default {
        name: "VTable",
        components: {Sorter, StringEditor, CellRenderer },
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
            },
        },
        methods: {
            cell(i, j) {
                const { originalIndex, alias } = this.sortTableCols[i];
                const row = this.rows[j];
                return !(row instanceof Array) && alias ? row[alias] : row[originalIndex];
            },
            cellEditor(i) {
                if (this.sortTableCols[i].customEditor) return this.sortTableCols[i].customEditor;
                if (this.sortTableCols[i].type === 'number') return NumberEditor;
                return StringEditor;
            },
            endEditing(value) {
                if (this.cellEditing.i >= 0) {
                    const {originalIndex, alias} = this.sortTableCols[this.cellEditing.i];
                    const i = !(this.rows[this.cellEditing.j] instanceof Array) && alias ? alias : originalIndex;
                    this.$emit('newValue', value, i, this.cellEditing.j);
                    this.cellEditing = {i: -1, j: -1}
                }
            },
            isEditing(i, j) {
                return this.cellEditing.i === i && this.cellEditing.j === j;
            },
            setEditing(i, j) {
                if (i >=0 && this.sortTableCols[i].editable) this.cellEditing = { i, j };
            },
            sorting(col) {
                this.tableCols[col.originalIndex].orderBy = col.orderBy;
                this.$emit('orderBy', col.alias || col.originalIndex, col.orderBy);
            }
        }
    }
</script>

<style scoped>
    .header {
        float: left;
        margin-left: 2pt;
    }
</style>