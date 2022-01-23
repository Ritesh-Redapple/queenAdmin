import { Component, Inject, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../interfaces/player.model';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icClose from '@iconify/icons-ic/twotone-close';
import icPrint from '@iconify/icons-ic/twotone-print';
import icDownload from '@iconify/icons-ic/twotone-cloud-download';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPerson from '@iconify/icons-ic/twotone-person';
import icMyLocation from '@iconify/icons-ic/twotone-my-location';
import icLocationCity from '@iconify/icons-ic/twotone-location-city';
import icEditLocation from '@iconify/icons-ic/twotone-edit-location';
import { MatInputModule } from '@angular/material/input';


import { UserService } from '../../services/user.service';
import {MatSelectChange} from "@angular/material/select";

import {Observable, ReplaySubject} from "rxjs";
import {filter} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CoinService } from '../../services/coin.service';

export interface Brand {
  value: string;
  viewValue: string;
}

export interface Coin {
  value: number;
}

@Component({
  selector: 'vex-player-create-update',
  templateUrl: './kyc-status-update.component.html',
  styleUrls: ['./kyc-status-update.component.scss']
})
export class KycStatusUpdateComponent implements OnInit {

  statusArr: any[] = [
    { name: 'accept', title: 'Accept' },
    { name: 'reject', title: 'Reject' }    
  ];

  subject$: ReplaySubject<Player[]> = new ReplaySubject<Player[]>(1);
  data$: Observable<Player[]> = this.subject$.asObservable();

  account_holder_name: any;
  bank_name: any;
  status: any;
  ifsc: any;
  DOB: any;
  fileUrl: any;
  kyc_mode: any;
  pan_number: any;
  pan_name: any;
  pan_status: any;
  pan_DOB: any;
  pan_fileUrl: any;
  aadhar_DOB: any;
  aadhar_name: any;
  aadhar_status: any;
  aadhar_number: any;
  account_number: any;
  aadhar_fileUrl: any;
  bankDetails: boolean = false;
  panDetails: boolean = false;
  aadharDetails: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any) {
  }

  ngOnInit() {
    console.log('this.defaults ===>>', this.defaults);
    
 console.log('Account nUmber ====>>', this.defaults.bank_details.account_number)
    if(this.defaults.bank_details.account_number){
     
      this.account_number = this.defaults.bank_details.account_number;
      this.account_holder_name = this.defaults.bank_details.account_holder_name;
      this.bank_name = this.defaults.bank_details.bank_name;
      this.ifsc = this.defaults.bank_details.ifsc;
      this.status = this.defaults.bank_details.status;
      this.bankDetails = true;
    }else{
      this.bankDetails = false;
    }
    
    if(this.defaults.pan_details.number){
      this.pan_DOB=this.defaults.pan_details.DOB;
      this.pan_fileUrl=this.defaults.pan_details.fileUrl;
      this.pan_fileUrl= "https://source.unsplash.com/user/c_v_r/100x100";
      this.pan_number=this.defaults.pan_details.number;
      this.pan_name=this.defaults.pan_details.name;
      this.pan_status = this.defaults.pan_details.pan_status;
      this.panDetails = true;
    }else{
      this.panDetails = false;
    }

    if(this.defaults.aadhar_details.number){
      this.aadhar_DOB= this.defaults.aadhar_details.DOB;
      this.aadhar_fileUrl= this.defaults.aadhar_details.fileUrl;
      this.aadhar_fileUrl= "https://source.unsplash.com/user/c_v_r/100x100";
      this.aadhar_name= this.defaults.aadhar_details.name;
      this.aadhar_number= this.defaults.aadhar_details.number;
      this.aadhar_status= this.defaults.aadhar_details.status;
      this.aadharDetails = true;
    }else{
      this.aadharDetails = false;
    }

  }

 

}
