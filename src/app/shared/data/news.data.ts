export type NewsCategory = 'Lancement' | 'Marketing' | 'Partenariats' | 'Produit' | 'Expansion';

export interface NewsItem {
  date: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    date: '10 août 2026',
    title: 'Lancement de la campagne marketing Cartronic',
    excerpt:
      'Cartronic lance officiellement sa première campagne marketing au Cameroun. Présence sur les réseaux sociaux, affichage urbain à Yaoundé et Douala, et partenariats avec des influenceurs locaux pour faire connaître l\'application auprès des propriétaires de véhicules.',
    category: 'Marketing',
  },
  {
    date: '13 juillet 2026',
    title: 'Lancement du site vitrine Cartronic',
    excerpt:
      'Cartronic présente désormais sa structure et ses deux applications, Cartronic et Marketplace Cartronic, sur un site dédié.',
    category: 'Lancement',
  },
  {
    date: 'Prochainement',
    title: 'Ouverture des candidatures techniciens et vendeurs',
    excerpt:
      'Le réseau de techniciens partenaires et les inscriptions vendeurs (pièces, location et vente de véhicules) ouvriront dans les premières zones couvertes.',
    category: 'Produit',
  },
  {
    date: 'Prochainement',
    title: 'Lancement de l\'application iOS Cartronic',
    excerpt:
      'L\'application Cartronic sera disponible sur l\'App Store pour les utilisateurs iPhone. Testez-la dès maintenant via TestFlight.',
    category: 'Produit',
  },
  {
    date: 'Prochainement',
    title: 'Extension vers Douala et nouvelles villes',
    excerpt:
      'Après Yaoundé, Cartronic prévoit d\'étendre son réseau de techniciens et de vendeurs à Douala, Bafoussam et d\'autres villes du Cameroun.',
    category: 'Expansion',
  },
  {
    date: 'Prochainement',
    title: 'Partenariats avec les garages indépendants',
    excerpt:
      'Cartronic développe des partenariats avec les garages automobiles indépendants pour enrichir son réseau de techniciens certifiés.',
    category: 'Partenariats',
  },
  {
    date: 'Prochainement',
    title: 'Lancement Android | Marketplace Cartronic',
    excerpt:
      'La Marketplace Cartronic sera disponible sur Google Play Store pour les utilisateurs Android au Cameroun.',
    category: 'Produit',
  },
];
