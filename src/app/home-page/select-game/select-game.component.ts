import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Services } from '../../service';
import { environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { relative } from '@angular/compiler-cli/src/ngtsc/file_system';
@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss']
})
export class SelectGameComponent implements OnInit {
listOfGames = [
 'update chess match results',
 'update tambola match results',
 'feature chess players',
 'feature tambola players',
 'update CODM match results',
 'feature CODM players',
];
constructor(private router: ActivatedRoute , private ser: Services, private http: HttpClient, private route: Router) { }
logInIndicator: boolean;
  ngOnInit(): void {
    if (this.ser.userId){
      this.logInIndicator = true;
    }else{
      this.logInIndicator = false;
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){}
  // tslint:disable-next-line:typedef
  onSelectGame(index){
     this.route.navigate([ this.listOfGames[index]] , {relativeTo: this.router});
     this.ser.title = this.listOfGames[index];
  }
}
