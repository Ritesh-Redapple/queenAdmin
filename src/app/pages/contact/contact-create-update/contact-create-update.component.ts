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

import { UserService } from '../../services/user.service';
import {MatSelectChange} from "@angular/material/select";
//import {Tournament} from "../../tournament/interfaces/tournament.model";
import {Observable, ReplaySubject} from "rxjs";
import {filter} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContactService } from '../../services/contact.service';

export interface Brand {
  value: string;
  viewValue: string;
}

export interface Contact {
  value: number;
}

@Component({
  selector: 'vex-player-create-update',
  templateUrl: './contact-create-update.component.html',
  styleUrls: ['./contact-create-update.component.scss']
})
export class ContactCreateUpdateComponent implements OnInit {
  user_name:any;
  phone_code:any;
  selected=false;

  contacts: Contact[] = [
    { value: 50},
    { value: 100},
    { value: 200 },
    { value: 500 },
  ];
  subject$: ReplaySubject<Player[]> = new ReplaySubject<Player[]>(1);
  data$: Observable<Player[]> = this.subject$.asObservable();

  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  dataSource: MatTableDataSource<Player> | null;
  icMoreVert = icMoreVert;
  icClose = icClose;

  icPrint = icPrint;
  icDownload = icDownload;
  icDelete = icDelete;

  icPhone = icPhone;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<ContactCreateUpdateComponent>,
              private fb: FormBuilder,
              private userService:UserService,
              private router: Router,
              private location: Location,
              private contactService:ContactService,
              private snackbar: MatSnackBar

              ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl()
   });
  }

  save() {
    this.createNotification();
  }

  createNotification() {
    const contacts = this.form.value;


     this.contactService.sendNotification(contacts).subscribe(User => {
    console.log("User"+JSON.stringify(User));

    if(User['status']==1){
      this.snackbar.open(User['message'],'Notification sent!',{
        verticalPosition: 'top',
        horizontalPosition:'right'
      });
      setTimeout(()=>{
        location.reload();
      },3000)  
        
        this.dialogRef.close(contacts);
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

  isCreateMode() {
    return this.mode === 'create';
  }

}
