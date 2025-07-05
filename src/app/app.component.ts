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
    // Apply saved theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }

    ScreenOrientation.lock({ orientation: 'landscape' });

    StatusBar.setStyle({ style: Style.Default });
    StatusBar.show();
  }
}
