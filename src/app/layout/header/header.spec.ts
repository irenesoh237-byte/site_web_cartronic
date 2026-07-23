import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Rendu initial
  // ---------------------------------------------------------------------------

  it('affiche le logo de marque', () => {
    const img = fixture.nativeElement.querySelector('.site-header__logo');
    expect(img).toBeTruthy();
  });

  it('affiche le nom de la marque', () => {
    const name = fixture.nativeElement.querySelector('.site-header__name');
    expect(name.textContent.trim()).toBe('Cartronic');
  });

  it('affiche le lien vers la page d\'accueil sur le logo', () => {
    const brand: HTMLAnchorElement = fixture.nativeElement.querySelector('.site-header__brand');
    expect(brand.getAttribute('href')).toBe('/');
  });

  it('affiche le bouton de navigation mobile', () => {
    const toggle = fixture.nativeElement.querySelector('.site-header__toggle');
    expect(toggle).toBeTruthy();
  });

  it(`affiche ${7} liens de navigation`, () => {
    const links = fixture.nativeElement.querySelectorAll('.site-header__nav a:not(.btn)');
    expect(links.length).toBe(7);
  });

  // ---------------------------------------------------------------------------
  // État initial du menu
  // ---------------------------------------------------------------------------

  it('le menu est fermé au chargement', () => {
    expect(component['menuOpen']()).toBe(false);
  });

  it('aria-expanded est false au chargement', () => {
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.site-header__toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('la nav n\'a pas la classe --open au chargement', () => {
    const nav = fixture.nativeElement.querySelector('.site-header__nav');
    expect(nav.classList.contains('site-header__nav--open')).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // toggleMenu()
  // ---------------------------------------------------------------------------

  it('toggleMenu ouvre le menu', () => {
    component.toggleMenu();
    expect(component['menuOpen']()).toBe(true);
  });

  it('toggleMenu deux fois referme le menu', () => {
    component.toggleMenu();
    component.toggleMenu();
    expect(component['menuOpen']()).toBe(false);
  });

  it('aria-expanded passe à true après toggleMenu', async () => {
    component.toggleMenu();
    fixture.detectChanges();

    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.site-header__toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('la nav reçoit la classe --open après toggleMenu', async () => {
    component.toggleMenu();
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector('.site-header__nav');
    expect(nav.classList.contains('site-header__nav--open')).toBe(true);
  });

  it('le bouton reçoit la classe is-open après toggleMenu', async () => {
    component.toggleMenu();
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('.site-header__toggle');
    expect(toggle.classList.contains('is-open')).toBe(true);
  });

  // ---------------------------------------------------------------------------
  // closeMenu()
  // ---------------------------------------------------------------------------

  it('closeMenu ferme un menu ouvert', () => {
    component.toggleMenu();
    expect(component['menuOpen']()).toBe(true);

    component.closeMenu();
    expect(component['menuOpen']()).toBe(false);
  });

  it('closeMenu est sans effet si le menu est déjà fermé', () => {
    component.closeMenu();
    expect(component['menuOpen']()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Clic sur un lien de navigation
  // ---------------------------------------------------------------------------

  it('un clic sur un lien de navigation ferme le menu', async () => {
    component.toggleMenu();
    fixture.detectChanges();

    const firstLink: HTMLAnchorElement = fixture.nativeElement.querySelector(
      '.site-header__nav a:not(.btn)',
    );
    firstLink.click();
    fixture.detectChanges();

    expect(component['menuOpen']()).toBe(false);
  });

  it('un clic sur le logo ferme le menu', async () => {
    component.toggleMenu();
    fixture.detectChanges();

    const brand: HTMLAnchorElement = fixture.nativeElement.querySelector('.site-header__brand');
    brand.click();
    fixture.detectChanges();

    expect(component['menuOpen']()).toBe(false);
  });

  // ---------------------------------------------------------------------------
  // Accessibilité
  // ---------------------------------------------------------------------------

  it('le bouton toggle a un aria-label', () => {
    const toggle = fixture.nativeElement.querySelector('.site-header__toggle');
    expect(toggle.getAttribute('aria-label')).toBeTruthy();
  });

  it('la nav a un aria-label', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBeTruthy();
  });
});