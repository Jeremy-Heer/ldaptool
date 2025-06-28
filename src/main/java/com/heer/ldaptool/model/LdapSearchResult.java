package com.heer.ldaptool.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Map;

@Schema(description = "Result object for LDAP search operations")
public class LdapSearchResult {
    
    @Schema(description = "Indicates whether the search operation was successful", 
            example = "true")
    private boolean success;
    
    @Schema(description = "Status or error message from the search operation", 
            example = "Search completed successfully")
    private String message;
    
    @Schema(description = "List of LDAP entries found by the search. Each entry is a map of attribute names to values")
    private List<Map<String, Object>> entries;
    
    @Schema(description = "Number of entries returned by the search", 
            example = "5")
    private int entryCount;

    // Default constructor
    public LdapSearchResult() {}

    // Constructor for success case
    public LdapSearchResult(boolean success, List<Map<String, Object>> entries) {
        this.success = success;
        this.entries = entries;
        this.entryCount = entries != null ? entries.size() : 0;
        this.message = success ? "Search completed successfully" : "Search failed";
    }

    // Constructor for error case
    public LdapSearchResult(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.entries = null;
        this.entryCount = 0;
    }

    // Getters and Setters
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

    public List<Map<String, Object>> getEntries() {
        return entries;
    }

    public void setEntries(List<Map<String, Object>> entries) {
        this.entries = entries;
        this.entryCount = entries != null ? entries.size() : 0;
    }

    public int getEntryCount() {
        return entryCount;
    }

    public void setEntryCount(int entryCount) {
        this.entryCount = entryCount;
    }

    @Override
    public String toString() {
        return "LdapSearchResult{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", entryCount=" + entryCount +
                '}';
    }
}
