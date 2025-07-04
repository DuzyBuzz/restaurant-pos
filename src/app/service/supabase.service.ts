import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
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
      .single(); // returns one row or null

    if (error) {
      console.error('Login error:', error.message);
      return null;
    }
    return data; // user row or null
  }
}
