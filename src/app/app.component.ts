import { Component } from '@angular/core';
import {
  RouterOutlet,
  Router,
  ActivationEnd,
  NavigationEnd,
  RoutesRecognized
} from '@angular/router';
import { routesAnimation } from './shared/animations/routes';
import { Title } from '@angular/platform-browser';
import { filter, take, takeLast, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routesAnimation]
})
export class AppComponent {
  title = 'Contabilidad';

  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initSetTitleListener();
  }

  initSetTitleListener() {
    this.router.events
      .pipe(
        filter(
          event => event instanceof ActivationEnd && !event.snapshot.firstChild
        )
      )
      .subscribe((event: ActivationEnd) => {
        if (event.snapshot.data && event.snapshot.data.title) {
          this.titleService.setTitle(
            `${event.snapshot.data.title} - ${this.title}`
          );
        } else {
          this.titleService.setTitle(`${this.title}`);
        }
      });
  }
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
