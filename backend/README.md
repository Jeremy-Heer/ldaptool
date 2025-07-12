# LDAP Tool - Standalone LDAP Server

This Spring Boot application demonstrates how to connect to and interact with a standalone LDAP server.

## Features

- **Standalone LDAP Connection**: Connects to external LDAP server on localhost
- **REST API**: Provides REST endpoints to interact with LDAP data
- **Authentication**: Supports LDAP authentication
- **CRUD Operations**: Create, read, update, and delete LDAP entries
- **Dual Protocol Support**: Supports both LDAP (port 1389) and LDAPS (port 1636)
- **Dynamic LDAP Search**: Perform custom LDAP searches equivalent to ldapsearch command
- **Swagger Documentation**: Interactive API documentation with Swagger UI

## API Documentation

Once the application is running, you can access the interactive API documentation at:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api-docs

The Swagger UI provides a comprehensive interface to:
- View all available endpoints
- Test API calls directly from the browser
- See request/response schemas
- Understand parameter requirements

## Quick Start

1. Start the application:
   ```bash
   ./mvnw spring-boot:run
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8080/swagger-ui.html
   ```

3. Explore the API endpoints:
   - **General**: Basic greeting and utility endpoints
   - **LDAP Operations**: Full LDAP directory management

## LDAP Server Configuration

The application connects to a standalone LDAP server with:
- **Primary URL**: `ldap://localhost:1389`
- **Secondary URL**: `ldaps://localhost:1636` (configured for failover)
- **Base DN**: `dc=example,dc=com`
- **Authentication**: Uses configured credentials

## Prerequisites

Before running the application, you need to have a standalone LDAP server running on localhost. You can use OpenLDAP, ApacheDS, or any other LDAP server.

### Setting up OpenLDAP (Example)

1. **Install OpenLDAP:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install slapd ldap-utils
   
   # CentOS/RHEL
   sudo yum install openldap-servers openldap-clients
   ```

2. **Configure LDAP server to run on ports 1389 and 1636:**
   - Edit `/etc/ldap/slapd.conf` or use `slapd.d` configuration
   - Set up the server to listen on `ldap://localhost:1389` and `ldaps://localhost:1636`

3. **Initialize with base DN:**
   ```bash
   # Create base DN: dc=springframework,dc=org
   # You can import the provided test-server.ldif file if available
   ```

## Sample Users

The LDAP directory should contain these test users (if using the provided LDIF file):

| UID | Common Name | Surname | Password |
|-----|-------------|---------|----------|
| ben | Ben Alex | Alex | benspassword |
| bob | Bob Hamilton | Hamilton | bobspassword |
| joe | Joe Smeth | Smeth | joespassword |
| jerry | mouse, jerry | jerry | jerryspassword |
| slashguy | slash/guy | guy | slashguyspassword |
| quoteguy | quote"guy | guy | quoteguyspassword |
| space cadet | Space Cadet | Cadet | spacecadetspassword |

## API Endpoints

### Basic Endpoints
- `GET /` - Welcome message
- `GET /ldap-status` - Check LDAP server status

### LDAP Operations
- `GET /ldap/status` - LDAP server status
- `GET /ldap/persons` - Get all persons
- `GET /ldap/persons/{uid}` - Get person by UID
- `GET /ldap/search/by-name?name={name}` - Search by common name
- `GET /ldap/search/by-surname?surname={surname}` - Search by surname
- `GET /ldap/uids` - Get all UIDs
- `POST /ldap/authenticate` - Authenticate user
- `POST /ldap/persons` - Create new person
- `PUT /ldap/persons/{uid}` - Update person
- `DELETE /ldap/persons/{uid}` - Delete person

## Running the Application

1. **Ensure LDAP server is running:**
   ```bash
   # Check if LDAP server is running on port 1389
   netstat -tlnp | grep 1389
   
   # Test LDAP connection
   ldapsearch -x -H ldap://localhost:1389 -b "dc=springframework,dc=org"
   ```

2. **Build and run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

2. **Test the LDAP server:**
   ```bash
   # Check LDAP status
   curl http://localhost:8080/ldap-status
   
   # Get all persons
   curl http://localhost:8080/ldap/persons
   
   # Get specific user
   curl http://localhost:8080/ldap/persons/ben
   
   # Authenticate user
   curl -X POST http://localhost:8080/ldap/authenticate \
        -H "Content-Type: application/json" \
        -d '{"uid":"ben","password":"benspassword"}'
   
   # Search by name
   curl "http://localhost:8080/ldap/search/by-name?name=Ben"
   ```

## Running Tests

**Important**: Tests require the standalone LDAP server to be running on localhost:1389.

Run the LDAP integration tests:

```bash
./mvnw test
```

The tests will verify:
- LDAP server connectivity
- User retrieval and search
- Authentication functionality

## LDAP Directory Structure

```
dc=springframework,dc=org
├── ou=people
│   ├── uid=ben
│   ├── uid=bob
│   ├── cn=mouse, jerry
│   ├── cn=slash/guy
│   └── uid=space cadet
├── ou=otherpeople
│   └── uid=joe
├── ou="quoted people"
│   └── cn=quote"guy
└── ou=groups
    ├── cn=developers (members: ben, bob)
    ├── cn=managers (members: ben, jerry)
    └── ou=subgroups
        └── cn=submanagers (members: ben)
```

## Dependencies

- Spring Boot Starter Web
- Spring Boot Starter Data LDAP
- Spring Boot Starter Test

## Configuration Files

- `application.properties` - LDAP connection configuration
- `LdapConfig.java` - LDAP context source configuration
- `test-server.ldif` - Sample LDAP data (can be imported to your LDAP server)

## Troubleshooting

1. **Connection Refused**: Ensure LDAP server is running on localhost:1389
   ```bash
   # Check if port is listening
   sudo netstat -tlnp | grep 1389
   ```

2. **LDAP Connection Issues**: 
   - Verify LDAP server is accessible: `ldapsearch -x -H ldap://localhost:1389 -b "dc=springframework,dc=org"`
   - Check firewall settings
   - Verify base DN configuration matches your LDAP server

3. **Authentication Failures**: 
   - Verify the user exists in LDAP directory
   - Check bind DN and password configuration
   - Ensure LDAP server allows anonymous or configured authentication

4. **SSL/TLS Issues** (for LDAPS on port 1636):
   - Verify SSL certificate configuration
   - Check if LDAPS is properly configured on the server

## Next Steps

- Configure authentication with proper bind DN and password
- Set up SSL/TLS for secure LDAP connections
- Integrate with Spring Security for web application authentication
- Add more complex LDAP queries and filters
- Implement group-based authorization
- Add LDAP admin interface
