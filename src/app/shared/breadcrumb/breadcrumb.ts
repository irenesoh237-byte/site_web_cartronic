import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JsonLdService } from '../services/json-ld.service';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

const SITE_URL = 'https://www.cartronic-system.com';

/**
 * Fil d'Ariane réutilisable. Le dernier item de `items` est affiché comme
 * page courante (non cliquable). Injecte aussi le BreadcrumbList JSON-LD
 * correspondant dans le <head> le temps que le composant est monté.
 */
@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb implements OnInit, OnDestroy {
  readonly items = input.required<BreadcrumbItem[]>();

  private readonly jsonLd = inject(JsonLdService);
  private scriptEl: HTMLScriptElement | null = null;

  ngOnInit(): void {
    this.scriptEl = this.jsonLd.insert({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.items().map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
      })),
    });
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(this.scriptEl);
  }
}
