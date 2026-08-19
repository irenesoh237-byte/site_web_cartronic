import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { JsonLdService } from '../../shared/services/json-ld.service';
import { FAQ_ITEMS } from '../../shared/data/faq.data';

@Component({
  selector: 'app-faq',
  imports: [RouterLink, RevealDirective],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq implements OnInit, OnDestroy {
  protected readonly items = FAQ_ITEMS;
  protected readonly openIndex = signal<number | null>(0);

  private readonly jsonLd = inject(JsonLdService);
  private scriptEl: HTMLScriptElement | null = null;

  toggle(index: number): void {
    this.openIndex.update(current => (current === index ? null : index));
  }

  ngOnInit(): void {
    this.scriptEl = this.jsonLd.insert({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    });
  }

  ngOnDestroy(): void {
    this.jsonLd.remove(this.scriptEl);
  }
}
