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

}
