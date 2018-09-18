import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, TestComponent } from './app.component';
import { InjectionModule } from '../lib/injection/injection.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    InjectionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TestComponent
  ]
})
export class AppModule { }
