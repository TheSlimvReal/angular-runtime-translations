import { Component, LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { staticText } from "./static-file";
import { DatePipe, registerLocaleData } from "@angular/common";
import '@angular/localize/init';
import { xliffToJson } from "./xliff-to-json";
import { loadTranslations } from "@angular/localize";

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

const initialLocale = "de"

initLanguage(initialLocale)
  .then(() => bootstrapApplication(App, {
    providers: [{provide: LOCALE_ID, useValue: initialLocale}]
  }))

async function initLanguage(locale: string): Promise<void> {
  if (locale === "en") {
    return;
  }
  const json = await fetch("/assets/messages." + locale + ".xlf")
    .then((r) => r.text())
    .then((t) => xliffToJson(t))
  loadTranslations(json);
  $localize.locale = locale;
  const localeModule = await import(
    `../node_modules/@angular/common/locales/de`
    );
  registerLocaleData(localeModule.default);
}
