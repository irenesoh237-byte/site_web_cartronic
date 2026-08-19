import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConsentService } from './consent.service';

// À remplacer par l'ID de mesure réel une fois créé sur Google Analytics
// (format G-XXXXXXXXXX, visible dans Admin > Flux de données > votre flux web).
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Tracking GA4. Le script gtag.js n'est chargé que si ConsentService signale
 * un consentement accordé — tant qu'aucune bannière cookies n'existe sur le
 * site (voir ConsentService), ce service ne fait donc rigoureusement rien.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly consent = inject(ConsentService);

  private scriptLoaded = false;

  init(): void {
    effect(() => {
      if (this.consent.analyticsGranted() && !this.scriptLoaded) {
        this.loadScript();
      }
    });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.trackPageView(event.urlAfterRedirects));
  }

  trackEvent(name: string, params: Record<string, string | number | boolean> = {}): void {
    if (!this.consent.analyticsGranted() || typeof window.gtag !== 'function') {
      return;
    }
    window.gtag('event', name, params);
  }

  private trackPageView(url: string): void {
    if (!this.consent.analyticsGranted() || typeof window.gtag !== 'function') {
      return;
    }
    window.gtag('event', 'page_view', { page_path: url });
  }

  private loadScript(): void {
    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    this.document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]): void {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    // send_page_view désactivé : les pageviews sont envoyées manuellement à
    // chaque NavigationEnd pour rester cohérentes avec le routing SPA.
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

    this.scriptLoaded = true;
  }
}
