import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { StoreBadges } from './store-badges';

describe('StoreBadges', () => {
  let fixture: ComponentFixture<StoreBadges>;
  let component: StoreBadges;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreBadges],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreBadges);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Rendu général
  // ---------------------------------------------------------------------------

  it('affiche le conteneur des badges', () => {
    const container = fixture.nativeElement.querySelector('.store-badges');
    expect(container).toBeTruthy();
  });

  it('affiche exactement deux badges', () => {
    const badges = fixture.nativeElement.querySelectorAll('.store-badge');
    expect(badges.length).toBe(2);
  });

  // ---------------------------------------------------------------------------
  // Badge Google Play
  // ---------------------------------------------------------------------------

  it('affiche le badge Google Play', () => {
    const names: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.store-badge__name');
    const labels = Array.from(names).map((n) => n.textContent?.trim());
    expect(labels).toContain('Google Play');
  });

  it('le badge Google Play a un title de disponibilité', () => {
    const badges: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.store-badge');
    const googleBadge = Array.from(badges).find((b) =>
      b.textContent?.includes('Google Play'),
    );
    expect(googleBadge?.getAttribute('title')).toContain('Google Play');
  });

  it('le badge Google Play contient un SVG', () => {
    const badges: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.store-badge');
    const googleBadge = Array.from(badges).find((b) =>
      b.textContent?.includes('Google Play'),
    );
    expect(googleBadge?.querySelector('svg')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Badge App Store
  // ---------------------------------------------------------------------------

  it('affiche le badge App Store', () => {
    const names: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.store-badge__name');
    const labels = Array.from(names).map((n) => n.textContent?.trim());
    expect(labels).toContain('App Store');
  });

  it('le badge App Store a un title de disponibilité', () => {
    const badges: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.store-badge');
    const appBadge = Array.from(badges).find((b) => b.textContent?.includes('App Store'));
    expect(appBadge?.getAttribute('title')).toContain('App Store');
  });

  it('le badge App Store contient un SVG', () => {
    const badges: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('.store-badge');
    const appBadge = Array.from(badges).find((b) => b.textContent?.includes('App Store'));
    expect(appBadge?.querySelector('svg')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Texte "Bientôt sur"
  // ---------------------------------------------------------------------------

  it('chaque badge affiche le texte "Bientôt sur"', () => {
    const eyebrows: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('.store-badge__eyebrow');
    expect(eyebrows.length).toBe(2);
    eyebrows.forEach((el) => {
      expect(el.textContent?.trim()).toBe('Bientôt sur');
    });
  });

  // ---------------------------------------------------------------------------
  // Input appName (valeur par défaut et valeur personnalisée)
  // ---------------------------------------------------------------------------

  it('utilise "Cartronic" comme appName par défaut', () => {
    expect(component.appName()).toBe('Cartronic');
  });
});

// ---------------------------------------------------------------------------
// Test d'intégration avec un appName personnalisé via un composant hôte
// ---------------------------------------------------------------------------

@Component({
  template: `<app-store-badges appName="MonApp" />`,
  imports: [StoreBadges],
})
class HostComponent {}

describe('StoreBadges — input appName personnalisé', () => {
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
  });

  it('accepte un appName personnalisé via l\'input', () => {
    const badge: StoreBadges = hostFixture.debugElement
      .query((el) => el.componentInstance instanceof StoreBadges)
      ?.componentInstance;
    expect(badge.appName()).toBe('MonApp');
  });
});