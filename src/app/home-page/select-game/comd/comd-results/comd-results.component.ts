import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'src/app/service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comd-results',
  templateUrl: './comd-results.component.html',
  styleUrls: ['./comd-results.component.scss']
})
export class ComdResultsComponent implements OnInit {

  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router, private ser: Services) { }
  logInIndicator: boolean;
  title: string;
  message: string;
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
    const codmGameResults = {
      '@class': '.LogEventRequest',
      eventKey: 'CodmGameResults',
      MatchId: form.value.MatchId,
      PlayerName: form.value.PlayerName,
      PlayerGameId: form.value.PlayerId,
      PlayerRank: form.value.PlayerRank,
      NumberOfKills: form.value.NumberOfKills,
      MVP: form.value.MVP,
      Wins: form.value.Wins,
      Matches: form.value.Matches,
      playerId: this.ser.userId
    };
    this.http.post(environment.gameSparksCodmGameResults, codmGameResults).subscribe((res: any) => {
      console.log(res);
      this.message = res.scriptData.message;
    });
  }
}
