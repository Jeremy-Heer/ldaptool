package com.heer.ldaptool.controller;

import com.heer.ldaptool.model.LdapSearchRequest;
import com.heer.ldaptool.model.LdapSearchResult;
import com.heer.ldaptool.service.LdapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
@RequestMapping("/ldap")
@Tag(name = "LDAP Search", description = "Dynamic LDAP search functionality equivalent to ldapsearch command")
public class LdapController {

    private static final Logger logger = LoggerFactory.getLogger(LdapController.class);

    @Autowired
    private LdapService ldapService;

    @PostMapping("/ldapsearch")
    @Operation(summary = "Perform dynamic LDAP search", 
               description = "Execute a custom LDAP search equivalent to ldapsearch command-line tool. " +
                           "Allows connecting to any LDAP server with custom parameters. " +
                           "Authentication credentials should be provided via Basic Auth header.",
               security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "LDAP search completed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request parameters"),
        @ApiResponse(responseCode = "401", description = "Authentication required or invalid credentials")
    })
    public ResponseEntity<LdapSearchResult> performLdapSearch(
            @RequestBody LdapSearchRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("LDAP search request received for host: {}, base DN: {}", 
                   request != null ? request.getHost() : "null", 
                   request != null ? request.getBase() : "null");
        
        try {
            // Extract credentials from Basic Auth header
            String dn = null;
            String password = null;
            
            logger.debug("Processing authentication header");
            
            if (authHeader != null && authHeader.startsWith("Basic ")) {
                logger.debug("Basic authentication header found, extracting credentials");
                String base64Credentials = authHeader.substring(6);
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));
                String[] parts = credentials.split(":", 2);
                if (parts.length == 2) {
                    dn = parts[0];
                    password = parts[1];
                    logger.info("Authentication credentials extracted for DN: {}", dn);
                } else {
                    logger.warn("Invalid Basic Auth credentials format");
                }
            } else {
                logger.info("No authentication header provided, proceeding with anonymous bind");
            }
            
            logger.info("Performing LDAP search with DN: {}", dn != null ? dn : "anonymous");
            LdapSearchResult result = ldapService.performLdapSearch(request, dn, password);
            
            logger.info("LDAP search completed successfully. Found {} entries", 
                       result.getEntries() != null ? result.getEntries().size() : 0);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("LDAP search failed: {}", e.getMessage(), e);
            LdapSearchResult errorResult = new LdapSearchResult(false, "Request processing failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }
}
