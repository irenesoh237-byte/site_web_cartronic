import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { WhatsappButton } from './shared/whatsapp-button/whatsapp-button';
import { SeoService } from './shared/services/seo.service';
import { AnalyticsService } from './shared/services/analytics.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, WhatsappButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);

  constructor() {
    this.seo.init();
    this.analytics.init();
  }
}
