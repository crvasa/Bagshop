import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule, SearchComponent, FormsModule]
})
export class HeaderComponent implements OnInit {
  showSidebar = false;
  sidebarOpen = false;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}

closeSidebar() {
  this.sidebarOpen = false;
}

  cartQuantity = 0;
  user?: User;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cartQuantity = cart.totalCount;
    });

    this.userService.userObservable.subscribe((user) => {
      this.user = user;
    });
  }

userMenuOpen = false;

toggleUserMenu() {
  this.userMenuOpen = !this.userMenuOpen;
}

closeUserMenu() {
  this.userMenuOpen = false;
}

logout2() {
  this.userService.logout(); // Assicurati che esista il metodo
  this.userMenuOpen = false;
  this.cartService.clearCart(); // ✅ Pulisce il carrello
}
  ngOnInit(): void {}



  get isAuth(): boolean {
    return !!this.user?.token;
  }
}
