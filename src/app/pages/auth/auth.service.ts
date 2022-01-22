import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor,HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers;
  access_token;


  constructor(private http: HttpClient) {}
  isLoggedIn = (localStorage.getItem('tw_admin_access_token'))?true:false;  

  loggedAdminType = (localStorage.getItem('tu_user_type_id'))?localStorage.getItem('tu_user_type_id'):''; 
  
  // store the URL so we can redirect after logging in
 
  redirectUrl: string;

  encryptBody(data:string){   

    const secretkey = environment.SECRET_KEY;
    const iv = environment.IV;
    let key = CryptoJS.enc.Utf8.parse(secretkey);     // Use Utf8-Encoder. 
    let IV  = CryptoJS.enc.Utf8.parse(iv);         // Use Utf8-Encoder
    let cryptedCP =  CryptoJS.AES.encrypt(data,key,{iv:IV});
    return cryptedCP.toString();
  }

  decryptBody(data:string){
    
    const secretkey = environment.SECRET_KEY;
    const iv = environment.IV;    
    let key = CryptoJS.enc.Utf8.parse(secretkey);     // Use Utf8-Encoder. 
    let IV  = CryptoJS.enc.Utf8.parse(iv);         // Use Utf8-Encoder
    let decryptedCP =  CryptoJS.AES.decrypt(data,key,{iv:IV});
    return decryptedCP.toString(CryptoJS.enc.Utf8);
  }



  login(email: string, password: string){
     let bodyData = {email:email,password:password};
     let encData = this.encryptBody(JSON.stringify(bodyData));
     let reqBody = {payload : encData};
     return this.http.post<any>(`${environment.BASE_URL}Admin/login`,reqBody)
      .pipe(map(fetchresult => {
        console.log(fetchresult, 'fetchresult')
        let decryptedData = JSON.parse(this.decryptBody(fetchresult.data))
        console.log(decryptedData, 'decryptedData')
        fetchresult.data = decryptedData
          if (fetchresult && fetchresult.data.authToken) {
            localStorage.removeItem('tw_admin_access_token');
            localStorage.removeItem('tw_admin_email');
            localStorage.removeItem('tu_admin_id');
            localStorage.removeItem('tu_user_type_id');
            // localStorage.removeItem('tu_admin_menu_ids');
            // localStorage.removeItem('tu_admin_menu_names');

            localStorage.setItem('tw_admin_access_token', fetchresult.data.authToken);
            localStorage.setItem('tw_admin_email', fetchresult.data.userDetails.email);
            localStorage.setItem('tu_admin_id', fetchresult.data.userDetails.user_id);
            localStorage.setItem('tu_user_type_id', fetchresult.data.userDetails.user_type);
            // localStorage.setItem('tu_admin_menu_ids', JSON.stringify(fetchresult.data.userDetails.menu_access));
            // localStorage.setItem('tu_admin_menu_names', JSON.stringify(fetchresult.data.userDetails.menu_list));
            this.isLoggedIn = true
            return fetchresult.data;
          }
          return fetchresult;
     }));
  }


  sendOTP(email: string){
    let bodyData = {user_id:localStorage.getItem('tu_admin_id'),mode:1};
    let encData = this.encryptBody(JSON.stringify(bodyData));
    let reqBody = {payload : encData};
     return this.http.post<any>(`${environment.BASE_URL}generate-otp`,reqBody)
      .pipe(map(fetchresult => {
        console.log(fetchresult, 'fetchresult')
          return fetchresult;
     }));
  }

  logout() {

    let access_token = this.getToken();
    let headers = new  HttpHeaders().set("authToken",access_token);
    console.log(headers,'headers');
    return this.http.post<any>(`${environment.BASE_URL}logout`,'',{headers : headers})
    .pipe(map(fetchresult => {
      console.log(fetchresult, 'fetchresult')
      localStorage.removeItem('tw_admin_email');
      localStorage.removeItem('tw_admin_access_token');
      localStorage.removeItem('tu_admin_id');
      localStorage.removeItem('tu_user_type_id');
      localStorage.removeItem('tu_admin_menu_ids');
      localStorage.removeItem('tu_admin_menu_names');

      this.isLoggedIn = false;
   }));
  }

  getToken() {
        return localStorage.getItem('tw_admin_access_token')
    }

  getAdm() {
        return localStorage.getItem('tu_admin_id')
    }

  checkToken() {
            this.access_token = localStorage.getItem('tw_admin_access_token');
            this.headers = new  HttpHeaders().set("access_token", this.access_token);  
    return this.http.post(`${environment.BASE_URL}admin/authenticate`,'',{headers: this.headers});
    }


    checkOtp( otp:string){
      let bodyData = {
          user_id: localStorage.getItem('tu_admin_id'),
          otp: otp
      }
    let encData = this.encryptBody(JSON.stringify(bodyData));
    let reqBody = {payload : encData};
      return this.http.post<any>(`${environment.BASE_URL}check-otp`, reqBody)
        .pipe(map(fetchresult => {
          let decryptedData = JSON.parse(this.decryptBody(fetchresult.data))
          console.log(decryptedData, 'decryptedData')
          fetchresult.data = decryptedData
          return fetchresult;
      }));
    }

    getAllPhoneCodes() {
        return this.http.get<any>(`${environment.BASE_URL}phone-codes`).pipe(map(fetchresult => {
            return fetchresult;
        }));
    }


    getDoctorTypeList() {
        return this.http.post<any>(`${environment.BASE_URL}doctor-type-list`,{},{}).pipe(map(fetchresult => {
            return fetchresult;
        }));
    }

    getDoctorDegreeList() {
        return this.http.post<any>(`${environment.BASE_URL}degree-list`,{},{}).pipe(map(fetchresult => {
            return fetchresult;
        }));
    }

    getDoctorSpecializationsList() {
        return this.http.post<any>(`${environment.BASE_URL}specialization-list`,{},{}).pipe(map(fetchresult => {
            return fetchresult;
        }));
    }

    doctorRegistration(profile_picture,visitingCardFront,visitingCardBack,formdata){
      let body = formdata
      const fd = new FormData();

      fd.append('profile_picture',profile_picture);
      fd.append('visiting_card_front',visitingCardFront);
      fd.append('visiting_card_back',visitingCardBack);   
      fd.append('name' ,body.name);   
      fd.append('email',body.email);   
      fd.append('phone_no',body.phone_no); 
      fd.append('phone_code',body.phone_code); 
      fd.append('gender',body.gender);
      fd.append('password',body.password);
      fd.append('login_from','web');
      fd.append('signup_type','manual');
      fd.append('user_type','doctor');
      fd.append('registration_number',body.registration_number);
      fd.append('experience',body.experience);
      fd.append('degree_arr',JSON.stringify(body.degree_arr));
      fd.append('doctor_type_arr',JSON.stringify(body.doctor_type_arr));
      fd.append('specialization_arr',JSON.stringify(body.specialization_arr));

      return this.http.post<any>(`${environment.BASE_URL}doctor/registration`, fd)
        .pipe(map(fetchresult => {
          return fetchresult;
      }));
    }
  
}