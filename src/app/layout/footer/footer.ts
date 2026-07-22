import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly year = new Date().getFullYear();

  protected readonly columns = [
    {
      title: 'Cartronic',
      links: [
        { label: 'À propos', path: '/a-propos' },
        { label: 'Actualités', path: '/actualites' },
        { label: 'Devenir technicien', path: '/devenir-technicien' },
        { label: 'Devenir vendeur', path: '/devenir-vendeur' },
      ],
    },
    {
      title: 'Nos solutions',
      links: [
        { label: 'Interventions', path: '/intervention' },
        { label: 'Marketplace Cartronic', path: '/marketplace' },
      ],
    },
    {
      title: 'Informations',
      links: [
        { label: 'Contact', path: '/contact' },
        { label: 'Mentions légales', path: '/mentions-legales' },
      ],
    },
  ];
}
