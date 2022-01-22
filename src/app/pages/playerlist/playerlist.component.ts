import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Player } from './interfaces/player.model';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerCreateUpdateComponent } from './player-create-update/player-create-update.component';

import { CoinWithdrawUpdateComponent } from './coin-withdraw-update/coin-withdraw-update.component';

import { CoinCreateUpdateComponent } from './coin-create-update/coin-create-update.component';

import { KycStatusUpdateComponent } from './kyc-status-update/kyc-status-update.component';
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

import { UserService } from '../../../app/pages/services/user.service';
import { CountryService } from '../../../app/pages/services/country.service';
import {Location} from "@angular/common";
@Component({
selector: 'vex-user',
templateUrl: './playerlist.component.html',
styleUrls: ['./playerlist.component.scss'],
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
export class PlayerlistComponent implements OnInit, AfterViewInit, OnDestroy {

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
{ label: 'User Id', property: 'user_id', type: 'text', visible: false },


{ label: 'Username', property: 'username', type: 'text', visible: true },
{ label: 'Email', property: 'email', type: 'text', visible: true },

{ label: 'Mobile', property: 'mobile', type: 'text', visible: true },
{ label: 'Gender', property: 'gender', type: 'text', visible: true },
{ label: 'Country', property: 'country', type: 'text', visible: false },
{ label: 'Dob', property: 'dob', type: 'text', visible: false },
{ label: 'Coin Balance', property: 'coin_balance', type: 'text', visible: true },
{ label: 'Total Deposits', property: 'Deposits', type: 'text', visible: false },
{ label: 'Total Withdrawals', property: 'Withdrawals', type: 'text', visible: false },
{ label: 'Total Hands', property: 'Hands', type: 'text', visible: false },
{ label: 'Total rakes', property: 'rakes', type: 'text', visible: false },
{ label: 'Total Tournament Winnings', property: 'Tournament', type: 'text', visible: false },
{ label: 'Agent', property: 'Agent', type: 'text', visible: false },
{ label: 'KYC Status', property: 'status', type: 'text', visible: true },
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

constructor(private dialog: MatDialog, private coinService:CountryService,private userService:UserService,private location: Location) {
}

get visibleColumns() {
return this.columns.filter(column => column.visible).map(column => column.property);
}

/**
* Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
* We are simulating this request here.
*/


ngOnInit() {

this.userService.getAllPlayers().subscribe(users => {
this.players = users["data"];
console.log("lll"+this.players);
//console.log("players");
//this.players = users["result"]["users"];
this.subject$.next(this.players);
});



this.dataSource = new MatTableDataSource();

this.data$.pipe(
filter<Player[]>(Boolean)
).subscribe(users => {

this.players = users;
this.dataSource.data = users;
console.log('DataSource',this.dataSource.data);
});

this.searchCtrl.valueChanges.pipe(
untilDestroyed(this)
).subscribe(value => this.onFilterChange(value));
}
//CoinCreateUpdateComponent

createPlayer() {
this.dialog.open(PlayerCreateUpdateComponent).afterClosed().subscribe((player: Player) => {
/**
* Player is the updated player (if the user pressed Save - otherwise it's null)
*/
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

// verifyPlayer(player: Player){
//   this.userService.verifyPlayer(player).subscribe(user => {
//       if(user){
//           //location.reload();
//       }
//     });
// }
// kycInfo(player: Player){
//   this.userService.verifyPlayer(player).subscribe(user => {
//       if(user){
//           location.reload();
//       }
//     });
// }
deletePlayer(player: Player) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    console.log("del player"+JSON.stringify(player));
    console.log(Player);
   // player.userName = player.userName;
    player.status = 'inactive';
    //let userName=player.userName;
   /*this.userService.deleteUser(player).subscribe(user => {
    //this.userService.editUser(player).subscribe(user => {
      if(user){
          this.players.splice(this.players.findIndex((existingPlayer) => existingPlayer.id === player.id), 1);
          this.selection.deselect(player);
          this.subject$.next(this.players);
      }
    });
  }*/
  }

updatePlayer(player: Player) {
  this.dialog.open(PlayerCreateUpdateComponent, {
    data: player
  }).afterClosed().subscribe(updatedPlayer => {
/**
* Player is the updated player (if the user pressed Save - otherwise it's null)
*/
if (updatedPlayer) {
/**
* Here we are updating our local array.
* You would probably make an HTTP request here.
*/
const index = this.players.findIndex((existingPlayer) => existingPlayer.id === updatedPlayer.id);

let userObj = {
/*id: (!updatedPlayer.id)?this.players[index].id:updatedPlayer.id,
username: (!updatedPlayer.username)?this.players[index].username:updatedPlayer.username,
firstname: (!updatedPlayer.firstname)?this.players[index].firstname:updatedPlayer.firstname,
lastname: (!updatedPlayer.lastname)?this.players[index].lastname:updatedPlayer.lastname,
email: (!updatedPlayer.email)?this.players[index].email:updatedPlayer.email,
country: (!updatedPlayer.country)?this.players[index].country:updatedPlayer.country,
contact_no: (!updatedPlayer.contact_no)?this.players[index].contact_no:updatedPlayer.contact_no,
coins: (!updatedPlayer.coins)?this.players[index].coins:updatedPlayer.coins,
//vip_coins: (!updatedPlayer.vip_coins)?this.players[index].vip_coins:updatedPlayer.vip_coins,
player_rank: (!updatedPlayer.player_rank)?this.players[index].player_rank:updatedPlayer.player_rank,
player_status: (!updatedPlayer.status)?this.players[index].status:updatedPlayer.status,*/

};
this.players[index] = new Player(userObj);
this.subject$.next(this.players);
}
});
}

kycStatusChange(player: Player) {
  console.log('Hiiii....',player);
  this.dialog.open(KycStatusUpdateComponent, {
    data: player
  }).afterClosed().subscribe(updatedPlayer => {
    /**
    * Player is the updated player (if the user pressed Save - otherwise it's null)
    */
    // if (updatedPlayer) {
    //   /**
    //   * Here we are updating our local array.
    //   * You would probably make an HTTP request here.
    //   */
    //   const index = this.players.findIndex((existingPlayer) => existingPlayer.id === updatedPlayer.id);

    //   let userObj = {
    //   /*id: (!updatedPlayer.id)?this.players[index].id:updatedPlayer.id,
    //   username: (!updatedPlayer.username)?this.players[index].username:updatedPlayer.username,
    //   firstname: (!updatedPlayer.firstname)?this.players[index].firstname:updatedPlayer.firstname,
    //   lastname: (!updatedPlayer.lastname)?this.players[index].lastname:updatedPlayer.lastname,
    //   email: (!updatedPlayer.email)?this.players[index].email:updatedPlayer.email,
    //   country: (!updatedPlayer.country)?this.players[index].country:updatedPlayer.country,
    //   contact_no: (!updatedPlayer.contact_no)?this.players[index].contact_no:updatedPlayer.contact_no,
    //   coins: (!updatedPlayer.coins)?this.players[index].coins:updatedPlayer.coins,
    //   //vip_coins: (!updatedPlayer.vip_coins)?this.players[index].vip_coins:updatedPlayer.vip_coins,
    //   player_rank: (!updatedPlayer.player_rank)?this.players[index].player_rank:updatedPlayer.player_rank,
    //   player_status: (!updatedPlayer.status)?this.players[index].status:updatedPlayer.status,*/

    //   };
    //   this.players[index] = new Player(userObj);
    //   this.subject$.next(this.players);
    // }
  });
}


addCoin(player: Player) {
this.dialog.open(CoinCreateUpdateComponent, {
data: player
}).afterClosed().subscribe(updatedPlayer => {
/**
* Player is the updated player (if the user pressed Save - otherwise it's null)
*/

});
}

withdrawCoin(player: Player) {
this.dialog.open(CoinWithdrawUpdateComponent, {
data: player
}).afterClosed().subscribe(updatedPlayer => {
/**
* Player is the updated player (if the user pressed Save - otherwise it's null)
*/

});
}

}
