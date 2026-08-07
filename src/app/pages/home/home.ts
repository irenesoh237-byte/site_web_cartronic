import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from '../../shared/illustrations/technician-scene/technician-scene';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CounterDirective } from '../../shared/directives/counter.directive';
import { NEWS_ITEMS } from '../../shared/data/news.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, StoreBadges, TechnicianScene, RevealDirective, CounterDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly latestNews = NEWS_ITEMS.slice(0, 3);
}
