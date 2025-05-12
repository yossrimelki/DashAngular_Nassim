import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles?: string[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: '/chatbot', title: 'Chatbot',  icon:'chat', class: '' },
    // Role-specific routes
    { path: '/production', title: 'Production',  icon:'factory', class: '', roles: ['production_manager'] },
    { path: '/marketing', title: 'Marketing',  icon:'trending_up', class: '', roles: ['marketing_manager'] },
    { path: '/logistics', title: 'Logistics',  icon:'local_shipping', class: '', roles: ['logistics_manager'] },
    { path: '/ml', title: 'ML Page', icon: 'memory', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Filter menu items based on user role
    this.menuItems = ROUTES.filter(menuItem => {
      if (!menuItem.roles) {
        return true; // Show items without role restrictions
      } else {
        return menuItem.roles.includes(this.authService.currentUserValue?.role || '');
      }
    });
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(): void {
    this.authService.logout();
  }
}
