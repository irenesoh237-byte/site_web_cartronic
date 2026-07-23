import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let component: Contact;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Rendu initial
  // ---------------------------------------------------------------------------

  it('affiche le formulaire au chargement', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('n\'affiche pas le message de succès au chargement', () => {
    const status = fixture.nativeElement.querySelector('[role="status"]');
    expect(status).toBeNull();
  });

  it('affiche les quatre sujets dans le select', () => {
    const options: NodeListOf<HTMLOptionElement> =
      fixture.nativeElement.querySelectorAll('select option');
    expect(options.length).toBe(4);
    expect(options[0].value).toBe('Question générale');
  });

  // ---------------------------------------------------------------------------
  // État initial du formulaire
  // ---------------------------------------------------------------------------

  it('initialise le formulaire avec des champs vides sauf subject', () => {
    const { fullName, email, subject, message } = component['form'].controls;
    expect(fullName.value).toBe('');
    expect(email.value).toBe('');
    expect(subject.value).toBe('Question générale');
    expect(message.value).toBe('');
  });

  it('le formulaire est invalide au départ', () => {
    expect(component['form'].invalid).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // isInvalid()
  // ---------------------------------------------------------------------------

  it('isInvalid retourne false si le champ n\'est pas touché', () => {
    expect(component.isInvalid('fullName')).toBe(false);
  });

  it('isInvalid retourne true si le champ est touché et vide', () => {
    component['form'].controls.fullName.markAsTouched();
    expect(component.isInvalid('fullName')).toBe(true);
  });

  it('isInvalid retourne false pour un e-mail valide touché', () => {
    const ctrl = component['form'].controls.email;
    ctrl.setValue('test@example.com');
    ctrl.markAsTouched();
    expect(component.isInvalid('email')).toBe(false);
  });

  it('isInvalid retourne true pour un e-mail invalide touché', () => {
    const ctrl = component['form'].controls.email;
    ctrl.setValue('pas-un-email');
    ctrl.markAsTouched();
    expect(component.isInvalid('email')).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // Soumission invalide
  // ---------------------------------------------------------------------------

  it('onSubmit sur formulaire invalide marque tous les champs comme touchés', () => {
    component.onSubmit();
    const { fullName, email, message } = component['form'].controls;
    expect(fullName.touched).toBe(true);
    expect(email.touched).toBe(true);
    expect(message.touched).toBe(true);
  });

  it('onSubmit sur formulaire invalide ne passe pas en état soumis', () => {
    component.onSubmit();
    expect(component['submitted']()).toBe(false);
  });

  it('affiche les messages d\'erreur après une soumission invalide', async () => {
    component.onSubmit();
    fixture.detectChanges();
    const errors = fixture.nativeElement.querySelectorAll('.field-error');
    expect(errors.length).toBeGreaterThan(0);
  });

  // ---------------------------------------------------------------------------
  // Soumission valide
  // ---------------------------------------------------------------------------

  it('onSubmit sur formulaire valide passe en état soumis', () => {
    fillForm(component);
    component.onSubmit();
    expect(component['submitted']()).toBe(true);
  });

  it('affiche le message de succès après soumission valide', async () => {
    fillForm(component);
    component.onSubmit();
    fixture.detectChanges();

    const status = fixture.nativeElement.querySelector('[role="status"]');
    expect(status).toBeTruthy();
    expect(status.textContent).toContain('bien été envoyé');
  });

  it('masque le formulaire après soumission valide', async () => {
    fillForm(component);
    component.onSubmit();
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();
  });

  it('réinitialise le formulaire avec le sujet par défaut après soumission', () => {
    fillForm(component);
    component.onSubmit();
    expect(component['form'].controls.fullName.value).toBe('');
    expect(component['form'].controls.subject.value).toBe('Question générale');
  });

  // ---------------------------------------------------------------------------
  // startNewMessage()
  // ---------------------------------------------------------------------------

  it('startNewMessage repasse en état non soumis', () => {
    fillForm(component);
    component.onSubmit();
    expect(component['submitted']()).toBe(true);

    component.startNewMessage();
    expect(component['submitted']()).toBe(false);
  });

  it('affiche à nouveau le formulaire après startNewMessage', async () => {
    fillForm(component);
    component.onSubmit();
    component.startNewMessage();
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function fillForm(component: Contact): void {
  component['form'].setValue({
    fullName: 'Jean Dupont',
    email: 'jean@example.com',
    subject: 'Question générale',
    message: 'Bonjour, j\'ai une question.',
  });
}