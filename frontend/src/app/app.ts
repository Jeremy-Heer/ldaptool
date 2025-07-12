import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar class="app-toolbar">
        <mat-icon class="toolbar-icon">dns</mat-icon>
        <span class="toolbar-title">LDAP Directory Tool</span>
      </mat-toolbar>

      <div class="main-content">
        <mat-card class="main-card">
          <mat-card-header class="card-header">
            <mat-card-title>LDAP Management Console</mat-card-title>
            <mat-card-subtitle>Connect, Search, Browse, and Modify LDAP Directory Entries</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <nav mat-tab-nav-bar class="navigation-tabs">
              <a mat-tab-link 
                 routerLink="/connection" 
                 routerLinkActive="active-tab"
                 #connectionTab="routerLinkActive"
                 [active]="connectionTab.isActive">
                <mat-icon>settings_ethernet</mat-icon>
                Connection
              </a>
              <a mat-tab-link 
                 routerLink="/search" 
                 routerLinkActive="active-tab"
                 #searchTab="routerLinkActive"
                 [active]="searchTab.isActive">
                <mat-icon>search</mat-icon>
                Search
              </a>
              <a mat-tab-link 
                 routerLink="/browse" 
                 routerLinkActive="active-tab"
                 #browseTab="routerLinkActive"
                 [active]="browseTab.isActive">
                <mat-icon>folder_open</mat-icon>
                Browse
              </a>
              <a mat-tab-link 
                 routerLink="/modify" 
                 routerLinkActive="active-tab"
                 #modifyTab="routerLinkActive"
                 [active]="modifyTab.isActive">
                <mat-icon>edit</mat-icon>
                Modify
              </a>
            </nav>

            <div class="tab-content">
              <router-outlet></router-outlet>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
    }

    .app-toolbar {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border-radius: 15px 15px 0 0;
      margin-bottom: 0;
    }

    .toolbar-icon {
      margin-right: 0.5rem;
    }

    .toolbar-title {
      font-size: 1.5rem;
      font-weight: 500;
    }

    .main-content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: calc(100vh - 100px);
    }

    .main-card {
      width: 100%;
      max-width: 1200px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.95);
      margin-top: 0;
    }

    .card-header {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      border-radius: 15px 15px 0 0;
      padding: 1.5rem;
      margin: -24px -24px 24px -24px;
      text-align: center;
    }

    .navigation-tabs {
      margin-bottom: 2rem;
      background: transparent;
    }

    .navigation-tabs a {
      margin: 0 0.5rem;
      min-width: 120px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .navigation-tabs a:not(.active-tab) {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    .navigation-tabs a.active-tab {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .navigation-tabs mat-icon {
      margin-right: 0.5rem;
    }

    .tab-content {
      padding: 1rem 0;
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 0.5rem;
      }
      
      .navigation-tabs a {
        min-width: 80px;
        font-size: 0.8rem;
        margin: 0 0.25rem;
      }
      
      .toolbar-title {
        font-size: 1.2rem;
      }
    }
  `]
})
export class App {
  title = 'LDAP Tool UI';
}
