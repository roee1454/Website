import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "navbar.html",
})
export class NavbarComponent {
  private router = inject(Router);

  private url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  protected currentPath = computed(() => {
    const rawUrl = this.url();
    const path = rawUrl.split('?')[0].split('#')[0];

    if (path === '/') {
      return '';
    }

    return path.replace(/^\/|\/$/g, '');
  });
}
