export class Player {
  id: number;
  tournament_name: string;
  game_type: number;
  tournament_start_time: string;
  tournament_buy_in_amount: number;
  tournament_minimum_player_registered: number;
  tournament_maximum_player_allowed: number;
  tournament_late_entry: any; 
   tournament_rebuys_maximum_count:any;
   tournament_seats:any;
   tournament_entry_fee:any;
   tournament_starting_chips:any;


  constructor(tournament) {
    this.id = tournament.id;
    this.tournament_name = tournament.tournament_name;
    this.game_type = tournament.game_type;
    this.tournament_start_time = tournament.tournament_start_time;
    this.tournament_buy_in_amount = tournament.tournament_buy_in_amount;
    this.tournament_minimum_player_registered = tournament.tournament_minimum_player_registered;
    this.tournament_maximum_player_allowed = tournament.tournament_maximum_player_allowed;
    this.tournament_late_entry = tournament.tournament_late_entry; 

    this.tournament_rebuys_maximum_count = tournament.tournament_rebuys_maximum_count;
    this.tournament_entry_fee=tournament.tournament_entry_fee;

    this.tournament_starting_chips=tournament.tournament_starting_chips;

    this.tournament_seats = tournament.tournament_seats;
  }

}
