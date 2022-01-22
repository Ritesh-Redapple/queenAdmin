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
export class CoinService {
access_token;
headers;
constructor(private http: HttpClient, public authService: AuthService) {
this.access_token = this.authService.getToken();
this.headers = new  HttpHeaders().set("authToken", this.access_token);        
}


/**
* This function is used for fetching country list    
*/
getAllAddedCoins() {    

return this.http.get<any>(`${environment.BASE_URL}fetchCountry`,{headers: this.headers})
.pipe(map(fetchresult => {
console.log(fetchresult, 'fetchresult')
let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
console.log(decryptedData, 'decryptedData')
fetchresult.data = decryptedData
return fetchresult;

}));


}


addCoin(Savedata)
{
 let bodyData={
  add_amt:Savedata.coins,
  user_id:Savedata.user_id,
  reason:Savedata.reason,
  approval_status:"approved"
  
 }
 /*let bodyData={
    user_id: "WPK6cVpcJ",
    add_amt: 2000
}*/
 let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}add-usercoinbalance`,reqBody,{headers: this.headers});
}
//withdrawCoin
withdrawCoin(Savedata)
{
 let bodyData={
  deduct_amt:Savedata.coins,
  user_id:Savedata.user_id,
  reason:Savedata.reason,
  options:Savedata,
  approval_status:"approved"
  
 }
 let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}deduct-usercoinbalance`,reqBody,{headers: this.headers});
}

delete(id: number) {
return this.http.delete(`${environment.BASE_URL}admin/clinics/${id}`,{headers: this.headers}); 
}


deleteCoin(Savedata) {
console.log("11Savedata"+JSON.stringify(Savedata))
let payloadObj={

    "transaction_id" : Savedata.transaction_id,   
    "status":"inactive"
  
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}deleteTransaction`,reqBody,{headers: this.headers}); 
}

getAllRegion() {
return this.http.post(`${environment.BASE_URL}region-list`,'',{headers: this.headers});
}




editCoin(updateData)
{
let payloadObj={
  country_id:updateData.country_id,
  options:{
  phone_code:updateData.phone_code,
  country_code:updateData.country_code,
  country_name:updateData.country_name,
  status:updateData.status

  }
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/updateCountry`,reqBody,{headers: this.headers});
}
}
