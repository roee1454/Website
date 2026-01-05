import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIconsModule } from '@ng-icons/core';
import { ColorChooserComponent } from '../ui/elements/color-chooser/color-chooser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIconsModule, ColorChooserComponent]
})
export class NavbarComponent {
  private _router = inject(Router);

  protected currentPath = toSignal(
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).urlAfterRedirects),
      map(url => {
        if (url === '/') return '';
        return url.replace(/^\/|\/$/g, '');
      })
    )
  );

  protected isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
