import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LdapConnection } from '../models/ldap.models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly CONNECTIONS_KEY = 'ldapConnections';
  private readonly LAST_CONNECTION_KEY = 'ldapLastConnection';
  private readonly MAX_SAVED_CONNECTIONS = 200;

  private connectionsSubject = new BehaviorSubject<LdapConnection[]>([]);
  public connections$ = this.connectionsSubject.asObservable();

  constructor() {
    this.loadConnections();
  }

  /**
   * Save a named connection to localStorage
   */
  saveConnection(connection: LdapConnection): void {
    if (!connection.name?.trim()) {
      throw new Error('Connection name is required');
    }

    const connectionWithTimestamp: LdapConnection = {
      ...connection,
      name: connection.name.trim(),
      timestamp: new Date().toISOString(),
      password: undefined // Never save password
    };

    let savedConnections = this.getSavedConnections();
    
    // Remove existing connection with same name
    savedConnections = savedConnections.filter(conn => conn.name !== connectionWithTimestamp.name);
    
    // Add to beginning
    savedConnections.unshift(connectionWithTimestamp);
    
    // Keep only max connections
    if (savedConnections.length > this.MAX_SAVED_CONNECTIONS) {
      savedConnections = savedConnections.slice(0, this.MAX_SAVED_CONNECTIONS);
    }

    localStorage.setItem(this.CONNECTIONS_KEY, JSON.stringify(savedConnections));
    this.connectionsSubject.next(savedConnections);
  }

  /**
   * Get all saved connections
   */
  getSavedConnections(): LdapConnection[] {
    try {
      const saved = localStorage.getItem(this.CONNECTIONS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved connections:', error);
      return [];
    }
  }

  /**
   * Delete a saved connection
   */
  deleteConnection(connectionName: string): void {
    let savedConnections = this.getSavedConnections();
    savedConnections = savedConnections.filter(conn => conn.name !== connectionName);
    localStorage.setItem(this.CONNECTIONS_KEY, JSON.stringify(savedConnections));
    this.connectionsSubject.next(savedConnections);
  }

  /**
   * Save the last used connection (without name)
   */
  saveLastConnection(connection: LdapConnection): void {
    if (!connection.host) return;
    
    const lastConnection: Partial<LdapConnection> = {
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL,
      bindDn: connection.bindDn
      // Never save password
    };
    
    localStorage.setItem(this.LAST_CONNECTION_KEY, JSON.stringify(lastConnection));
  }

  /**
   * Load the last used connection
   */
  getLastConnection(): Partial<LdapConnection> | null {
    try {
      const lastConnection = localStorage.getItem(this.LAST_CONNECTION_KEY);
      return lastConnection ? JSON.parse(lastConnection) : null;
    } catch (error) {
      console.error('Error loading last connection:', error);
      return null;
    }
  }

  /**
   * Load URL parameters into connection config
   */
  loadFromUrlParams(): Partial<LdapConnection> | null {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const connectionFromUrl: Partial<LdapConnection> = {};
      let hasParams = false;

      if (urlParams.has('host')) {
        connectionFromUrl.host = urlParams.get('host')!;
        hasParams = true;
      }
      if (urlParams.has('port')) {
        connectionFromUrl.port = parseInt(urlParams.get('port')!, 10);
        hasParams = true;
      }
      if (urlParams.has('ssl')) {
        connectionFromUrl.useSSL = urlParams.get('ssl') === 'true';
        hasParams = true;
      }
      if (urlParams.has('binddn')) {
        connectionFromUrl.bindDn = decodeURIComponent(urlParams.get('binddn')!);
        hasParams = true;
      }

      return hasParams ? connectionFromUrl : null;
    } catch (error) {
      console.error('Error loading URL parameters:', error);
      return null;
    }
  }

  /**
   * Generate a bookmark URL for the current connection
   */
  generateBookmarkUrl(connection: LdapConnection): string {
    const params = new URLSearchParams();
    
    if (connection.host) {
      params.set('host', connection.host);
    }
    if (connection.port) {
      params.set('port', connection.port.toString());
    }
    if (connection.useSSL) {
      params.set('ssl', 'true');
    }
    if (connection.bindDn) {
      params.set('binddn', encodeURIComponent(connection.bindDn));
    }

    return `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params.toString()}`;
  }

  private loadConnections(): void {
    const connections = this.getSavedConnections();
    this.connectionsSubject.next(connections);
  }
}
