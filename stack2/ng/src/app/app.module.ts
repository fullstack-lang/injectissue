import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Stack2Module } from 'stack2'
import { Stack1Module } from 'stack1'

// mandatory
import { HttpClientModule } from '@angular/common/http';

import { AngularSplitModule, SplitComponent } from 'angular-split';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    AngularSplitModule,

    Stack1Module,
    Stack2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
