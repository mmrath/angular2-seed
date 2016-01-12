import {Component, } from 'angular2/core';
import {Control,
ControlGroup,
ControlArray,
Validators} from 'angular2/common';
import {RoleService} from '../../../services/core/role';
import {TableDef, ColumnDef} from '../../../models/core/core';
import {RouteParams, RouteData, ROUTER_DIRECTIVES} from 'angular2/router';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
//import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'table-def',
  templateUrl: 'components/core/table_def/table_def.html',
  providers: [],
  directives: [ROUTER_DIRECTIVES, Alert],
  pipes: []
})
export class TableDefCmp {
  isNew: boolean;
  id: number;

  form: ControlGroup;
  columns: ControlArray;

  columnTypes: Array<string> = [
    'REGULAR', 'CREATED_BY', 'CREATED_DATE', 'LAST_MODIFIED_BY', 'LAST_MODIFIED_DATE', 'PRIMARY_KEY', 'VERSION', ];

  dataTypes: Array<string> = ['NUMBER', 'DECIMAL', 'STRING', 'PASSWORD', 'DATE', 'DATETIME', 'BOOLEAN', ];


  constructor(private roleService: RoleService, routeData: RouteData, params: RouteParams) {
    this.columns = new ControlArray([]);
    this.form = new ControlGroup({
      id: new Control(''),
      tagId: new Control('', Validators.required),
      name: new Control('', Validators.required),
      displayLabel: new Control('', Validators.required),
      insertable: new Control('', Validators.required),
      updatable: new Control('', Validators.required),
      deletable: new Control('', Validators.required),
      multiSelectable: new Control('', Validators.required),
      columns: this.columns
    });
  }

  addColumn(columnDef: ColumnDef) {
    if (typeof columnDef === 'undefined') {
      columnDef = new ColumnDef();
    }
    console.log('Adding Column');
    this.columns.push(new ControlGroup(
      {
        id: new Control(columnDef.id),
        index: new Control(columnDef.index, Validators.required),
        name: new Control(columnDef.name, Validators.required),
        displayLabel: new Control(columnDef.displayLabel, Validators.required),
        nullable: new Control(columnDef.nullable, Validators.required),
        insertable: new Control(columnDef.insertable, Validators.required),
        updatable: new Control(columnDef.updatable, Validators.required),
        searchable: new Control(columnDef.searchable, Validators.required),
        sortable: new Control(columnDef.sortable, Validators.required),
        showInList: new Control(columnDef.showInList, Validators.required),
        dataType: new Control(columnDef.dataType, Validators.required),
        columnType: new Control(columnDef.columnType, Validators.required),
        length: new Control(columnDef.length, Validators.required),
        dataTemplate: new Control(columnDef.dataTemplate),
        headerTemplate: new Control(columnDef.headerTemplate),
        validPattern: new Control(columnDef.validPattern),
        validPatternMessage: new Control(columnDef.validPatternMessage),
        defaultValue: new Control(columnDef.defaultValue),
      })
      );
  }

  get value(): string {
    return JSON.stringify(this.form.value, null, 2);
  }
}
