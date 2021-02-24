import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';
import { Services } from '../service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.scss']
})
export class AdminSignUpComponent implements OnInit {

playerRole = [
  'gameAdmin',
  'tournamentAdmin',
  'platformAdmin',
  'superAdmin'
];
userType = [
  'nice',
  'ceat',
  'guest',
  'valorant'
];
selectedPlayerRole: string;
selectedUserType: string;
errorMessage: string;
title: string;
  constructor(private http: HttpClient, private ser: Services, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
     this.router.params.subscribe((params: Params) => {
          // tslint:disable-next-line:no-string-literal
          this.title = params['name'];
     });
     if (this.title == null){
       this.title = 'Admin SignIn Page';
     }
  }
// tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
    // console.log(form.value.playerRole);
      const obj = {
        '@class': '.RegistrationRequest',
        displayName: form.value.displayName,
        password: form.value.password,
        userName: form.value.email,
        scriptData: {
          Role: form.value.playerRole,
          mobileNo: form.value.number,
          userType: form.value.userType
        }
    };
      this.http.post(environment.gamesparksApiKeyForAdminSignUp, obj).subscribe((res: any) => {
        console.log(res);
        this.ser.userId = res.userId;
        if (res.scriptData.statusCode === 200) {
          localStorage.setItem('email' , form.value.email);
          localStorage.setItem('password' , form.value.password);
          this.route.navigate(['adminPanel/1/Admin LogIn Page']);
        }else if (res.scriptData.statusCode === 201){
          this.errorMessage = res.scriptData.message;
        }
    });

  }
  // tslint:disable-next-line:typedef
  onLogIn(){
    this.route.navigate(['adminPanel/1/Admin LogIn Page']);
  }

}
