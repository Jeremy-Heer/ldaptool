import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/connection', pathMatch: 'full' },
  { 
    path: 'connection', 
    loadComponent: () => import('./components/connection/connection.component').then(m => m.ConnectionComponent)
  },
  { 
    path: 'search', 
    loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)
  },
  { 
    path: 'browse', 
    loadComponent: () => import('./components/browse/browse.component').then(m => m.BrowseComponent)
  },
  { 
    path: 'modify', 
    loadComponent: () => import('./components/modify/modify.component').then(m => m.ModifyComponent)
  },
  { path: '**', redirectTo: '/connection' }
];
