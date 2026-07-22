import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly subjects = [
    'Question générale',
    'Partenariat',
    'Presse',
    'Support technique',
  ];

  protected readonly submitted = signal(false);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [this.subjects[0], Validators.required],
    message: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Formulaire UI uniquement pour l'instant : aucun appel réseau n'est déclenché.
    // Brancher ici un envoi réel (API ou service e-mail) lorsque celui-ci sera défini.
    console.info('Message de contact (UI only) :', this.form.getRawValue());

    this.submitted.set(true);
    this.form.reset({ subject: this.subjects[0] });
  }

  startNewMessage(): void {
    this.submitted.set(false);
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }
}
