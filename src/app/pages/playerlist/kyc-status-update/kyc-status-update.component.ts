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
  user_name:any;
  phone_code:any;
  selected=false;
  coins:any;

  usertypeArr: any[] = [
    { name: 'Deposit' },
    { name: 'Withdrawl' }
    
    
];

  

 
  subject$: ReplaySubject<Player[]> = new ReplaySubject<Player[]>(1);
  data$: Observable<Player[]> = this.subject$.asObservable();
  rolelists= [];
  Coin=[];
  coinList=[];
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  dataSource: MatTableDataSource<Player> | null;
  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPerson = icPerson;
  icMyLocation = icMyLocation;
  icLocationCity = icLocationCity;
  icEditLocation = icEditLocation;
  icPhone = icPhone;
  aadharStatus
  panStatus
  bankStatus
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<KycStatusUpdateComponent>,
              private fb: FormBuilder,
              private userService:UserService,
              private router: Router,
              private location: Location,
              private coinService:CoinService,
              private snackbar: MatSnackBar

              ) {
  }

  ngOnInit() {

   
    
   ////////////////////////////////

    ////////////////////////////
    if (this.defaults) {
      console.log(this.defaults);
      //this.mode = 'update';
      this.mode = 'create';

    } else {
      this.defaults = {} as Player;
      this.aadharStatus= (this.defaults.phone_code) ? this.defaults.phone_code : '';
      this.panStatus = (this.defaults.user_name) ? this.defaults.user_name : '';
      this.bankStatus = (this.defaults.user_email) ? this.defaults.user_email : '';
    }

    this.form = this.fb.group({
      coins1: this.defaults.coins1,
      reason: this.defaults.reason,
      user_email1: this.defaults.user_email1,
      user_name1:this.defaults.user_name1,
      type1:this.defaults.type1,
      country_id: this.defaults.country_id,
      //imageSrc: this.defaults.imageSrc,
      user_name: [this.defaults.phone_code || ''],
      phone_code: [this.defaults.phone_code || ''],
      country_code: [this.defaults.country_code || ''],
      country_name: this.defaults.country_name || '',
      //rolename:[this.defaults.roleName || ''],
     
      //roleid:[this.defaults.roleId || ''],
      //coins:[this.defaults.coins || [Validators.required]],
      //coins:[this.defaults.coins || ''],
      //username:[this.defaults.userName || ''],
      //useremail:[this.defaults.email || ''],
      _id:[this.defaults._id || ''],
      user_id:[this.defaults.user_id || '']
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createPlayer();
    } else if (this.mode === 'update') {
      this.updatePlayer();
    }
  }

  createPlayer() {
    const coins = this.form.value;
    
    console.log("coins value"+(coins.length));
    console.log("coins value string"+JSON.stringify(coins))
    if(coins.coins1=='' || coins.coins1== null
    
    
    ){
      console.log("not");
         this.snackbar.open("All fields are required",'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
    }
    else {
    coins.coins=coins.coins1;
    
    this.coinService.withdrawCoin(coins).subscribe(User => {


    if(User['status']==1){
          console.log("ok");
        
        location.reload();
        this.dialogRef.close(coins);
      }

      else{
         console.log("not");
         this.snackbar.open(User['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
      }
      
    });

    }
  }

  updatePlayer() {
    const editplayer = this.form.value;

    editplayer.country_id = this.defaults.country_id;

    console.log("editplayer"+JSON.stringify(editplayer))
    /*this.coinService.editCountry(editplayer).subscribe(User => {
      //console.log(User);
      if(User){
        //this.router.navigate(['/user']);
        //this.ngOnInit();
        location.reload();
        this.dialogRef.close(editplayer);
      }
    });*/
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
  changeValue(value) {
    console.log(value);
    //console.log(this.peopleForm.get("roleid").value);
    //console.log()
    //const index = this.rolelists.findIndex(c => c === row);
    //console.log(index);
    //console.log(this.rolelists);
    this.defaults.roleName = value;
    //this.subject$.next(this.rolelists);
  }

}
