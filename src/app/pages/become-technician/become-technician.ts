import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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

  protected readonly submitted = signal(false);

  private readonly fb = inject(FormBuilder);

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

    // Formulaire UI uniquement pour l'instant : aucun appel réseau n'est déclenché.
    // Brancher ici un envoi réel (API ou service e-mail) lorsque celui-ci sera défini.
    console.info('Candidature technicien (UI only) :', this.form.getRawValue());

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
