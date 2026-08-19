import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ContactMailerService } from '../../shared/services/contact-mailer.service';
import { AnalyticsService } from '../../shared/services/analytics.service';

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
    { label: 'Autre',                emoji: '' +
        '' +
        '' },
  ];

  protected readonly cities = ['Yaoundé', 'Douala', 'Bafoussam', 'Autre'];

  protected readonly loading      = signal(false);
  protected readonly errorMessage = signal('');

  private readonly fb        = inject(FormBuilder);
  private readonly mailer    = inject(ContactMailerService);
  private readonly router    = inject(Router);
  private readonly analytics = inject(AnalyticsService);

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
    this.errorMessage.set('');

    const raw = this.form.getRawValue();

    this.mailer
      .send(`Contact — ${raw.subject}`, {
        'Nom complet': raw.fullName,
        'E-mail': raw.email,
        'Téléphone': raw.phone,
        'Ville': raw.city,
        'Sujet': raw.subject,
        'Message': raw.message,
        'Consentement à être recontacté': raw.consent,
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.analytics.trackEvent('generate_lead', { form_name: 'contact' });
          void this.router.navigate(['/merci'], { queryParams: { type: 'contact' } });
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set(
            "L'envoi a échoué. Merci de réessayer ou de nous contacter via WhatsApp."
          );
        },
      });
  }

  trackItineraire(): void {
    this.analytics.trackEvent('itineraire_click', { location: 'contact' });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
