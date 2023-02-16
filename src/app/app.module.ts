import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteItemComponent } from './components/autocomplete-item/autocomplete-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InputAutocompleteComponent,
    AutocompleteItemComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
