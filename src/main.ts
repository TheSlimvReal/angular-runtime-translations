import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { registerLocaleData } from "@angular/common";
import '@angular/localize/init';
import { xliffToJson } from "./xliff-to-json";
import { loadTranslations } from "@angular/localize";

// Read locale from local storage before app initialization
const appLang = localStorage.getItem("locale") || "en"

// Init provided language
initLanguage(appLang)
  // Only load text after locale is initialized to translate static file
  .then(() => import("./app.component"))
  .then((comp) => bootstrapApplication(comp.App, {
    providers: [{provide: LOCALE_ID, useValue: appLang}]
  }))

async function initLanguage(locale: string): Promise<void> {
  if (locale === "en") {
    // Default behavior, no changes required
    return;
  }
  // Fetch XLIFF translation file and transform to JSON format (JSON translations can be used directly)
  const json = await fetch("/assets/messages." + locale + ".xlf")
    .then((r) => r.text())
    .then((t) => xliffToJson(t))

  // Initialize translation
  loadTranslations(json);
  $localize.locale = locale;

  // Load required locale module (needs to be adjusted for different locales)
  const localeModule = await import(
    `../node_modules/@angular/common/locales/de`
    );
  registerLocaleData(localeModule.default);
}
