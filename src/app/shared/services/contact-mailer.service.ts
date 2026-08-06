import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// Clé générée sur https://web3forms.com. L'adresse de réception (cartronic.cm@gmail.com)
// se configure dans le Dashboard du compte Web3Forms, pas dans ce fichier.
export const WEB3FORMS_ACCESS_KEY = 'a78e6985-f8cb-44d7-87f8-83c19ea83c88';

export interface Web3FormsResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactMailerService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = 'https://api.web3forms.com/submit';

  send(subject: string, fields: Record<string, string | boolean>): Observable<Web3FormsResponse> {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: 'Site Cartronic',
      ...fields,
    };

    return this.http.post<Web3FormsResponse>(this.endpoint, payload);
  }
}
