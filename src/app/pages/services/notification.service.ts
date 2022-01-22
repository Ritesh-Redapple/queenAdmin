import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
@Injectable({ providedIn: 'root' })
export class NotificationService {
  addRoom(tableData: any) {
    throw new Error('Method not implemented.');
  }
    access_token;
    headers;
    constructor(private http: HttpClient, public authService: AuthService) {
            this.access_token = this.authService.getToken();
            this.headers = new  HttpHeaders().set("authToken", this.access_token);        
    }    
    
    // getAllUsers() {
    //     return this.http.post(`${environment.BASE_URL}admin/users-list`,{headers: this.headers});        
    // }

    editUser(editplayer)
    {
        return this.http.post(`${environment.BASE_URL}admin/edit-user`,editplayer,{headers: this.headers});
    }

    listAllUser()
    {
        return this.http.get(`${environment.BASE_URL}admin/getAllUsers`,{headers: this.headers});
    }
    listAllUserTypes()
    {
        return this.http.post(`${environment.BASE_URL}admin/getAllUserTypes`,{headers: this.headers});
    }
    getUserTypeById(body:any)
    {
        return this.http.post(`${environment.BASE_URL}admin/getUserTypeById`,body,{headers: this.headers});
    }
    getUsersBySearch(body:any) {
        return this.http.post(`${environment.BASE_URL}admin/getAllUsersbySearch`,body,{headers: this.headers}); 
    }

    registerUser(body:any) {
        return this.http.post(`${environment.BASE_URL}admin/registration`,body,{headers: this.headers}); 
    }
    deleteUser(body:any) {
        return this.http.post(`${environment.BASE_URL}admin/deleteUser`,body,{headers: this.headers}); 
    }

    updateUserStatus(updateStatus)
    {
        return this.http.post(`${environment.BASE_URL}admin/updateUser`,updateStatus,{headers: this.headers});
    }

    getAllUsers() {
        //const  headers = new  HttpHeaders().set("access_token", "2b3ad3b4-66c8-45c2-a082-dd368ca4f1fc");
        return this.http.post(`${environment.BASE_URL}users`,'',{headers: this.headers});
    }

    getAllUserTypes() {
        //const  headers = new  HttpHeaders().set("access_token", "2b3ad3b4-66c8-45c2-a082-dd368ca4f1fc");
        return this.http.post(`${environment.BASE_URL}users/types`,'',{headers: this.headers});
    }

    add(data) {
        //const  headers = new  HttpHeaders().set("access_token", "2b3ad3b4-66c8-45c2-a082-dd368ca4f1fc");
        return this.http.post(`${environment.BASE_URL}users/add`,data,{headers: this.headers});
    }


    getAllPlayers() {    

return this.http.get<any>(`${environment.BASE_URL}getAllUserAdmin`,{headers: this.headers})
.pipe(map(fetchresult => {
console.log(fetchresult, 'fetchresult')
let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
console.log(decryptedData, 'decryptedData')
fetchresult.data = decryptedData
return fetchresult;

}));


}

getAllTransactions() {    

return this.http.get<any>(`${environment.BASE_URL}getAllTransactions`,{headers: this.headers})
.pipe(map(fetchresult => {
console.log(fetchresult, 'fetchresult')
let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
console.log(decryptedData, 'decryptedData')
fetchresult.data = decryptedData
return fetchresult;

}));


}

getAllTransactionDebit() {    

return this.http.get<any>(`${environment.BASE_URL}getAllTransactionDebit`,{headers: this.headers})
.pipe(map(fetchresult => {
console.log(fetchresult, 'fetchresult')
let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
console.log(decryptedData, 'decryptedData')
fetchresult.data = decryptedData
return fetchresult;

}));


}
 getAllContacts(){
    return this.http.get<any>(`${environment.BASE_URL}getAllContact`,{headers: this.headers})
    .pipe(map(fetchresult => {
    console.log(fetchresult, 'fetchresult')
    let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
    console.log(decryptedData, 'decryptedData')
    fetchresult.data = decryptedData
    return fetchresult;
 }));      
}
//addPlayer
addPlayer(Savedata) {   
try {
let bodyData={
  username:Savedata.username,
  email:Savedata.email,
  mobile:Savedata.mobile,
  password:Savedata.password,
  user_type:3,
  gender:Savedata.gender
  
 }
 
 let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}signup`,reqBody,{headers: this.headers});
}
catch(e){
      console.log("e"+e)
}
 }

 verifyPlayer(Savedata){
 let bodyData={
  user_id:Savedata.user_id  
  
 }
 
 let encData = this.authService.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};
return this.http.post(`${environment.BASE_URL}admin/verifyUser`,reqBody,{headers: this.headers});

 }  
 
 getAllNotifications(){
    return this.http.get<any>(`${environment.BASE_URL}get-notification`,{headers: this.headers})
    .pipe(map(fetchresult => {
    console.log(fetchresult, 'fetchresult')
    let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
    console.log(decryptedData, 'decryptedData')
    fetchresult.data = decryptedData
    return fetchresult;
 }));      
}
}
