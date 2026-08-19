import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
})
export class WhatsappButton {
  private readonly analytics = inject(AnalyticsService);

  onClick(): void {
    this.analytics.trackEvent('whatsapp_click', { location: 'fab' });
  }
}
