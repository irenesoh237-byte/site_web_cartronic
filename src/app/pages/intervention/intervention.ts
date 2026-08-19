import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from "../../shared/illustrations/technician-scene/technician-scene";
import { VisualCardMedia } from '../../shared/visual-card-media/visual-card-media';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CardVisual } from '../../shared/models/visual-card';

@Component({
  imports: [RouterLink, StoreBadges, TechnicianScene, VisualCardMedia, RevealDirective],
  templateUrl: './intervention.html',
  styleUrl: './intervention.scss',
})
export class Intervention {
  // Pas de photo dédiée par type d'intervention : blocs gradient reprenant
  // les mêmes teintes déjà utilisées pour les badges de ces cartes.
  protected readonly urgentVisual: CardVisual = { type: 'gradient', tone: 'error' };
  protected readonly plannedVisual: CardVisual = { type: 'gradient', tone: 'primary' };
}
