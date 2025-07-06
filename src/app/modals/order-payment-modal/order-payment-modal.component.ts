import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonModal,
  IonInput,
  IonLabel,
  IonFooter,
  IonButton,
  IonButtons,
  IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-order-payment-modal',
  templateUrl: './order-payment-modal.component.html',
  styleUrls: ['./order-payment-modal.component.scss'],
  standalone: true,
  imports: [IonItem, IonButtons, CommonModule, FormsModule, IonHeader, IonContent, IonButton, IonInput, IonToolbar, IonButton, IonFooter, IonLabel, IonTitle],
})
export class OrderPaymentModalComponent {
  customerName: string = '';
  cashReceived: number = 0;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

submitForm() {
  this.cashReceived = Number(this.cashReceived); // Ensure it's a number
  if (!this.customerName.trim() || this.cashReceived <= 0 || isNaN(this.cashReceived)) {
    alert('Please enter valid customer name and cash received.');
    return;
  }

  this.modalCtrl.dismiss(
    {
      customerName: this.customerName,
      cashReceived: this.cashReceived,
    },
    'confirm'
  );
}

}
