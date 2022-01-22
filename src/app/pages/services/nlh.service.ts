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
export class NLHService {
access_token;
headers;
constructor(private http: HttpClient, public authService: AuthService) {
this.access_token = this.authService.getToken();
this.headers = new  HttpHeaders().set("authToken", this.access_token);        
}


/**
* This function is used for fetching country list    
*/
getAllTables() {    

//return this.http.get<any>(`${environment.BASE_URL}listOfTable`,{headers: this.headers})
return this.http.get<any>(`${environment.BASE_URL}get-room-list`,{headers: this.headers})
.pipe(map(fetchresult => {
console.log(fetchresult, 'fetchresult')
let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
console.log(decryptedData, 'decryptedData')
fetchresult.data = decryptedData
return fetchresult;

}));


}


// addNlhTables(Savedata)
// {
//  let bodyData={
//   tableName:Savedata.tableName,
//   rake:Savedata.rake,
//   max_players:Savedata.max_players,
//   actionTime:Savedata.actionTime,
//   smallBlind:Savedata.smallBlind,
//   bigBlind:Savedata.bigBlind,
//   max_bot:Savedata.max_bot,
//   minimumBuy:Savedata.minimumBuy,
//   maximumBuy:Savedata.maximumBuy,
//   autoMuckOption:(Savedata.autoMuckOption =="Yes" ? true :false),
//   game_type:Savedata.gameTypeOption,
//   max_bet_limit:Savedata.max_bet_limit
//  }
//  let encData = this.authService.encryptBody(JSON.stringify(bodyData));
//      let reqBody = {payload : encData};
// return this.http.post(`${environment.BASE_URL}Admin/createTable`,reqBody,{headers: this.headers});
// }

addRoom(Savedata)
{
     let bodyData={
          card_passing:Savedata.card_passing,
          hand_count:Savedata.hand_count,
          minimum_level: Savedata.minimum_level
     }
     let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};

     return this.http.post(`${environment.BASE_URL}create-room`,reqBody,{headers: this.headers});
}


getAllClinicsByCIty(body:any) {
return this.http.post(`${environment.BASE_URL}admin/clinics-by-city`,body,{headers: this.headers});
}
getById(reqObj: any) {
return this.http.post(`${environment.BASE_URL}admin/clinic-details`,reqObj,{headers: this.headers});
}
deleteNlh(Savedata) {
console.log("Savedata"+JSON.stringify(Savedata))
let payloadObj={

    "table_id" : Savedata.table_id,
    "status" : "Deleted"

  
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/deleteTable`,reqBody,{headers: this.headers}); 
}
changeClinicStatus(id:number, is_active:number)
{
return this.http.post(`${environment.BASE_URL}admin/change-clinic-status`,{id:id,is_active:is_active},{headers: this.headers}); 
}

deleteClinic(id:number)
{
return this.http.post(`${environment.BASE_URL}admin/delete-clinic`,{id:id},{headers: this.headers}); 
}

getAllRegion() {
return this.http.post(`${environment.BASE_URL}region-list`,'',{headers: this.headers});
}
getCitybyRegionId(conditionObj)
{
return this.http.post(`${environment.BASE_URL}city-list-by-regionId`,conditionObj,{headers: this.headers});
}
getAreabyCityId(conditionObj)
{
return this.http.post(`${environment.BASE_URL}area-list-by-cityId`,conditionObj,{headers: this.headers});
}
addClinics(Savedata)
{
return this.http.post(`${environment.BASE_URL}add-clinic`,Savedata,{headers: this.headers});
}

editNlh(updateData)
{
let payloadObj={
  table_id:updateData.table_id,
  options:{
  tableName:updateData.tableName,
  rake:updateData.rake,
  max_players:updateData.max_players,
  actionTime:updateData.actionTime,
  smallBlind:updateData.smallBlind,
  bigBlind:updateData.bigBlind,
  minimumBuy:updateData.minimumBuy,
  maximumBuy:updateData.maximumBuy,
  autoMuckOption:(updateData.autoMuckOption =="Yes" ? true :false),
  status:updateData.status,
  game_type:updateData.gameTypeOption,
  max_bet_limit:updateData.max_bet_limit

  }
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/updateTable`,reqBody,{headers: this.headers});
}
}
