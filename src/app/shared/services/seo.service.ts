import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const SITE_URL = 'https://www.cartronic-system.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/branding/cartronic-hero.webp`;
const DEFAULT_DESCRIPTION =
  'Techniciens qualifiés, services automobiles, pièces et solutions de mobilité réunis sur une même plateforme numérique.';

/**
 * Met à jour la meta description et les balises Open Graph / Twitter à chaque
 * navigation, à partir des `data.description` / `data.ogImage` déclarées sur
 * la route active (voir app.routes.ts). Pas de SSR sur ce site : ces balises
 * ne sont donc à jour dans le DOM qu'après exécution du JS par le crawler.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateTags());
  }

  private updateTags(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.snapshot.data;
    const description: string = data['description'] ?? DEFAULT_DESCRIPTION;
    const image: string = data['ogImage'] ?? DEFAULT_OG_IMAGE;
    const path = this.router.url.split('#')[0].split('?')[0];
    const url = `${SITE_URL}${path === '/' ? '' : path}`;
    const pageTitle = this.title.getTitle();

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });

    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    if (data['noIndex']) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }
}
