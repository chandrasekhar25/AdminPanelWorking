import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { Routes, RouterModule } from '@angular/router';
import { UpdateMatchResultsComponent } from './update-match-results/update-match-results.component';
import { Services } from './service';
import { FeaturedPlayersComponent } from './featured-players/featured-players.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FeaturedplayerlistComponent } from './featuredplayerlist/featuredplayerlist.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DATE_LOCALE_FACTORY } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { SelectGameComponent } from './home-page/select-game/select-game.component';
import { ComdComponent } from './home-page/select-game/comd/comd.component';
import { ComdResultsComponent } from './home-page/select-game/comd/comd-results/comd-results.component';



const appRoutes: Routes = [
  // {path: '', component: AdminSignUpComponent},
  {path: '', component: AdminLogInComponent},
  {path: 'adminPanel', component: HomePageComponent},
  {path: 'SelectGame', component: SelectGameComponent},
  {path: 'SelectGame/update chess match results' , component: UpdateMatchResultsComponent},
  {path: 'SelectGame/update tambola match results' , component: UpdateMatchResultsComponent},
  {path: 'SelectGame/feature chess players', component: FeaturedPlayersComponent},
  {path: 'SelectGame/feature tambola players', component: FeaturedPlayersComponent},
  {path: 'ShowFeaturedPlayersList', component: FeaturedplayerlistComponent},
  {path: 'SelectGame/update CODM match results' , component: ComdComponent},
  {path: 'SelectGame/feature CODM players', component: FeaturedPlayersComponent},
  {path: 'update CODM match results' , component: ComdResultsComponent},
];
export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL, dddd',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@NgModule({
  declarations: [
    AppComponent,
    AdminLogInComponent,
    UpdateMatchResultsComponent,
    FeaturedPlayersComponent,
    HomePageComponent,
    AdminSignUpComponent,
    FeaturedplayerlistComponent,
    SelectGameComponent,
    ComdComponent,
    ComdResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  providers: [Services,    { provide: DateAdapter, useClass: MatDatepickerModule, deps: [MAT_DATE_LOCALE] },
  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_ELEMENTS_SCHEMA },
  { provide: MAT_DATE_LOCALE, useValue: 'pl'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
