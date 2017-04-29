import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SerieComponent } from './serie/serie.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeriesListComponent } from './series-list/series-list.component';

import { ClipboardModule } from 'ngx-clipboard';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SerieComponent,
    PageNotFoundComponent,
    SeriesListComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'series', component: MainPageComponent },
      { path: '', redirectTo: '/series', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent }
    ]),
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
