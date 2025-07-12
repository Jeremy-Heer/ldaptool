package com.heer.ldaptool.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Request object for performing LDAP modify operations")
public class LdapModifyRequest {
    
    @Schema(description = "LDAP server hostname or IP address", 
            example = "localhost", 
            required = true)
    private String host;
    
    @Schema(description = "LDAP server port number. Defaults to 389 for LDAP, 636 for LDAPS", 
            example = "1389")
    private int port;
    
    @Schema(description = "Distinguished Name of the entry to modify", 
            example = "cn=John Doe,ou=users,dc=example,dc=com", 
            required = true)
    private String dn;
    
    @Schema(description = "List of modifications to apply to the entry")
    private List<LdapModification> modifications;
    
    @JsonProperty("useSSL")
    @Schema(description = "Whether to use SSL/TLS connection (LDAPS)", 
            example = "false")
    private boolean useSSL;

    // Default constructor
    public LdapModifyRequest() {}

    // Constructor with all fields
    public LdapModifyRequest(String host, int port, String dn, List<LdapModification> modifications, boolean useSSL) {
        this.host = host;
        this.port = port;
        this.dn = dn;
        this.modifications = modifications;
        this.useSSL = useSSL;
    }

    // Getters and setters
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

    public String getDn() {
        return dn;
    }

    public void setDn(String dn) {
        this.dn = dn;
    }

    public List<LdapModification> getModifications() {
        return modifications;
    }

    public void setModifications(List<LdapModification> modifications) {
        this.modifications = modifications;
    }

    public boolean isUseSSL() {
        return useSSL;
    }

    public void setUseSSL(boolean useSSL) {
        this.useSSL = useSSL;
    }

    @Schema(description = "LDAP modification operation")
    public static class LdapModification {
        
        @Schema(description = "Type of modification operation", 
                allowableValues = {"ADD_ATTRIBUTE", "REPLACE_ATTRIBUTE", "REMOVE_ATTRIBUTE"},
                example = "REPLACE_ATTRIBUTE",
                required = true)
        private String operation;
        
        @Schema(description = "Name of the attribute to modify", 
                example = "mail",
                required = true)
        private String attribute;
        
        @Schema(description = "Values for the attribute. For REMOVE_ATTRIBUTE, can be null to remove all values",
                example = "[\"user@example.com\", \"user.alternate@example.com\"]")
        private List<String> values;

        // Default constructor
        public LdapModification() {}

        // Constructor
        public LdapModification(String operation, String attribute, List<String> values) {
            this.operation = operation;
            this.attribute = attribute;
            this.values = values;
        }

        // Getters and setters
        public String getOperation() {
            return operation;
        }

        public void setOperation(String operation) {
            this.operation = operation;
        }

        public String getAttribute() {
            return attribute;
        }

        public void setAttribute(String attribute) {
            this.attribute = attribute;
        }

        public List<String> getValues() {
            return values;
        }

        public void setValues(List<String> values) {
            this.values = values;
        }
    }
}
