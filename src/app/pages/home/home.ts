import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from '../../shared/illustrations/technician-scene/technician-scene';
import { TeamAvatars } from '../../shared/illustrations/team-avatars/team-avatars';

@Component({
  selector: 'app-home',
  imports: [RouterLink, StoreBadges, TechnicianScene, TeamAvatars],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly pillars = [
    {
      title: 'Une seule équipe',
      desc: 'Techniciens, vendeurs, loueurs : tout le monde travaille avec la même exigence, sous la même bannière.',
    },
    {
      title: 'Deux façons de vous aider',
      desc: 'Cartronic pour réparer et dépanner votre véhicule, Marketplace Cartronic pour trouver, louer ou acheter.',
    },
    {
      title: 'Un objectif : votre tranquillité',
      desc: 'Qu\'il s\'agisse d\'une panne ou d\'un achat, on veut que vous n\'ayez jamais à vous débrouiller seul.',
    },
  ];

  protected readonly poles = [
    {
      tag: 'Intervention & dépannage',
      name: 'Cartronic',
      desc: 'Une panne, un entretien à prévoir ? Demandez un technicien en urgence ou planifiez une intervention, suivez-le en temps réel et échangez avec lui par message ou par appel.',
      link: '/intervention',
      cta: 'Découvrir les interventions',
    },
    {
      tag: 'Pièces, location & vente',
      name: 'Marketplace Cartronic',
      desc: 'Une pièce à remplacer, un véhicule à louer pour le week-end, ou à acheter ? Tout se passe au même endroit, depuis l\'application Cartronic.',
      link: '/marketplace',
      cta: 'Découvrir Marketplace',
    },
  ];

  protected readonly highlights = [
    {
      title: 'Suivi en temps réel',
      desc: 'Vous voyez votre technicien approcher sur la carte, dès qu\'il accepte la mission.',
    },
    {
      title: 'Appel vocal intégré',
      desc: 'Vous l\'appelez directement depuis l\'application, sans toucher à votre crédit téléphonique.',
    },
    {
      title: 'Historique complet',
      desc: 'Tous vos véhicules et toutes vos interventions passées, retrouvés en un coup d\'œil.',
    },
    {
      title: 'Pièces vérifiées',
      desc: 'La marketplace vous propose directement les pièces adaptées à votre réparation.',
    },
  ];
}
