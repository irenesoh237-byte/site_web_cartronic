import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { NEWS_ITEMS } from '../../shared/data/news.data';

@Component({
  selector: 'app-news',
  imports: [RouterLink, RevealDirective],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  readonly filters = ['Tout', 'Lancement', 'Marketing', 'Partenariats', 'Produit', 'Expansion'] as const;
  readonly activeFilter = signal<string>('Tout');

  private readonly allItems = NEWS_ITEMS;

  readonly filteredItems = computed(() => {
    const f = this.activeFilter();
    return f === 'Tout' ? this.allItems : this.allItems.filter(i => i.category === f);
  });

  onSubscribe(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('input[type="email"]') as HTMLInputElement;
    if (input?.value) {
      input.value = '';
    }
  }
}
