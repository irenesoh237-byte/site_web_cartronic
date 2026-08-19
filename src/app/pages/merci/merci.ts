import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';

interface MerciVariant {
  title: string;
  message: string;
  delay: string;
}

const VARIANTS: Record<string, MerciVariant> = {
  contact: {
    title: 'Message envoyé !',
    message:
      "Merci de nous avoir contactés. Notre équipe vous répond généralement sous 24h à l'adresse que vous avez indiquée.",
    delay: 'Réponse sous 24h',
  },
  technicien: {
    title: 'Candidature envoyée !',
    message:
      "Merci pour votre candidature technicien. Notre équipe l'étudie et revient vers vous sous 48h.",
    delay: 'Réponse sous 48h',
  },
  vendeur: {
    title: 'Demande envoyée !',
    message:
      "Merci pour votre demande d'inscription vendeur. Nous validons les comptes sous 48h.",
    delay: 'Validation sous 48h',
  },
};

const DEFAULT_VARIANT: MerciVariant = {
  title: 'Merci !',
  message: 'Nous avons bien reçu votre demande et reviendrons vers vous rapidement.',
  delay: '',
};

@Component({
  selector: 'app-merci',
  imports: [RouterLink, RevealDirective],
  templateUrl: './merci.html',
  styleUrl: './merci.scss',
})
export class Merci {
  private readonly route = inject(ActivatedRoute);

  protected readonly variant: MerciVariant =
    VARIANTS[this.route.snapshot.queryParamMap.get('type') ?? ''] ?? DEFAULT_VARIANT;
}
