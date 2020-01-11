/**
 * Table Column
 */
export default class TableCol {
    constructor(tableCol, i) {
        const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.alias = tableCol.alias;
        this.customEditor = tableCol.customEditor || this.customEditor;
        this.customRenderer = tableCol.customRenderer || this.customRenderer;
        this.editable = tableCol.editable || this.editable;
        this.index = tableCol.index >= 0 ? tableCol.index : i;
        this.name = tableCol.name || abc[i];
        this.orderBy= tableCol.orderBy || this.orderBy;
        this.originalIndex = i;
        this.sortable = tableCol.sortable || this.sortable;
        this.type = tableCol.type || this.type;
        this.visible = tableCol.visible !== undefined ? tableCol.visible : this.visible;
    }

    alias;

    customEditor = false;

    customRenderer = false;

    editable = false;

    index;

    name;

    orderBy = 'NONE';

    originalIndex;

    sortable = false;

    type = 'string';

    visible = true;
}