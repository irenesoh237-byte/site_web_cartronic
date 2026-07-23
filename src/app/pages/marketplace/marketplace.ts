import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { MarketplaceScene } from '../../shared/illustrations/marketplace-scene/marketplace-scene';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-marketplace',
  imports: [RouterLink, StoreBadges, MarketplaceScene, RevealDirective],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.scss',
})
export class Marketplace {}