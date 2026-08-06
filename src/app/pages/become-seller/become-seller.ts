import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMailerService } from '../../shared/services/contact-mailer.service';

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

  protected readonly submitted    = signal(false);
  protected readonly loading      = signal(false);
  protected readonly errorMessage = signal('');

  private readonly fb     = inject(FormBuilder);
  private readonly mailer = inject(ContactMailerService);

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

    this.loading.set(true);
    this.errorMessage.set('');

    const raw = this.form.getRawValue();

    this.mailer
      .send('Candidature vendeur CartroMall', {
        'Nom / raison sociale': raw.businessName,
        'Téléphone': raw.phone,
        'E-mail': raw.email,
        'Ville': raw.city,
        "Type d'activité": raw.activityType,
        'Message': raw.message,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.submitted.set(true);
          this.form.reset();
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set(
            "L'envoi a échoué. Merci de réessayer ou de nous contacter via WhatsApp."
          );
        },
      });
  }

  startNewApplication(): void {
    this.submitted.set(false);
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
