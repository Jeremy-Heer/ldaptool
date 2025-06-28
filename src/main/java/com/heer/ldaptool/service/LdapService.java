package com.heer.ldaptool.service;

import com.heer.ldaptool.model.LdapSearchRequest;
import com.heer.ldaptool.model.LdapSearchResult;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.ldap.filter.Filter;
import org.springframework.ldap.filter.HardcodedFilter;
import org.springframework.stereotype.Service;

import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.Attribute;
import javax.naming.NamingEnumeration;
import java.util.*;

@Service
public class LdapService {

    public LdapSearchResult performLdapSearch(LdapSearchRequest request, String dn, String password) {
        try {
            // Validate request
            if (request.getHost() == null || request.getHost().trim().isEmpty()) {
                return new LdapSearchResult(false, "Host is required");
            }
            if (request.getBase() == null || request.getBase().trim().isEmpty()) {
                return new LdapSearchResult(false, "Base DN is required");
            }
            if (request.getFilter() == null || request.getFilter().trim().isEmpty()) {
                return new LdapSearchResult(false, "Filter is required");
            }

            // Create dynamic LDAP context source
            LdapContextSource contextSource = new LdapContextSource();
            
            // Build URL
            String protocol = request.isUseSSL() ? "ldaps" : "ldap";
            int port = request.getPort() > 0 ? request.getPort() : (request.isUseSSL() ? 636 : 389);
            String url = String.format("%s://%s:%d", protocol, request.getHost(), port);
            
            contextSource.setUrl(url);
            contextSource.setBase(request.getBase());
            
            // Set authentication if provided
            if (dn != null && !dn.trim().isEmpty()) {
                contextSource.setUserDn(dn);
                contextSource.setPassword(password != null ? password : "");
            }
            
            // Configure SSL if needed
            if (request.isUseSSL()) {
                contextSource.setBaseEnvironmentProperties(Map.of(
                    "java.naming.ldap.factory.socket", "javax.net.ssl.SSLSocketFactory"
                ));
            }
            
            contextSource.afterPropertiesSet();
            
            // Create LDAP template
            LdapTemplate ldapTemplate = new LdapTemplate(contextSource);
            
            // Determine search scope
            int searchScope = getSearchScope(request.getScope());
            
            // Create filter
            Filter filter = new HardcodedFilter(request.getFilter());
            
            // Perform search
            List<Map<String, Object>> results = ldapTemplate.search(
                "", // Empty string because base is already set in context source
                filter.encode(),
                searchScope,
                new DynamicAttributesMapper(request.getAttributes())
            );
            
            return new LdapSearchResult(true, results);
            
        } catch (Exception e) {
            return new LdapSearchResult(false, "LDAP search failed: " + e.getMessage());
        }
    }
    
    private int getSearchScope(String scope) {
        if (scope == null) {
            return 2; // SUBTREE_SCOPE (default)
        }
        
        switch (scope.toLowerCase()) {
            case "base":
            case "0":
                return 0; // OBJECT_SCOPE
            case "one":
            case "onelevel":
            case "1":
                return 1; // ONELEVEL_SCOPE
            case "sub":
            case "subtree":
            case "2":
            default:
                return 2; // SUBTREE_SCOPE
        }
    }
    
    private static class DynamicAttributesMapper implements AttributesMapper<Map<String, Object>> {
        private final List<String> requestedAttributes;
        
        public DynamicAttributesMapper(List<String> requestedAttributes) {
            this.requestedAttributes = requestedAttributes;
        }
        
        @Override
        public Map<String, Object> mapFromAttributes(Attributes attributes) throws NamingException {
            Map<String, Object> entry = new HashMap<>();
            
            if (requestedAttributes != null && !requestedAttributes.isEmpty()) {
                // Return only requested attributes
                for (String attrName : requestedAttributes) {
                    if ("*".equals(attrName)) {
                        // Special case: return all attributes
                        return getAllAttributes(attributes);
                    }
                    Attribute attr = attributes.get(attrName);
                    if (attr != null) {
                        entry.put(attrName, getAttributeValues(attr));
                    }
                }
            } else {
                // Return all attributes if none specified
                return getAllAttributes(attributes);
            }
            
            return entry;
        }
        
        private Map<String, Object> getAllAttributes(Attributes attributes) throws NamingException {
            Map<String, Object> entry = new HashMap<>();
            NamingEnumeration<? extends Attribute> attrEnum = attributes.getAll();
            
            while (attrEnum.hasMore()) {
                Attribute attr = attrEnum.next();
                entry.put(attr.getID(), getAttributeValues(attr));
            }
            
            return entry;
        }
        
        private Object getAttributeValues(Attribute attr) throws NamingException {
            if (attr.size() == 1) {
                return attr.get();
            } else {
                List<Object> values = new ArrayList<>();
                NamingEnumeration<?> valueEnum = attr.getAll();
                while (valueEnum.hasMore()) {
                    values.add(valueEnum.next());
                }
                return values;
            }
        }
    }
}
