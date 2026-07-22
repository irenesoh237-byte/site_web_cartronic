import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly menuOpen = signal(false);

  protected readonly navLinks = [
    { label: 'Accueil', path: '/', exact: true },
    { label: 'Interventions', path: '/intervention', exact: false },
    { label: 'Marketplace', path: '/marketplace', exact: false },
    { label: 'Rejoindre', path: '/rejoindre', exact: false },
    { label: 'À propos', path: '/a-propos', exact: false },
    { label: 'Actualités', path: '/actualites', exact: false },
    { label: 'Contact', path: '/contact', exact: false },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
