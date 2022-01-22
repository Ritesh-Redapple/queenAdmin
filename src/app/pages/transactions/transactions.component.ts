import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Player } from './interfaces/player.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { FormControl,FormGroup } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import theme from '../../../@vex/utils/tailwindcss';

import {Location} from "@angular/common";


import { first , tap, delay,map } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'vex-transaction-tables',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class TransactionComponent implements OnInit, AfterViewInit, OnDestroy {

  layoutCtrl = new FormControl('fullwidth');
  

/**
* Simulating a service with HTTP that returns Observables
* You probably want to remove this and do all requests in a service with HTTP
*/
subject$: ReplaySubject<Player[]> = new ReplaySubject<Player[]>(1);
data$: Observable<Player[]> = this.subject$.asObservable();
players: Player[];
roles:[];



@Input()
columns: TableColumn<Player>[] = [
{ label: 'Transaction Id', property: 'transaction_id', type: 'text', visible: true },
{ label: 'Username', property: 'username', type: 'text', visible: true },
{ label: 'User Email', property: 'useremail', type: 'text', visible: true },
{ label: 'Transaction Amount', property: 'amount', type: 'text', visible: true },
{ label: 'Transaction Type', property: 'type', type: 'text', visible: true },
{ label: 'Transaction Status', property: 't_status', type: 'text', visible: true },
{ label: 'Actions', property: 'actions', type: 'button', visible: true }

];
pageSize = 10;
pageSizeOptions: number[] = [5, 10, 20, 50];
dataSource: MatTableDataSource<Player> | null;
selection = new SelectionModel<Player>(true, []);
searchCtrl = new FormControl();

icEdit = icEdit;
icSearch = icSearch;
icDelete = icDelete;
icAdd = icAdd;
icFilterList = icFilterList;
icMoreHoriz = icMoreHoriz;
icFolder = icFolder;

theme = theme;

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

constructor(private dialog: MatDialog, private transactionService:TransactionService,private location: Location,private snackbar: MatSnackBar) {
}

get visibleColumns() {
  return this.columns.filter(column => column.visible).map(column => column.property);
}



/**
* Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
* We are simulating this request here.
*/


ngOnInit() {

   this.transactionService.getAllTables().subscribe(users => {
    const room = users["data"];
    this.players = room.map((val: any)=>{
      val.username = val.users.username;
      val.useremail = val.users.email;

      switch(val.type){
        case "addfund":
          val.type = 'Add Fund';
          break;
        case "withdrawRequest":
          val.type = 'Withdral Request';
          break;
        default:
          val.type = val.type;
      }

      val.t_status = val.transaction_status.charAt(0).toUpperCase() + val.transaction_status.slice(1);
      
      delete val.users;
      return val;
    })
    this.subject$.next(this.players);
  });



  this.dataSource = new MatTableDataSource();

  this.data$.pipe(
    filter<Player[]>(Boolean)
  ).subscribe(users => {
    this.players = users;
    this.dataSource.data = users;
  });

  this.searchCtrl.valueChanges.pipe(
    untilDestroyed(this)
  ).subscribe(value => this.onFilterChange(value));
}


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}





onFilterChange(value: string) {
  if (!this.dataSource) {
    return;
  }
  value = value.trim();
  value = value.toLowerCase();
  console.log(value);
  this.dataSource.filter = value;
}

toggleColumnVisibility(column, event) {
event.stopPropagation();
event.stopImmediatePropagation();
column.visible = !column.visible;
}

/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
  this.selection.clear() :
  this.dataSource.data.forEach(row => this.selection.select(row));
}

trackByProperty<T>(index: number, column: TableColumn<T>) {
  return column.property;
}

onLabelChange(change: MatSelectChange, row: Player) {
  const index = this.players.findIndex(c => c === row);
  this.players[index].labels = change.value;
  this.subject$.next(this.players);
}
ngOnDestroy() {
}

}
