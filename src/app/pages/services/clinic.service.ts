import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
access_token;
  headers;
  constructor(private http: HttpClient, public authService: AuthService) {
            this.access_token = this.authService.getToken();
            /*this.headers = new  HttpHeaders().set("access_token", this.access_token);*/ 

            this.headers = new  HttpHeaders().set("authToken", this.access_token);        
  }    

    getAllClinics() {
        return this.http.post(`${environment.BASE_URL}admin/clinics`,'',{headers: this.headers});
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

    editClinics(updateData)
    {
      return this.http.post(`${environment.BASE_URL}admin/edit-clinics`,updateData,{headers: this.headers});
    }
}
