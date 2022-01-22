import { Injectable } from '@angular/core';
import { HttpClient  , HttpHeaders} from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MasterdataService {
  access_token;
  headers;
  constructor(private http: HttpClient, public authService: AuthService) {
            this.access_token = this.authService.getToken();
            this.headers = new  HttpHeaders().set("authToken", this.access_token);        
  }

  // Chronic Disease //

  getDashboardAnalatycs()
  {
    return this.http.post(`${environment.BASE_URL}dashboardData`,{},{headers: this.headers});
  }

  getAllMenu()
  {
    return this.http.post(`${environment.BASE_URL}admin/get-all-menu`,{},{});
  }

  getMenuPermissionByUserType(user_type_id:any)
  {
    return this.http.post(`${environment.BASE_URL}admin/get-menu-permission-by-user-type`,{user_type_id:user_type_id},{});
  }
}

