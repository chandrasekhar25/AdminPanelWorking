import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Services } from 'src/app/service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comd',
  templateUrl: './comd.component.html',
  styleUrls: ['./comd.component.scss']
})
export class ComdComponent implements OnInit {

  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router, private ser: Services) { }
  logInIndicator: boolean;
  title: string;
  imageUrl: string;
  selectedFile: File;
  errMes: string;
  imageUrlFromUpload: string;

  ngOnInit(): void {
    const getUploadUrlRequest = {
       // tslint:disable-next-line:no-unused-expression
       '@class': '.GetUploadUrlRequest',
        playerId: this.ser.userId
    };
    // tslint:disable-next-line:semicolon
    this.http.post(environment.gameSparksUploadedUrl, getUploadUrlRequest).subscribe((res: any) => {
      // this.url = JSON.stringify(res.url);
      this.imageUrl = res.url;
      console.log('url :' + res.url);
    });
    this.title = this.ser.title;
    if (this.ser.userId){
      this.logInIndicator = true;
    }else{
      this.logInIndicator = false;
    }
  }
// tslint:disable-next-line:typedef
onSubmit(form: NgForm){
  const enterMultipleGameResults = {
    '@class': '.LogEventRequest',
    eventKey: 'EnterMultipleGameResults',
    matchId: form.value.MatcheId,
    image: this.imageUrlFromUpload,
    playerId: this.ser.userId
  };
  this.http.post(environment.gameSparksCodmGameResults, enterMultipleGameResults).subscribe((res: any) => {
    console.log(res);
    if (res.scriptData.statusCode === 200){
      this.route.navigate(['/update CODM match results'] , {relativeTo: this.router});
    }else{
      this.errMes = res.scriptData.message;
    }
  });
}
// tslint:disable-next-line:typedef
onSelectedFile(event){
 console.log(event.target.files[0]);
 this.selectedFile = event.target.files[0];
 this.onUpload();
}
// tslint:disable-next-line:typedef
onUpload(){
  const fd = new FormData();
  fd.append('image', this.selectedFile, this.selectedFile.name);
  this.http.post(this.imageUrl,  fd).subscribe((res: any) => {
      console.log(res);
      this.imageUrlFromUpload = res.message;
    });
 }
}
