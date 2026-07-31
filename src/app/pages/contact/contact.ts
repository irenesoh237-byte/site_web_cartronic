import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly subjects = [
    { label: 'Question générale',    emoji: '' },
    { label: 'Partenariat',          emoji: '' },
    { label: 'Presse',               emoji: '' },
    { label: 'Support technique',    emoji: '' },
    { label: 'Devenir technicien',   emoji: '' },
    { label: 'Devenir vendeur',      emoji: '' },
    { label: 'Signaler un problème', emoji: '' },
    { label: 'Investissement',       emoji: '' },
    { label: 'Autre',                emoji: '' },
  ];

  protected readonly cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Autre'];

  protected readonly submitted        = signal(false);
  protected readonly loading          = signal(false);
  protected readonly submittedEmail   = signal('');
  protected readonly submittedSubject = signal('');
  protected readonly openFaq          = signal<number | null>(null);

  protected readonly faqs = [
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
      a: "Actuellement à Yaoundé, avec une extension prévue à Douala et Bafoussam dans les prochains mois.",
    },
    {
      q: "Comment suivre ma demande d'intervention ?",
      a: "En temps réel depuis l'application, onglet « Mes interventions ». Vous recevez aussi une notification à chaque étape.",
    },
  ];

  toggleFaq(index: number): void {
    this.openFaq.update(current => (current === index ? null : index));
  }

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    fullName:   ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    phone:      ['+237 '],
    city:       [''],
    subject:    [this.subjects[0].label, Validators.required],
    message:    ['', [Validators.required, Validators.maxLength(500)]],
    consent:    [false],
  });

  protected readonly messageLength = computed(() =>
    this.form.get('message')?.value?.length ?? 0,
  );

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { email, subject } = this.form.getRawValue();

    // Simuler un délai réseau (remplacer par un vrai appel API)
    setTimeout(() => {
      console.info('Message de contact (UI only) :', this.form.getRawValue());
      this.submittedEmail.set(email);
      this.submittedSubject.set(subject);
      this.loading.set(false);
      this.submitted.set(true);
      this.form.reset({ subject: this.subjects[0].label, phone: '+237 ' });
    }, 1200);
  }

  startNewMessage(): void {
    this.submitted.set(false);
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
