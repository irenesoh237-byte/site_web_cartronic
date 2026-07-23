import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

/**
 * Directive de compteur animé.
 * Extrait le nombre depuis le textContent de l'élément et l'anime de 0 jusqu'à
 * sa valeur finale dès que l'élément entre dans le viewport.
 *
 * Supporte les entiers ("500+ techniciens"), les décimaux ("4.8★ satisfaction")
 * et préserve le texte qui précède et suit le nombre.
 *
 * Respecte `prefers-reduced-motion`.
 */
@Directive({
  selector: '[appCounter]',
})
export class CounterDirective implements AfterViewInit, OnDestroy {
  readonly duration = input(1500);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.runCounter();
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  private runCounter(): void {
    const el = this.el.nativeElement;
    const text = el.textContent?.trim() ?? '';

    // Découpe : préfixe (non-chiffres) | nombre | suffixe
    const match = text.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
    if (!match) return;

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const duration = this.duration();
    const startTime = performance.now();

    const tick = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubique : décélération progressive vers la valeur finale
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      const display = decimals > 0 ? value.toFixed(decimals) : String(Math.floor(value));
      el.textContent = `${prefix}${display}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}