import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonPopover } from '@ionic/angular/standalone';
import { SupabaseService } from 'src/app/service/supabase.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonPopover],
})
export class InventoryPage implements OnInit {
  activeTab: 'categories' | 'menu' = 'categories';
  categories: any[] = [];
  menuItems: any[] = [];
  newCategory = { name: '', icon: '' };
  newMenu = { name: '', description: '', price: null, quantity: null, category_id: null };
  isLoading = false;
  showIconPicker = false;
  iconSearch = '';
  // A reasonable subset of Material icons for demo; replace with a full list if needed
  categoryIcons: string[] = [
    'fastfood',
    'local_cafe',
    'local_dining',
    'cake',
    'icecream',
    'emoji_food_beverage',
    'restaurant',
    'local_bar',
    'local_pizza',
    'ramen_dining',
    'set_meal',
    'lunch_dining',
    'dinner_dining',
    'bakery_dining',
    'brunch_dining',
    'rice_bowl',
    'egg',
    'liquor',
    'wine_bar',
    'coffee',
    'kebab_dining',
    'outdoor_grill',
    'food_bank',
    'soup_kitchen'
  ];

  get filteredCategoryIcons() {
    if (!this.iconSearch) return this.categoryIcons;
    return this.categoryIcons.filter(icon => icon.toLowerCase().includes(this.iconSearch.toLowerCase()));
  }

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    await this.loadCategories();
    await this.loadMenuItems();
  }

  async loadCategories() {
    this.categories = await this.supabase.getMenuCategories();
  }

  async loadMenuItems() {
    this.menuItems = await this.supabase.getMenuItemsWithCategory();
  }

  async addCategory() {
    if (!this.newCategory.name.trim() || !this.newCategory.icon.trim()) return;
    await this.supabase.addMenuCategory(this.newCategory);
    this.newCategory = { name: '', icon: '' };
    await this.loadCategories();
  }

  async addMenuItem() {
    if (!this.newMenu.name.trim() || !this.newMenu.price || !this.newMenu.quantity || !this.newMenu.category_id) return;
    await this.supabase.addMenuItem({
      name: this.newMenu.name,
      description: this.newMenu.description,
      price: this.newMenu.price,
      quantity: this.newMenu.quantity,
      category_id: this.newMenu.category_id
    });
    this.newMenu = { name: '', description: '', price: null, quantity: null, category_id: null };
    await this.loadMenuItems();
  }
}
