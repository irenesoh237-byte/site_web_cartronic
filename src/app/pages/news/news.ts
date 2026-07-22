import { Component } from '@angular/core';

interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
}

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  protected readonly items: NewsItem[] = [
    {
      date: '13 juillet 2026',
      title: 'Lancement du site vitrine Cartronic',
      excerpt:
        'Cartronic présente désormais sa structure et ses deux applications, Cartronic et Marketplace Cartronic, sur un site dédié.',
    },
    {
      date: 'Prochainement',
      title: 'Ouverture des candidatures techniciens et vendeurs',
      excerpt:
        'Le réseau de techniciens partenaires et les inscriptions vendeurs (pièces, location et vente de véhicules) ouvriront dans les premières zones couvertes.',
    },
    {
      date: 'En développement',
      title: 'Disponibilité des applications mobiles',
      excerpt:
        'Les applications Cartronic et Marketplace Cartronic arriveront sur Android et iOS dès la fin de leur développement.',
    },
  ];
}
