import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly analytics = inject(AnalyticsService);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
  }

  protected readonly navLinks = [
    { label: 'Accueil', path: '/', exact: true },
    { label: 'Cartronic', path: '/intervention', exact: false },
    { label: 'CartroMall', path: '/marketplace', exact: false },
    { label: 'Rejoindre', path: '/rejoindre', exact: false },
    { label: 'À propos', path: '/a-propos', exact: false },
    { label: 'Actualités', path: '/actualites', exact: false },
    { label: 'FAQ', path: '/faq', exact: false },
    { label: 'Contact', path: '/contact', exact: false },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  trackTelecharger(): void {
    this.analytics.trackEvent('telecharger_cta_click', { location: 'header' });
  }
}
