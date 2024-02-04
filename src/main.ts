import { Component } from '@angular/core';
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
  .then(() => bootstrapApplication(App))

async function initLanguage(locale: string): Promise<void> {
  if (locale === "en") {
    return;
  }
  const json = await fetch("/assets/messages." + locale + ".xlf")
    .then((r) => r.text())
    .then((t) => xliffToJson(t))
  loadTranslations(json);
  $localize.locale = locale;
  // This is needed for locale-aware components & pipes to work.
  // Add the required locales to `webpackInclude` to keep the bundle size small
  const localeModule = await import(
    /* webpackInclude: /(fr|de|it)\.mjs/ */
    `../node_modules/@angular/common/locales/de`
    );
  registerLocaleData(localeModule.default);
}
