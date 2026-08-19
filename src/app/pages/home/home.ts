import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from '../../shared/illustrations/technician-scene/technician-scene';
import { VisualCardMedia } from '../../shared/visual-card-media/visual-card-media';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CounterDirective } from '../../shared/directives/counter.directive';
import { NEWS_ITEMS } from '../../shared/data/news.data';
import { CardVisual } from '../../shared/models/visual-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, StoreBadges, TechnicianScene, VisualCardMedia, RevealDirective, CounterDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly latestNews = NEWS_ITEMS.slice(0, 3);

  // Pas de photo dédiée disponible : on réutilise les illustrations déjà en
  // place ailleurs sur le site (hero Intervention / Marketplace). Remplacer
  // par une vraie photo plus tard = changer ces deux valeurs, rien d'autre.
  protected readonly cartronicVisual: CardVisual = { type: 'illustration', component: 'technician' };
  protected readonly cartromallVisual: CardVisual = { type: 'illustration', component: 'marketplace' };
}
