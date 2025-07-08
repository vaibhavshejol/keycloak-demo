import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class KeycloakConfigService {
  
  private apiBaseUrl = `${environment.apiBaseUrl}/api/meta-info/keycloak-config`;
  
  constructor(private http: HttpClient) {}

  getKeycloakConfig(): Observable<any> {
    return this.http.get(this.apiBaseUrl);
  }
} 