import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'cartronic_analytics_consent';

/**
 * Gate de consentement pour la mesure d'audience. Il n'existe aujourd'hui
 * aucune bannière cookies sur le site : par défaut, le consentement est donc
 * réputé NON accordé et AnalyticsService ne charge jamais gtag.js. Ce service
 * expose grantAnalytics()/revokeAnalytics() pour qu'une future bannière (ou
 * tout autre mécanisme de consentement) puisse débloquer le tracking.
 */
@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly analyticsGranted = signal(this.readStoredConsent());

  grantAnalytics(): void {
    localStorage.setItem(STORAGE_KEY, 'granted');
    this.analyticsGranted.set(true);
  }

  revokeAnalytics(): void {
    localStorage.setItem(STORAGE_KEY, 'denied');
    this.analyticsGranted.set(false);
  }

  private readStoredConsent(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'granted';
    } catch {
      // localStorage indisponible (navigation privée stricte, etc.) : pas de tracking.
      return false;
    }
  }
}
