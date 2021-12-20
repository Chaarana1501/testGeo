import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {environment} from '../environments/environment';
import {MatFormFieldModule} from '@angular/material/form-field';

const googleMapsParams = {
  apiKey: 'ere',
  libraries: ['places'],
  language: 'en',
  // region: 'DE'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatGoogleMapsAutocompleteModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot(googleMapsParams),
    FlexLayoutModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
