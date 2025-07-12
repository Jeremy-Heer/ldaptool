import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { LocalStorageService } from '../../services/local-storage.service';
import { LdapService } from '../../services/ldap.service';
import { NotificationService } from '../../services/notification.service';
import { LdapConnection, ConnectionTestResult } from '../../models/ldap.models';

@Component({
  selector: 'app-connection',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatDividerModule,
    ClipboardModule
  ],
  templateUrl: './connection.html',
  styleUrls: ['./connection.scss']
})
export class ConnectionComponent implements OnInit {
  connectionForm!: FormGroup;
  saveForm!: FormGroup;
  
  savedConnections = signal<LdapConnection[]>([]);
  testing = signal(false);
  testResult = signal<ConnectionTestResult | null>(null);
  showSaveForm = signal(false);

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private ldapService: LdapService,
    private notificationService: NotificationService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadSavedConnections();
    this.initializeConnection();
  }

  private initializeForms(): void {
    this.connectionForm = this.fb.group({
      host: ['', [Validators.required]],
      port: [389, [Validators.required, Validators.min(1), Validators.max(65535)]],
      useSSL: [false],
      bindDn: [''],
      password: ['']
    });

    this.saveForm = this.fb.group({
      connectionName: ['', [Validators.required]]
    });
  }

  private loadSavedConnections(): void {
    this.localStorageService.connections$.subscribe(connections => {
      this.savedConnections.set(connections);
    });
  }

  private initializeConnection(): void {
    // First try URL parameters
    const urlConnection = this.localStorageService.loadFromUrlParams();
    if (urlConnection) {
      this.connectionForm.patchValue(urlConnection);
      return;
    }

    // Then try last connection
    const lastConnection = this.localStorageService.getLastConnection();
    if (lastConnection) {
      this.connectionForm.patchValue(lastConnection);
    }
  }

  onTestConnection(): void {
    if (this.connectionForm.invalid) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    this.testing.set(true);
    this.testResult.set(null);

    const connection: LdapConnection = this.connectionForm.value;

    this.ldapService.testConnection(connection).subscribe({
      next: (result) => {
        this.testResult.set(result);
        this.testing.set(false);
        
        if (result.success) {
          this.notificationService.showSuccess('Connection successful!');
          this.localStorageService.saveLastConnection(connection);
        } else {
          this.notificationService.showError(result.message);
        }
      },
      error: (error) => {
        this.testResult.set(error);
        this.testing.set(false);
        this.notificationService.showError(error.message || 'Connection test failed');
      }
    });
  }

  onLoadSavedConnection(connection: LdapConnection): void {
    this.connectionForm.patchValue({
      host: connection.host,
      port: connection.port,
      useSSL: connection.useSSL,
      bindDn: connection.bindDn,
      password: '' // Never restore password
    });
    this.testResult.set(null);
    this.notificationService.showInfo(`Loaded connection: ${connection.name}`);
  }

  onSaveConnection(): void {
    if (this.connectionForm.invalid || this.saveForm.invalid) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    const connection: LdapConnection = {
      ...this.connectionForm.value,
      name: this.saveForm.value.connectionName
    };

    try {
      this.localStorageService.saveConnection(connection);
      this.notificationService.showSuccess('Connection saved successfully!');
      this.saveForm.reset();
      this.showSaveForm.set(false);
    } catch (error) {
      this.notificationService.showError('Failed to save connection');
    }
  }

  onDeleteConnection(connectionName: string): void {
    if (confirm(`Are you sure you want to delete "${connectionName}"?`)) {
      this.localStorageService.deleteConnection(connectionName);
      this.notificationService.showInfo('Connection deleted');
    }
  }

  onGenerateBookmark(): void {
    if (this.connectionForm.invalid) {
      this.notificationService.showError('Please enter at least a host before generating bookmark');
      return;
    }

    const connection: LdapConnection = this.connectionForm.value;
    const bookmarkUrl = this.localStorageService.generateBookmarkUrl(connection);
    
    this.notificationService.showSuccess('Bookmark URL copied to clipboard!');
  }

  onClearConnection(): void {
    this.connectionForm.reset({
      port: 389,
      useSSL: false
    });
    this.testResult.set(null);
  }

  getBookmarkUrl(): string {
    if (this.connectionForm.invalid) return '';
    const connection: LdapConnection = this.connectionForm.value;
    return this.localStorageService.generateBookmarkUrl(connection);
  }
}
