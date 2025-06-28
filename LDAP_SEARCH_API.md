# LDAP Search Endpoint Documentation

## Endpoint: POST /ldap/ldapsearch

This endpoint performs a dynamic LDAP search equivalent to the `ldapsearch` command-line tool.

### Authentication

LDAP authentication credentials should be provided via HTTP Basic Authentication header:
- **Username**: The LDAP bind DN (e.g., "cn=Directory Manager")
- **Password**: The password for the bind DN
- For anonymous access, omit the Authorization header

### Request Body

The endpoint accepts a JSON object with the following parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| host | string | Yes | LDAP server hostname or IP address |
| port | integer | No | LDAP server port (default: 389 for LDAP, 636 for LDAPS) |
| scope | string | No | Search scope: "base", "one"/"onelevel", "sub"/"subtree" (default: "sub") |
| base | string | Yes | Base DN for the search |
| filter | string | Yes | LDAP search filter |
| attributes | array | No | List of attributes to return (empty for all attributes) |
| useSSL | boolean | No | Whether to use SSL/TLS connection (default: false) |

### Response

The endpoint returns a JSON object with:

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether the search was successful |
| message | string | Status message |
| entries | array | Array of LDAP entries (if successful) |
| entryCount | integer | Number of entries returned |

### Examples

#### Basic Search
```bash
curl -X POST http://localhost:8080/ldap/ldapsearch \
  -H "Content-Type: application/json" \
  -d '{
    "host": "localhost",
    "port": 1389,
    "base": "dc=example,dc=com",
    "filter": "(objectClass=person)",
    "scope": "sub"
  }'
```

#### Authenticated Search with Specific Attributes
```bash
curl -X POST http://localhost:8080/ldap/ldapsearch \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'cn=Directory Manager:Engpwd12345678' | base64)" \
  -d '{
    "host": "localhost",
    "port": 1389,
    "base": "dc=example,dc=com",
    "filter": "(uid=john*)",
    "scope": "sub",
    "attributes": ["cn", "sn", "uid", "mail"]
  }'
```

#### SSL Search
```bash
curl -X POST http://localhost:8080/ldap/ldapsearch \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic $(echo -n 'cn=admin,dc=example,dc=com:secret' | base64)" \
  -d '{
    "host": "ldap.example.com",
    "port": 636,
    "base": "ou=users,dc=example,dc=com",
    "filter": "(&(objectClass=person)(mail=*@example.com))",
    "scope": "one",
    "useSSL": true,
    "attributes": ["cn", "mail"]
  }'
```

### Sample Response

#### Successful Search
```json
{
  "success": true,
  "message": "Search completed successfully",
  "entryCount": 2,
  "entries": [
    {
      "cn": "John Doe",
      "sn": "Doe",
      "uid": "john.doe",
      "mail": "john.doe@example.com"
    },
    {
      "cn": "Jane Smith",
      "sn": "Smith", 
      "uid": "jane.smith",
      "mail": "jane.smith@example.com"
    }
  ]
}
```

#### Error Response
```json
{
  "success": false,
  "message": "LDAP search failed: Connection refused",
  "entryCount": 0,
  "entries": null
}
```

### Equivalent ldapsearch Commands

The API calls above are equivalent to these ldapsearch commands:

#### Basic Search
```bash
ldapsearch -h localhost -p 1389 -b "dc=example,dc=com" -s sub "(objectClass=person)"
```

#### Authenticated Search
```bash
ldapsearch -h localhost -p 1389 -D "cn=Directory Manager" -w "Engpwd12345678" \
  -b "dc=example,dc=com" -s sub "(uid=john*)" cn sn uid mail
```

#### SSL Search
```bash
ldapsearch -H ldaps://ldap.example.com:636 -D "cn=admin,dc=example,dc=com" -w "secret" \
  -b "ou=users,dc=example,dc=com" -s one "(&(objectClass=person)(mail=*@example.com))" cn mail
```

### Notes

- The endpoint validates required parameters and returns appropriate error messages
- Search scope values are case-insensitive
- Attribute names in the response preserve the case from the LDAP server
- Multi-valued attributes are returned as arrays
- Single-valued attributes are returned as strings
- Anonymous searches are supported by omitting the `dn` parameter
