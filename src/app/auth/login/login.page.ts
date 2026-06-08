import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonItem, IonLabel, IonInput, ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonContent,
    IonItem, IonLabel, IonInput, CommonModule, FormsModule
  ]
})
export class LoginPage implements OnInit {
  userName = '';
  password = '';

  constructor(private router: Router, private supabaseService: SupabaseService, private modalCtrl: ModalController) {}

  ngOnInit() {

  }

  async login() {
    const user = await this.supabaseService.login(this.userName, this.password);
    if (user) {
      // Dismiss modal if open, then navigate
      try {
        await this.modalCtrl.dismiss();
      } catch (e) {
        // Modal might not be open, ignore error
      }
      this.router.navigate(['/users']);
    } else {
      // Login failed, show error
      const { ToastController } = await import('@ionic/angular');
      const toastController = new ToastController();
      const toast = await toastController.create({
        message: 'Invalid username or password',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

}