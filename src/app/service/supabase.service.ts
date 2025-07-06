import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  public supabase: SupabaseClient; // <-- change 'private' to 'public'
  // Observable to track current user
  private _currentUser: BehaviorSubject<User | null | false> = new BehaviorSubject<User | null | false>(null);
  public currentUser$: Observable<User | null | false> = this._currentUser.asObservable();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async login(userName: string, password: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('name', userName)
      .eq('password', password)
      .single();

    if (error) {
      console.error('Login error:', error.message);
      return null;
    }
    return data; // user row or null
  }



  // fetch categories
  async getCategories() {
    const { data, error } = await this.supabase
      .from('menu_categories')
      .select('id, name, icon');
    if (error) throw error;
    return data;
  }

  //fetch menu items
  async getMenuItems() {
  const { data, error } = await this.supabase
    //select from menu table
    .from('menu')
    //show only specific fields
    .select('id, name, description, quantity, price, category_id');

  if (error) throw error;
  return data;
  }

  async createOrder(order: {
    customer_name: string;
    total_price: number;
    cash_received: number;
    change: number;
    user_id: number;
  }) {
    return await this.supabase
      .from('orders')
      .insert(order)
      .select(); // Return the inserted order (for ID)
  }

  async createOrderItem(item: {
    order_id: number;
    menu_id: number;
    quantity: number;
    price: number;
  }) {
    return await this.supabase
      .from('order_items')
      .insert(item);
  }

  // Fetch all sales/orders
  async getSales() {
    const { data, error } = await this.supabase
      .from('orders')
      .select('id, created_at, customer_name, total_price, cash_received, change, user_id');
    if (error) throw error;
    return data;
  }

  // Fetch order items for a given order id
  async getOrderItems(orderId: number) {
    const { data, error } = await this.supabase
      .from('order_items')
      .select('menu_id, quantity, price, menu:menu_id(name, description)')
      .eq('order_id', orderId);
    if (error) throw error;
    return data;
  }

  // CATEGORY CRUD
  async getMenuCategories() {
    const { data, error } = await this.supabase
      .from('menu_categories')
      .select('id, name, icon')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  }

  async addMenuCategory(category: { name: string; icon: string }) {
    const { data, error } = await this.supabase
      .from('menu_categories')
      .insert([category])
      .select();
    if (error) throw error;
    return data;
  }

  // MENU CRUD
  async getMenuItemsWithCategory() {
    const { data, error } = await this.supabase
      .from('menu')
      .select('id, created_at, name, description, price, quantity, category_id, menu_categories(name, icon)')
      .order('id', { ascending: true });
    if (error) throw error;
    return data;
  }

  async addMenuItem(item: { name: string; description: string; price: number; quantity: number; category_id: number }) {
    const { data, error } = await this.supabase
      .from('menu')
      .insert([item])
      .select();
    if (error) throw error;
    return data;
  }
}
