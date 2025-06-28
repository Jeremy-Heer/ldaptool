# Migration from Embedded to Standalone LDAP Server

## Summary of Changes

This document outlines the changes made to migrate from an embedded LDAP server to a standalone LDAP server running on localhost ports 1389 and 1636.

## Files Modified

### 1. `application.properties`
**Changes:**
- Removed embedded LDAP server configuration properties
- Updated LDAP URLs to point to standalone server on ports 1389 and 1636
- Kept base DN as `dc=springframework,dc=org`

**Before:**
```properties
# Embedded LDAP Server Configuration
spring.ldap.embedded.ldif=classpath:test-server.ldif
spring.ldap.embedded.base-dn=dc=springframework,dc=org
spring.ldap.embedded.port=8390
spring.ldap.embedded.validation.enabled=false

# LDAP Connection Configuration
spring.ldap.urls=ldap://localhost:8390
```

**After:**
```properties
# LDAP Connection Configuration for standalone server
spring.ldap.urls=ldap://localhost:1389,ldaps://localhost:1636
spring.ldap.base=dc=springframework,dc=org
```

### 2. `LdapConfig.java`
**Changes:**
- Enhanced configuration to use property injection
- Updated URL to use port 1389 instead of 8390
- Added connection pooling
- Made configuration more flexible with `@Value` annotations

**Key improvements:**
- Uses `@Value` annotations to read from application.properties
- Enables connection pooling with `setPooled(true)`
- More maintainable configuration

### 3. `pom.xml`
**Changes:**
- Removed UnboundID LDAP SDK dependency (no longer needed for embedded server)
- Kept Spring Boot Data LDAP starter for LDAP client functionality

**Removed dependency:**
```xml
<dependency>
    <groupId>com.unboundid</groupId>
    <artifactId>unboundid-ldapsdk</artifactId>
</dependency>
```

### 4. `LdapServiceTest.java`
**Changes:**
- Updated test configuration to use standalone LDAP server
- Tests now require the standalone server to be running

**Before:**
```java
@TestPropertySource(properties = {
    "spring.ldap.embedded.ldif=classpath:test-server.ldif",
    "spring.ldap.embedded.base-dn=dc=springframework,dc=org",
    "spring.ldap.embedded.port=0"
})
```

**After:**
```java
@TestPropertySource(properties = {
    "spring.ldap.urls=ldap://localhost:1389",
    "spring.ldap.base=dc=springframework,dc=org",
    "spring.ldap.username=",
    "spring.ldap.password="
})
```

### 5. `README.md`
**Changes:**
- Complete rewrite to reflect standalone LDAP server setup
- Added prerequisites and setup instructions
- Updated troubleshooting section
- Added LDAP server verification commands

## Prerequisites for Running

### LDAP Server Setup
You need a standalone LDAP server running on localhost with the following configuration:
- **Primary port:** 1389 (LDAP)
- **Secondary port:** 1636 (LDAPS)
- **Base DN:** `dc=springframework,dc=org`
- **Authentication:** Anonymous bind or configure credentials in application.properties

### Verification Commands
```bash
# Check if LDAP server is running
netstat -tlnp | grep 1389

# Test LDAP connection
ldapsearch -x -H ldap://localhost:1389 -b "dc=springframework,dc=org"
```

## Benefits of This Migration

1. **Production Ready:** Can connect to real LDAP servers like Active Directory, OpenLDAP, etc.
2. **Flexible Configuration:** Easy to switch between different LDAP servers by changing configuration
3. **Dual Protocol Support:** Supports both LDAP and LDAPS for secure connections
4. **Connection Pooling:** Improved performance with connection pooling enabled
5. **External Data:** Can work with existing LDAP directories and real user data

## Testing

- **Unit Tests:** Require standalone LDAP server to be running
- **Integration Tests:** Work with real LDAP data
- **Manual Testing:** Use the provided curl commands in README.md

## Next Steps

1. Set up authentication with proper bind DN and password
2. Configure SSL/TLS for LDAPS connections
3. Add connection timeout and retry configuration
4. Implement connection health checks
5. Add monitoring and logging for LDAP operations
