import { Component, input } from '@angular/core';
import { TechnicianScene } from '../illustrations/technician-scene/technician-scene';
import { MarketplaceScene } from '../illustrations/marketplace-scene/marketplace-scene';
import { CardVisual } from '../models/visual-card';

/**
 * Rendu du bandeau visuel en tête d'une .visual-card, à partir d'un
 * CardVisual (illustration existante, bloc gradient, ou — plus tard —
 * vraie photo). Point de rendu unique : un seul fichier à connaître pour
 * ajouter un nouveau type de visuel ou changer le rendu de l'existant.
 */
@Component({
  selector: 'app-visual-card-media',
  imports: [TechnicianScene, MarketplaceScene],
  templateUrl: './visual-card-media.html',
})
export class VisualCardMedia {
  readonly visual = input.required<CardVisual>();
}
