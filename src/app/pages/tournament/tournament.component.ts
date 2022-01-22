import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Player } from './interfaces/tournament.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { RegisterComponent } from './player-register/player-register.component';

import { UnregisterComponent } from './player-unregister/player-unregister.component';

import { TournamentCreateUpdateComponent } from './tournament-create-update/tournament-create-update.component';

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
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSelectChange } from '@angular/material/select';
import { TournamentService } from '../../../app/pages/services/tournament.service';
import theme from '../../../@vex/utils/tailwindcss';
@Component({
selector: 'vex-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
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
export class TournamentComponent implements OnInit, AfterViewInit, OnDestroy {

layoutCtrl = new FormControl('boxed');
customDate = "Thu Oct 30 2019 06:50:22 GMT+0530";
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
   { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
   { label: 'Image', property: 'tournament_id', type: 'image', visible: false },
   { label: 'Name', property: 'tournament_name', type: 'text', visible: true, cssClasses: ['font-medium'] },

   
   { label: 'Tournament Description', property: 'tournament_description', type: 'text', visible: true, cssClasses: ['font-medium'] },

   { label: 'Game Type', property: 'game_type', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   { label: 'Start time', property: 'tournament_start_time', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   { label: 'Start Date', property: 'tournament_start_date', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Buyin Amount', property: 'tournament_buy_in_amount', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   { label: 'Entry Fee', property: 'tournament_entry_fee', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   { label: 'Minimum Players', property: 'tournament_minimum_player_registered', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Maximum Players', property: 'tournament_maximum_player_allowed', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Rebuys', property: 'tournament_rebuys_maximum_count', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Late Entry', property: 'tournament_late_entry', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   
   { label: 'Seats', property: 'tournament_seats', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Structure', property: 'tournament_structure', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   { label: 'Tournament Schedule Days', property: 'tournament_schedule_days', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Days', property: 'tournament_days', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Late Entry Expiry Time', property: 'tournament_late_entry_expiry_time', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Registration Open Date', property: 'tournament_registration_open_date', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Registration Open Time', property: 'tournament_registration_open_time', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Prize Pool Amount', property: 'tournament_prize_pool_amount', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Starting Chips', property: 'tournament_starting_chips', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Small Blind', property: 'tournament_small_blind', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Big Blind', property: 'tournament_big_blind', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Betting time', property: 'tournament_betting_time', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Antes', property: 'tournament_antes', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Levels', property: 'tournament_levels', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Rebuy', property: 'tournament_rebuy', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Rebuys Expiry Level', property: 'tournament_rebuys_expiry_level', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Rebuy Amount', property: 'tournament_rebuy_amount', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Rebuys Chips Amount', property: 'tournament_rebuy_chips_amount', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   
   { label: 'Tournament Rebuy Expiry Time', property: 'tournament_rebuy_expiry_time', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Add On', property: 'tournament_add_on', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Add On Available Level', property: 'tournament_add_on_available_level', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   { label: 'Tournament Add On Expiry Level', property: 'tournament_add_on_expiry_level', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },


   { label: 'Tournament Add On Amount', property: 'tournament_add_on_amount', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

    { label: 'Tournament Bot Assistance', property: 'tournament_bot_assistance', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
   

   { label: 'Status', property: 'tournament_status', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },

   

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

constructor(private dialog: MatDialog, private tournamentService:TournamentService) {
}

get visibleColumns() {
return this.columns.filter(column => column.visible).map(column => column.property);
}

/**
* Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
* We are simulating this request here.
*/


ngOnInit() {
var days = {
   'Mon': 'Monday',
   'Tue': 'Tuesday',
   'Wed': 'Wednesday',
   'Thr' : 'Thrusday',
   'Fri' : 'Friday',
   'Sat' : 'Saturday',
   'Sun' : 'Sunday'
}


var d = new Date("2021-05-04").toString().split(' ')[0];

console.log("d"+days[d]);
this.tournamentService.getAllTournaments().subscribe(users => {
this.players = users["data"];
console.log("lll"+JSON.stringify(this.players));
//console.log("players");
//this.players = users["result"]["users"];
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

createTournament() {
this.dialog.open(TournamentCreateUpdateComponent).afterClosed().subscribe((player: Player) => {
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


updateTournament(player: Player) {
this.dialog.open(TournamentCreateUpdateComponent, {
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
id: (!updatedPlayer.id)?this.players[index].id:updatedPlayer.id,
tournament_name: (!updatedPlayer.tournament_name)?this.players[index].tournament_name:updatedPlayer.tournament_name,

game_type: (!updatedPlayer.game_type)?this.players[index].game_type:updatedPlayer.game_type,

tournament_buy_in_amount: (!updatedPlayer.tournament_buy_in_amount)?this.players[index].tournament_buy_in_amount:updatedPlayer.tournament_buy_in_amount,

tournament_entry_fee: (!updatedPlayer.tournament_entry_fee)?this.players[index].tournament_entry_fee:updatedPlayer.tournament_entry_fee,

tournament_starting_chips: (!updatedPlayer.tournament_starting_chips)?this.players[index].tournament_starting_chips:updatedPlayer.tournament_starting_chips,
tournament_minimum_player_registered: (!updatedPlayer.tournament_minimum_player_registered)?this.players[index].tournament_minimum_player_registered:updatedPlayer.tournament_minimum_player_registered,


tournament_maximum_player_allowed: (!updatedPlayer.tournament_maximum_player_allowed)?this.players[index].tournament_maximum_player_allowed:updatedPlayer.tournament_maximum_player_allowed,

tournament_seats: (!updatedPlayer.tournament_seats)?this.players[index].tournament_seats:updatedPlayer.tournament_seats,
tournament_rebuys_maximum_count: (!updatedPlayer.tournament_rebuys_maximum_count)?this.players[index].tournament_rebuys_maximum_count:updatedPlayer.tournament_rebuys_maximum_count,

};
this.players[index] = new Player(userObj);
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

deleteTournament(player: Player) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    console.log("del player"+JSON.stringify(player));
    console.log(Player);
   
   
    
   this.tournamentService.deleteTournament(player).subscribe(user => {

   console.log("del user"+JSON.stringify(user));
    
      if(user["status"]){
          this.players.splice(this.players.findIndex((existingPlayer) => existingPlayer.id === player.id), 1);
          this.selection.deselect(player);
          location.reload();
          this.subject$.next(this.players);
      }
    });
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
//this.players[index].labels = change.value;
this.subject$.next(this.players);
}
ngOnDestroy() {
}

  



registerTournament1() {
this.dialog.open(RegisterComponent).afterClosed().subscribe((player: Player) => {
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
//unregisterTournament

registerTournament(player: Player) {
this.dialog.open(RegisterComponent, {
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
id: (!updatedPlayer.id)?this.players[index].id:updatedPlayer.id,
tournament_name: (!updatedPlayer.tournament_name)?this.players[index].tournament_name:updatedPlayer.tournament_name,

game_type: (!updatedPlayer.game_type)?this.players[index].game_type:updatedPlayer.game_type,

tournament_buy_in_amount: (!updatedPlayer.tournament_buy_in_amount)?this.players[index].tournament_buy_in_amount:updatedPlayer.tournament_buy_in_amount,

tournament_entry_fee: (!updatedPlayer.tournament_entry_fee)?this.players[index].tournament_entry_fee:updatedPlayer.tournament_entry_fee,

tournament_starting_chips: (!updatedPlayer.tournament_starting_chips)?this.players[index].tournament_starting_chips:updatedPlayer.tournament_starting_chips,
tournament_minimum_player_registered: (!updatedPlayer.tournament_minimum_player_registered)?this.players[index].tournament_minimum_player_registered:updatedPlayer.tournament_minimum_player_registered,


tournament_maximum_player_allowed: (!updatedPlayer.tournament_maximum_player_allowed)?this.players[index].tournament_maximum_player_allowed:updatedPlayer.tournament_maximum_player_allowed,

tournament_seats: (!updatedPlayer.tournament_seats)?this.players[index].tournament_seats:updatedPlayer.tournament_seats,
tournament_rebuys_maximum_count: (!updatedPlayer.tournament_rebuys_maximum_count)?this.players[index].tournament_rebuys_maximum_count:updatedPlayer.tournament_rebuys_maximum_count,

};
this.players[index] = new Player(userObj);
this.subject$.next(this.players);
}
});
}


unregisterTournament(player: Player) {
this.dialog.open(UnregisterComponent, {
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
id: (!updatedPlayer.id)?this.players[index].id:updatedPlayer.id,
tournament_name: (!updatedPlayer.tournament_name)?this.players[index].tournament_name:updatedPlayer.tournament_name,

game_type: (!updatedPlayer.game_type)?this.players[index].game_type:updatedPlayer.game_type,

tournament_buy_in_amount: (!updatedPlayer.tournament_buy_in_amount)?this.players[index].tournament_buy_in_amount:updatedPlayer.tournament_buy_in_amount,

tournament_entry_fee: (!updatedPlayer.tournament_entry_fee)?this.players[index].tournament_entry_fee:updatedPlayer.tournament_entry_fee,

tournament_starting_chips: (!updatedPlayer.tournament_starting_chips)?this.players[index].tournament_starting_chips:updatedPlayer.tournament_starting_chips,
tournament_minimum_player_registered: (!updatedPlayer.tournament_minimum_player_registered)?this.players[index].tournament_minimum_player_registered:updatedPlayer.tournament_minimum_player_registered,


tournament_maximum_player_allowed: (!updatedPlayer.tournament_maximum_player_allowed)?this.players[index].tournament_maximum_player_allowed:updatedPlayer.tournament_maximum_player_allowed,

tournament_seats: (!updatedPlayer.tournament_seats)?this.players[index].tournament_seats:updatedPlayer.tournament_seats,
tournament_rebuys_maximum_count: (!updatedPlayer.tournament_rebuys_maximum_count)?this.players[index].tournament_rebuys_maximum_count:updatedPlayer.tournament_rebuys_maximum_count,

};
this.players[index] = new Player(userObj);
this.subject$.next(this.players);
}
});
}

}
