import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { KeycloakConfigService } from './service/keycloak-config.service';

function initializeKeycloak(keycloak: KeycloakService, keycloakConfigService: KeycloakConfigService) {
  return () =>
    keycloakConfigService.getKeycloakConfig().toPromise().then(config =>
      keycloak.init({
        config: {
          url: config.url,
          realm: config.realm,
          clientId: config.clientId
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        }
      })
    );
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    KeycloakService,
    KeycloakConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, KeycloakConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
