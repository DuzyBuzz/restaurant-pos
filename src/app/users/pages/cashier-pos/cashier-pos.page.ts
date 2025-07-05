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



  constructor(private supabase: SupabaseService) {}

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

  checkout() {
    alert(`Total order: ₱${this.getTotal().toFixed(2)}`);
    this.clearReceipt();
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