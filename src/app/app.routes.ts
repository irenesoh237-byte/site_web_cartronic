import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Cartronic | La plateforme numérique des services automobiles',
    data: {
      description:
        'Cartronic connecte automobilistes, techniciens et vendeurs au Cameroun : dépannage à domicile, entretien planifié et marketplace de pièces et véhicules.',
    },
  },
  {
    path: 'intervention',
    loadComponent: () => import('./pages/intervention/intervention').then((m) => m.Intervention),
    title: "Cartronic Intervention | Techniciens automobiles à la demande",
    data: {
      description:
        "Cartronic Intervention : un technicien automobile qualifié en moins de 30 minutes, pour une urgence ou une intervention planifiée, avec suivi en temps réel.",
    },
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./pages/marketplace/marketplace').then((m) => m.Marketplace),
    title: 'CartroMall | Pièces et solutions de mobilité',
    data: {
      description:
        'CartroMall : pièces détachées, location et vente de véhicules entre particuliers, proposées par des vendeurs et loueurs vérifiés par Cartronic.',
    },
  },
  {
    path: 'rejoindre',
    loadComponent: () => import('./pages/join/join').then((m) => m.Join),
    title: 'Rejoindre Cartronic | Techniciens et vendeurs partenaires',
    data: {
      description:
        'Rejoignez le réseau Cartronic comme technicien automobile ou vendeur de pièces et véhicules, et développez votre activité au Cameroun dès maintenant.',
    },
  },
  {
    path: 'devenir-technicien',
    loadComponent: () =>
      import('./pages/become-technician/become-technician').then((m) => m.BecomeTechnician),
    title: 'Devenir technicien Cartronic',
    data: {
      description:
        "Devenez technicien partenaire Cartronic : recevez des demandes d'intervention près de chez vous, gérez votre planning et candidatez en quelques minutes.",
    },
  },
  {
    path: 'devenir-vendeur',
    loadComponent: () => import('./pages/become-seller/become-seller').then((m) => m.BecomeSeller),
    title: 'Devenir vendeur | CartroMall',
    data: {
      description:
        'Devenez vendeur partenaire sur CartroMall : proposez vos pièces détachées ou vos véhicules à la location et à la vente, après validation par Cartronic.',
    },
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'À propos de Cartronic',
    data: {
      description:
        'Cartronic réunit dépannage automobile et marketplace de pièces et véhicules sous un même nom. Découvrez notre mission, nos valeurs et notre équipe.',
    },
  },
  {
    path: 'actualites',
    loadComponent: () => import('./pages/news/news').then((m) => m.News),
    title: 'Actualités Cartronic',
    data: {
      description:
        'Actualités Cartronic : annonces de lancement, ouverture de nouvelles villes et évolutions des applications Cartronic et CartroMall au Cameroun.',
    },
  },
  {
    path: 'actualites/lancement-campagne-marketing',
    loadComponent: () =>
      import('./pages/campaign-launch/campaign-launch').then((m) => m.CampaignLaunch),
    title: 'Lancement de la campagne marketing Cartronic',
    data: {
      description:
        'Cartronic lance sa première campagne marketing au Cameroun : réseaux sociaux, affichage urbain à Yaoundé et Douala, partenariats avec des influenceurs.',
    },
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contacter Cartronic',
    data: {
      description:
        "Contactez l'équipe Cartronic par e-mail, WhatsApp ou formulaire pour toute question, partenariat ou candidature. Réponse sous 24h, à Yaoundé, Cameroun.",
    },
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq').then((m) => m.Faq),
    title: 'FAQ | Cartronic',
    data: {
      description:
        "Réponses aux questions fréquentes sur l'application Cartronic, l'inscription technicien, les villes couvertes et le suivi d'intervention.",
    },
  },
  {
    path: 'merci',
    loadComponent: () => import('./pages/merci/merci').then((m) => m.Merci),
    title: 'Merci | Cartronic',
    data: {
      description:
        'Votre demande a bien été envoyée à Cartronic. Merci de votre confiance, notre équipe revient vers vous rapidement.',
      noIndex: true,
    },
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    title: 'Mentions légales | Cartronic',
    data: {
      description:
        'Mentions légales, politique de confidentialité et conditions générales d\'utilisation du site vitrine et des applications mobiles Cartronic et CartroMall.',
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Page introuvable | Cartronic',
    data: {
      description:
        "Cette page n'existe pas ou plus. Retournez à l'accueil pour découvrir les services de dépannage automobile et la marketplace Cartronic.",
    },
  },
];
