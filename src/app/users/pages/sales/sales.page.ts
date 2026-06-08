import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SalesPage implements OnInit {
  sales: any[] = [];
  loading = true;
  error: string | null = null;
  expandedSaleId: number | null = null;
  orderItems: { [orderId: number]: any[] } = {};
  exporting = false;

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    try {
      this.sales = await this.supabase.getSales();
    } catch (err: any) {
      this.error = err?.message || 'Failed to load sales.';
    } finally {
      this.loading = false;
    }
  }

  async toggleOrderItems(sale: any) {
    if (this.expandedSaleId === sale.id) {
      this.expandedSaleId = null;
      return;
    }
    this.expandedSaleId = sale.id;
    if (!this.orderItems[sale.id]) {
      try {
        this.orderItems[sale.id] = await this.supabase.getOrderItems(sale.id);
      } catch (err) {
        this.orderItems[sale.id] = [];
      }
    }
  }

  async exportToExcel() {
    this.exporting = true;
    const xlsx = await import('xlsx');
    // Prepare rows: one row per sale, with all items concatenated in a single cell
    let rows: any[] = [];
    for (const sale of this.sales) {
      let items = this.orderItems[sale.id];
      if (!items) {
        try {
          items = await this.supabase.getOrderItems(sale.id);
        } catch {
          items = [];
        }
      }
      // Build a string like: "Burger x2 ₱100, Fries x1 ₱50"
      const itemsString = (items && items.length > 0)
        ? items.map(item => `${item.menu?.name || ''} x${item.quantity} ₱${item.price * item.quantity}`)
            .join(', ')
        : 'No items';
      rows.push({
        'Order ID': sale.id,
        'Date': sale.created_at,
        'Customer': sale.customer_name,
        'Items': itemsString,
        'Total': sale.total_price,
        'Cash': sale.cash_received,
        'Change': sale.change,

      });
    }
    const ws = xlsx.utils.json_to_sheet(rows);
    // Professional formatting: set column widths
    ws['!cols'] = [
      { wch: 10 }, // Order ID
      { wch: 20 }, // Date
      { wch: 20 }, // Customer
      { wch: 60 }, // Items
      { wch: 10 }, // Total
      { wch: 10 }, // Cash
      { wch: 10 }, // Change

    ];
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sales');
    xlsx.writeFile(wb, 'sales_with_items.xlsx');
    this.exporting = false;
  }
}
