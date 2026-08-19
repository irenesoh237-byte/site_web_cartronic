/**
 * Visuel d'une carte "premium" (voir .visual-card dans _utilities.scss et le
 * composant VisualCardMedia). Pas de photo dédiée disponible pour l'instant
 * sur la plupart des cartes du site : `illustration` réutilise les scènes
 * SVG déjà en place (hero), et `gradient` retombe sur un bloc de couleur de
 * la palette existante. Le jour où une vraie photo est disponible, il suffit
 * de changer la valeur `CardVisual` de la carte concernée (un seul champ,
 * dans le composant de la page) pour passer au cas `image` ci-dessous —
 * aucun autre fichier à toucher.
 */
export type CardVisual =
  | { type: 'illustration'; component: 'technician' | 'marketplace' }
  | { type: 'gradient'; tone: 'primary' | 'success' | 'warning' | 'error' }
  | { type: 'image'; src: string; alt: string };
