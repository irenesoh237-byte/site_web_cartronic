export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Comment télécharger l'application Cartronic ?",
    a: "Disponible sur l'App Store (iOS) et bientôt sur Google Play (Android). Recherchez « Cartronic » ou utilisez le lien de téléchargement sur notre site.",
  },
  {
    q: 'Comment devenir technicien partenaire ?',
    a: "Via la page Rejoindre de notre site ou directement depuis l'application, section « Devenir technicien ». Notre équipe vous recontacte sous 48h.",
  },
  {
    q: "L'application est-elle gratuite ?",
    a: "Oui, l'application Cartronic est entièrement gratuite pour les clients. Aucun abonnement ni frais cachés.",
  },
  {
    q: 'Dans quelles villes Cartronic est-il disponible ?',
    a: 'Actuellement à Yaoundé, avec une extension prévue à Douala et Bafoussam dans les prochains mois.',
  },
  {
    q: "Comment suivre ma demande d'intervention ?",
    a: "En temps réel depuis l'application, onglet « Mes interventions ». Vous recevez aussi une notification à chaque étape.",
  },
];
