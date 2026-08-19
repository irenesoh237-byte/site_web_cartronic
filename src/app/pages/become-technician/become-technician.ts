import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactMailerService } from '../../shared/services/contact-mailer.service';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'app-become-technician',
  imports: [ReactiveFormsModule],
  templateUrl: './become-technician.html',
  styleUrl: './become-technician.scss',
})
export class BecomeTechnician {
  protected readonly criteria = [
    'Expérience avérée en mécanique, électronique automobile ou carrosserie',
    'Outillage professionnel et moyen de déplacement',
    'Pièce d\'identité et justificatif d\'activité à jour',
    'Disponibilité pour des interventions d\'urgence ou planifiées',
  ];

  protected readonly specialties = [
    'Mécanique générale',
    'Électronique automobile',
    'Carrosserie',
    'Climatisation',
    'Pneumatiques',
  ];

  protected readonly loading      = signal(false);
  protected readonly errorMessage = signal('');

  private readonly fb        = inject(FormBuilder);
  private readonly mailer    = inject(ContactMailerService);
  private readonly router    = inject(Router);
  private readonly analytics = inject(AnalyticsService);

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    city: ['', Validators.required],
    experienceYears: ['', Validators.required],
    specialty: [''],
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
      .send('Candidature technicien Cartronic', {
        'Nom complet': raw.fullName,
        'Téléphone': raw.phone,
        'E-mail': raw.email,
        'Ville': raw.city,
        "Années d'expérience": raw.experienceYears,
        'Spécialité': raw.specialty,
        'Message': raw.message,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.analytics.trackEvent('generate_lead', { form_name: 'technicien' });
          void this.router.navigate(['/merci'], { queryParams: { type: 'technicien' } });
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set(
            "L'envoi a échoué. Merci de réessayer ou de nous contacter via WhatsApp."
          );
        },
      });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
