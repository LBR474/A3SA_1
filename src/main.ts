import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom([BrowserAnimationsModule])],
}); 

// bootstrapApplication(AppComponent)
//   .then((ref) => {
//     // Ensure Angular destroys itself on hot reloads.
//     // if (window['ngRef']) {
//     //   window['ngRef'].destroy();
//     // }
//     // window['ngRef'] = ref;

//     // Otherwise, log the boot error
//   })
//   .catch((err) => console.error(err));
