import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import theme from '../../../@vex/utils/tailwindcss';

import { ContactCreateUpdateComponent } from './contact-create-update/contact-create-update.component';

import { ContactService } from '../../../app/pages/services/contact.service';
import { CountryService } from '../../../app/pages/services/country.service';
import {Location} from "@angular/common";
@Component({
selector: 'vex-user',
templateUrl: './contact.component.html',
styleUrls: ['./contact.component.scss'],
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
export class ContactlistComponent implements OnInit, AfterViewInit, OnDestroy {

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
{ label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: false },
{ label: 'Image', property: 'image', type: 'image', visible: false },
{ label: 'User', property: 'user_id', type: 'text', visible: false },
{ label: 'Notification ID', property: 'notification_id', type: 'text', visible: true },
{ label: 'Title', property: 'title', type: 'text', visible: true },
{ label: 'Message', property: 'body', type: 'text', visible: true },
{ label: 'Date', property: 'createdOn', type: 'text', visible: true },
{ label: 'Actions', property: 'actions', type: 'button', visible: false }
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

constructor(private dialog: MatDialog, private coinService:CountryService,private contactService:ContactService,private location: Location) {
}

get visibleColumns() {
return this.columns.filter(column => column.visible).map(column => column.property);
}

/**
* Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
* We are simulating this request here.
*/


ngOnInit() {

this.contactService.getAllNotifications().subscribe(users => {
this.players = users["data"];
this.subject$.next(this.players);
});

/*this.userService.getAllRoles().subscribe(users => {
this.roles = users["result"];
console.log(this.roles);
console.log("roles");
//this.players = users["result"]["users"];
this.subject$.next(this.roles);
});*/

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

deletePlayer(player: Player) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    console.log("del player"+JSON.stringify(player));
    console.log(Player);
   
   
    
   this.coinService.deleteCountry(player).subscribe(user => {
    
      if(user){
          this.players.splice(this.players.findIndex((existingPlayer) => existingPlayer.id === player.id), 1);
          this.selection.deselect(player);
          location.reload();
          this.subject$.next(this.players);
      }
    });
  }
  
createNotification(){
  
  this.dialog.open(ContactCreateUpdateComponent,{
    height: '55%',
    width: '60%'
}).afterClosed().subscribe((player: Player) => {
    /**
    * Player is the updated player (if the user pressed Save - otherwise it's null)
    */
   console.log(Player)
    if (player) {
    /**
    * Here we are updating our local array.
    * You would probably make an HTTP request here.
    */
    this.players.unshift(new Player(player));
    this.subject$.next(this.players);
    }
    });
}


}
