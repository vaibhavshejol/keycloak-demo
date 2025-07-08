# Keycloak Integration

## Overview

This guide provides comprehensive instructions for integrating Keycloak authentication into your applications.

## What is Keycloak?

Keycloak is an open-source Identity and Access Management solution that allows you to add authentication to applications and secure services with minimum effort. With Keycloak, you don't need to deal with storing users or authenticating users directly in your application.

### Key Features
- User federation
- Strong authentication
- User management
- Fine-grained authorization
- Single Sign-On (SSO)
- Single Sign-Out

## Core Concepts

### Single Sign-On (SSO)
Users authenticate with Keycloak rather than individual applications. This means:
- Applications don't need to handle login forms, user authentication, or user storage
- Once logged into Keycloak, users can access different applications without re-authenticating
- Single logout functionality - users only need to logout once to be logged out of all applications

### Admin Console
The admin console allows administrators to centrally manage all aspects of the Keycloak server:
- Enable/disable various features
- Configure identity brokering and user federation
- Create and manage applications and services
- Define fine-grained authorization policies
- Manage users, permissions, and sessions

### Authorization Services
For scenarios where role-based authorization isn't sufficient, Keycloak provides fine-grained authorization services. This allows you to:
- Manage permissions for all services from the Keycloak admin console
- Define exactly the policies you need

### Realm
A realm in Keycloak is equivalent to a tenant. Each realm allows administrators to create isolated groups of applications and users. 

> **Note:** Keycloak includes a single realm called `master` by default. Use this realm only for managing Keycloak itself, not for managing applications.

### Client
Clients are applications and services that can request authentication of a user.

## Setup Instructions

### Using Docker

#### For Keycloak 26.2.5:
```bash
docker run --name keycloak-26.2.5 -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.2.5 start-dev
```

#### For Keycloak 24.0.1:
```bash
docker run --name keycloak-24.0.1 -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:24.0.1 start-dev
```

This command:
- Starts Keycloak exposed on local port 8080
- Creates an initial admin user with username `admin` and password `admin`

### Initial Configuration

1. **Access Admin Console**: Go to the Keycloak Admin Console at `http://localhost:8080`
2. **Login**: Use the username and password created during setup
3. **Create Realm**: Create a new realm (e.g., `zorro-fi`)
4. **Create Clients**: Set up clients for your services:
   - `chat-service`
   - `kyc-service`
   - `customer-service`

## Angular Integration

### Installation

Install the required Keycloak dependencies:

```bash
npm install keycloak-angular@13.1.0 keycloak-js@21.0.2
```

### Configuration

Add the following code to your `app.module.ts` file:

```typescript
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init({
    config: {
      url: 'http://localhost:8080', // keycloak url
      realm: 'test-realm',          // realm name
      clientId: 'TEST-CLIENT'       // client id
    },
    initOptions: {
      onLoad: 'login-required',     // for redirect to login page
      checkLoginIframe: false
    }
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Configuration Parameters

- **url**: The base URL of your Keycloak server
- **realm**: The name of your Keycloak realm
- **clientId**: The client ID configured in Keycloak
- **onLoad**: Set to `'login-required'` to redirect users to login page automatically
- **checkLoginIframe**: Set to `false` to disable iframe-based login checking

## Next Steps

1. Configure your realm and clients in the Keycloak Admin Console
2. Set up user roles and permissions as needed
3. Implement route guards in your Angular application
4. Add logout functionality
5. Configure additional security settings as required

## Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Keycloak Angular Library](https://github.com/mauriciovigolo/keycloak-angular)
- [Keycloak JavaScript Adapter](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)