import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { CounterDirective } from '../../shared/directives/counter.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective, CounterDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}