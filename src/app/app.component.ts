import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    // Force dark mode
    document.body.classList.add('dark');

    // Force light mode
    document.body.classList.remove('dark');

    ScreenOrientation.lock({ orientation: 'landscape' });

    StatusBar.setStyle({ style: Style.Default });
    StatusBar.show();
  }
}
