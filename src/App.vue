<template>
  <div id="app">
      <v-table :rows="rows" :columns="columns" @newValue="newValue" />
  </div>
</template>

<script>
import VTable from "@/VTable";
import TestCellRenderer from "@/TestCellRenderer";

export default {
  name: 'app',
  components: {
      VTable
  },
  data() {
    return {
      columns: [
          { name: 'First', alias: 'a', index: 2, sortable: true, customRenderer: TestCellRenderer, editable: true },
          { name: 'Second', alias: 'b', index: 3, type: 'number' },
          { name: '3ii', alias: 'z', index: 1 },
          { name: 'Chetvertii', alias: 'r', index: 0, sortable: true, type: 'html', editable: true },
      ],
      rows: [
        ['A', 'B', 'C', 'D'],
        ['AA', 'BB', 'CC', 'DD'],
        { a: 'TY', b: 1212, z: '78', r: '<i>IIIII</i>' },
      ]
    }
  },
    methods: {
        newValue(value, i, j) {
            this.rows[j][i] = value;
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
