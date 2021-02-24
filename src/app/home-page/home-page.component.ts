import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Services } from '../service';
import { environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
title: string;
selectedUserType: string;
adminName: string;
logInMessage: string;
errorMessage = false;
logInIndicator = false;
userType = [];
selectPage: string;
  constructor(private router: ActivatedRoute , private ser: Services, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    if (this.ser.userId === undefined){
      this.logInIndicator = false;
    }else{
      this.logInIndicator = true;
    }
    this.router.params.subscribe((params: Params) => {
      // tslint:disable-next-line:no-string-literal
      this.title = params['name'];
    });
    if (this.logInIndicator){
      const obj = {
        '@class': '.LogEventRequest',
        eventKey: 'LoadPages',
        playerId: this.ser.userId
      };
      // tslint:disable-next-line:max-line-length
      this.http.post('https://h391398vkuek.preview.gamesparks.net/rs/debug/UZVkxRGqK5ewFbmMrEg2yuseepqcm5Tf/LogEventRequest', obj).subscribe((res: any) => {
          this.userType = res.scriptData.data;
          this.adminName = res.scriptData.message;
          this.errorMessage = false;
          if (this.userType.length <= 0){
            this.errorMessage = true;
            this.logInMessage = 'please go back to logIn';
          }
          console.log(res.scriptData);
      });
    }
  }
  // tslint:disable-next-line:typedef
  onSelectPage(){
    // tslint:disable-next-line:whitespace
    // this.route.navigate([ this.userType[index]] ,{relativeTo:this.router});
    this.route.navigate(['/SelectGame'], {relativeTo: this.router} );
  }
}


