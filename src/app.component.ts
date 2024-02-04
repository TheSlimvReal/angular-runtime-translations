import { Component, Inject, LOCALE_ID } from "@angular/core";
import { DatePipe } from "@angular/common";

const variableOutsideAngular = $localize`I am a variable outside of an angular class.`

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <h1 i18n>Angular runtime translations!</h1>
      <p>{{ componentVariable }}</p>
      <p>{{ variableOutsideAngular }}</p>
      <p>{{ date | date }}</p>
      <button (click)="changeLocale()">{{ languageToggle }}</button>
  `,
  imports: [
    DatePipe
  ]
})
export class App {
  componentVariable = $localize`I am a component variable.`;
  variableOutsideAngular = variableOutsideAngular;
  date = new Date()
  languageToggle = this.locale === "en" ? "DE" : "EN"

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  changeLocale() {
    // Saving selected locale to local storage and reloading page
    localStorage.setItem("locale", this.languageToggle.toLowerCase())
    window.location.reload()
  }
}
