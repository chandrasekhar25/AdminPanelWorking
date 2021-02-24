import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Services } from '../service';
import { environment} from '../../environments/environment';
@Component({
  selector: 'app-featuredplayerlist',
  templateUrl: './featuredplayerlist.component.html',
  styleUrls: ['./featuredplayerlist.component.scss']
})
export class FeaturedplayerlistComponent implements OnInit {

  constructor(private ser: Services, private http: HttpClient) { }
dataOfPlayers = [];
errorMessage = false;
alertMessage: string;
logInIndicator = false;
  ngOnInit(): void {
    if (this.ser.userId){
      this.logInIndicator = true;
    }else{
      this.logInIndicator = false;
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
     console.log(form.value.date);
     const dateObj = {
      '@class': '.LogEventRequest',
      eventKey: 'getFeaturedPlayersListForAdmin',
      date: form.value.date,
      playerId: this.ser.userId
    };
     this.http.post(environment.gemesparksFeaturedPlayerListForAdmin, dateObj).subscribe((res: any) => {
        //  console.log(res.scriptData.data);
        // tslint:disable-next-line:align
        console.log(res.scriptData);
        if (res.scriptData.statusCode === 200){
          this.errorMessage = false;
          this.dataOfPlayers = res.scriptData.data;
        }else{
          this.errorMessage = true;
          this.alertMessage = res.scriptData.message;
        }
     });
  }
}
