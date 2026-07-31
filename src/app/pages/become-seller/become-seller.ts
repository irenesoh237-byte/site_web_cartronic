import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-become-seller',
  imports: [ReactiveFormsModule],
  templateUrl: './become-seller.html',
  styleUrl: './become-seller.scss',
})
export class BecomeSeller {
  protected readonly criteria = [
    'Activité professionnelle identifiable : pièces détachées, location ou vente de véhicules',
    'Pièces d\'identité et justificatifs d\'activité à jour',
    'Pièces ou véhicules conformes aux normes en vigueur',
    'Capacité à assurer le suivi des commandes ou des réservations',
  ];

  protected readonly activityTypes = [
    'Vente de pièces détachées',
    'Location de véhicules',
    'Vente de véhicules',
    'Plusieurs activités',
  ];

  protected readonly submitted = signal(false);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    businessName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    city: ['', Validators.required],
    activityType: ['', Validators.required],
    message: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Formulaire UI uniquement pour l'instant : aucun appel réseau n'est déclenché.
    // Brancher ici un envoi réel (API ou service e-mail) lorsque celui-ci sera défini.
    console.info('Demande vendeur (UI only) :', this.form.getRawValue());

    this.submitted.set(true);
    this.form.reset();
  }

  startNewApplication(): void {
    this.submitted.set(false);
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
