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


import {MatSelectChange} from "@angular/material/select";

import {Observable, ReplaySubject} from "rxjs";
import {filter} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NLHService } from '../../../../app/pages/services/nlh.service';

export interface Brand {
value: string;
viewValue: string;
}

export interface GameType {
  value: string;
  viewValue: string;
  }

export interface Coin {
value: number;
}

@Component({
selector: 'vex-nlh-create-update',
templateUrl: './nlh-create-update.component.html',
styleUrls: ['./nlh-create-update.component.scss']
})
export class NlhCreateUpdateComponent implements OnInit {
table_name:any;
phone_code:any;
selected=false;
autoMuckOption:any;
gameTypeOption:any;


statustypeArr: any[] = [
{ name: 'Active',value:'active' },
{ name: 'Inactive',value:'inactive' },
{ name: 'Deleted',value:'deleted' }


];

cardPassingArr: any[] = [
{ name: 'All',value:'all' },
{ name: 'Never',value:'never' },
{ name: 'Left',value:'left' },
];

handCountArr: any[] = [
  { name: '1',value:'1' },
  { name: '3',value:'3' },
  { name: '5',value:'5' },
  { name: '7',value:'7' },
  ];

brands: Brand[] = [
    { value: 'true', viewValue: 'Yes' },
    { value: 'false', viewValue: 'No' }
    
 ];

 gametypes: GameType[] = [
  { value: 'true', viewValue: 'nlh' },
  { value: 'false', viewValue: 'plh' },
  { value: 'false', viewValue: 'flh' }
  
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
private dialogRef: MatDialogRef<NlhCreateUpdateComponent>,
private fb: FormBuilder,              
private router: Router,
private location: Location,
private nlhService:NLHService,
private snackbar: MatSnackBar

) {
}

ngOnInit() {


////////////////////////////
if (this.defaults) {
//console.log(this.defaults);
this.mode = 'update';
} else {
this.defaults = {} as Player;
  this.selectPhonecode= (this.defaults.phone_code) ? this.defaults.phone_code : '';
  this.selectUsername = (this.defaults.table_name) ? this.defaults.table_name : '';
  this.selectUseremail = (this.defaults.user_email) ? this.defaults.user_email : '';
}

this.form = this.fb.group({
  card_passing: [this.defaults.card_passing || '',[Validators.required]],
  hand_count: [this.defaults.hand_count || '',[Validators.required]],
  minimum_level: [this.defaults.minimum_level || '',[Validators.required, Validators.min(5)]],
  });
}

save() {
if (this.mode === 'create') {
this.createNLHTable();
} else if (this.mode === 'update') {
this.updateNLHTable();
}
}

createNLHTable() {
  const tableData = this.form.value;    
  if(this.isEmpty(tableData)){
    //console.log("not");
    this.snackbar.open("All fields are required",'OK',{
      verticalPosition: 'top',
      horizontalPosition:'right'
    });
  }
  else {
    this.nlhService.addRoom(tableData).subscribe(User => {
    if(User['status']==1){
      //console.log("ok");        
      location.reload();
      this.dialogRef.close(tableData);
    }

    else{
      //console.log("not");
      this.snackbar.open(User['message'],'OK',{
      verticalPosition: 'top',
      horizontalPosition:'right'
      });
    }

    });

  }
}

updateNLHTable() {
const edittable = this.form.value;

edittable.table_id = this.defaults.table_id;

//console.log("edittable"+JSON.stringify(edittable))
this.nlhService.editNlh(edittable).subscribe(Table => {

if(Table){

location.reload();
this.dialogRef.close(edittable);
}
});
}

trim(x) {
  let value = String(x)
  return value.replace(/^\s+|\s+$/gm, '')
}

isEmpty(value){
  if (value === null || value === undefined || this.trim(value) === '' || value.length === 0) {
    return true
  } else {
    return false
  }
}

isCreateMode() {
return this.mode === 'create';
}

isUpdateMode() {
return this.mode === 'update';
}
changeValue(value) {
//console.log(value);

this.defaults.roleName = value;

}

getErrorName() {
  return this.form.get('tableName').hasError('required') ? 'Field is required' :
    this.form.get('tableName').hasError('minLength') ? 'Not a valid tableName' :'';
}



onUserChange(event){
const index = this.rolelists.findIndex(x => x.userName === event.value);
//console.log(index);
this.selectUseremail = this.rolelists[index].email
}

onEmailChange(event){
const index = this.rolelists.findIndex(x => x.email === event.value);
//console.log(index);
this.selectUsername = this.rolelists[index].userName
}

}
