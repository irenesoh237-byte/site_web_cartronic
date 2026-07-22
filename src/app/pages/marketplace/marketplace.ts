import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StoreBadges } from '../../shared/store-badges/store-badges';
import { MarketplaceScene } from '../../shared/illustrations/marketplace-scene/marketplace-scene';

@Component({
  selector: 'app-marketplace',
  imports: [RouterLink, StoreBadges, MarketplaceScene],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.scss',
})
export class Marketplace {
  protected readonly offers = [
    {
      title: 'Pièces détachées',
      desc: 'Trouvez la pièce ou l\'accessoire adapté à votre véhicule, proposé par des vendeurs enregistrés par Cartronic.',
    },
    {
      title: 'Location de véhicules',
      desc: 'Réservez un véhicule pour quelques heures, quelques jours ou plus, auprès des loueurs partenaires de la marketplace.',
    },
    {
      title: 'Vente de véhicules',
      desc: 'Parcourez les annonces de véhicules à la vente et échangez directement avec le vendeur depuis l\'application.',
    },
  ];

  protected readonly categories = [
    'Pièces moteur',
    'Freinage',
    'Électronique embarquée',
    'Carrosserie',
    'Pneumatiques',
    'Accessoires & entretien',
  ];

  protected readonly guarantees = [
    {
      title: 'Vendeurs et loueurs vérifiés',
      desc: 'On enregistre et on valide nous-mêmes chaque vendeur et chaque loueur avant qu\'il n\'apparaisse sur la marketplace.',
    },
    {
      title: 'Connectée à vos interventions',
      desc: 'En pleine réparation ? Vous retrouvez la pièce ou le véhicule qu\'il vous faut sans ressaisir votre véhicule.',
    },
    {
      title: 'Suivi de commande et de réservation',
      desc: 'Vous suivez vos commandes de pièces, vos réservations et vos achats de véhicules, directement depuis l\'application.',
    },
  ];
}
