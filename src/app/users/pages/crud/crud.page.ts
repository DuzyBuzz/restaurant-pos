import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList
} from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ]
})
export class CrudPage implements OnInit {
  itemName = '';
  description = '';
  price: number | null = null;
  items: any[] = [];
  editId: number | null = null;


  ngOnInit() {

  //realtime update of 
    // this.loadItems();
  }


  editItemName = '';
  editDescription = '';
  editPrice: number | null = null;
  private subscription: any;

  constructor(private supabaseService: SupabaseService) {}

  async ionViewWillEnter() {
    // await this.loadItems();
    // Optionally: setup realtime here if needed
  }

  // async addItem() {
  //   if (!this.itemName || !this.description || !this.price) return;
  //   await this.supabaseService.supabase.from('items').insert([
  //     { item: this.itemName, description: this.description, price: this.price }
  //   ]);
  //   this.itemName = '';
  //   this.description = '';
  //   this.price = null;
  //   await this.loadItems();
  // }

  // async loadItems() {
  //   const { data, error } = await this.supabaseService.supabase
  //     .from('items')
  //     .select('*')
  //     .order('id', { ascending: false });
  //   console.log('Fetched items:', data, 'Error:', error);
  //   this.items = data || [];
  // }

  // startEdit(item: any) {
  //   this.editId = item.id;
  //   this.editItemName = item.item;
  //   this.editDescription = item.description;
  //   this.editPrice = item.price;
  // }

  // cancelEdit() {
  //   this.editId = null;
  //   this.editItemName = '';
  //   this.editDescription = '';
  //   this.editPrice = null;
  // }

  // async updateItem() {
  //   if (!this.editId || !this.editItemName || !this.editDescription || !this.editPrice) return;
  //   await this.supabaseService.supabase.from('items').update({
  //     item: this.editItemName,
  //     description: this.editDescription,
  //     price: this.editPrice
  //   }).eq('id', this.editId);
  //   this.cancelEdit();
  //   await this.loadItems();
  // }

  // async deleteItem(id: number) {
  //   await this.supabaseService.supabase.from('items').delete().eq('id', id);
  //   await this.loadItems();
  // }
}