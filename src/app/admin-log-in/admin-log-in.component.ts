import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Services } from '../service';
import { environment} from '../../environments/environment';
import {GamesparksCallingService} from '../gamesparks-calling.services';

@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss']
})
export class AdminLogInComponent implements OnInit {

  email: string;
  password: string;
  loginForm: FormGroup;
  source: string;
  eventId: string;
  signupURL: string;

  public userId: string;
  public successMessage: string;
  public errorMessage: string;
  public authFaild: boolean;
  title: string;
  selectedUserType: string;

defaultValue = 'Admin';
gender = ['male', 'female'] ;

userType = [
  'nice',
  'ceat',
  'guest',
  'valorant'
];

  constructor(
     private http: HttpClient,
     private router: ActivatedRoute,
     private route: Router,
     private ser: Services) {}
  // tslint:disable-next-line:typedef
  ngOnInit(): void {
      if (this.title == null){
        this.title = 'Admin LogIn Page';
      }
      this.email = localStorage.getItem('userName');
      this.password = localStorage.getItem('password');

  }
// tslint:disable-next-line:typedef
    onSubmit(form: NgForm){
      const obj = {
        '@class': '.AuthenticationRequest',
         password: form.value.key,
         userName: form.value.userName,
      };
      // tslint:disable-next-line:max-line-length
      this.http.post(environment.gamesparksApiKeyForAdminLogIn, obj).subscribe((res: any) => {
        console.log(res);
        if (res.scriptData.response === 'Success'){
          this.authFaild = false;
          this.ser.gameSparksUserId(res.userId);
           // tslint:disable-next-line:no-unused-expression
          this.ser.gameSparksUserKey(form.value.key);
          this.ser.gameSparksUserName(form.value.userName);
          this.route.navigate(['SelectGame']);
          localStorage.setItem('userName', form.value.userName);
          localStorage.setItem('password',  form.value.key);
        }else{
          this.authFaild = true;
          this.errorMessage = res.scriptData.ERROR;
        }
      });
      }
}
