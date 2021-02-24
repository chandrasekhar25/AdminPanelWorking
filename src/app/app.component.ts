import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Adminpanel';
  constructor(private route: ActivatedRoute){}
  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
         // tslint:disable-next-line:no-string-literal
         this.title = params['name'];
    });

  }
}
