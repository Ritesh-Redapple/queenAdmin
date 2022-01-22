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
import { TournamentService } from '../../../../app/pages/services/tournament.service';

import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

import { NgZone, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
export interface Brand {
  value: string;
  viewValue: string;
}

export interface Coin {
  value: number;
}
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
   selector: 'vex-tournament-create-update',
  templateUrl: './tournament-create-update.component.html',
  styleUrls: ['./tournament-create-update.component.scss']
})
export class TournamentCreateUpdateComponent implements OnInit {

task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };

  picker: any;
  user_name:any;
  phone_code:any;
  selected=false;
  status:any;
  public selectedTime: string;
  starttimeVisible:any;
  tournament_late_entry:any;
  tournament_structure:any;
  tournament_bot_assistance:any;
  tournament_status:any; 
  selectItems:any;
  selectItemsSchedule:any;
  checkboxShow=false;
  scheduleShow=true;
  allComplete: boolean = false;
  game_type:any;
  tournament_schedule_days:any;
  tournament_rebuy:any;
  tournament_add_on:any;
  selectedFiles:any;
  fileToUpload: File = null;
  getErrorMessageForFileFormat:any;
  getErrorMessageForFileShow=false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }


 someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }





  

  tournamentStatusArr: any[] = [
{ name: 'Announced',value:'announced' },
{ name: 'Registering',value:'registering' },
{ name: 'finished',value:'finished' },
{ name: 'Cancelled',value:'cancelled' }


];

tournamentLateArr: any[] = [
{ name: 'Yes',value:'yes' },
{ name: 'No',value:'no' }



];
tournamentRebuyArr: any[] = [
{ name: 'Yes',value:'yes' },
{ name: 'No',value:'no' }



];

tournamentAddOnArr: any[] = [
{ name: 'Yes',value:'yes' },
{ name: 'No',value:'no' }



];

tournamentScheduleAnotherArr1: any[] = [
{ name: 'Once',value:'once' },
{ name: 'Daily',value:'daily' },
{ name: 'Weekly',value:'weekly' },
{ name: 'Select Days',value:'days' }



];

tournamentScheduleAnotherArr: any[] = [
{ name: 'Once',value:'Once' },
{ name: 'Daily',value:'Daily' },
{ name: 'Weekly',value:'Weekly' },
{ name: 'Select Days',value:'days' }




];

tournamentBotArr: any[] = [
{ name: 'Yes',value:'yes' },
{ name: 'No',value:'no' }



];

tournamentStructureArr: any[] = [
{ name: '10',value:10 },
{ name: '20',value:20 },
{ name: '30',value:30 }



];

tournamentScheduleArr: any[] = [
{ name: 'Monday',value:'monday' },
{ name: 'Tuesday',value:'tuesday' },
{ name: 'Wednesday',value:'wednesday' },
{ name: 'Thrusday',value:'thrusday' },
{ name: 'Friday',value:'friday' },
{ name: 'Saturday',value:'saturday' },
{ name: 'Sunday',value:'sunday' }



];

  tournamentGameTypeArr: any[] = [
{ name: 'NLH',value:'NLH' },
{ name: 'LH',value:'LH' },
{ name: 'PLO',value:'PLO' },
{ name: 'NLO',value:'NLO' }


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
  selectTournamentName;
  selectUsername;
  selectUseremail;
  tour_profile_image:any;
  signupForm: FormGroup;
  imagePath:any;
  msg:any;
  url:any;
  customDate = "Thu Oct 30 2019 06:50:22 GMT+0530";
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<TournamentCreateUpdateComponent>,
              private fb: FormBuilder,
              private tournamentService:TournamentService,
              private router: Router,
              private location: Location,
              
              private snackbar: MatSnackBar,
              private atp: AmazingTimePickerService,
              private sanitizer: DomSanitizer

              

              ) {


                 /* this.form = this.fb.group({
                   tournament_name: new FormControl('',[Validators.compose([Validators.required]),
                   tournament_description: new FormControl('',[Validators.required]), 
                   tournament_image: new FormControl('',[Validators.required]),

                   game_type: new FormControl('',[Validators.required]),

                   tournament_schedule_days: new FormControl('',[Validators.required]), 
                   tournament_days: new FormControl('',[Validators.required]), 
                   tournament_start_date:new FormControl('',[Validators.required]), 
                   tournament_start_time: new FormControl('',[Validators.required]), 
                   tournament_late_entry: new FormControl('',[Validators.required]), 
                   tournament_late_entry_expiry_time: new FormControl('',[Validators.required]), 
                   tournament_registration_open_date: new FormControl('',[Validators.required]), 

                   tournament_registration_open_time: new FormControl('',[Validators.required]), 
                   tournament_prize_pool_amount: new FormControl('',[Validators.required]), 
                   tournament_buy_in_amount: new FormControl('',[Validators.required]), 
                   tournament_entry_fee: new FormControl(''),
                   tournament_starting_chips: new FormControl('',[Validators.required]), 
                   tournament_minimum_player_registered: new FormControl('',[Validators.required]), 
                   tournament_maximum_player_allowed: new FormControl('',[Validators.required]), 
                   tournament_seats: new FormControl('',[Validators.required]), 
                   tournament_small_blind: new FormControl('',[Validators.required]), 
                   tournament_big_blind: new FormControl('',[Validators.required]), 
                   tournament_antes: new FormControl('',[Validators.required]), 
                   tournament_levels: new FormControl('',[Validators.required]), 
                   tournament_rebuy: new FormControl('',[Validators.required]), 
                   tournament_rebuys_maximum_count: new FormControl('',[Validators.required]),
                   tournament_rebuys_expiry_level: new FormControl('',[Validators.required]), 
                   tournament_rebuy_amount: new FormControl('',[Validators.required]), 
                   tournament_rebuy_chips_amount: new FormControl('',[Validators.required]), 
                   tournament_add_on: new FormControl('',[Validators.required]), ,
                   tournament_add_on_available_level: new FormControl('',[Validators.required]), 
                   tournament_add_on_expiry_level: new FormControl('',[Validators.required]), 
                   tournament_add_on_amount: new FormControl('',[Validators.required]), 
                   tournament_structure: new FormControl('',[Validators.required]), 
                   tournament_bot_assistance: new FormControl('',[Validators.required]), 
                   tournament_status: new FormControl('',[Validators.required]), 
                   
                    });*/
  }

  ngOnInit() {
   // this.date = new Date(2021,9,4,5,6,7);
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

      console.log("ok1"+JSON.stringify(this.defaults));
      this.selectTournamentName= (this.defaults.tournament_name) ? this.defaults.tournament_name : '';
      /*this.selectUsername = (this.defaults.user_name) ? this.defaults.user_name : '';
      this.selectUseremail = (this.defaults.user_email) ? this.defaults.user_email : '';*/
    }
    console.log("defa"+this.defaults.tournament_days);
    if(this.defaults.tournament_start_time)
      this.starttimeVisible=true;
    if(this.defaults.tournament_days && this.defaults.tournament_schedule_days ==="days"){
     console.log("ok");
      this.selectItemsSchedule=JSON.parse(this.defaults.tournament_days);

      this.checkboxShow=true;

      }
      else{
        this.checkboxShow=false;
      }

      if(this.defaults.tournament_schedule_days)
      this.selectItems=(this.defaults.tournament_schedule_days);

      console.log("this.selectItems"+JSON.stringify(this.selectItems))

      if(this.defaults.tournament_image){    

        this.url =this.defaults.tournament_image;
        this.fileToUpload=this.defaults.tournament_image;    
               
      } 
      console.log("this.defaults.tournament_start_date"+this.defaults.tournament_start_date);
      this.form = this.fb.group({
      tournament_id: this.defaults.tournament_id,
      tournament_name: [this.defaults.tournament_name || ''],

      game_type: [this.defaults.game_type || ''],

      tournament_start_time:[this.defaults.tournament_start_time || ''],

      tournament_start_date:[this.defaults.tournament_start_date || ''],

      tournament_buy_in_amount:[this.defaults.tournament_buy_in_amount || ''],
      tournament_prize_pool_amount:[this.defaults.tournament_prize_pool_amount || ''],

      tournament_entry_fee:[this.defaults.tournament_entry_fee || ''],

       tournament_minimum_player_registered:[this.defaults.tournament_minimum_player_registered || ''],

       tournament_starting_chips:[this.defaults.tournament_starting_chips || ''],

       tournament_maximum_player_allowed:[this.defaults.tournament_maximum_player_allowed || ''],

       tournament_seats:[this.defaults.tournament_seats || ''],

       tournament_rebuys_maximum_count:[this.defaults.tournament_rebuys_maximum_count || ''],

       tournament_rebuy:[this.defaults.tournament_rebuy || ''],

       tournament_rebuys_expiry_level:[this.defaults.tournament_rebuys_expiry_level || ''],

       tournament_rebuy_amount:[this.defaults.tournament_rebuy_amount || ''],

       tournament_rebuy_chips_amount:[this.defaults.tournament_rebuy_chips_amount || ''],

       tournament_add_on:[this.defaults.tournament_add_on || ''],

       tournament_add_on_available_level:[this.defaults.tournament_add_on_available_level || ''],

       tournament_add_on_expiry_level:[this.defaults.tournament_add_on_expiry_level || ''],

       tournament_add_on_amount:[this.defaults.tournament_add_on_amount || ''],

       

       tournament_add_on_chips_amount:[this.defaults.tournament_add_on_chips_amount || ''],

       tournament_schedule_date:[this.defaults.tournament_schedule_date || ''],

       tournament_schedule_days:[this.defaults.tournament_schedule_days || ''],

       tournament_schedule_time:[this.defaults.tournament_schedule_time || ''],


       tournament_registration_open_date:[this.defaults.tournament_registration_open_date || ''],

       tournament_registration_open_time:[this.defaults.tournament_registration_open_time || ''],

       tournament_late_entry:[this.defaults.tournament_late_entry || ''],

       tournament_late_entry_expiry_time:[this.defaults.tournament_late_entry_expiry_time || ''],

       tournament_structure:[this.defaults.tournament_structure || ''],

       tournament_small_blind:[this.defaults.tournament_small_blind || ''],

       

       tournament_big_blind:[this.defaults.tournament_big_blind || ''],

       tournament_bot_assistance:[this.defaults.tournament_bot_assistance || ''],

       tournament_antes:[this.defaults.tournament_antes || ''],

       tournament_levels:[this.defaults.tournament_levels || ''],

       tournament_status:[this.defaults.tournament_status || ''],

       tournament_days:[this.defaults.tournament_days || ''],

       tournament_description:[this.defaults.tournament_description || ''],

       tournament_image:[this.defaults.tournament_image || ''],
      
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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.getErrorMessageForFileShow=false;

    var pattern = /image-*/;

      if (!this.fileToUpload.type.match(pattern)) {
        alert('Invalid format');
        this.getErrorMessageForFileFormat="Only IMage allowed";
        this.getErrorMessageForFileShow=true;
        return;
      }


    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result; 
    }
}
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.form.value.tournament_image=event.target.files.item(0).value;

    console.log("image name"+event.target.files.item(0).name);

    console.log("image value"+JSON.stringify(this.form.value.tournament_image))
    const formData = new FormData();
    
    





    ////////////////
    var reader = new FileReader();
      this.imagePath = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
      console.log("ok13")
         this.tour_profile_image = reader.result; 
        

        console.log("formData"+JSON.stringify(formData))

        
      }
}

  createPlayer() {
   //if(this.form.valid)
      //{
    const coins = this.form.value;
    //const formData = new FormData();
    
     /*formData.append("tournament_image", this.form.get('tournament_image').value);*/
    
    
    this.tournamentService.addTournament(coins,this.fileToUpload).subscribe(User => {

    console.log("User while add"+JSON.stringify(User));


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
    //}
    /*else{
       this.snackbar.open('Some fields are mandatory','OK',{
            verticalPosition: 'top',
            horizontalPosition:'right'
          });
          
    }*/
  }
   updatePlayer() {
    const editplayer = this.form.value;

    editplayer.tournament_id = this.defaults.tournament_id;
    
    console.log("tournament start date console"+
    editplayer.tournament_start_date
    );

    console.log("tournament_registration_open_date console"+
    editplayer.tournament_registration_open_date
    );

    console.log("editplayer.tournament_schedule_days"+typeof(editplayer.tournament_schedule_days));
    /*if(editplayer.tournament_days !=""){
    editplayer.tournament_days=JSON.stringify(editplayer.tournament_days);
    }*/
    console.log("1234editplayer"+JSON.stringify(editplayer))
    this.tournamentService.editTournament(editplayer,this.fileToUpload).subscribe(User => {
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
    const index = this.rolelists.findIndex(x => x.email === event.value);
    console.log(index);
    this.selectUsername = this.rolelists[index].userName
  }

  open(ev: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.selectedTime = time;
    });
  }

   changeWebsite(e) {

    console.log("pp",e.value);
    if(e.value=="days"){
    this.checkboxShow=true;
    //this.scheduleShow=false;


    }
    else{
      this.checkboxShow=false;
       delete this.form.value.tournament_days;
      
    }

  }
  

}
