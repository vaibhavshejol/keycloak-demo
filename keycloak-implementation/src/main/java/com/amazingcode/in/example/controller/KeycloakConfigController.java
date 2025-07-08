package com.amazingcode.in.example.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/meta-info")
@CrossOrigin(origins = "http://localhost:4200")
public class KeycloakConfigController {

    private static final Logger logger = LoggerFactory.getLogger(KeycloakConfigController.class);
    
    @Value("${keycloak.url}")
    private String keycloakUrl;

    @Value("${default.keycloak.realm}")
    private String keycloakRealm;

    @Value("${default.keycloak.clientId}")
    private String keycloakClientId;

    @GetMapping("/keycloak-config")
    public Map<String, String> getKeycloakConfig() {

        logger.info("Request received for keycloak config");

        return Map.of(
            "url", keycloakUrl,
            "realm", keycloakRealm,
            "clientId", keycloakClientId
        );
    }
} 