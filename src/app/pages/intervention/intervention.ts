import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { TechnicianScene } from "../../shared/illustrations/technician-scene/technician-scene";
import { TechnicianScene } from '../../shared/illustrations/technician-scene/technician-scene';

@Component({
  imports: [RouterLink, StoreBadges, TechnicianScene]
  imports: [RouterLink, StoreBadges, TechnicianScene],
  templateUrl: './intervention.html',
  styleUrl: './intervention.scss',
})
export class Intervention {
  protected readonly steps = [
    {
      title: 'Décrivez votre besoin',
      desc: 'Un mot sur la panne, ou l\'heure qui vous arrange pour une intervention planifiée : à vous de voir.',
    },
    {
      title: 'Un technicien accepte',
      desc: 'Quelqu\'un de qualifié, près de chez vous, prend votre demande en charge.',
    },
    {
      title: 'Vous le suivez en temps réel',
      desc: 'Vous voyez sur la carte où il en est, du départ jusqu\'à votre position.',
    },
    {
      title: 'Vous échangez en direct',
      desc: 'Par message ou par appel, sans jamais quitter l\'application.',
    },
  ];

  protected readonly modes = [
    {
      title: 'Une urgence',
      desc: 'Panne, crevaison, batterie à plat : vous décrivez la situation, on vous envoie quelqu\'un de disponible au plus vite.',
    },
    {
      title: 'Une intervention planifiée',
      desc: 'Entretien, contrôle ou réparation prévue à l\'avance : vous choisissez le créneau qui vous arrange.',
    },
  ];

  protected readonly features = [
    {
      title: 'Suivi en temps réel',
      desc: 'Vous voyez le technicien se géolocaliser dès qu\'il accepte la mission, jusqu\'à son arrivée.',
    },
    {
      title: 'Appel vocal intégré',
      desc: 'Vous l\'appelez directement depuis l\'application, par Internet, sans toucher à votre crédit téléphonique.',
    },
    {
      title: 'Gestion de vos véhicules',
      desc: 'Vous ajoutez tous vos véhicules et retrouvez l\'historique complet de leurs interventions.',
    },
    {
      title: 'Accès direct aux pièces',
      desc: 'Besoin d\'une pièce pour la réparation ? Vous la retrouvez sur Marketplace Cartronic, sans changer d\'application.',
    },
  ];
}
