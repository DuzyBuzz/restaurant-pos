import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  darkMode = false;

  constructor() { }

  ngOnInit() {
    // Load theme from localStorage
    const theme = localStorage.getItem('theme');
    this.darkMode = theme === 'dark';
  }

  onThemeToggle() {
    this.applyTheme(this.darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  applyTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }
}
