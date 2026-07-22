import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join',
  imports: [RouterLink],
  templateUrl: './join.html',
  styleUrl: './join.scss',
})
export class Join {
  protected readonly paths = [
    {
      title: 'Devenir technicien',
      desc: 'Vous recevez des demandes d\'intervention près de chez vous, vous gérez votre planning comme vous l\'entendez, et vous développez votre activité avec nous.',
      link: '/devenir-technicien',
      cta: 'Candidater comme technicien',
    },
    {
      title: 'Devenir vendeur',
      desc: 'Vous proposez vos pièces détachées ou vos véhicules à la location et à la vente, une fois votre compte validé par notre équipe.',
      link: '/devenir-vendeur',
      cta: 'Candidater comme vendeur',
    },
  ];
}
