import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Breadcrumb, BreadcrumbItem } from '../../shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-campaign-launch',
  imports: [RouterLink, RevealDirective, Breadcrumb],
  templateUrl: './campaign-launch.html',
  styleUrl: './campaign-launch.scss',
})
export class CampaignLaunch {
  protected readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Accueil', path: '/' },
    { label: 'Actualités', path: '/actualites' },
    { label: 'Lancement de la campagne marketing Cartronic', path: '/actualites/lancement-campagne-marketing' },
  ];
}
