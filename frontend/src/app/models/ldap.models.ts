export interface LdapConnection {
  name?: string;
  host: string;
  port: number;
  useSSL: boolean;
  bindDn: string;
  password?: string;
  timestamp?: string;
}

export interface ConnectionTestRequest {
  host: string;
  port: number;
  useSSL: boolean;
  bindDn?: string;
  password?: string;
}

export interface ConnectionTestResult {
  success: boolean;
  message: string;
}

export interface LdapSearchRequest {
  host: string;
  port: number;
  useSSL: boolean;
  bindDn?: string;
  password?: string;
  base: string;
  filter: string;
  scope: 'base' | 'one' | 'sub';
  attributes: string[];
  sizeLimit?: number;
  timeLimit?: number;
  dereferenceAliases?: boolean;
}

export interface LdapSearchResult {
  success: boolean;
  entries: LdapEntry[];
  errorMessage?: string;
  message?: string;
  hasMore?: boolean;
}

export interface LdapEntry {
  dn: string;
  attributes: { [key: string]: string[] };
}

export interface LdapModifyRequest {
  host: string;
  port: number;
  useSSL: boolean;
  bindDn?: string;
  password?: string;
  dn: string;
  modifications: LdapModification[];
}

export interface LdapModification {
  operation: 'add' | 'replace' | 'delete';
  attribute: string;
  values: string[];
}

export interface LdapModifyResult {
  success: boolean;
  message?: string;
  errorMessage?: string;
}

export interface TreeNode {
  dn: string;
  name?: string;
  rdn?: string;
  entry?: LdapEntry;
  hasChildren?: boolean;
  expanded?: boolean;
  children?: TreeNode[];
  level?: number;
  selected?: boolean;
  loading?: boolean;
  isRootDse?: boolean;
  isNamingContext?: boolean;
  icon?: string;
}

export interface RootDseInfo {
  namingContexts?: string[];
  supportedLDAPVersion?: string[];
  supportedSASLMechanisms?: string[];
  supportedExtension?: string[];
  supportedControl?: string[];
  supportedFeatures?: string[];
  vendorName?: string;
  vendorVersion?: string;
}

export interface RootDseResult {
  success: boolean;
  rootDse?: RootDseInfo;
  message?: string;
  errorMessage?: string;
}

export interface RootDseRequest {
  host: string;
  port: number;
  useSSL: boolean;
  bindDn?: string;
  password?: string;
}

export interface RootDnRequest {
  host: string;
  port: number;
  useSSL: boolean;
  bindDn?: string;
  password?: string;
}

export interface RootDnResponse {
  success: boolean;
  rootDn?: string;
  message?: string;
}
