import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { LdapService } from '../../services/ldap.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificationService } from '../../services/notification.service';
import { LdapConnection } from '../../models/ldap.models';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule
  ],
  template: `
    <div class="connection-container">
      <mat-card class="connection-card">
        <mat-card-header>
          <mat-card-title>LDAP Connection Configuration</mat-card-title>
          <mat-card-subtitle>Configure and test your LDAP connection</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <mat-tab-group>
            <!-- Connection Form Tab -->
            <mat-tab label="Connection">
              <div class="tab-content">
                <form [formGroup]="connectionForm" (ngSubmit)="testConnection()">
                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Server Host</mat-label>
                      <input matInput formControlName="host" placeholder="ldap.company.com">
                      <mat-error *ngIf="connectionForm.get('host')?.invalid && connectionForm.get('host')?.touched">
                        Host is required
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline">
                      <mat-label>Port</mat-label>
                      <input matInput type="number" formControlName="port" placeholder="389">
                    </mat-form-field>

                    <mat-checkbox formControlName="useSSL">
                      Use SSL/TLS
                    </mat-checkbox>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Bind DN</mat-label>
                      <input matInput formControlName="bindDn" placeholder="cn=admin,dc=company,dc=com">
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Password</mat-label>
                      <input matInput type="password" formControlName="password">
                    </mat-form-field>
                  </div>

                  <div class="form-row">
                    <mat-checkbox formControlName="saveConnection">
                      Save this connection
                    </mat-checkbox>
                  </div>

                  <div class="form-row" *ngIf="connectionForm.get('saveConnection')?.value">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Connection Name</mat-label>
                      <input matInput formControlName="connectionName" placeholder="My LDAP Server">
                    </mat-form-field>
                  </div>

                  <div class="actions">
                    <button mat-raised-button color="primary" type="submit" 
                            [disabled]="connectionForm.invalid || testing">
                      <mat-icon *ngIf="testing">hourglass_empty</mat-icon>
                      <mat-icon *ngIf="!testing">wifi</mat-icon>
                      {{ testing ? 'Testing...' : 'Test Connection' }}
                    </button>
                  </div>
                </form>
              </div>
            </mat-tab>

            <!-- Saved Connections Tab -->
            <mat-tab label="Saved Connections" [disabled]="savedConnections.length === 0">
              <div class="tab-content">
                <mat-list *ngIf="savedConnections.length > 0">
                  <mat-list-item *ngFor="let conn of savedConnections; let i = index">
                    <div class="connection-item">
                      <div class="connection-info">
                        <h4>{{ conn.name || conn.host }}</h4>
                        <p>{{ conn.host }}:{{ conn.port }} ({{ conn.useSSL ? 'SSL' : 'Plain' }})</p>
                        <p class="bind-dn">{{ conn.bindDn }}</p>
                      </div>
                      <div class="connection-actions">
                        <button mat-icon-button (click)="loadConnection(conn)" 
                                matTooltip="Load Connection">
                          <mat-icon>launch</mat-icon>
                        </button>
                        <button mat-icon-button (click)="deleteConnection(i)" 
                                matTooltip="Delete Connection" color="warn">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </div>
                    <mat-divider *ngIf="i < savedConnections.length - 1"></mat-divider>
                  </mat-list-item>
                </mat-list>
                
                <div *ngIf="savedConnections.length === 0" class="no-connections">
                  <mat-icon>storage</mat-icon>
                  <p>No saved connections found</p>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>

      <!-- Connection Status -->
      <mat-card *ngIf="connectionStatus" class="status-card" 
                [ngClass]="{'success': connectionStatus.success, 'error': !connectionStatus.success}">
        <mat-card-content>
          <div class="status-content">
            <mat-icon>{{ connectionStatus.success ? 'check_circle' : 'error' }}</mat-icon>
            <div>
              <h3>{{ connectionStatus.success ? 'Connection Successful' : 'Connection Failed' }}</h3>
              <p>{{ connectionStatus.message }}</p>
              <div *ngIf="connectionStatus.details" class="details">
                <strong>Server Info:</strong> {{ connectionStatus.details }}
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .connection-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .connection-card {
      margin-bottom: 1rem;
    }

    .tab-content {
      padding: 1rem 0;
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

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    .connection-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .connection-info {
      flex: 1;
    }

    .connection-info h4 {
      margin: 0 0 0.5rem 0;
      color: #667eea;
    }

    .connection-info p {
      margin: 0.25rem 0;
      color: #666;
      font-size: 0.9rem;
    }

    .bind-dn {
      font-family: monospace;
      background: #f5f5f5;
      padding: 0.25rem;
      border-radius: 4px;
    }

    .connection-actions {
      display: flex;
      gap: 0.5rem;
    }

    .no-connections {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .no-connections mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
    }

    .status-card {
      border-left: 4px solid #ccc;
    }

    .status-card.success {
      border-left-color: #4caf50;
      background: #f1f8e9;
    }

    .status-card.error {
      border-left-color: #f44336;
      background: #ffebee;
    }

    .status-content {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .status-content mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .status-content h3 {
      margin: 0 0 0.5rem 0;
    }

    .status-content p {
      margin: 0;
      color: #666;
    }

    .details {
      margin-top: 1rem;
      padding: 1rem;
      background: rgba(255,255,255,0.7);
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .connection-container {
        margin: 1rem;
        padding: 0.5rem;
      }

      .form-row {
        flex-direction: column;
        gap: 0.5rem;
      }

      .connection-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .connection-actions {
        align-self: flex-end;
      }
    }
  `]
})
export class ConnectionComponent implements OnInit {
  connectionForm: FormGroup;
  testing = false;
  connectionStatus: { success: boolean; message: string; details?: string } | null = null;
  savedConnections: LdapConnection[] = [];

  constructor(
    private fb: FormBuilder,
    private ldapService: LdapService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {
    this.connectionForm = this.fb.group({
      host: ['', Validators.required],
      port: [389, [Validators.required, Validators.min(1), Validators.max(65535)]],
      useSSL: [false],
      bindDn: [''],
      password: [''],
      saveConnection: [false],
      connectionName: ['']
    });
  }

  ngOnInit(): void {
    this.loadSavedConnections();
    this.loadFromUrlParams();
    
    // Watch for save connection checkbox changes
    this.connectionForm.get('saveConnection')?.valueChanges.subscribe(save => {
      const nameControl = this.connectionForm.get('connectionName');
      if (save) {
        nameControl?.setValidators([Validators.required]);
      } else {
        nameControl?.clearValidators();
      }
      nameControl?.updateValueAndValidity();
    });
  }

  loadSavedConnections(): void {
    this.savedConnections = this.localStorageService.getSavedConnections();
  }

  loadFromUrlParams(): void {
    const urlParams = this.localStorageService.loadFromUrlParams();
    if (urlParams) {
      this.connectionForm.patchValue(urlParams);
      this.notificationService.showSuccess('Connection parameters loaded from URL');
    }
  }

  loadConnection(connection: LdapConnection): void {
    this.connectionForm.patchValue({
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL,
      bindDn: connection.bindDn,
      password: '', // Don't pre-fill password for security
      saveConnection: false,
      connectionName: ''
    });
    this.notificationService.showSuccess(`Loaded connection: ${connection.name || connection.host}`);
  }

  deleteConnection(index: number): void {
    const connection = this.savedConnections[index];
    this.localStorageService.deleteConnection(connection.name || connection.host);
    this.loadSavedConnections();
    this.notificationService.showSuccess(`Deleted connection: ${connection.name || connection.host}`);
  }

  async testConnection(): Promise<void> {
    if (this.connectionForm.invalid) return;

    this.testing = true;
    this.connectionStatus = null;

    try {
      const connectionData = this.connectionForm.value;
      const result = await this.ldapService.testConnection(connectionData).toPromise();
      
      if (result) {
        this.connectionStatus = {
          success: result.success,
          message: result.message,
          details: result.success ? 'Connection test completed successfully' : undefined
        };

        // Save connection if requested
        if (result.success && connectionData.saveConnection && connectionData.connectionName) {
          this.localStorageService.saveConnection({
            ...connectionData,
            name: connectionData.connectionName
          });
          this.loadSavedConnections();
          this.notificationService.showSuccess(`Connection saved as: ${connectionData.connectionName}`);
        }

        if (result.success) {
          this.notificationService.showSuccess('LDAP connection test successful!');
        } else {
          this.notificationService.showError(`Connection failed: ${result.message}`);
        }
      }
      
    } catch (error: any) {
      this.connectionStatus = {
        success: false,
        message: error.message || 'Failed to connect to LDAP server'
      };
      this.notificationService.showError(`Connection failed: ${error.message}`);
    } finally {
      this.testing = false;
    }
  }
}
