package com.heer.ldaptool.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Request object for performing dynamic LDAP searches")
public class LdapSearchRequest {
    
    @Schema(description = "LDAP server hostname or IP address", 
            example = "localhost", 
            required = true)
    private String host;
    
    @Schema(description = "LDAP server port number. Defaults to 389 for LDAP, 636 for LDAPS", 
            example = "1389")
    private int port;
    
    @Schema(description = "Search scope: 'base', 'one'/'onelevel', 'sub'/'subtree'", 
            example = "sub", 
            allowableValues = {"base", "one", "onelevel", "sub", "subtree"})
    private String scope;
    
    @Schema(description = "Base Distinguished Name for the search", 
            example = "dc=example,dc=com", 
            required = true)
    private String base;
    
    @Schema(description = "LDAP search filter", 
            example = "(objectClass=person)", 
            required = true)
    private String filter;
    
    @Schema(description = "List of attributes to return. Empty list or null returns all attributes", 
            example = "[\"cn\", \"sn\", \"uid\", \"mail\"]")
    private List<String> attributes;
    
    @JsonProperty("useSSL")
    @Schema(description = "Whether to use SSL/TLS connection (LDAPS)", 
            example = "false")
    private boolean useSSL;

    // Default constructor
    public LdapSearchRequest() {}

    // Constructor with all fields
    public LdapSearchRequest(String host, int port, String scope, String base, String filter, 
                           List<String> attributes, boolean useSSL) {
        this.host = host;
        this.port = port;
        this.scope = scope;
        this.base = base;
        this.filter = filter;
        this.attributes = attributes;
        this.useSSL = useSSL;
    }

    // Getters and Setters
    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getBase() {
        return base;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public List<String> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<String> attributes) {
        this.attributes = attributes;
    }

    public boolean isUseSSL() {
        return useSSL;
    }

    public void setUseSSL(boolean useSSL) {
        this.useSSL = useSSL;
    }

    @Override
    public String toString() {
        return "LdapSearchRequest{" +
                "host='" + host + '\'' +
                ", port=" + port +
                ", scope='" + scope + '\'' +
                ", base='" + base + '\'' +
                ", filter='" + filter + '\'' +
                ", attributes=" + attributes +
                ", useSSL=" + useSSL +
                '}';
    }
}
