import { Component, Inject, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../interfaces/tournament.model';
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

import { TournamentService } from '../../../../app/pages/services/tournament.service';

export interface Brand {
  value: string;
  viewValue: string;
}

export interface Coin {
  value: number;
}

@Component({
  selector: 'vex-player-register',
  templateUrl: './player-unregister.component.html',
  styleUrls: ['./player-unregister.component.scss']
})
export class UnregisterComponent implements OnInit {
  user_name:any;
  phone_code:any;
  selected=false;
  coins:any;
  emailValue:any;
  showEmail=false;

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
  selectPhonecode
  selectUsername
  selectUseremail
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<UnregisterComponent>,
              private fb: FormBuilder,
              private userService:UserService,
              private router: Router,
              private location: Location,
              private coinService:CoinService,
              private snackbar: MatSnackBar,
              private tournamentService:TournamentService

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

   ////////////////////////////////

    ////////////////////////////
    if (this.defaults) {
      console.log(this.defaults);
      //this.mode = 'update';
      this.mode = 'create';

    } else {
      this.defaults = {} as Player;
      this.selectPhonecode= (this.defaults.phone_code) ? this.defaults.phone_code : '';
      this.selectUsername = (this.defaults.user_name) ? this.defaults.user_name : '';
      this.selectUseremail = (this.defaults.user_email) ? this.defaults.user_email : '';
    }

    this.form = this.fb.group({
      
      tournament_id: this.defaults.tournament_id,    
      
      
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
    const registerform = this.form.value;
    
    
    console.log("registerform value"+(registerform.length));
    console.log("registerform value string"+JSON.stringify(registerform))
    if(registerform.tournament_id==''  || registerform.user_id== null
    
    
    ){
      
         this.snackbar.open("All fields are required",'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
    }
    else {
    this.tournamentService.unregisterPlayer(registerform).subscribe(User => {

     console.log("User"+JSON.stringify(User));

    if(User['status']==1){
          console.log("ok");
        
        location.reload();
        this.dialogRef.close(registerform);
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
  
  

  changeCalled(val) {
    console.log('changeCalled'+val);
    if(val !=""){
    //call api for fetch email
    var result = this.rolelists.filter(number => number.user_id ===val);
    console.log(result[0].email)
    this.emailValue=result[0].email;
    this.showEmail=true;
    }
  }

}
