import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
@Injectable({
providedIn: 'root'
})
export class TransactionService {
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

     return this.http.get<any>(`${environment.BASE_URL}all-transactions`,{headers: this.headers})
     .pipe(map(fetchresult => {
          console.log(fetchresult, 'fetchresult')
          let decryptedData = JSON.parse(this.authService.decryptBody(fetchresult.data))
          console.log(decryptedData, 'decryptedData')
          fetchresult.data = decryptedData
          return fetchresult;

     }));
     }

}
