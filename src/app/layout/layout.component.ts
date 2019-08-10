import { Component, OnInit } from '@angular/core';
import {
  faTachometerAlt,
  faPlusCircle,
  faExchangeAlt,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { routesAnimation } from '../shared/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routesAnimation]
})
export class LayoutComponent implements OnInit {
  username: string;
  navbarOpen: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    library.add(faTachometerAlt, faPlusCircle, faExchangeAlt, faPowerOff);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.navbarOpen = false;
    });

    this.store
      .select('auth')
      .subscribe(auth => (this.username = auth.user ? auth.user.name : null));
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onLogout() {
    this.authService.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
