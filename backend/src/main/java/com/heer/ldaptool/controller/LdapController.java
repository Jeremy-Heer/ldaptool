package com.heer.ldaptool.controller;

import com.heer.ldaptool.model.LdapSearchRequest;
import com.heer.ldaptool.model.LdapSearchResult;
import com.heer.ldaptool.model.LdapModifyRequest;
import com.heer.ldaptool.model.LdapModifyResult;
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
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/ldap")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "LDAP Operations", description = "Dynamic LDAP search and modify functionality")
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

    @PostMapping("/ldapmodify")
    @Operation(summary = "Perform dynamic LDAP modify", 
               description = "Execute LDAP modify operations to add, replace, or delete attributes. " +
                           "Allows connecting to any LDAP server with custom parameters. " +
                           "Authentication credentials should be provided via Basic Auth header.",
               security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "LDAP modify completed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request parameters"),
        @ApiResponse(responseCode = "401", description = "Authentication required or invalid credentials")
    })
    public ResponseEntity<LdapModifyResult> performLdapModify(
            @RequestBody LdapModifyRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("LDAP modify request received for host: {}, target DN: {}", 
                   request != null ? request.getHost() : "null", 
                   request != null ? request.getDn() : "null");
        
        try {
            // Extract credentials from Basic Auth header
            String bindDn = null;
            String password = null;
            
            logger.debug("Processing authentication header");
            
            if (authHeader != null && authHeader.startsWith("Basic ")) {
                logger.debug("Basic authentication header found, extracting credentials");
                String base64Credentials = authHeader.substring(6);
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));
                String[] parts = credentials.split(":", 2);
                if (parts.length == 2) {
                    bindDn = parts[0];
                    password = parts[1];
                    logger.info("Authentication credentials extracted for bind DN: {}", bindDn);
                } else {
                    logger.warn("Invalid Basic Auth credentials format");
                }
            } else {
                logger.info("No authentication header provided, proceeding without authentication");
            }
            
            logger.info("Performing LDAP modify with bind DN: {}", bindDn != null ? bindDn : "none");
            LdapModifyResult result = ldapService.performLdapModify(request, bindDn, password);
            
            logger.info("LDAP modify completed: {}", result.isSuccess() ? "SUCCESS" : "FAILED");
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            logger.error("LDAP modify failed: {}", e.getMessage(), e);
            LdapModifyResult errorResult = new LdapModifyResult(false, "Request processing failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }

    @PostMapping("/test-connection")
    @Operation(summary = "Test LDAP connection", 
               description = "Test LDAP server connection and authentication. " +
                           "This endpoint specifically validates that the provided credentials can connect and authenticate to the LDAP server.",
               security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Connection test completed"),
        @ApiResponse(responseCode = "400", description = "Invalid request parameters")
    })
    public ResponseEntity<Map<String, Object>> testConnection(
            @RequestBody LdapSearchRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("LDAP connection test request received for host: {}", 
                   request != null ? request.getHost() : "null");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate basic request parameters
            if (request.getHost() == null || request.getHost().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Host is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Extract credentials from Basic Auth header
            String dn = null;
            String password = null;
            
            logger.debug("Processing authentication header for connection test");
            
            if (authHeader != null && authHeader.startsWith("Basic ")) {
                logger.debug("Basic authentication header found, extracting credentials");
                String base64Credentials = authHeader.substring(6);
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));
                String[] parts = credentials.split(":", 2);
                if (parts.length == 2) {
                    dn = parts[0];
                    password = parts[1];
                    logger.info("Testing connection with authentication for DN: {}", dn);
                } else {
                    logger.warn("Invalid Basic Auth credentials format");
                }
            } else {
                logger.info("Testing anonymous connection (no authentication header provided)");
            }
            
            // Perform connection test
            boolean connectionResult = ldapService.testConnection(request, dn, password);
            
            if (connectionResult) {
                response.put("success", true);
                response.put("message", "Connection successful!");
                logger.info("LDAP connection test successful for host: {}", request.getHost());
            } else {
                response.put("success", false);
                response.put("message", "Connection failed - unable to connect or authenticate to LDAP server");
                logger.warn("LDAP connection test failed for host: {}", request.getHost());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("LDAP connection test failed with exception: {}", e.getMessage(), e);
            response.put("success", false);
            response.put("message", "Connection test failed: " + e.getMessage());
            return ResponseEntity.ok(response); // Return 200 with error details in body
        }
    }

    @PostMapping("/get-root-dn")
    @Operation(summary = "Get LDAP Root DN", 
               description = "Retrieve the default naming context (Root DN) from the LDAP server's Root DSE. " +
                           "This is used for automatic LDAP browsing functionality.",
               security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Root DN retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request parameters"),
        @ApiResponse(responseCode = "401", description = "Authentication required or invalid credentials")
    })
    public ResponseEntity<Map<String, Object>> getRootDn(
            @RequestBody LdapSearchRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("LDAP Root DN request received for host: {}", 
                   request != null ? request.getHost() : "null");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract credentials from Basic Auth header
            String dn = null;
            String password = null;
            
            logger.debug("Processing authentication header for Root DN retrieval");
            
            if (authHeader != null && authHeader.startsWith("Basic ")) {
                logger.debug("Basic authentication header found, extracting credentials");
                String base64Credentials = authHeader.substring(6);
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));
                String[] parts = credentials.split(":", 2);
                if (parts.length == 2) {
                    dn = parts[0];
                    password = parts[1];
                    logger.info("Root DN request with authentication for DN: {}", dn);
                } else {
                    logger.warn("Invalid Basic Auth credentials format");
                }
            } else {
                logger.info("Root DN request with anonymous connection");
            }
            
            // Get Root DN from LDAP server
            String rootDn = ldapService.getRootDn(request, dn, password);
            
            if (rootDn != null && !rootDn.isEmpty()) {
                response.put("success", true);
                response.put("rootDn", rootDn);
                response.put("message", "Root DN retrieved successfully");
                logger.info("Root DN retrieved successfully: {}", rootDn);
            } else {
                response.put("success", false);
                response.put("message", "No default naming context found in Root DSE");
                logger.warn("No Root DN found for host: {}", request.getHost());
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Root DN retrieval failed: {}", e.getMessage(), e);
            response.put("success", false);
            response.put("message", "Failed to retrieve Root DN: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/get-root-dse")
    @Operation(summary = "Get LDAP Root DSE", 
               description = "Retrieve the complete Root DSE object from the LDAP server including all attributes " +
                           "such as namingContexts, supportedControls, supportedExtensions, etc.",
               security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Root DSE retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request parameters"),
        @ApiResponse(responseCode = "401", description = "Authentication required or invalid credentials")
    })
    public ResponseEntity<LdapSearchResult> getRootDse(
            @RequestBody LdapSearchRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        logger.info("LDAP Root DSE request received for host: {}", 
                   request != null ? request.getHost() : "null");
        
        try {
            // Extract credentials from Basic Auth header
            String dn = null;
            String password = null;
            
            logger.debug("Processing authentication header for Root DSE retrieval");
            
            if (authHeader != null && authHeader.startsWith("Basic ")) {
                logger.debug("Basic authentication header found, extracting credentials");
                String base64Credentials = authHeader.substring(6);
                String credentials = new String(Base64.getDecoder().decode(base64Credentials));
                String[] parts = credentials.split(":", 2);
                if (parts.length == 2) {
                    dn = parts[0];
                    password = parts[1];
                    logger.info("Root DSE request with authentication for DN: {}", dn);
                } else {
                    logger.warn("Invalid Basic Auth credentials format");
                }
            } else {
                logger.info("Root DSE request with anonymous connection");
            }
            
            // Create a special search request for rootDSE
            LdapSearchRequest rootDseRequest = new LdapSearchRequest();
            rootDseRequest.setHost(request.getHost());
            rootDseRequest.setPort(request.getPort());
            rootDseRequest.setUseSSL(request.isUseSSL());
            rootDseRequest.setBase(""); // Empty base DN for rootDSE
            rootDseRequest.setFilter("(objectClass=*)");
            rootDseRequest.setScope("base");
            rootDseRequest.setAttributes(java.util.Arrays.asList("*")); // All attributes
            
            // Perform the search for rootDSE
            LdapSearchResult result = ldapService.performLdapSearch(rootDseRequest, dn, password);
            
            if (result.isSuccess() && result.getEntries() != null && !result.getEntries().isEmpty()) {
                logger.info("Root DSE retrieved successfully with {} attributes", 
                           result.getEntries().get(0).size());
                return ResponseEntity.ok(result);
            } else {
                logger.warn("No Root DSE found for host: {}", request.getHost());
                LdapSearchResult errorResult = new LdapSearchResult();
                errorResult.setSuccess(false);
                errorResult.setMessage("No Root DSE found");
                return ResponseEntity.ok(errorResult);
            }
            
        } catch (Exception e) {
            logger.error("Root DSE retrieval failed: {}", e.getMessage(), e);
            LdapSearchResult errorResult = new LdapSearchResult();
            errorResult.setSuccess(false);
            errorResult.setMessage("Failed to retrieve Root DSE: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResult);
        }
    }
}
