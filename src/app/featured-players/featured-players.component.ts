import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from '../service';
@Component({
  selector: 'app-featured-players',
  templateUrl: './featured-players.component.html',
  styleUrls: ['./featured-players.component.scss']
})
export class FeaturedPlayersComponent implements OnInit {
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router, private ser: Services) { }
  title: string;
val = 'cdswcda';
UserName: string;
totalMatches: string;
totalPoints: string;
wins: string;
isChecked = false;
dataExists = false;
num = 0;
value: number;
data = [];
shortCodes = [];
tournamentId: string;
added: string;
removed: string;
errorMessage: string;
logInIndicator = false;
  ngOnInit(): void {
    this.title = this.ser.title;
    if (this.ser.userId){
      this.logInIndicator = true;
      const codesObj =  {
        '@class': '.LogEventRequest',
        eventKey: 'TournamentShortCodes',
        playerId: this.ser.userId
      };
      this.http.post(environment.gameSparksTournamentShortCodes, codesObj).subscribe((codesRes: any) => {
         this.shortCodes = codesRes.scriptData.codes;
         console.log('codes ' + codesRes.scriptData.codes);
      });
    }else{
      this.logInIndicator = false;
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
    if (this.logInIndicator){
      const leaderBoardObj = {
        '@class': '.LogEventRequest',
        eventKey: 'LeaderBoard',
        // playerLocation: form.value.playerLocation,
        entryCount: form.value.entryCount,
        tournamentId: form.value.tournamentId,
        playerId: this.ser.userId
      };
      this.http.post(environment.gamesparksLeaderBoardList, leaderBoardObj).subscribe((res: any) => {
        if (res.scriptData.statusCode === 201){
          this.dataExists = false;
          this.errorMessage = res.scriptData.message;
          console.log(res.scriptData.StatusCode);
        }else{
          this.dataExists = true;
          this.data = res.scriptData.data;
          console.log(res.scriptData.data);
        }
      });
    }
  }
  // tslint:disable-next-line:typedef
  onSelect(){
    console.log('ok');
  }
  // tslint:disable-next-line:typedef
  onSelectUser(i: any){
    const featuredPlayersObj = {
        '@class': '.LogEventRequest',
        eventKey: 'FeaturedPlayers',
        tournamentId: this.data[i]['LAST-tournamentId'],
        userId: this.data[i].userId,
        playerId : this.ser.userId
    };
    this.http.post(environment.gamesparksFeaturedPlayers, featuredPlayersObj).subscribe((res: any) => {
      if (res.scriptData.message === ''){
        console.log('removed');
      }else{
        console.log(res.scriptData.message);
      }
    });
  }
  // tslint:disable-next-line:typedef

}
