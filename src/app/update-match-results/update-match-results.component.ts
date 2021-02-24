import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Services } from '../service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-update-match-resultd',
  templateUrl: './update-match-results.component.html',
  styleUrls: ['./update-match-results.component.scss']
})
export class UpdateMatchResultsComponent implements OnInit {

  constructor(private http: HttpClient, private ser: Services) { }
  title: string;
adminId: any;
message: string;
errorMessage: string;
logInIndicator = false;
  ngOnInit(): void {
    this.title = this.ser.title;
    if (this.ser.userId){
      this.logInIndicator = true;
    }else{
      this.logInIndicator = false;
    }
  }
// tslint:disable-next-line:typedef
onSubmit(form: NgForm){
  const obj = {
    '@class': '.LogEventRequest',
    eventKey: 'PostMatchResults',
    tournamentId: form.value.TournamentId,
    player1: form.value.Player1,
    round: form.value.round,
    playerId : this.ser.userId
  };
  // tslint:disable-next-line:max-line-length
  this.http.post(environment.gamesparksApiKeyForUpdatingMatchResults, obj).subscribe((res: any) => {
       console.log(res);
       if (res.error){
         this.message = res.error.authentication;
       }else{
        this.message = res.scriptData.message;
       }
       this.errorMessage = res.scriptData.message;
  });
  console.log(form);
 }
}
