import { Component, Inject, LOCALE_ID, Renderer2, OnInit } from '@angular/core';
import { ConfigName, ConfigService } from '../@vex/services/config.service';
import { MatIconRegistry } from '@angular/material/icon';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';

import icLayers from '@iconify/icons-ic/twotone-layers';
import icUser from '@iconify/icons-fa-solid/user';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icBook from '@iconify/icons-ic/twotone-book';
import icPerson from '@iconify/icons-ic/twotone-person';
import icStars from '@iconify/icons-ic/twotone-stars';
import icHome from '@iconify/icons-ic/twotone-home';
import icPages from '@iconify/icons-ic/twotone-pages';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icAnnouncement from '@iconify/icons-ic/twotone-announcement';
import icSettings from '@iconify/icons-ic/settings';

import icBlog from '@iconify/icons-fa-solid/blog';
import icAd from '@iconify/icons-fa-solid/ad';
import icAmbulance from '@iconify/icons-fa-solid/ambulance';
import icNotesMedical from '@iconify/icons-fa-solid/notes-medical';
import icClinicMedical from '@iconify/icons-fa-solid/clinic-medical';
import icMedkit from '@iconify/icons-fa-solid/medkit';
import icBookMedical from '@iconify/icons-fa-solid/book-medical';
import icFileMedicalAlt from '@iconify/icons-fa-solid/file-medical-alt';
import icBriefcaseMedical from '@iconify/icons-fa-solid/briefcase-medical';
import icUserInjured from '@iconify/icons-fa-solid/user-injured';
import icUserMd from '@iconify/icons-fa-solid/user-md';

import { AuthService } from './../app/pages/auth/auth.service';
import { MasterdataService } from '../app/pages/services/masterdata.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MasterdataService]
})
export class AppComponent {
  title = 'vex';
  is_logged_in:boolean;
  admin_type:any;
  admin_name:string;
  admin_role;
  requestCount;
  newDoctorRequestCount:any
  newAppointmentRequestCount:any
  newMedicineRequestCount:any
  newMedicalReportRequestCount:any
  newDiagnosisRequestCount:any
  newBloodReqRequestCount:any
  newAmbulanceRequestCount:any
  menulist:any
  menuAccess:any

  navigationItems= []
  menuPerms:any

  ngOnInit() {
    this.getMenuPermissionIds();
  }

  constructor(private configService: ConfigService,
              private styleService: StyleService,
              private iconRegistry: MatIconRegistry,
              private renderer: Renderer2,
              private platform: Platform,
              @Inject(DOCUMENT) private document: Document,
              @Inject(LOCALE_ID) private localeId: string,
              private layoutService: LayoutService,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private splashScreenService: SplashScreenService,
              public authService: AuthService,
              private masterdataService:MasterdataService,
              private router: Router) {

    this.iconRegistry.setDefaultFontSetClass('iconify');
    Settings.defaultLocale = this.localeId;

    this.is_logged_in = this.authService.isLoggedIn;
    this.admin_type = (localStorage.getItem('tu_user_type_id'))?localStorage.getItem('tu_user_type_id'):''; 

  
    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl')))
    ).subscribe(queryParamMap => {
      this.document.body.dir = 'rtl';
      this.configService.updateConfig({
        rtl: true
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    this.navigationItems = [
      {
        type: 'link',
        label: 'Dashboard',
        route: '/dashboards/analytics',
        icon: icLayers,
        user_type: ['Admin']
      },
      // {
      //   type: 'link',
      //   label: 'Player Managers',
      //   route: '/playerlist',
      //   icon: icPages,
      //   user_type: ['Admin']
      // },
      // {
      //   type: 'link',
      //   label: 'Statistics Managers',
      //   route: '/statistics',
      //   icon: icPages,
      //   user_type: ['Admin']
      // },
      {
        type: 'dropdown',
        label: 'Game Rooms',
        //route: '/nlh_tables',
        icon: icStars,
        children:[
          {type: 'link',label: 'Room List',route: '/nlh_tables',icon: icUser,user_type: ['Admin']}
        ],
        user_type: ['Admin']
      },
      // {
      //   type: 'link',
      //   label: 'Tournaments',
      //   route: '/tournaments',
      //   icon: icPages,
      //   user_type: ['Admin']
      // },
      
      // {
      //   type: 'link',
      //   label: 'Country Managers',
      //   route: '/country',
      //   icon: icPages,
      //   user_type: ['Admin']
      // },
      
      
      // {
      //   type: 'dropdown',
      //   label: 'Coin Managers',
      //   //route: '/coin',
      //   icon: icPages,
      //   children: [ 
      //     {type: 'link',label: 'Add Coins',route: '/coin',icon: icUser,user_type: ['Admin']}, 
      //     {type: 'link',label: 'Withdraw Coins',route: '/withdrawcoin',icon: icUser,user_type: ['Admin']},  
      //   ]
      //   //user_type: ['Admin']
      // },
      {
        type: 'dropdown',
        label: 'User Managers',
        //route: '/agent',
        icon: icUser,
        children: [ 
          {type: 'link',label: 'User List',route: '/playerlist',icon: icUser,user_type: ['Admin']}, 
          // {type: 'link',label: 'User Details',route: '/statistics',icon: icUser,user_type: ['Admin']},  
        ]
        //user_type: ['Admin']
      },
      // {
      //   type: 'dropdown',
      //   label: 'Settings',
      //   icon: icSettings,
      //   children: [ 
      //     {type: 'link',label: 'Managers',route: '/user-management',icon: icUser,user_type: ['Admin']}, 
      //     {type: 'link',label: 'Role Management',route: '/role',icon: icUser,user_type: ['Admin']},  
      //   ]
      // },
      // {
      //   type: 'dropdown',
      //   label: 'Tournament Managers',
      //   icon: icUser,
      //   children: [ 
      //     {type: 'link',label: 'Tournament Details',route: '/tournaments',icon: icUser,user_type: ['Admin']}, 
      //     {type: 'link',label: 'Tournament History Management',route: '/tournamenthistory',icon: icUser,user_type: ['Admin']},  
      //   ]
      // },

       {
        type: 'link',
        label: 'Notifications',
        route: '/notifications',
        icon: icPages,
        user_type: ['Admin']
      },
      {
        type: 'link',
        label: 'Transactions',
        route: '/transactions',
        icon: icPages,
        user_type: ['Admin']
      },

    ];
  }

  getMenuPermissionIds() {
    let self = this;
    var menunamearr = [];
    var menus = localStorage.getItem('tu_admin_menu_names');
    if(menus && menus != "") {
      var menunames = JSON.parse(localStorage.getItem('tu_admin_menu_names'));

      console.log("menunames"+JSON.stringify(menunames))
      if(menunames.length > 0) {
        for (var i = menunames.length - 1; i >= 0; i--) {
          menunamearr.push(menunames[i]["label"]);
        }
      } else {
        menunamearr = [];
      }
    } else {
      menunamearr = [];
    }
    self.navigationService.items = [];
    for(let obj of self.navigationItems){
      self.navigationService.items.push(obj);
      // for(let menu of menunamearr) {
      //   if(menu == obj.label){
      //     self.navigationService.items.push(obj);
      //     // self.navigationService.items.sort((a, b) => a.label.localeCompare(b.label));
      //   }
      // }
    }
    
    return menunamearr;
  }

}
