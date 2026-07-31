import { Component, input } from '@angular/core';

@Component({
  selector: 'app-store-badges',
  imports: [],
  templateUrl: './store-badges.html',
  styleUrl: './store-badges.scss',
})
export class StoreBadges {
  readonly appName = input<string>('Cartronic');
}
