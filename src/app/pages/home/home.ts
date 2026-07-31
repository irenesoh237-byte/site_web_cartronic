import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from '../../shared/illustrations/technician-scene/technician-scene';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CounterDirective } from '../../shared/directives/counter.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, StoreBadges, TechnicianScene, RevealDirective, CounterDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {


}
