import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonHeader, IonContent, IonMenu,   IonMenuButton, IonTitle, IonButtons, IonToolbar, IonIcon} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { logoIonic, cashOutline, cubeOutline, statsChartOutline, closeCircleOutline, walletOutline, documentTextOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  imports: [IonContent, 
    IonHeader, 
    CommonModule, 
    RouterOutlet, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonMenu, 
    IonMenuButton, 
    IonTitle, 
    IonToolbar,
    RouterLink],
  standalone: true
})
export class UsersPage implements OnInit, OnDestroy {
  showNav = false;
  isMobile = false;

  @ViewChild('mainMenu', { static: false }) mainMenu?: IonMenu;

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

  closeMenu() {
    if (this.mainMenu) {
      this.mainMenu.close();
    } else {
      // fallback for when ViewChild is not available
      const menu = document.querySelector('ion-menu');
      if (menu && (menu as any).close) {
        (menu as any).close();
      }
    }
  }
}
