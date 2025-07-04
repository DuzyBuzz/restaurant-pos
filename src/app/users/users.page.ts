import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonIcon } from '@ionic/angular/standalone';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarPage } from '../shared/core/navbar/navbar.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [RouterLink, IonContent, IonHeader, CommonModule, FormsModule, RouterOutlet]
})
export class UsersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
