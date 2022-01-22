import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../app/pages/auth/auth.service';
import { MatStepper } from '@angular/material';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
  fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  OTPCheckFormGroup: FormGroup;

  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  inputType = 'password';
  visible = false;
  isLinear = true;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  submitted = false;
  submitButtonVisible = false;
  LoginButtonVisible = true;
  otpFieldVisible = false;
  ResendButtonVisible = false;
  isCompleted = false;
  isCompleted1 = false;
  otpValue:any
  title:any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    public authService: AuthService,
    private ref: ChangeDetectorRef,
    public myapp: AppComponent
    ) {}

  ngOnInit() { 
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    });
    this.OTPCheckFormGroup = new FormGroup({
      otp: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]) 
    });
  }

  get f() { return this.loginForm.controls; }
  get f1() { return this.OTPCheckFormGroup.controls; }

  maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
      object.value = object.value.slice(0, object.maxLength)
  }  

  send() {
    console.log('I have reached in login send function');
    //this.router.navigate(['/dashboards/analytics']);
    if (this.OTPCheckFormGroup.invalid) {
      return;
    } 
    if (this.OTPCheckFormGroup.valid) {   
      let otp = this.f1.otp.value;
      if(otp) {    
        this.authService.checkOtp(otp)
        .pipe(first())
        .subscribe(
          data => {
            // console.log(data);
            if(data.status == 0)
            {
              this.isCompleted1 = false;
              this.snackbar.open('Invalid Credential', 'Sorry', {
                duration: 10000
              });
            }else{
              this.myapp.getMenuPermissionIds();
              this.router.navigate(['/dashboards/analytics']);
            }
          },
          error => {
            this.snackbar.open('Something went wrong', 'Sorry', {
              duration: 10000
            });
          });
      } else {
        this.snackbar.open('Something went wrong', 'Sorry', {
          duration: 10000
        });
      }
    }
  }

  SendOTP(){
    //this.stepper.next();
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {

      this.authService.sendOTP(this.f.email.value).pipe(first()).subscribe(resp => {
        if(resp["status"] == 1) {
          this.isCompleted=false;
          this.isCompleted1 = true;
          this.stepper.next();
        } else {
          this.isCompleted = false;
          {
            this.snackbar.open(resp['message'], '', {
              duration: 4000
            });
          }
        }
      });
    }


  }

  loginFunc(){
    //this.stepper.next();
    this.authService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        // console.log(data);
        if(data.status == 0)
        {
          this.isCompleted1 = false;
          this.snackbar.open('Invalid Credential', 'Sorry', {
            duration: 10000
          });
        }else{
          this.router.navigate(['/dashboards/analytics']);
          //this.stepper.next();
          // this.authService.sendOTP(this.f.email.value).pipe(first()).subscribe(resp => {
          //   if(resp["status"] == 1) {
          //     this.isCompleted=false;
          //     this.isCompleted1 = true;
          //     this.stepper.next();
          //   } else {
          //     this.isCompleted = false;
          //     {
          //       this.snackbar.open(resp['message'], '', {
          //         duration: 4000
          //       });
          //     }
          //   }
          // });
        }
        }
        // this.myapp.getMenuPermissionIds();
        //this.router.navigate(['/dashboards/analytics']);
,
      error => {
        this.snackbar.open(`error : ${error.message}`, 'Sorry', {
          duration: 10000
        });
      });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
