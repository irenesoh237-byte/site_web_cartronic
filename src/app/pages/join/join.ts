import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-join',
  imports: [RouterLink, RevealDirective],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})
export class Join {
  readonly activeTab = signal<'tech' | 'seller'>('tech');
  readonly openFaq = signal<number | null>(null);

  toggleFaq(index: number): void {
    this.openFaq.update(current => (current === index ? null : index));
  }
}