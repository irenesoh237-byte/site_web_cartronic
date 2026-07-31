import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from "../../shared/illustrations/technician-scene/technician-scene";
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  imports: [RouterLink, StoreBadges, TechnicianScene, RevealDirective],
  templateUrl: './intervention.html',
  styleUrl: './intervention.scss',
})
export class Intervention {

}
