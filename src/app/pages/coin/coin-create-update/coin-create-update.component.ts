import { Component, Inject, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup } from '@angular/forms';
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

import { UserService } from '../../../../app/pages/services/user.service';
import {MatSelectChange} from "@angular/material/select";
//import {Tournament} from "../../tournament/interfaces/tournament.model";
import {Observable, ReplaySubject} from "rxjs";
import {filter} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CoinService } from '../../../../app/pages/services/coin.service';

export interface Brand {
  value: string;
  viewValue: string;
}

export interface Coin {
  value: number;
}

@Component({
  selector: 'vex-player-create-update',
  templateUrl: './coin-create-update.component.html',
  styleUrls: ['./coin-create-update.component.scss']
})
export class CoinCreateUpdateComponent implements OnInit {
  user_name:any;
  phone_code:any;
  selected=false;

  usertypeArr: any[] = [
    { name: 'Deposit' },
    { name: 'Withdrawl' }
    
    
];

  brands: Brand[] = [
    { value: 'Louis Vuitton', viewValue: 'Louis Vuitton' },
    { value: 'Gucci', viewValue: 'Gucci' },
    { value: 'Prada', viewValue: 'Prada' },
    { value: 'Chanel', viewValue: 'Chanel' },
  ];

  coins: Coin[] = [
    { value: 50},
    { value: 100},
    { value: 200 },
    { value: 500 },
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
  selectPhonecode:any;
  selectUsername:any;
  selectUseremail:any;
  showEmail=false;
  emailValue:any;
  useridValue:any;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<CoinCreateUpdateComponent>,
              private fb: FormBuilder,
              private userService:UserService,
              private router: Router,
              private location: Location,
              private coinService:CoinService,
              private snackbar: MatSnackBar

              ) {
  }

  ngOnInit() {

   this.userService.getAllPlayers().subscribe(Roles => {
      console.log(Roles);
      //roleList: RoleList[] =Roles;
      this.rolelists = Roles["data"];
     
      console.log("this.rolelists"+JSON.stringify(this.rolelists));

      //this.subject$.next(this.rolelists);
    })
    /*this.userService.getAllRoles().subscribe(Roles => {
      console.log(Roles);
      //roleList: RoleList[] =Roles;
      this.rolelists = Roles["result"];

      //this.subject$.next(this.rolelists);
    })*/
    this.coinList = [
      { value: 10},
      { value: 50},
      { value: 100},
      { value: 250 },
      { value: 500 },
    ];
   ////////////////////////////////

    ////////////////////////////
    if (this.defaults) {
      console.log(this.defaults);

      

      this.mode = 'update';
    } else {
      this.defaults = {} as Player;
      this.selectPhonecode= (this.defaults.fullname) ? this.defaults.fullname : '';
      this.selectUsername = (this.defaults.user_name) ? this.defaults.user_name : '';
      this.selectUseremail = (this.defaults.user_email) ? this.defaults.user_email : '';

      this.selectUseremail = (this.defaults.email) ? this.defaults.email : '';

      console.log("this.selectUseremail"+this.selectUseremail);
    }
    this.selectUseremail = (this.defaults.user_id) ? this.defaults.user_id : '';

      console.log("this.selectUseremail"+this.selectUseremail);

    this.form = this.fb.group({
      //user_id: this.defaults.user_id,
      
      user_id: [this.defaults.user_id || ''],
      //country: [this.defaults.country || ''],
      //dob: [this.defaults.dob || ''],
      coins: this.defaults.coin_balance || '',
      //username:[this.defaults.username || ''],
      reason:[this.defaults.reason || ''],
     
      email:[this.defaults.email || ''],      
      _id:[this.defaults._id || ''],
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
    /*if (!coins.imageSrc) {
      coins.imageSrc = 'assets/img/avatars/1.jpg';
    }*/
    console.log("coins value"+(coins.length));
    console.log("coins value string"+JSON.stringify(coins))
   
    //else {
    coins.user_id=this.useridValue;
    this.coinService.addCoin(coins).subscribe(User => {
    console.log("User"+JSON.stringify(User));

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
      //location.reload();
      //this.dialogRef.close(coins);
    });

    //}
  }

  updatePlayer() {
    const editplayer = this.form.value;

    editplayer.user_id = this.defaults.user_id;
    editplayer.coins1 = this.defaults.coins;

    console.log("editplayer"+JSON.stringify(editplayer))
    this.coinService.addCoin(editplayer).subscribe(User => {
      //console.log(User);
      if(User){
        //this.router.navigate(['/user']);
        //this.ngOnInit();
        location.reload();
        this.dialogRef.close(editplayer);
      }
    });
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
  /*onLabelChange(change: MatSelectChange, row: Tournament) {
    const index = this.tournaments.findIndex(c => c === row);
    this.tournaments[index].labels = change.value;
    this.subject$.next(this.tournaments);
  }*/
  //this.rolelists

  onUserChange(event){
    const index = this.rolelists.findIndex(x => x.userName === event.value);
    console.log(index);
    this.selectUseremail = this.rolelists[index].email
  }

  onEmailChange(event){
    const index = this.rolelists.findIndex(x => x.user_id === event.value);
    console.log(index);
    this.selectUseremail = this.rolelists[index].user_id
     console.log(this.selectUseremail)
  }

  changeCalled(val) {
    console.log('changeCalled'+val);
    if(val !=""){
    //call api for fetch email
    var result = this.rolelists.filter(number => number.username ===val);
    if(result.length){
    console.log(result[0].email)
    this.emailValue=result[0].email;
    this.useridValue=result[0].user_id;
    this.showEmail=true;

    }
     else{
       
         this.snackbar.open('Please provide correct username.','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
    }
    }
  }

}
