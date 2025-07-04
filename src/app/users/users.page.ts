import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IonHeader, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  imports: [IonContent, IonHeader, CommonModule, RouterOutlet],
  standalone: true
})
export class UsersPage implements OnInit, OnDestroy {
  showNav = false;
  isMobile = false;

  private resizeListener = () => this.updateLayout();

  ngOnInit() {
    this.updateLayout();
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  private updateLayout() {
    const width = window.innerWidth;
    this.isMobile = width < 768; // Typical breakpoint for tablets
    this.showNav = !this.isMobile; // showNav only hidden on mobile
  }
}
