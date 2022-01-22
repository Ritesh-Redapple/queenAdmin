import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
@Injectable({
providedIn: 'root'
})
export class TournamentService {
    access_token;
headers;
constructor(private http: HttpClient, public authService: AuthService) {
this.access_token = this.authService.getToken();
this.headers = new  HttpHeaders().set("authToken", this.access_token);        
}        

    getAllTournaments() {
        return this.http.get<any>(`${environment.BASE_URL}listOfTournament`,{headers: this.headers})
        .pipe(map(fetchresult => {
        console.log(fetchresult, '12222fetchresult')
        let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
        console.log(decryptedData, 'decryptedData')
        fetchresult.data = decryptedData
        return fetchresult;       
    }));
    }

    editTournament(edittournament,fileToUpload: File)
    {
    console.log("fileToUpload"+fileToUpload)

         delete edittournament._id;

         const formData = new FormData();

     // Append files to the virtual form.
        if(typeof fileToUpload=== 'object'){
        formData.append('tournament_image', fileToUpload, fileToUpload.name);
        }
    
    formData.append("tournament_name", edittournament.tournament_name);

    formData.append("tournament_id", edittournament.tournament_id);

    formData.append("tournament_status", edittournament.tournament_status);


    formData.append("tournament_start_time",edittournament.tournament_start_time);
    formData.append("tournament_start_date",edittournament.tournament_start_date);

    formData.append("tournament_registration_open_time",edittournament.tournament_registration_open_time);
    formData.append("tournament_registration_open_date",edittournament.tournament_registration_open_date);
    formData.append("tournament_schedule_date",edittournament.tournament_schedule_date);
    formData.append("tournament_schedule_time",edittournament.tournament_schedule_time);

    
            
     formData.append("game_type",edittournament.game_type);            
      formData.append("tournament_buy_in_amount",edittournament.tournament_buy_in_amount);
     formData.append("tournament_entry_fee",edittournament.tournament_entry_fee);
      formData.append("tournament_starting_chips",edittournament.tournament_starting_chips);

     formData.append("tournament_minimum_player_registered",edittournament.tournament_minimum_player_registered);

     formData.append("tournament_maximum_player_allowed",edittournament.tournament_maximum_player_allowed);

     formData.append("tournament_seats",edittournament.tournament_seats);

      formData.append("tournament_rebuys_maximum_count",edittournament.tournament_rebuys_maximum_count);

      formData.append("tournament_rebuys_expiry_level",edittournament.tournament_rebuys_expiry_level);

            formData.append("tournament_rebuy_amount",edittournament.tournament_rebuy_amount);

            formData.append("tournament_rebuy_chips_amount",edittournament.tournament_rebuy_chips_amount);

            formData.append("tournament_add_on",edittournament.tournament_add_on);

            formData.append("tournament_add_on_available_level",edittournament.tournament_add_on_available_level);

            formData.append("tournament_add_on_expiry_level",edittournament.tournament_add_on_expiry_level);

            formData.append("tournament_add_on_amount",edittournament.tournament_add_on_amount);

            formData.append("tournament_add_on_chips_amount",edittournament.tournament_add_on_chips_amount);

            formData.append("tournament_late_entry",edittournament.tournament_late_entry);

            formData.append("tournament_late_entry_expiry_time",edittournament.tournament_late_entry_expiry_time);

            formData.append("tournament_structure",edittournament.tournament_structure);

            formData.append("tournament_small_blind",edittournament.tournament_small_blind);

            formData.append("tournament_big_blind",edittournament.tournament_big_blind);

            formData.append("tournament_bot_assistance",edittournament.tournament_bot_assistance);

            formData.append("tournament_antes",edittournament.tournament_antes);

            formData.append("tournament_levels",edittournament.tournament_levels);

            

            formData.append("tournament_prize_pool_amount",edittournament.tournament_prize_pool_amount);
            formData.append("tournament_schedule_days",edittournament.tournament_schedule_days);

            formData.append("tournament_description",edittournament.tournament_description),

            /*formData.append("tournament_days",JSON.stringify(edittournament.tournament_days)),
             */
            formData.append("tournament_days",JSON.stringify(edittournament.tournament_days)),
            
            formData.append("tournament_rebuy",edittournament.tournament_rebuy);

            formData.append("tournament_betting_time",edittournament.tournament_betting_time);
            

            formData.append("tournament_add_on_expiry_time",edittournament.tournament_add_on_expiry_time);

             formData.append("tournament_rebuy_expiry_time",edittournament.tournament_rebuy_expiry_time);

            

            formData.append("options",edittournament)
           
         
          let payloadObj={
          tournament_id:edittournament.tournament_id,
          options:edittournament
          };
        let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
             let reqBody = {payload : encData};
        return this.http.post(`${environment.BASE_URL}Admin/updateTournament`,formData,{headers: this.headers});
    }

    addTournament(addtournament,fileToUpload: File)
    {
    
    
    const formData = new FormData();

     // Append files to the virtual form.
     formData.append('tournament_image', fileToUpload, fileToUpload.name);
    
    formData.append("tournament_name", addtournament.tournament_name);


    formData.append("tournament_start_time",addtournament.tournament_start_time);
    formData.append("tournament_start_date",addtournament.tournament_start_date);

    formData.append("tournament_registration_open_time",addtournament.tournament_registration_open_time);
    formData.append("tournament_registration_open_date",addtournament.tournament_registration_open_date);
    formData.append("tournament_schedule_date",addtournament.tournament_schedule_date);
    formData.append("tournament_schedule_time",addtournament.tournament_schedule_time);

    
            
     formData.append("game_type",addtournament.game_type);            
      formData.append("tournament_buy_in_amount",addtournament.tournament_buy_in_amount);
     formData.append("tournament_entry_fee",addtournament.tournament_entry_fee);
      formData.append("tournament_starting_chips",addtournament.tournament_starting_chips);

     formData.append("tournament_minimum_player_registered",addtournament.tournament_minimum_player_registered);

     formData.append("tournament_maximum_player_allowed",addtournament.tournament_maximum_player_allowed);

     formData.append("tournament_seats",addtournament.tournament_seats);

      formData.append("tournament_rebuys_maximum_count",addtournament.tournament_rebuys_maximum_count);

      formData.append("tournament_rebuy",addtournament.tournament_rebuy);

      formData.append("tournament_rebuys_expiry_level",addtournament.tournament_rebuys_expiry_level);

            formData.append("tournament_rebuy_amount",addtournament.tournament_rebuy_amount);

            formData.append("tournament_rebuy_chips_amount",addtournament.tournament_rebuy_chips_amount);

            formData.append("tournament_add_on",addtournament.tournament_add_on);

            formData.append("tournament_add_on_available_level",addtournament.tournament_add_on_available_level);

            formData.append("tournament_add_on_expiry_level",addtournament.tournament_add_on_expiry_level);

            formData.append("tournament_add_on_amount",addtournament.tournament_add_on_amount);

            formData.append("tournament_add_on_chips_amount",addtournament.tournament_add_on_chips_amount);

            formData.append("tournament_late_entry",addtournament.tournament_late_entry);

            formData.append("tournament_late_entry_expiry_time",addtournament.tournament_late_entry_expiry_time);

            formData.append("tournament_structure",addtournament.tournament_structure);

            formData.append("tournament_small_blind",addtournament.tournament_small_blind);

            formData.append("tournament_big_blind",addtournament.tournament_big_blind);

            formData.append("tournament_bot_assistance",addtournament.tournament_bot_assistance);

            formData.append("tournament_antes",addtournament.tournament_antes);

            formData.append("tournament_levels",addtournament.tournament_levels);

            formData.append("tournament_status",addtournament.tournament_status);

            formData.append("tournament_prize_pool_amount",addtournament.tournament_prize_pool_amount);
            formData.append("tournament_schedule_days",addtournament.tournament_schedule_days);

            formData.append("tournament_betting_time",addtournament.tournament_betting_time);

            formData.append("tournament_add_on_expiry_time",addtournament.tournament_add_on_expiry_time);

            formData.append("tournament_description",addtournament.tournament_description),

            formData.append("tournament_rebuy_expiry_time",addtournament.tournament_rebuy_expiry_time);

            

 

    
    if(addtournament.tournament_days){
    
    

    formData.append("tournament_days",JSON.stringify(addtournament.tournament_days));

    }
    console.log("addtournamentssss"+JSON.stringify(formData));
        let bodyData=addtournament;
        //let bodyData=formData;
 let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData,allData:formData};
return this.http.post(`${environment.BASE_URL}Admin/addTournament`,formData,{headers: this.headers});
    }

    
    deleteTournament(Savedata) {
console.log("Savedata"+JSON.stringify(Savedata));
let entryfee=(!Savedata.tournament_entry_fee || Savedata.tournament_entry_fee=="" ? 0 : Savedata.tournament_entry_fee);

let amountsum=Savedata.tournament_buy_in_amount+entryfee;

let payloadObj={

    "tournament_id" : Savedata.tournament_id,
    "status":"cancelled",
    "amount":amountsum
    

  
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/deleteTournament`,reqBody,{headers: this.headers}); 
}


registerPlayer(Savedata) {
console.log("Savedata"+JSON.stringify(Savedata))
let payloadObj={

    "tournament_id" : Savedata.tournament_id,
    "user_id":Savedata.user_id,
    "flag":"register",
    "registration_status":"inhouse",
    "tournament_start_date":Savedata.tournament_start_date
      
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}admin/register/player`,reqBody,{headers: this.headers}); 
}  


unregisterPlayer(Savedata) {
console.log("Savedata"+JSON.stringify(Savedata));
let entryfee=(!Savedata.tournament_entry_fee || Savedata.tournament_entry_fee=="" ? 0 : Savedata.tournament_entry_fee);

let amountsum=Savedata.tournament_buy_in_amount+entryfee;


console.log("amountsum"+typeof(amountsum))
let payloadObj={

    "tournament_id" : Savedata.tournament_id,
    "user_id":Savedata.user_id,
    "flag":"unregister",
    "registration_status":"inhouse",
     "add_amt":amountsum,
     "tournament_start_date":Savedata.tournament_start_date
      
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}admin/register/player`,reqBody,{headers: this.headers}); 
}  

getTournamentHistory(){
  return this.http.get<any>(`${environment.BASE_URL}admin/tournament/history`,{headers: this.headers})
        .pipe(map(fetchresult => {
        console.log(fetchresult, '12222fetchresult')
        let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
        console.log(decryptedData, 'decryptedData')
        fetchresult.data = decryptedData
        return fetchresult;       
    }));
}

   getAllPlayersDetails(tournament_id){
   let payloadObj={

    "tournament_id" : tournament_id
    
      
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};

  return this.http.post<any>(`${environment.BASE_URL}admin/register/player/details`,payloadObj,{headers: this.headers})
        .pipe(map(fetchresult => {
        console.log(fetchresult, '12222fetchresult')
        let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
        console.log(decryptedData, 'decryptedData')
        fetchresult.data = decryptedData
        return fetchresult;       
    }));
}     
}
