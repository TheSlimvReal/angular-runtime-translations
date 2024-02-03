import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { staticText } from "./static-file";
import { DatePipe } from "@angular/common";
import '@angular/localize/init';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <h1 i18n>Angular runtime translations!</h1>
      <p>{{ componentText }}</p>
      <p>{{ staticText }}</p>
      <p>{{ date | date }}</p>
  `,
  imports: [
    DatePipe
  ]
})
export class App {
  componentText = $localize`I am text from a component variable`;
  staticText = staticText;
  date = new Date()
}

bootstrapApplication(App);
