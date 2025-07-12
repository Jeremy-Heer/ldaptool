import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { LdapService } from '../../services/ldap.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NotificationService } from '../../services/notification.service';
import { LdapConnection, TreeNode, LdapEntry } from '../../models/ldap.models';

interface FlatTreeNode {
  expandable: boolean;
  name: string;
  level: number;
  dn: string;
  loading?: boolean;
  icon?: string;
  objectClasses?: string[];
}

@Component({
  selector: 'app-browse',
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
    MatIconModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  template: `
    <div class="browse-container">
      <!-- Connection Quick Setup -->
      <mat-card class="connection-quick-card" *ngIf="!hasConnection">
        <mat-card-content>
          <div class="quick-connection">
            <mat-icon>warning</mat-icon>
            <div>
              <h3>No LDAP Connection</h3>
              <p>Please configure an LDAP connection first to browse the directory.</p>
              <button mat-raised-button color="primary" routerLink="/connection">
                Configure Connection
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Browse Interface -->
      <div class="browse-layout" *ngIf="hasConnection">
        <!-- Left Panel - Directory Tree -->
        <mat-card class="tree-card">
          <mat-card-header>
            <mat-card-title>Directory Tree</mat-card-title>
            <mat-card-subtitle>Navigate the LDAP directory structure</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <!-- Root DSE Discovery -->
            <div class="root-actions">
              <button mat-stroked-button (click)="discoverRootDSE()" 
                      [disabled]="discovering">
                <mat-icon *ngIf="discovering">hourglass_empty</mat-icon>
                <mat-icon *ngIf="!discovering">explore</mat-icon>
                {{ discovering ? 'Discovering...' : 'Discover Root DSE' }}
              </button>
              
              <mat-form-field appearance="outline" class="base-dn-field">
                <mat-label>Custom Base DN</mat-label>
                <input matInput [formControl]="customBaseDnControl" 
                       placeholder="dc=example,dc=com">
                <button matSuffix mat-icon-button (click)="addCustomBaseDn()"
                        [disabled]="!customBaseDnControl.value">
                  <mat-icon>add</mat-icon>
                </button>
              </mat-form-field>
            </div>

            <!-- Directory Tree -->
            <div class="tree-container" *ngIf="dataSource.data.length > 0">
              <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
                <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding 
                               [style.padding-left.px]="node.level * 20">
                  <button mat-icon-button disabled></button>
                  <div class="tree-node-content" (click)="selectNode(node)">
                    <mat-icon class="node-icon" [class]="getNodeIconClass(node)">
                      {{ getNodeIcon(node) }}
                    </mat-icon>
                    <span class="node-label" [title]="node.dn">{{ node.name }}</span>
                  </div>
                </mat-tree-node>

                <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding
                               [style.padding-left.px]="node.level * 20">
                  <button mat-icon-button matTreeNodeToggle 
                          [attr.aria-label]="'Toggle ' + node.name"
                          (click)="loadChildren(node)">
                    <mat-icon class="mat-icon-rtl-mirror">
                      {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
                    </mat-icon>
                  </button>
                  <div class="tree-node-content" (click)="selectNode(node)">
                    <mat-icon *ngIf="!node.loading" class="node-icon" [class]="getNodeIconClass(node)">
                      {{ getNodeIcon(node) }}
                    </mat-icon>
                    <mat-progress-spinner *ngIf="node.loading" 
                                          diameter="16" mode="indeterminate">
                    </mat-progress-spinner>
                    <span class="node-label" [title]="node.dn">{{ node.name }}</span>
                  </div>
                </mat-tree-node>
              </mat-tree>
            </div>

            <!-- Empty State -->
            <div *ngIf="dataSource.data.length === 0" class="empty-tree">
              <mat-icon>account_tree</mat-icon>
              <p>No directory structure loaded</p>
              <p class="hint">Use "Discover Root DSE" or add a custom Base DN to start browsing</p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Right Panel - Entry Details -->
        <mat-card class="details-card">
          <mat-card-header>
            <mat-card-title>Entry Details</mat-card-title>
            <mat-card-subtitle *ngIf="selectedEntry">{{ selectedEntry.dn }}</mat-card-subtitle>
            <mat-card-subtitle *ngIf="!selectedEntry">Select an entry to view details</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div *ngIf="!selectedEntry" class="no-selection">
              <mat-icon>info</mat-icon>
              <p>Select an entry from the directory tree to view its attributes and details.</p>
            </div>

            <div *ngIf="selectedEntry" class="entry-details">
              <!-- Entry Info -->
              <div class="entry-header">
                <div class="entry-dn">
                  <strong>Distinguished Name:</strong>
                  <span class="dn-value">{{ selectedEntry.dn }}</span>
                </div>
                
                <div class="entry-actions">
                  <button mat-icon-button (click)="refreshEntry()" 
                          matTooltip="Refresh Entry">
                    <mat-icon>refresh</mat-icon>
                  </button>
                  <button mat-icon-button (click)="editEntry(selectedEntry)" 
                          matTooltip="Edit Entry">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="copyDn(selectedEntry.dn)" 
                          matTooltip="Copy DN">
                    <mat-icon>content_copy</mat-icon>
                  </button>
                </div>
              </div>

              <!-- Attributes Tab -->
              <mat-tab-group>
                <mat-tab label="Attributes">
                  <div class="attributes-container">
                    <div *ngFor="let attr of getAttributeKeys(selectedEntry)" class="attribute-item">
                      <div class="attribute-header">
                        <strong>{{ attr }}</strong>
                        <mat-chip-listbox *ngIf="isMultiValue(selectedEntry, attr)">
                          <mat-chip>{{ getAttributeValues(selectedEntry, attr).length }} values</mat-chip>
                        </mat-chip-listbox>
                      </div>
                      
                      <div class="attribute-values">
                        <div *ngFor="let value of getAttributeValues(selectedEntry, attr); 
                                    let i = index; trackBy: trackByIndex" 
                             class="attribute-value">
                          <span class="value-text" [class.binary]="isBinaryAttribute(attr)">
                            {{ formatAttributeValue(attr, value) }}
                          </span>
                          <button mat-icon-button class="copy-value" 
                                  (click)="copyValue(value)" 
                                  matTooltip="Copy Value">
                            <mat-icon>content_copy</mat-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>

                <mat-tab label="Object Classes">
                  <div class="object-classes-container">
                    <mat-chip-listbox>
                      <mat-chip *ngFor="let oc of getObjectClasses(selectedEntry)" 
                                [class]="getObjectClassType(oc)">
                        {{ oc }}
                      </mat-chip>
                    </mat-chip-listbox>
                  </div>
                </mat-tab>

                <mat-tab label="Children" *ngIf="hasChildren(selectedEntry)">
                  <div class="children-container">
                    <div *ngIf="loadingChildren" class="loading-children">
                      <mat-progress-spinner diameter="24" mode="indeterminate"></mat-progress-spinner>
                      <p>Loading children...</p>
                    </div>
                    
                    <mat-list *ngIf="!loadingChildren && children.length > 0">
                      <mat-list-item *ngFor="let child of children" (click)="selectChildEntry(child)">
                        <mat-icon matListIcon>{{ getEntryIcon(child) }}</mat-icon>
                        <div matLine class="child-name">{{ getEntryName(child) }}</div>
                        <div matLine class="child-dn">{{ child.dn }}</div>
                      </mat-list-item>
                    </mat-list>
                    
                    <div *ngIf="!loadingChildren && children.length === 0" class="no-children">
                      <mat-icon>folder_open</mat-icon>
                      <p>No child entries found</p>
                    </div>
                  </div>
                </mat-tab>
              </mat-tab-group>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .browse-container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .connection-quick-card {
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

    .browse-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      min-height: 600px;
    }

    .tree-card,
    .details-card {
      height: fit-content;
    }

    .root-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .base-dn-field {
      width: 100%;
    }

    .tree-container {
      max-height: 500px;
      overflow-y: auto;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    .tree-node-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .tree-node-content:hover {
      background-color: #f5f5f5;
    }

    .tree-node-content.selected {
      background-color: #e3f2fd;
    }

    .node-icon {
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
    }

    .node-icon.organizational-unit {
      color: #ff9800;
    }

    .node-icon.person {
      color: #2196f3;
    }

    .node-icon.group {
      color: #4caf50;
    }

    .node-icon.computer {
      color: #9c27b0;
    }

    .node-label {
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .empty-tree {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .empty-tree mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
    }

    .empty-tree .hint {
      font-size: 0.9rem;
      color: #999;
    }

    .no-selection {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .no-selection mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
    }

    .entry-details {
      padding: 1rem 0;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .entry-dn {
      flex: 1;
    }

    .dn-value {
      font-family: monospace;
      background: #f5f5f5;
      padding: 0.25rem;
      border-radius: 4px;
      display: block;
      margin-top: 0.5rem;
      word-break: break-all;
    }

    .entry-actions {
      display: flex;
      gap: 0.5rem;
    }

    .attributes-container {
      padding: 1rem 0;
      max-height: 400px;
      overflow-y: auto;
    }

    .attribute-item {
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }

    .attribute-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .attribute-values {
      margin-left: 1rem;
    }

    .attribute-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
      padding: 0.25rem;
      background: #fafafa;
      border-radius: 4px;
    }

    .value-text {
      flex: 1;
      font-family: monospace;
      font-size: 0.9rem;
      word-break: break-all;
    }

    .value-text.binary {
      color: #666;
      font-style: italic;
    }

    .copy-value {
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .attribute-value:hover .copy-value {
      opacity: 1;
    }

    .object-classes-container {
      padding: 1rem 0;
    }

    .children-container {
      padding: 1rem 0;
    }

    .loading-children {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
    }

    .child-name {
      font-weight: 500;
    }

    .child-dn {
      font-family: monospace;
      font-size: 0.8rem;
      color: #666;
    }

    .no-children {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .no-children mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 1024px) {
      .browse-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .tree-container {
        max-height: 300px;
      }

      .attributes-container {
        max-height: 300px;
      }
    }

    @media (max-width: 768px) {
      .browse-container {
        margin: 1rem;
        padding: 0.5rem;
      }

      .entry-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .entry-actions {
        justify-content: center;
      }
    }
  `]
})
export class BrowseComponent implements OnInit {
  // Tree control and data
  treeControl = new FlatTreeControl<FlatTreeNode>(
    node => node.level,
    node => node.expandable
  );

  private _transformer = (node: TreeNode, level: number): FlatTreeNode => ({
    expandable: !!node.children && node.children.length > 0,
    name: this.getNodeDisplayName(node),
    level: level,
    dn: node.dn,
    loading: false,
    icon: node.icon,
    objectClasses: node.entry?.attributes?.['objectClass'] || []
  });

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Component state
  hasConnection = false;
  discovering = false;
  selectedEntry: LdapEntry | null = null;
  children: LdapEntry[] = [];
  loadingChildren = false;

  // Form controls
  customBaseDnControl: FormControl<string | null>;

  constructor(
    private fb: FormBuilder,
    private ldapService: LdapService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {
    this.customBaseDnControl = this.fb.control('');
  }

  ngOnInit(): void {
    this.checkConnection();
  }

  checkConnection(): void {
    const connections = this.localStorageService.getSavedConnections();
    this.hasConnection = connections.length > 0;
  }

  hasChild = (_: number, node: FlatTreeNode): boolean => node.expandable;

  getNodeDisplayName(node: TreeNode): string {
    if (node.name) return node.name;
    
    // Extract RDN from DN
    const rdn = node.dn.split(',')[0];
    return rdn.includes('=') ? rdn.split('=')[1] : rdn;
  }

  getNodeIcon(node: FlatTreeNode): string {
    if (node.icon) return node.icon;
    
    const objectClasses = node.objectClasses || [];
    
    if (objectClasses.includes('organizationalUnit')) return 'folder';
    if (objectClasses.includes('person') || objectClasses.includes('inetOrgPerson')) return 'person';
    if (objectClasses.includes('group') || objectClasses.includes('groupOfNames')) return 'group';
    if (objectClasses.includes('computer')) return 'computer';
    if (objectClasses.includes('domain')) return 'domain';
    
    return 'folder_open';
  }

  getNodeIconClass(node: FlatTreeNode): string {
    const objectClasses = node.objectClasses || [];
    
    if (objectClasses.includes('organizationalUnit')) return 'organizational-unit';
    if (objectClasses.includes('person') || objectClasses.includes('inetOrgPerson')) return 'person';
    if (objectClasses.includes('group') || objectClasses.includes('groupOfNames')) return 'group';
    if (objectClasses.includes('computer')) return 'computer';
    
    return '';
  }

  async discoverRootDSE(): Promise<void> {
    if (!this.hasConnection) return;

    this.discovering = true;
    try {
      const connection = this.getConnectionConfig();
      const rootDseResult = await this.ldapService.getRootDse(connection).toPromise();
      
      if (rootDseResult?.success && rootDseResult.rootDse) {
        const rootDse = rootDseResult.rootDse;
        const treeNodes: TreeNode[] = [];

        // Add naming contexts
        if (rootDse.namingContexts) {
          rootDse.namingContexts.forEach(nc => {
            treeNodes.push({
              dn: nc,
              name: nc,
              children: [],
              hasChildren: true,
              icon: 'domain'
            });
          });
        }

        this.dataSource.data = treeNodes;
        this.notificationService.showSuccess(`Discovered ${treeNodes.length} naming contexts`);
      }
    } catch (error: any) {
      this.notificationService.showError(`Root DSE discovery failed: ${error.message}`);
    } finally {
      this.discovering = false;
    }
  }

  addCustomBaseDn(): void {
    const baseDn = this.customBaseDnControl.value?.trim();
    if (!baseDn) return;

    const newNode: TreeNode = {
      dn: baseDn,
      name: baseDn,
      children: [],
      hasChildren: true,
      icon: 'folder'
    };

    const currentData = this.dataSource.data;
    const exists = currentData.some(node => node.dn === baseDn);
    
    if (!exists) {
      this.dataSource.data = [...currentData, newNode];
      this.customBaseDnControl.setValue('');
      this.notificationService.showSuccess(`Added base DN: ${baseDn}`);
    } else {
      this.notificationService.showWarning('This base DN already exists in the tree');
    }
  }

  async loadChildren(node: FlatTreeNode): Promise<void> {
    if (!this.treeControl.isExpanded(node)) {
      // Node is being expanded, load children
      node.loading = true;
      
      try {
        const connection = this.getConnectionConfig();
        const searchResult = await this.ldapService.browseChildren(connection, node.dn).toPromise();
        
        if (searchResult?.success && searchResult.entries) {
          const childNodes: TreeNode[] = searchResult.entries.map(entry => ({
            dn: entry.dn,
            name: this.getEntryName(entry),
            entry: entry,
            children: [],
            hasChildren: this.ldapService.hasChildren(entry),
            icon: this.ldapService.getEntryIcon(entry)
          }));

          // Update the tree data
          const currentData = this.dataSource.data;
          const updatedData = this.updateNodeChildren(currentData, node.dn, childNodes);
          this.dataSource.data = updatedData;
        }
      } catch (error: any) {
        this.notificationService.showError(`Failed to load children: ${error.message}`);
      } finally {
        node.loading = false;
      }
    }
  }

  private updateNodeChildren(nodes: TreeNode[], targetDn: string, children: TreeNode[]): TreeNode[] {
    return nodes.map(node => {
      if (node.dn === targetDn) {
        return { ...node, children };
      } else if (node.children) {
        return { ...node, children: this.updateNodeChildren(node.children, targetDn, children) };
      }
      return node;
    });
  }

  selectNode(node: FlatTreeNode): void {
    // Find the corresponding tree node and load its details
    this.loadEntryDetails(node.dn);
  }

  async loadEntryDetails(dn: string): Promise<void> {
    try {
      const connection = this.getConnectionConfig();
      const searchResult = await this.ldapService.getEntry(connection, dn).toPromise();
      
      if (searchResult?.success && searchResult.entries && searchResult.entries.length > 0) {
        this.selectedEntry = searchResult.entries[0];
        
        // Load children if this entry might have them
        if (this.hasChildren(this.selectedEntry)) {
          this.loadChildrenList();
        } else {
          this.children = [];
        }
      }
    } catch (error: any) {
      this.notificationService.showError(`Failed to load entry details: ${error.message}`);
    }
  }

  async loadChildrenList(): Promise<void> {
    if (!this.selectedEntry) return;

    this.loadingChildren = true;
    try {
      const connection = this.getConnectionConfig();
      const searchResult = await this.ldapService.browseChildren(connection, this.selectedEntry.dn).toPromise();
      
      if (searchResult?.success && searchResult.entries) {
        this.children = searchResult.entries;
      }
    } catch (error: any) {
      this.notificationService.showError(`Failed to load children: ${error.message}`);
    } finally {
      this.loadingChildren = false;
    }
  }

  private getConnectionConfig(): LdapConnection {
    const connections = this.localStorageService.getSavedConnections();
    if (connections.length > 0) {
      return connections[0];
    }
    throw new Error('No connection configuration found');
  }

  getEntryName(entry: LdapEntry): string {
    const cn = entry.attributes?.['cn']?.[0];
    const ou = entry.attributes?.['ou']?.[0];
    const dc = entry.attributes?.['dc']?.[0];
    const name = entry.attributes?.['name']?.[0];
    
    return cn || ou || dc || name || entry.dn.split(',')[0].split('=')[1] || 'Unknown';
  }

  getEntryIcon(entry: LdapEntry): string {
    return this.ldapService.getEntryIcon({ dn: entry.dn, entry });
  }

  getAttributeKeys(entry: LdapEntry): string[] {
    return Object.keys(entry.attributes || {}).sort();
  }

  getAttributeValues(entry: LdapEntry, attribute: string): string[] {
    return entry.attributes?.[attribute] || [];
  }

  isMultiValue(entry: LdapEntry, attribute: string): boolean {
    return (entry.attributes?.[attribute]?.length || 0) > 1;
  }

  isBinaryAttribute(attribute: string): boolean {
    const binaryAttributes = ['objectGUID', 'objectSid', 'jpegPhoto', 'thumbnailPhoto', 'userCertificate'];
    return binaryAttributes.includes(attribute);
  }

  formatAttributeValue(attribute: string, value: string): string {
    if (this.isBinaryAttribute(attribute)) {
      return `[Binary data - ${value.length} bytes]`;
    }
    return value;
  }

  getObjectClasses(entry: LdapEntry): string[] {
    return entry.attributes?.['objectClass'] || [];
  }

  getObjectClassType(objectClass: string): string {
    const structuralClasses = ['person', 'organizationalUnit', 'group', 'computer', 'domain'];
    if (structuralClasses.includes(objectClass.toLowerCase())) {
      return 'structural';
    }
    return 'auxiliary';
  }

  hasChildren(entry: LdapEntry): boolean {
    return this.ldapService.hasChildren(entry);
  }

  selectChildEntry(child: LdapEntry): void {
    this.selectedEntry = child;
    this.loadChildrenList();
  }

  refreshEntry(): void {
    if (this.selectedEntry) {
      this.loadEntryDetails(this.selectedEntry.dn);
    }
  }

  editEntry(entry: LdapEntry): void {
    // TODO: Navigate to modify component with entry
    this.notificationService.showInfo('Entry editing coming soon');
  }

  copyDn(dn: string): void {
    navigator.clipboard.writeText(dn).then(() => {
      this.notificationService.showSuccess('DN copied to clipboard');
    }).catch(() => {
      this.notificationService.showError('Failed to copy DN to clipboard');
    });
  }

  copyValue(value: string): void {
    navigator.clipboard.writeText(value).then(() => {
      this.notificationService.showSuccess('Value copied to clipboard');
    }).catch(() => {
      this.notificationService.showError('Failed to copy value to clipboard');
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
