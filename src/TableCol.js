/**
 * Table Column
 */
export default class TableCol {
    /**
     * TableCol constructor
     * @param {Object} tableCol
     * @param {Number} i - Original Index
     */
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
        this.type = this.customRenderer ? 'custom' : tableCol.type || this.type;
        this.visible = tableCol.visible !== undefined ? tableCol.visible : this.visible;
    }
    /**
     * Property alias
     * @type {string}
     */
    alias;
    /**
     * Custom Editor
     * @type {boolean|Object}
     */
    customEditor = false;
    /**
     * Custom Renderer
     * @type {boolean|Object}
     */
    customRenderer = false;
    /**
     * Editable column
     * @type {boolean}
     */
    editable = false;
    /**
     * Column index
     * @type {number}
     */
    index;
    /**
     * Header name
     * @type {string}
     */
    name;
    /**
     * OrderBy
     * @type {string} - NONE,ASC,DESC
     */
    orderBy = 'NONE';
    /**
     * Column original index
     * @type {number}
     */
    originalIndex;
    /**
     * Sortable
     * @type {boolean}
     */
    sortable = false;
    /**
     * Column type
     * @type {string}
     */
    type = 'string';
    /**
     * Visible
     * @type {boolean}
     */
    visible = true;
}