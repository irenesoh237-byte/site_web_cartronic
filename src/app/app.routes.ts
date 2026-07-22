import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Cartronic — Your Vehicle, Your Tech',
  },
  {
    path: 'intervention',
    loadComponent: () => import('./pages/intervention/intervention').then((m) => m.Intervention),
    title: "Cartronic — L'application de dépannage et réparation automobile",
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./pages/marketplace/marketplace').then((m) => m.Marketplace),
    title: 'Marketplace Cartronic — Pièces, location et vente de véhicules',
  },
  {
    path: 'rejoindre',
    loadComponent: () => import('./pages/join/join').then((m) => m.Join),
    title: 'Rejoindre Cartronic — Technicien ou vendeur',
  },
  {
    path: 'devenir-technicien',
    loadComponent: () =>
      import('./pages/become-technician/become-technician').then((m) => m.BecomeTechnician),
    title: 'Devenir technicien Cartronic',
  },
  {
    path: 'devenir-vendeur',
    loadComponent: () => import('./pages/become-seller/become-seller').then((m) => m.BecomeSeller),
    title: 'Devenir vendeur — Marketplace Cartronic',
  },
  {
    path: 'a-propos',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    title: 'À propos de Cartronic',
  },
  {
    path: 'actualites',
    loadComponent: () => import('./pages/news/news').then((m) => m.News),
    title: 'Actualités Cartronic',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contacter Cartronic',
  },
  {
    path: 'mentions-legales',
    loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
    title: 'Mentions légales — Cartronic',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Page introuvable — Cartronic',
  },
];
