import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { LdapService } from '../../services/ldap.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificationService } from '../../services/notification.service';
import { LdapConnection, LdapSearchRequest, LdapSearchResult } from '../../models/ldap.models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule
  ],
  template: `
    <div class="search-container">
      <!-- Connection Quick Setup -->
      <mat-card class="connection-quick-card" *ngIf="!hasConnection">
        <mat-card-content>
          <div class="quick-connection">
            <mat-icon>warning</mat-icon>
            <div>
              <h3>No LDAP Connection</h3>
              <p>Please configure an LDAP connection first to perform searches.</p>
              <button mat-raised-button color="primary" routerLink="/connection">
                Configure Connection
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Search Form -->
      <mat-card class="search-card" *ngIf="hasConnection">
        <mat-card-header>
          <mat-card-title>LDAP Search</mat-card-title>
          <mat-card-subtitle>Search the LDAP directory with filters and scopes</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="searchForm" (ngSubmit)="performSearch()">
            <!-- Basic Search Parameters -->
            <div class="form-section">
              <h3>Search Parameters</h3>
              
              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Base DN</mat-label>
                  <input matInput formControlName="baseDn" 
                         placeholder="dc=example,dc=com">
                  <mat-hint>The starting point for the search</mat-hint>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Scope</mat-label>
                  <mat-select formControlName="scope">
                    <mat-option value="base">Base Object</mat-option>
                    <mat-option value="one">One Level</mat-option>
                    <mat-option value="sub">Subtree</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Size Limit</mat-label>
                  <input matInput type="number" formControlName="sizeLimit" 
                         placeholder="1000">
                  <mat-hint>Maximum results (0 = no limit)</mat-hint>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Filter</mat-label>
                  <input matInput formControlName="filter" 
                         placeholder="(objectClass=*)">
                  <mat-hint>LDAP search filter expression</mat-hint>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Attributes (comma-separated)</mat-label>
                  <input matInput formControlName="attributes" 
                         placeholder="cn,mail,memberOf">
                  <mat-hint>Leave empty to return all attributes</mat-hint>
                </mat-form-field>
              </div>
            </div>

            <!-- Advanced Options -->
            <mat-expansion-panel class="advanced-panel">
              <mat-expansion-panel-header>
                <mat-panel-title>Advanced Options</mat-panel-title>
              </mat-expansion-panel-header>
              
              <div class="form-row">
                <mat-checkbox formControlName="dereferenceAliases">
                  Dereference Aliases
                </mat-checkbox>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Time Limit (seconds)</mat-label>
                  <input matInput type="number" formControlName="timeLimit" 
                         placeholder="30">
                </mat-form-field>
              </div>
            </mat-expansion-panel>

            <!-- Actions -->
            <div class="actions">
              <button mat-raised-button type="button" (click)="clearForm()">
                Clear
              </button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="searchForm.invalid || searching">
                <mat-icon *ngIf="searching">hourglass_empty</mat-icon>
                <mat-icon *ngIf="!searching">search</mat-icon>
                {{ searching ? 'Searching...' : 'Search' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Search Results -->
      <mat-card class="results-card" *ngIf="searchResults">
        <mat-card-header>
          <mat-card-title>Search Results</mat-card-title>
          <mat-card-subtitle>
            Found {{ searchResults.entries.length }} entries
            <span *ngIf="searchResults.hasMore"> (more results available)</span>
          </mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div *ngIf="searchResults.entries.length === 0" class="no-results">
            <mat-icon>search_off</mat-icon>
            <p>No entries found matching your search criteria.</p>
          </div>

          <div *ngIf="searchResults.entries.length > 0">
            <!-- Results Table -->
            <div class="table-container">
              <table mat-table [dataSource]="searchResults.entries" class="results-table">
                <!-- DN Column -->
                <ng-container matColumnDef="dn">
                  <th mat-header-cell *matHeaderCellDef>Distinguished Name</th>
                  <td mat-cell *matCellDef="let entry" class="dn-cell">
                    <span class="dn-text" [title]="entry.dn">{{ entry.dn }}</span>
                  </td>
                </ng-container>

                <!-- Dynamic Attribute Columns -->
                <ng-container *ngFor="let attr of displayedAttributes" [matColumnDef]="attr">
                  <th mat-header-cell *matHeaderCellDef>{{ attr }}</th>
                  <td mat-cell *matCellDef="let entry">
                    <div class="attribute-values">
                      <mat-chip-listbox *ngIf="entry.attributes[attr] && entry.attributes[attr].length > 1">
                        <mat-chip *ngFor="let value of entry.attributes[attr].slice(0, 3)">
                          {{ value }}
                        </mat-chip>
                        <mat-chip *ngIf="entry.attributes[attr].length > 3" class="more-chip">
                          +{{ entry.attributes[attr].length - 3 }} more
                        </mat-chip>
                      </mat-chip-listbox>
                      <span *ngIf="entry.attributes[attr] && entry.attributes[attr].length === 1">
                        {{ entry.attributes[attr][0] }}
                      </span>
                      <span *ngIf="!entry.attributes[attr]" class="no-value">-</span>
                    </div>
                  </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let entry">
                    <button mat-icon-button (click)="viewEntry(entry)" 
                            matTooltip="View Details">
                      <mat-icon>visibility</mat-icon>
                    </button>
                    <button mat-icon-button (click)="editEntry(entry)" 
                            matTooltip="Edit Entry">
                      <mat-icon>edit</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="tableColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: tableColumns;"></tr>
              </table>
            </div>

            <!-- Export Actions -->
            <div class="export-actions">
              <button mat-stroked-button (click)="exportAsJson()">
                <mat-icon>download</mat-icon>
                Export JSON
              </button>
              <button mat-stroked-button (click)="exportAsCsv()">
                <mat-icon>download</mat-icon>
                Export CSV
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .connection-quick-card,
    .search-card,
    .results-card {
      margin-bottom: 1rem;
    }

    .quick-connection {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }

    .quick-connection mat-icon {
      color: #ff9800;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h3 {
      color: #667eea;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: center;
    }

    .full-width {
      flex: 1;
      width: 100%;
    }

    .advanced-panel {
      margin: 1rem 0;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .no-results {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .no-results mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
    }

    .table-container {
      overflow-x: auto;
      margin-bottom: 1rem;
    }

    .results-table {
      width: 100%;
      min-width: 800px;
    }

    .dn-cell {
      max-width: 300px;
    }

    .dn-text {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: monospace;
      font-size: 0.9rem;
      background: #f5f5f5;
      padding: 0.25rem;
      border-radius: 4px;
    }

    .attribute-values {
      max-width: 200px;
    }

    .no-value {
      color: #999;
      font-style: italic;
    }

    .more-chip {
      background: #e0e0e0 !important;
      color: #666 !important;
    }

    .export-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .search-container {
        margin: 1rem;
        padding: 0.5rem;
      }

      .form-row {
        flex-direction: column;
        gap: 0.5rem;
      }

      .actions {
        flex-direction: column;
      }

      .export-actions {
        flex-direction: column;
      }
    }
  `]
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searching = false;
  hasConnection = false;
  searchResults: LdapSearchResult | null = null;
  displayedAttributes: string[] = [];
  tableColumns: string[] = [];

  constructor(
    private fb: FormBuilder,
    private ldapService: LdapService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {
    this.searchForm = this.fb.group({
      baseDn: ['', Validators.required],
      scope: ['sub'],
      filter: ['(objectClass=*)', Validators.required],
      attributes: [''],
      sizeLimit: [1000],
      timeLimit: [30],
      dereferenceAliases: [false]
    });
  }

  ngOnInit(): void {
    this.checkConnection();
    this.loadDefaultSearch();
  }

  checkConnection(): void {
    const connections = this.localStorageService.getSavedConnections();
    this.hasConnection = connections.length > 0;
  }

  loadDefaultSearch(): void {
    // Load common search defaults
    this.searchForm.patchValue({
      baseDn: 'dc=example,dc=com',
      scope: 'sub',
      filter: '(objectClass=person)',
      attributes: 'cn,mail,telephoneNumber,memberOf'
    });
  }

  clearForm(): void {
    this.searchForm.reset({
      scope: 'sub',
      filter: '(objectClass=*)',
      sizeLimit: 1000,
      timeLimit: 30,
      dereferenceAliases: false
    });
    this.searchResults = null;
  }

  async performSearch(): Promise<void> {
    if (this.searchForm.invalid) return;

    this.searching = true;
    this.searchResults = null;

    try {
      const formValue = this.searchForm.value;
      const connection = this.getConnectionConfig();
      const searchRequest: Partial<LdapSearchRequest> = {
        base: formValue.baseDn,
        scope: formValue.scope,
        filter: formValue.filter,
        attributes: formValue.attributes ? formValue.attributes.split(',').map((a: string) => a.trim()) : [],
        sizeLimit: formValue.sizeLimit || 0,
        timeLimit: formValue.timeLimit || 0,
        dereferenceAliases: formValue.dereferenceAliases || false
      };

      const result = await this.ldapService.search(connection, searchRequest).toPromise();
      
      if (result) {
        this.searchResults = result;
        this.setupResultsTable();
        this.notificationService.showSuccess(`Found ${result.entries?.length || 0} entries`);
      }
      
    } catch (error: any) {
      this.notificationService.showError(`Search failed: ${error.message}`);
    } finally {
      this.searching = false;
    }
  }

  private getConnectionConfig(): LdapConnection {
    const connections = this.localStorageService.getSavedConnections();
    if (connections.length > 0) {
      return connections[0]; // Use first saved connection
    }
    throw new Error('No connection configuration found');
  }

  private setupResultsTable(): void {
    if (!this.searchResults || !this.searchResults.entries || this.searchResults.entries.length === 0) return;

    // Get all unique attributes from results
    const allAttributes = new Set<string>();
    this.searchResults.entries.forEach(entry => {
      Object.keys(entry.attributes || {}).forEach(attr => allAttributes.add(attr));
    });

    // Select most common/useful attributes for display
    const commonAttributes = ['cn', 'mail', 'displayName', 'telephoneNumber', 'title'];
    this.displayedAttributes = commonAttributes.filter(attr => allAttributes.has(attr));
    
    // Add other attributes up to a reasonable limit
    const otherAttrs = Array.from(allAttributes).filter(attr => !commonAttributes.includes(attr));
    this.displayedAttributes.push(...otherAttrs.slice(0, 3));

    this.tableColumns = ['dn', ...this.displayedAttributes, 'actions'];
  }

  viewEntry(entry: any): void {
    // TODO: Implement entry detail view
    this.notificationService.showInfo('Entry detail view coming soon');
  }

  editEntry(entry: any): void {
    // TODO: Navigate to modify component with entry
    this.notificationService.showInfo('Entry editing coming soon');
  }

  exportAsJson(): void {
    if (!this.searchResults) return;

    const dataStr = JSON.stringify(this.searchResults, null, 2);
    this.downloadFile(dataStr, 'ldap-search-results.json', 'application/json');
    this.notificationService.showSuccess('Results exported as JSON');
  }

  exportAsCsv(): void {
    if (!this.searchResults || !this.searchResults.entries || this.searchResults.entries.length === 0) return;

    const headers = ['dn', ...this.displayedAttributes];
    const csvRows = [headers.join(',')];

    this.searchResults.entries.forEach(entry => {
      const row = headers.map(header => {
        if (header === 'dn') return `"${entry.dn}"`;
        const values = entry.attributes?.[header];
        return values ? `"${values.join('; ')}"` : '""';
      });
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    this.downloadFile(csvString, 'ldap-search-results.csv', 'text/csv');
    this.notificationService.showSuccess('Results exported as CSV');
  }

  private downloadFile(content: string, filename: string, contentType: string): void {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
