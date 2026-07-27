import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-campaign-launch',
  imports: [RouterLink, RevealDirective],
  templateUrl: './campaign-launch.html',
  styleUrl: './campaign-launch.scss',
})
export class CampaignLaunch {}
