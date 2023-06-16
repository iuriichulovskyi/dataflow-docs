import * as d from './data'
import * as joins from 'lodash-joins';
import * as agGrid from "ag-grid-community";

let columns = joins.hashLeftOuterJoin(d.columns, 'report_id', d.reports);
columns = joins.hashLeftOuterJoin(columns, 'app_id', d.apps);
let fields= joins.hashLeftOuterJoin(d.fields, 'cube_id', d.cubes);

let columnsWithRelations = joins.hashLeftOuterJoin(columns, 'reportColumn', d.column2field);
let rows = joins.hashFullOuterJoin(columnsWithRelations, 'cubeField', fields);
console.log(rows);

const columnDefs = [
  { field: "app" },
  { field: "report" },
  { field: "type" },
  { field: "column", tooltipField: 'comment' },
  { field: "field_id", headerName: "Cube Field" },
  { field: "cube_id", headerName: "Cube Name" },

];

const defaultColDef = {
  filter: 'agTextColumnFilter',
  suppressMenu: false,
  resizable: true,
  sortable: true
};

const defaultSortModel = [
  { colId: 'app', sort: 'asc', sortIndex: 0 },
  { colId: 'report', sort: 'asc', sortIndex: 1 },
  { colId: 'type', sort: 'desc', sortIndex: 2 },
  { colId: 'column', sort: 'asc', sortIndex: 3 },
];

// hide empty columns
const defaultFilter = {
  column: {
    filterType: 'text',
    type: 'notBlank'
  }
}

// let the grid know which columns and what data to use
const gridOptions = {
  defaultColDef: defaultColDef,
  columnDefs: columnDefs,
  rowData: rows,
  multiSortKey: 'ctrl',
  cacheQuickFilter: true,
  suppressMenuHide: true,
  tooltipShowDelay: 0,
  onGridReady: (params) => {
    params.columnApi.applyColumnState({ state: defaultSortModel });
    gridOptions.api.setFilterModel(defaultFilter);
  },
};

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
      document.getElementById('filter-text-box').value
  );
}
window.onFilterTextBoxChanged = onFilterTextBoxChanged;

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
});