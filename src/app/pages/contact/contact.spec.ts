import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { Contact } from './contact';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let component: Contact;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, ReactiveFormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ---------------------------------------------------------------------------
  // Rendu initial
  // ---------------------------------------------------------------------------

  it('affiche le formulaire au chargement', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
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

  it('onSubmit sur formulaire invalide n\'envoie aucune requête', () => {
    component.onSubmit();
    httpMock.expectNone('https://api.web3forms.com/submit');
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

  it('onSubmit sur formulaire valide redirige vers /merci?type=contact', () => {
    fillForm(component);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onSubmit();
    httpMock.expectOne('https://api.web3forms.com/submit').flush({ success: true, message: 'ok' });

    expect(navigateSpy).toHaveBeenCalledWith(['/merci'], { queryParams: { type: 'contact' } });
  });

  it('réinitialise le formulaire avec le sujet par défaut après soumission', () => {
    fillForm(component);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onSubmit();
    httpMock.expectOne('https://api.web3forms.com/submit').flush({ success: true, message: 'ok' });

    expect(component['form'].controls.fullName.value).toBe('');
    expect(component['form'].controls.subject.value).toBe('Question générale');
  });

  it('affiche un message d\'erreur si l\'envoi échoue', () => {
    fillForm(component);

    component.onSubmit();
    httpMock
      .expectOne('https://api.web3forms.com/submit')
      .flush({ success: false, message: 'erreur' }, { status: 500, statusText: 'Server Error' });

    expect(component['errorMessage']()).toContain('échoué');
  });
});

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function fillForm(component: Contact): void {
  component['form'].setValue({
    fullName: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '+237 690000000',
    city: 'Yaoundé',
    subject: 'Question générale',
    message: 'Bonjour, j\'ai une question.',
    consent: true,
  });
}
