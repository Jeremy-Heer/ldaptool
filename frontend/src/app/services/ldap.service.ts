import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { 
  LdapConnection, 
  ConnectionTestRequest,
  ConnectionTestResult, 
  LdapSearchRequest, 
  LdapSearchResult, 
  LdapModifyRequest, 
  LdapModifyResult,
  RootDseRequest,
  RootDnRequest,
  RootDnResponse,
  LdapEntry,
  TreeNode,
  RootDseResult,
  RootDseInfo
} from '../models/ldap.models';

@Injectable({
  providedIn: 'root'
})
export class LdapService {
  private readonly API_BASE = this.getApiBase();

  constructor(private http: HttpClient) {}

  private getApiBase(): string {
    // In development, you can set this to point to your backend server
    // For example: 'http://localhost:8080/ldap' or '/ldap' with proxy
    const apiBase = '/ldap';
    return apiBase;
  }

  /**
   * Test LDAP connection
   */
  testConnection(connection: LdapConnection): Observable<ConnectionTestResult> {
    const request: ConnectionTestRequest = {
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL
    };

    // Only include authentication if bindDn is provided and not empty
    if (connection.bindDn && connection.bindDn.trim()) {
      request.bindDn = connection.bindDn;
      request.password = connection.password || '';
    }

    const headers = this.buildHeaders(connection);

    return this.http.post<ConnectionTestResult>(`${this.API_BASE}/test-connection`, request, { headers })
      .pipe(
        catchError(error => {
          const errorResult: ConnectionTestResult = {
            success: false,
            message: `Connection test failed: ${error.error?.message || error.statusText || 'Unknown error'}`
          };
          return throwError(() => errorResult);
        })
      );
  }

  /**
   * Perform LDAP search
   */
  search(connection: LdapConnection, searchRequest: Partial<LdapSearchRequest>): Observable<LdapSearchResult> {
    const request: LdapSearchRequest = {
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL,
      base: searchRequest.base || '',
      filter: searchRequest.filter || '(objectClass=*)',
      scope: searchRequest.scope || 'sub',
      attributes: searchRequest.attributes || []
    };

    // Only include authentication if bindDn is provided and not empty
    if (connection.bindDn && connection.bindDn.trim()) {
      request.bindDn = connection.bindDn;
      request.password = connection.password || '';
    }

    const headers = this.buildHeaders(connection);

    return this.http.post<LdapSearchResult>(`${this.API_BASE}/ldapsearch`, request, { headers })
      .pipe(
        catchError(error => {
          const errorResult: LdapSearchResult = {
            success: false,
            entries: [],
            errorMessage: `Search failed: ${error.error?.message || error.statusText || 'Unknown error'}`
          };
          return throwError(() => errorResult);
        })
      );
  }

  /**
   * Get Root DSE
   */
  getRootDse(connection: LdapConnection): Observable<RootDseResult> {
    const request: RootDseRequest = {
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL
      // Root DSE requests are typically done anonymously
    };

    // For Root DSE, we don't include authentication as it's typically queried anonymously
    // const headers = this.buildHeaders(connection);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LdapSearchResult>(`${this.API_BASE}/get-root-dse`, request, { headers })
      .pipe(
        map(response => {
          if (response.success && response.entries && response.entries.length > 0) {
            const rootDseEntry = response.entries[0];
            const rootDse: RootDseInfo = {
              namingContexts: rootDseEntry.attributes?.['namingContexts'] || [],
              supportedLDAPVersion: rootDseEntry.attributes?.['supportedLDAPVersion'] || [],
              supportedSASLMechanisms: rootDseEntry.attributes?.['supportedSASLMechanisms'] || [],
              supportedExtension: rootDseEntry.attributes?.['supportedExtension'] || [],
              supportedControl: rootDseEntry.attributes?.['supportedControl'] || [],
              supportedFeatures: rootDseEntry.attributes?.['supportedFeatures'] || [],
              vendorName: rootDseEntry.attributes?.['vendorName']?.[0],
              vendorVersion: rootDseEntry.attributes?.['vendorVersion']?.[0]
            };
            
            return {
              success: true,
              rootDse: rootDse,
              message: 'Root DSE retrieved successfully'
            };
          } else {
            return {
              success: false,
              errorMessage: response.message || 'Failed to retrieve Root DSE'
            };
          }
        }),
        catchError(error => {
          const errorResult: RootDseResult = {
            success: false,
            errorMessage: `Failed to get Root DSE: ${error.error?.message || error.message || 'Unknown error'}`
          };
          return of(errorResult);
        })
      );
  }

  /**
   * Get Root DN
   */
  getRootDn(connection: LdapConnection): Observable<string> {
    const request: RootDnRequest = {
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL
    };

    // Only include authentication if bindDn is provided and not empty
    if (connection.bindDn && connection.bindDn.trim()) {
      request.bindDn = connection.bindDn;
      request.password = connection.password || '';
    }

    const headers = this.buildHeaders(connection);

    return this.http.post<RootDnResponse>(`${this.API_BASE}/get-root-dn`, request, { headers })
      .pipe(
        map(response => {
          if (response.success && response.rootDn) {
            return response.rootDn;
          } else {
            throw new Error(response.message || 'Failed to retrieve Root DN');
          }
        }),
        catchError(error => {
          const message = `Failed to get Root DN: ${error.error?.message || error.message || 'Unknown error'}`;
          return throwError(() => new Error(message));
        })
      );
  }

  /**
   * Load tree level for browsing
   */
  loadTreeLevel(connection: LdapConnection, baseDn: string): Observable<TreeNode[]> {
    const searchRequest: Partial<LdapSearchRequest> = {
      base: baseDn,
      filter: '(objectClass=*)',
      scope: 'one',
      attributes: ['cn', 'ou', 'dc', 'objectClass']
    };

    return this.search(connection, searchRequest).pipe(
      map(result => {
        if (result.success && result.entries) {
          return result.entries.map(entry => this.createTreeNode(entry, 0));
        } else {
          throw new Error(result.message || result.errorMessage || 'Failed to load directory level');
        }
      })
    );
  }

  /**
   * Load entry details
   */
  loadEntryDetails(connection: LdapConnection, dn: string): Observable<LdapEntry> {
    const searchRequest: Partial<LdapSearchRequest> = {
      base: dn,
      filter: '(objectClass=*)',
      scope: 'base',
      attributes: ['*']
    };

    return this.search(connection, searchRequest).pipe(
      map(result => {
        if (result.success && result.entries && result.entries.length > 0) {
          return result.entries[0];
        } else {
          throw new Error('Entry not found');
        }
      })
    );
  }

  /**
   * Modify LDAP entry
   */
  modify(connection: LdapConnection, modifyRequest: Partial<LdapModifyRequest>): Observable<LdapModifyResult> {
    const request: LdapModifyRequest = {
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL,
      dn: modifyRequest.dn || '',
      modifications: modifyRequest.modifications || []
    };

    // Only include authentication if bindDn is provided and not empty
    if (connection.bindDn && connection.bindDn.trim()) {
      request.bindDn = connection.bindDn;
      request.password = connection.password || '';
    }

    const headers = this.buildHeaders(connection);

    return this.http.post<LdapModifyResult>(`${this.API_BASE}/ldapmodify`, request, { headers })
      .pipe(
        catchError(error => {
          const errorResult: LdapModifyResult = {
            success: false,
            errorMessage: `Modify failed: ${error.error?.message || error.statusText || 'Unknown error'}`
          };
          return throwError(() => errorResult);
        })
      );
  }

  /**
   * Browse children of a specific DN
   */
  browseChildren(connection: LdapConnection, parentDn: string): Observable<LdapSearchResult> {
    const searchRequest: Partial<LdapSearchRequest> = {
      base: parentDn,
      filter: '(objectClass=*)',
      scope: 'one',
      attributes: ['cn', 'ou', 'dc', 'name', 'objectClass', 'hasSubordinates']
    };

    return this.search(connection, searchRequest);
  }

  /**
   * Get a specific entry by DN
   */
  getEntry(connection: LdapConnection, dn: string): Observable<LdapSearchResult> {
    const searchRequest: Partial<LdapSearchRequest> = {
      base: dn,
      filter: '(objectClass=*)',
      scope: 'base',
      attributes: [] // Return all attributes
    };

    return this.search(connection, searchRequest);
  }

  /**
   * Extract RDN from DN
   */
  extractRdn(dn: string): string {
    if (!dn) return '';
    const parts = dn.split(',');
    return parts[0].trim();
  }

  /**
   * Check if entry likely has children based on object classes
   */
  hasChildrenIndicators(entry: LdapEntry): boolean {    if (!entry.attributes?.['objectClass']) return true;

    const objectClasses = Array.isArray(entry.attributes['objectClass']) ? entry.attributes['objectClass'] : [entry.attributes['objectClass']];
    
    const organizationalClasses = [
      'organizationalUnit', 'organization', 'domain', 'dcObject',
      'container', 'builtinDomain', 'locality', 'country'
    ];
    
    return objectClasses.some(oc => 
      organizationalClasses.includes(oc.toLowerCase())
    );
  }

  /**
   * Get icon class for tree node
   */
  getNodeIcon(node: TreeNode): string {
    if (node.isRootDse) return 'fa-server';
    if (node.isNamingContext) return 'fa-sitemap';
     if (!node.entry?.attributes?.['objectClass']) return 'fa-folder';

    const objectClasses = Array.isArray(node.entry.attributes['objectClass'])
      ? node.entry.attributes['objectClass']
      : [node.entry.attributes['objectClass']];
    
    if (objectClasses.includes('person') || objectClasses.includes('inetOrgPerson')) {
      return 'fa-user';
    } else if (objectClasses.includes('groupOfNames') || objectClasses.includes('group')) {
      return 'fa-users';
    } else if (objectClasses.includes('organizationalUnit')) {
      return 'fa-building';
    } else if (objectClasses.includes('organization')) {
      return 'fa-sitemap';
    } else if (objectClasses.includes('domain') || objectClasses.includes('dcObject')) {
      return 'fa-globe';
    } else if (node.hasChildren) {
      return 'fa-folder';
    } else {
      return 'fa-file';
    }
  }

  /**
   * Get display label for tree node
   */
  getNodeLabel(node: TreeNode): string {
    if (node.isRootDse) return 'Root DSE';
    if (node.isNamingContext) return node.dn;
    
    if (!node.rdn) return node.dn || 'Unknown';
    
    const parts = node.rdn.split('=');
    if (parts.length > 1) {
      return parts[1].trim();
    }
    return node.rdn;
  }

  private createTreeNode(entry: LdapEntry, level: number): TreeNode {
    return {
      dn: entry.dn,
      rdn: this.extractRdn(entry.dn),
      entry: entry,
      hasChildren: this.hasChildrenIndicators(entry),
      expanded: false,
      children: [],
      level: level,
      selected: false
    };
  }

  /**
   * Check if an entry has children
   */
  hasChildren(entry: LdapEntry): boolean {
    // Check hasSubordinates attribute if present
    const hasSubordinates = entry.attributes?.['hasSubordinates']?.[0];
    if (hasSubordinates !== undefined) {
      return hasSubordinates.toLowerCase() === 'true';
    }

    // Check object classes for typical container objects
    const objectClasses = entry.attributes?.['objectClass'] || [];
    const containerClasses = [
      'organizationalUnit',
      'organization',
      'domain',
      'builtinDomain',
      'container',
      'msDS-QuotaContainer'
    ];

    return objectClasses.some(oc => containerClasses.includes(oc));
  }

  /**
   * Get appropriate icon for an entry
   */
  getEntryIcon(node: { dn: string; entry?: LdapEntry }): string {
    if (!node.entry?.attributes?.['objectClass']) return 'folder';

    const objectClasses = node.entry.attributes['objectClass'];
    
    if (objectClasses.includes('organizationalUnit')) return 'folder';
    if (objectClasses.includes('person') || objectClasses.includes('inetOrgPerson')) return 'person';
    if (objectClasses.includes('group') || objectClasses.includes('groupOfNames')) return 'group';
    if (objectClasses.includes('computer')) return 'computer';
    if (objectClasses.includes('domain')) return 'domain';
    if (objectClasses.includes('organization')) return 'business';
    
    return 'folder_open';
  }

  private buildHeaders(connection: LdapConnection): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (connection.bindDn?.trim()) {
      const credentials = btoa(`${connection.bindDn}:${connection.password || ''}`);
      headers = headers.set('Authorization', `Basic ${credentials}`);
    }

    return headers;
  }
}
