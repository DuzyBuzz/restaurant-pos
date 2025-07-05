import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonRow
} from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/service/supabase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cashier-pos',
  templateUrl: './cashier-pos.page.html',
  styleUrls: ['./cashier-pos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class CashierPosPage implements OnInit {
  categories: any[] = [];
  menuItems: any[] = [];
  allMenuItems: any[] = [];
  selectedCategoryId: number | null = null;
  receiptItems: any[] = [];
  selectedPaperSize: '58mm' | '80mm' = '80mm';

  customerName: string = '';
  cashReceived: number | null = null;
  isSaving: boolean = false;

  constructor(private supabase: SupabaseService, private toastController: ToastController) {}

  async ngOnInit() {
    try {
      this.categories = await this.supabase.getCategories();
      this.allMenuItems = await this.supabase.getMenuItems();
      this.menuItems = [...this.allMenuItems]; // Show all initially
    } catch (error: any) {
      console.error('Error loading data:', error.message);
    }
  }

  filterMenuByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;

    if (categoryId === null) {
      // Show all if no category selected
      this.menuItems = [...this.allMenuItems];
    } else {
      this.menuItems = this.allMenuItems.filter(
        item => item.category_id === categoryId
      );
    }
  }

  addToReceipt(menu: any) {
    // Make sure you're comparing by ID
    const existingItem = this.receiptItems.find(item => item.id === menu.id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      this.receiptItems.push({
        id: menu.id,
        name: menu.name,
        description: menu.description || '',
        price: Number(menu.price),
        qty: 1
      });
    }
  }

  increaseQty(item: any) {
    item.qty += 1;
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty -= 1;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any) {
    this.receiptItems = this.receiptItems.filter(i => i.id !== item.id);
  }

  clearReceipt() {
    this.receiptItems = [];
  }

  getTotal(): number {
    return this.receiptItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  async checkout() {
    const total = this.getTotal();
    if (!this.customerName.trim() || !this.cashReceived || this.cashReceived < total) {
      this.showToast('Please enter a valid customer name and cash received (must be >= total).', 'danger');
      return;
    }
    this.isSaving = true;
    try {
      // Save order
      const { data: orderData, error: orderError } = await this.supabase.createOrder({
        customer_name: this.customerName,
        total_price: total,
        cash_received: this.cashReceived,
        change: this.cashReceived - total,
        user_id: 1 // TODO: Replace with actual logged-in user id
      });
      if (orderError || !orderData || !orderData[0]) throw orderError || new Error('Order not saved');
      const orderId = orderData[0].id;
      // Save order items
      for (const item of this.receiptItems) {
        await this.supabase.createOrderItem({
          order_id: orderId,
          menu_id: item.id,
          quantity: item.qty,
          price: item.price
        });
      }
      this.showToast('Order saved!', 'success');
      this.clearReceipt();
      this.customerName = '';
      this.cashReceived = null;
    } catch (err: any) {
      this.showToast('Failed to save order: ' + (err?.message || err), 'danger');
    } finally {
      this.isSaving = false;
    }
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  printReceipt() {
  const printContents = document.getElementById('receiptToPrint')?.innerHTML;
  const popupWin = window.open('', '_blank', 'width=400,height=600');

  if (popupWin && printContents) {
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            @media print {
              body {
                font-family: monospace;
                width: 80mm;
                margin: 0;
                padding: 10px;
              }
              hr {
                border-top: 1px dashed #999;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin.document.close();
  }
}

}