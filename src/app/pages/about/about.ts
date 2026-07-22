import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamAvatars } from '../../shared/illustrations/team-avatars/team-avatars';

@Component({
  selector: 'app-about',
  imports: [RouterLink, TeamAvatars],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly values = [
    {
      title: 'Fiabilité',
      desc: 'Des techniciens qualifiés, des vendeurs et des loueurs qu\'on a validés soi-même : on ne vous met en relation qu\'avec des gens de confiance.',
    },
    {
      title: 'Proximité',
      desc: 'On vous met en relation rapidement avec le technicien le plus proche et le plus adapté à votre besoin.',
    },
    {
      title: 'Transparence',
      desc: 'Vous suivez votre intervention en temps réel et vous parlez directement à la personne qui s\'occupe de vous, sans intermédiaire.',
    },
    {
      title: 'Simplicité',
      desc: 'Une app pour le dépannage, une pour les pièces et les véhicules : deux applications qui se parlent, pas dix services à gérer.',
    },
  ];
}
