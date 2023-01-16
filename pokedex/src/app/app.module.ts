import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//componentes
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './table/table.component';
import { PokeCardComponent } from './poke-card/poke-card.component';

//Servicios

import { ApiPokeService } from './api-poke.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PokeCardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiPokeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
