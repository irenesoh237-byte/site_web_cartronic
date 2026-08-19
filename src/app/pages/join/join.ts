import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { VisualCardMedia } from '../../shared/visual-card-media/visual-card-media';
import { CardVisual } from '../../shared/models/visual-card';

@Component({
  selector: 'app-join',
  imports: [RouterLink, RevealDirective, VisualCardMedia],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})
export class Join {
  readonly activeTab = signal<'tech' | 'seller'>('tech');
  readonly openFaq = signal<number | null>(null);

  // Pas de photo dédiée disponible : blocs gradient reprenant les teintes déjà
  // utilisées pour ces cartes (icône, badge). Remplacer par une vraie photo
  // plus tard = changer cette valeur, rien d'autre.
  protected readonly techVisual: CardVisual = { type: 'gradient', tone: 'primary' };
  protected readonly sellerVisual: CardVisual = { type: 'gradient', tone: 'success' };

  toggleFaq(index: number): void {
    this.openFaq.update(current => (current === index ? null : index));
  }
}