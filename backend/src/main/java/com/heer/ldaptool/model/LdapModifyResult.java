package com.heer.ldaptool.model;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Result of an LDAP modify operation")
public class LdapModifyResult {
    
    @Schema(description = "Whether the operation was successful")
    private boolean success;
    
    @Schema(description = "Message describing the result or error")
    private String message;
    
    @Schema(description = "DN of the modified entry")
    private String modifiedDn;

    // Default constructor
    public LdapModifyResult() {}

    // Constructor for success case
    public LdapModifyResult(boolean success, String modifiedDn, String message) {
        this.success = success;
        this.modifiedDn = modifiedDn;
        this.message = message;
    }

    // Constructor for error case
    public LdapModifyResult(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.modifiedDn = null;
    }

    // Getters and setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getModifiedDn() {
        return modifiedDn;
    }

    public void setModifiedDn(String modifiedDn) {
        this.modifiedDn = modifiedDn;
    }
}
