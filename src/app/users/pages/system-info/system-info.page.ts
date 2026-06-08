import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { appVersion } from '../../../version'; // adjust path as needed

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.page.html',
  styleUrls: ['./system-info.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class SystemInfoPage implements OnInit {
  appVersion = appVersion;

  constructor() { }

  ngOnInit() {
  }

  checkForUpdates() {
    // Reloads the app, fetching the latest deployed version from 
    window.location.reload();
    
  }
}
