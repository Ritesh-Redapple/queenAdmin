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
import { CountryService } from '../../../../app/pages/services/country.service';

export interface Brand {
  value: string;
  viewValue: string;
}

export interface Coin {
  value: number;
}

@Component({
  selector: 'vex-player-create-update',
  templateUrl: './statistics-create-update.component.html',
  styleUrls: ['./statistics-create-update.component.scss']
})
export class StatisticsCreateUpdateComponent implements OnInit {
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
  selectPhonecode
  selectUsername
  selectUseremail
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<StatisticsCreateUpdateComponent>,
              private fb: FormBuilder,
              private userService:UserService,
              private router: Router,
              private location: Location,
              private coinService:CountryService,
              private snackbar: MatSnackBar

              ) {
  }

  ngOnInit() {

   /*this.coinService.getAllUserLIsts().subscribe(Roles => {
      console.log(Roles);
      //roleList: RoleList[] =Roles;
      this.rolelists = Roles["result"];

      console.log("this.rolelists"+this.rolelists);

      //this.subject$.next(this.rolelists);
    })*/
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
      this.selectPhonecode= (this.defaults.phone_code) ? this.defaults.phone_code : '';
      this.selectUsername = (this.defaults.user_name) ? this.defaults.user_name : '';
      this.selectUseremail = (this.defaults.user_email) ? this.defaults.user_email : '';
    }

    this.form = this.fb.group({
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
    if(coins.country_name=='' 
    || coins.country_code ==""  
    
    || coins.phone_code ==""
    
    ){
      console.log("not");
         this.snackbar.open("All fields are required",'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
    }
    else {
    this.coinService.addCountry(coins).subscribe(User => {


    if(User['status']==1){
          console.log("ok");
        //this.router.navigateByUrl('country')
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
    const index = this.rolelists.findIndex(x => x.email === event.value);
    console.log(index);
    this.selectUsername = this.rolelists[index].userName
  }

}
