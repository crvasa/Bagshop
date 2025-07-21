import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './main.config';
import { readFileSync } from 'fs';
import { join } from 'path';

const indexHtmlPath = join(process.cwd(), 'dist/bagpage/browser/index.html');
const document = readFileSync(indexHtmlPath, 'utf-8');

export default async function render(): Promise<string> {
  return renderApplication(() => bootstrapApplication(AppComponent, appConfig), {
    document,
    url: '/' // questo verrà sovrascritto dinamicamente
  });
}
