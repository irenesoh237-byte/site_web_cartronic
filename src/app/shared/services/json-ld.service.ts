import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

/**
 * Injecte/retire des blocs JSON-LD dans <head>. Utilisé par les composants qui
 * portent des données structurées propres à une page (breadcrumb, FAQ...),
 * par opposition au LocalBusiness statique déjà présent dans index.html.
 */
@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly document = inject(DOCUMENT);

  insert(data: unknown): HTMLScriptElement {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
    return script;
  }

  remove(script: HTMLScriptElement | null): void {
    script?.remove();
  }
}
