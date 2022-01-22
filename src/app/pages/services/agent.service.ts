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
export class AgentService {
access_token;
headers;
constructor(private http: HttpClient, public authService: AuthService) {
this.access_token = this.authService.getToken();
this.headers = new  HttpHeaders().set("authToken", this.access_token);        
}


/**
* This function is used for fetching country list    
*/
getAllAgents() {    

return this.http.get<any>(`${environment.BASE_URL}listOfAgent`,{headers: this.headers})
.pipe(map(fetchresult => {
console.log(fetchresult, 'fetchresult')
let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
console.log(decryptedData, 'decryptedData')
fetchresult.data = decryptedData
return fetchresult;

}));


}


addAgent(Savedata)
{
 let bodyData=Savedata;
 let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/addAgent`,reqBody,{headers: this.headers});
}
getAllClinicsByCIty(body:any) {
return this.http.post(`${environment.BASE_URL}admin/clinics-by-city`,body,{headers: this.headers});
}
getById(reqObj: any) {
return this.http.post(`${environment.BASE_URL}admin/clinic-details`,reqObj,{headers: this.headers});
}
delete(id: number) {
return this.http.delete(`${environment.BASE_URL}admin/clinics/${id}`,{headers: this.headers}); 
}
changeClinicStatus(id:number, is_active:number)
{
return this.http.post(`${environment.BASE_URL}admin/change-clinic-status`,{id:id,is_active:is_active},{headers: this.headers}); 
}

deleteAgent(Savedata) {
console.log("Savedata"+JSON.stringify(Savedata))
let payloadObj={

    "agent_code" : Savedata.agent_code,
    "agent_status" : "deleted"

  
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/deleteAgent`,reqBody,{headers: this.headers}); 
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

editAgent(updateData)
{
delete updateData._id;
let payloadObj={
  agent_code:updateData.agent_code,
  options:updateData
}
let encData = this.authService.encryptBody(JSON.stringify(payloadObj));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}Admin/updateAgent`,reqBody,{headers: this.headers});
}
}
