package com.heer.ldaptool.service;

import com.heer.ldaptool.model.LdapSearchRequest;
import com.heer.ldaptool.model.LdapSearchResult;
import com.heer.ldaptool.model.LdapModifyRequest;
import com.heer.ldaptool.model.LdapModifyResult;
import com.unboundid.ldap.sdk.*;
import com.unboundid.util.ssl.SSLUtil;
import com.unboundid.util.ssl.TrustAllTrustManager;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.SSLSocketFactory;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LdapService {
    
    private static final Logger logger = LoggerFactory.getLogger(LdapService.class);
    private static final int DEFAULT_CONNECTION_TIMEOUT_MS = 10000;
    private static final int DEFAULT_RESPONSE_TIMEOUT_MS = 30000;

    /**
     * Test LDAP connection and authentication
     * @param request LDAP connection parameters
     * @param dn Bind DN for authentication
     * @param password Password for authentication
     * @return true if connection and authentication successful, false otherwise
     */
    public boolean testConnection(LdapSearchRequest request, String dn, String password) {
        logger.info("Testing LDAP connection to {}:{} with DN: {}", 
                   request.getHost(), request.getPort(), dn != null ? dn : "anonymous");
        
        LDAPConnection connection = null;
        try {
            // Validate request
            if (request.getHost() == null || request.getHost().trim().isEmpty()) {
                logger.error("Host is required for connection test");
                return false;
            }

            // Determine port
            int port = request.getPort() > 0 ? request.getPort() : (request.isUseSSL() ? 636 : 389);
            
            // Create connection options
            LDAPConnectionOptions options = new LDAPConnectionOptions();
            options.setConnectTimeoutMillis(DEFAULT_CONNECTION_TIMEOUT_MS);
            options.setResponseTimeoutMillis(DEFAULT_RESPONSE_TIMEOUT_MS);
            
            // Create connection
            if (request.isUseSSL()) {
                // For SSL/TLS connections
                SSLUtil sslUtil = new SSLUtil(new TrustAllTrustManager());
                SSLSocketFactory socketFactory = sslUtil.createSSLSocketFactory();
                connection = new LDAPConnection(socketFactory, options, request.getHost(), port);
            } else {
                // For plain connections
                connection = new LDAPConnection(options, request.getHost(), port);
            }
            
            logger.debug("LDAP connection established successfully");
            
            // Perform authentication if credentials provided
            if (dn != null && !dn.trim().isEmpty()) {
                BindResult bindResult = connection.bind(dn, password != null ? password : "");
                if (bindResult.getResultCode() == ResultCode.SUCCESS) {
                    logger.debug("Authentication successful");
                } else {
                    logger.error("Authentication failed: {}", bindResult.getDiagnosticMessage());
                    return false;
                }
            } else {
                logger.debug("Anonymous connection test successful");
            }
            
            logger.info("Connection test successful");
            return true;
            
        } catch (LDAPException e) {
            logger.error("LDAP connection test failed: {} (Result Code: {})", 
                        e.getMessage(), e.getResultCode());
            
            // Log specific error types for better diagnostics
            if (e.getResultCode() == ResultCode.INVALID_CREDENTIALS) {
                logger.error("Authentication failed - invalid credentials");
            } else if (e.getResultCode() == ResultCode.CONNECT_ERROR || 
                      e.getResultCode() == ResultCode.SERVER_DOWN) {
                logger.error("Connection error - server may be unreachable");
            }
            
            return false;
        } catch (Exception e) {
            logger.error("Unexpected error during connection test: {}", e.getMessage(), e);
            return false;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public LdapSearchResult performLdapSearch(LdapSearchRequest request, String dn, String password) {
        LDAPConnection connection = null;
        try {
            logger.debug("Starting LDAP search with base='{}', filter='{}', scope='{}'", 
                        request.getBase(), request.getFilter(), request.getScope());
            
            // Validate request
            if (request.getHost() == null || request.getHost().trim().isEmpty()) {
                return new LdapSearchResult(false, "Host is required");
            }
            // Note: Base DN can be empty for rootDSE queries, so we don't validate it as required
            if (request.getBase() == null) {
                request.setBase(""); // Set empty string if null
            }
            if (request.getFilter() == null || request.getFilter().trim().isEmpty()) {
                return new LdapSearchResult(false, "Filter is required");
            }

            // Determine port
            int port = request.getPort() > 0 ? request.getPort() : (request.isUseSSL() ? 636 : 389);
            
            // Create connection options
            LDAPConnectionOptions options = new LDAPConnectionOptions();
            options.setConnectTimeoutMillis(DEFAULT_CONNECTION_TIMEOUT_MS);
            options.setResponseTimeoutMillis(DEFAULT_RESPONSE_TIMEOUT_MS);
            
            // Create connection
            if (request.isUseSSL()) {
                // For SSL/TLS connections
                SSLUtil sslUtil = new SSLUtil(new TrustAllTrustManager());
                SSLSocketFactory socketFactory = sslUtil.createSSLSocketFactory();
                connection = new LDAPConnection(socketFactory, options, request.getHost(), port);
            } else {
                // For plain connections
                connection = new LDAPConnection(options, request.getHost(), port);
            }
            
            // Perform authentication if provided
            if (dn != null && !dn.trim().isEmpty()) {
                BindResult bindResult = connection.bind(dn, password != null ? password : "");
                if (bindResult.getResultCode() != ResultCode.SUCCESS) {
                    return new LdapSearchResult(false, "Authentication failed: " + bindResult.getDiagnosticMessage());
                }
            }
            
            // Determine search scope
            SearchScope searchScope = getSearchScope(request.getScope());
            
            // Prepare attributes to return
            String[] attributesToReturn = null;
            if (request.getAttributes() != null && !request.getAttributes().isEmpty()) {
                // Check if "*" is requested (all attributes)
                if (request.getAttributes().contains("*")) {
                    attributesToReturn = new String[]{"*"}; // Return all user attributes
                } else {
                    attributesToReturn = request.getAttributes().toArray(new String[0]);
                }
            } else {
                attributesToReturn = new String[]{"*"}; // Default to all attributes
            }
            
            logger.debug("Performing LDAP search: base='{}', filter='{}', scope={}", 
                        request.getBase(), request.getFilter(), searchScope);
            
            // Perform search
            SearchResult searchResult = connection.search(
                request.getBase(),
                searchScope,
                request.getFilter(),
                attributesToReturn
            );
            
            // Convert results
            List<Map<String, Object>> results = new ArrayList<>();
            for (SearchResultEntry entry : searchResult.getSearchEntries()) {
                Map<String, Object> entryMap = convertSearchEntry(entry);
                results.add(entryMap);
            }
            
            logger.debug("LDAP search completed successfully, found {} entries", results.size());
            return new LdapSearchResult(true, results);
            
        } catch (LDAPException e) {
            logger.error("LDAP search failed: {} (Result Code: {})", e.getMessage(), e.getResultCode(), e);
            return new LdapSearchResult(false, "LDAP search failed: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during LDAP search: {}", e.getMessage(), e);
            return new LdapSearchResult(false, "LDAP search failed: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
    
    private SearchScope getSearchScope(String scope) {
        if (scope == null) {
            return SearchScope.SUB; // SUBTREE_SCOPE (default)
        }
        
        switch (scope.toLowerCase()) {
            case "base":
            case "0":
                return SearchScope.BASE; // OBJECT_SCOPE
            case "one":
            case "onelevel":
            case "1":
                return SearchScope.ONE; // ONELEVEL_SCOPE
            case "sub":
            case "subtree":
            case "2":
            default:
                return SearchScope.SUB; // SUBTREE_SCOPE
        }
    }
    
    /**
     * Convert a UnboundID SearchResultEntry to a Map
     */
    private Map<String, Object> convertSearchEntry(SearchResultEntry entry) {
        Map<String, Object> entryMap = new HashMap<>();
        
        // Add DN
        entryMap.put("dn", entry.getDN());
        
        // Add all attributes
        for (Attribute attribute : entry.getAttributes()) {
            String attributeName = attribute.getName();
            String[] values = attribute.getValues();
            
            if (values.length == 1) {
                entryMap.put(attributeName, values[0]);
            } else {
                entryMap.put(attributeName, Arrays.asList(values));
            }
        }
        
        return entryMap;
    }

    public LdapModifyResult performLdapModify(LdapModifyRequest request, String bindDn, String password) {
        LDAPConnection connection = null;
        try {
            // Validate request
            if (request.getHost() == null || request.getHost().trim().isEmpty()) {
                return new LdapModifyResult(false, "Host is required");
            }
            if (request.getDn() == null || request.getDn().trim().isEmpty()) {
                return new LdapModifyResult(false, "DN is required");
            }
            if (request.getModifications() == null || request.getModifications().isEmpty()) {
                return new LdapModifyResult(false, "At least one modification is required");
            }

            // Determine port
            int port = request.getPort() > 0 ? request.getPort() : (request.isUseSSL() ? 636 : 389);
            
            // Create connection options
            LDAPConnectionOptions options = new LDAPConnectionOptions();
            options.setConnectTimeoutMillis(DEFAULT_CONNECTION_TIMEOUT_MS);
            options.setResponseTimeoutMillis(DEFAULT_RESPONSE_TIMEOUT_MS);
            
            // Create connection
            if (request.isUseSSL()) {
                // For SSL/TLS connections
                SSLUtil sslUtil = new SSLUtil(new TrustAllTrustManager());
                SSLSocketFactory socketFactory = sslUtil.createSSLSocketFactory();
                connection = new LDAPConnection(socketFactory, options, request.getHost(), port);
            } else {
                // For plain connections
                connection = new LDAPConnection(options, request.getHost(), port);
            }
            
            // Perform authentication if provided
            if (bindDn != null && !bindDn.trim().isEmpty()) {
                BindResult bindResult = connection.bind(bindDn, password != null ? password : "");
                if (bindResult.getResultCode() != ResultCode.SUCCESS) {
                    return new LdapModifyResult(false, "Authentication failed: " + bindResult.getDiagnosticMessage());
                }
            }
            
            // Convert modifications
            List<Modification> modifications = new ArrayList<>();
            for (LdapModifyRequest.LdapModification modification : request.getModifications()) {
                ModificationType modType = getModificationType(modification.getOperation());
                
                if (modification.getValues() != null && !modification.getValues().isEmpty()) {
                    // Create modification with values
                    modifications.add(new Modification(modType, modification.getAttribute(), 
                                                     modification.getValues().toArray(new String[0])));
                } else {
                    // Create modification without values (for delete operations)
                    modifications.add(new Modification(modType, modification.getAttribute()));
                }
            }
            
            // Perform modification
            LDAPResult modifyResult = connection.modify(request.getDn(), modifications);
            
            if (modifyResult.getResultCode() == ResultCode.SUCCESS) {
                return new LdapModifyResult(true, request.getDn(), "Entry modified successfully");
            } else {
                return new LdapModifyResult(false, "Modify failed: " + modifyResult.getDiagnosticMessage());
            }
            
        } catch (LDAPException e) {
            logger.error("LDAP modify failed: {} (Result Code: {})", e.getMessage(), e.getResultCode(), e);
            return new LdapModifyResult(false, "LDAP modify failed: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during LDAP modify: {}", e.getMessage(), e);
            return new LdapModifyResult(false, "LDAP modify failed: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
    
    private ModificationType getModificationType(String operation) {
        if (operation == null) {
            return ModificationType.REPLACE; // default
        }
        
        switch (operation.toUpperCase()) {
            case "ADD_ATTRIBUTE":
                return ModificationType.ADD;
            case "REMOVE_ATTRIBUTE":
                return ModificationType.DELETE;
            case "REPLACE_ATTRIBUTE":
            default:
                return ModificationType.REPLACE;
        }
    }
    
    /**
     * Get the Root DN (default naming context) from LDAP server's Root DSE
     * @param request LDAP connection parameters
     * @param dn Bind DN for authentication
     * @param password Password for authentication
     * @return The first default naming context from Root DSE, or null if not found
     */
    public String getRootDn(LdapSearchRequest request, String dn, String password) {
        logger.info("Getting Root DN from LDAP server {}:{}", 
                   request.getHost(), request.getPort());
        
        LDAPConnection connection = null;
        try {
            // Validate request
            if (request.getHost() == null || request.getHost().trim().isEmpty()) {
                logger.error("Host is required for Root DN retrieval");
                throw new IllegalArgumentException("Host is required");
            }

            // Determine port
            int port = request.getPort() > 0 ? request.getPort() : (request.isUseSSL() ? 636 : 389);
            
            // Create connection options
            LDAPConnectionOptions options = new LDAPConnectionOptions();
            options.setConnectTimeoutMillis(DEFAULT_CONNECTION_TIMEOUT_MS);
            options.setResponseTimeoutMillis(DEFAULT_RESPONSE_TIMEOUT_MS);
            
            // Create connection
            if (request.isUseSSL()) {
                // For SSL/TLS connections
                SSLUtil sslUtil = new SSLUtil(new TrustAllTrustManager());
                SSLSocketFactory socketFactory = sslUtil.createSSLSocketFactory();
                connection = new LDAPConnection(socketFactory, options, request.getHost(), port);
            } else {
                // For plain connections
                connection = new LDAPConnection(options, request.getHost(), port);
            }
            
            // Perform authentication if provided
            if (dn != null && !dn.trim().isEmpty()) {
                BindResult bindResult = connection.bind(dn, password != null ? password : "");
                if (bindResult.getResultCode() != ResultCode.SUCCESS) {
                    throw new RuntimeException("Authentication failed: " + bindResult.getDiagnosticMessage());
                }
                logger.debug("Using authentication for Root DN retrieval");
            } else {
                logger.debug("Using anonymous connection for Root DN retrieval");
            }
            
            // Search Root DSE for naming contexts according to LDAP v3 specification (RFC 4512)
            logger.debug("Querying Root DSE for naming contexts as per LDAP v3 specification");
            
            // According to LDAP v3 spec, Root DSE should be queried with:
            // - Empty DN ("") as the base
            // - Base scope (OBJECT_SCOPE)
            // - Filter (objectClass=*) 
            // - Specifically requesting namingContexts attribute
            SearchResult searchResult = connection.search("", SearchScope.BASE, "(objectClass=*)",
                "namingContexts", "defaultNamingContext", "rootDomainNamingContext");
            
            if (!searchResult.getSearchEntries().isEmpty()) {
                SearchResultEntry rootDse = searchResult.getSearchEntries().get(0);
                
                // Add debug logging to see what attributes are available
                logger.debug("Root DSE attributes found: {}", 
                           rootDse.getAttributes().stream()
                                  .map(attr -> attr.getName())
                                  .collect(Collectors.toList()));
                
                for (Attribute attribute : rootDse.getAttributes()) {
                    logger.debug("Root DSE attribute '{}': {}", attribute.getName(), 
                               Arrays.toString(attribute.getValues()));
                }
                
                // According to LDAP v3 specification (RFC 4512), namingContexts is the primary attribute
                // for discovering naming contexts from the Root DSE
                Attribute namingContextsAttr = rootDse.getAttribute("namingContexts");
                if (namingContextsAttr != null) {
                    String[] contexts = namingContextsAttr.getValues();
                    if (contexts.length > 0) {
                        String rootDnResult = contexts[0];
                        logger.info("Found Root DN from namingContexts attribute (LDAP v3 spec): {}", rootDnResult);
                        logger.debug("All naming contexts found: {}", Arrays.toString(contexts));
                        return rootDnResult;
                    }
                }
                
                // Fallback to vendor-specific attributes if namingContexts is not available
                // Note: These are not part of the LDAP v3 standard but are used by some implementations
                String[] vendorSpecificAttributes = {
                    "defaultNamingContext",      // Microsoft Active Directory
                    "rootDomainNamingContext",   // Microsoft Active Directory
                    "configurationNamingContext", // Microsoft Active Directory
                    "schemaNamingContext",       // Microsoft Active Directory
                    "suffix",                    // Some LDAP servers
                    "basedn"                     // Some LDAP servers
                };
                
                logger.debug("namingContexts not found, trying vendor-specific attributes");
                for (String attrName : vendorSpecificAttributes) {
                    Attribute attribute = rootDse.getAttribute(attrName);
                    if (attribute != null) {
                        String[] values = attribute.getValues();
                        if (values.length > 0) {
                            String rootDnResult = values[0];
                            logger.info("Found Root DN from vendor-specific attribute '{}': {}", attrName, rootDnResult);
                            return rootDnResult;
                        }
                    }
                }
                
                logger.warn("Root DSE found but no naming contexts available");
                
                // Additional fallback: try some common base DNs by testing them
                String[] commonBaseDns = {
                    "dc=example,dc=com",
                    "dc=example,dc=org", 
                    "dc=company,dc=com",
                    "dc=domain,dc=com",
                    "dc=test,dc=com",
                    "o=organization",
                    "ou=people"
                };
                
                logger.info("Attempting to discover base DN by testing common patterns");
                
                for (String testBaseDn : commonBaseDns) {
                    try {
                        // Test if this base DN exists by doing a base-scope search
                        SearchResult testResult = connection.search(testBaseDn, SearchScope.BASE, "(objectClass=*)");
                        
                        if (!testResult.getSearchEntries().isEmpty()) {
                            logger.info("Found valid base DN by testing: {}", testBaseDn);
                            return testBaseDn;
                        }
                    } catch (LDAPException e) {
                        logger.debug("Test failed for base DN {}: {}", testBaseDn, e.getMessage());
                        // Continue to next test
                    }
                }
                
                logger.warn("Could not discover any valid base DN automatically");
                return null;
            } else {
                logger.warn("No Root DSE found");
                return null;
            }
            
        } catch (LDAPException e) {
            if (e.getResultCode() == ResultCode.INVALID_CREDENTIALS) {
                logger.error("Authentication failed while retrieving Root DN: {}", e.getMessage());
                throw new RuntimeException("Authentication failed: " + e.getMessage());
            } else if (e.getResultCode() == ResultCode.CONNECT_ERROR || 
                      e.getResultCode() == ResultCode.SERVER_DOWN) {
                logger.error("Communication error while retrieving Root DN: {}", e.getMessage());
                throw new RuntimeException("Connection failed: " + e.getMessage());
            } else {
                logger.error("LDAP error retrieving Root DN: {} (Result Code: {})", e.getMessage(), e.getResultCode());
                throw new RuntimeException("Failed to retrieve Root DN: " + e.getMessage());
            }
        } catch (Exception e) {
            logger.error("Unexpected error retrieving Root DN: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to retrieve Root DN: " + e.getMessage());
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
}
