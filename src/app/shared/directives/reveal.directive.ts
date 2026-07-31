import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

/**
 * Directive d'apparition au scroll via IntersectionObserver.
 *
 * Modes :
 *  - `appReveal` ou `appReveal="slide-up"` — l'élément hôte glisse depuis le bas.
 *  - `appReveal="stagger"` — les enfants directs glissent avec un délai progressif.
 *
 * Respecte `prefers-reduced-motion` : si l'utilisateur a désactivé les animations,
 * aucune classe CSS n'est ajoutée et les éléments restent visibles immédiatement.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  readonly appReveal = input<'slide-up' | 'stagger' | ''>('slide-up');

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const host = this.el.nativeElement;

    if (this.appReveal() === 'stagger') {
      // Étiqueter chaque enfant direct avec son index pour le délai CSS
      Array.from(host.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.setProperty('--stagger-i', String(i));
        el.classList.add('anim-stagger-child');
      });
      host.classList.add('anim-stagger');
    } else {
      host.classList.add('anim-slide-up');
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}