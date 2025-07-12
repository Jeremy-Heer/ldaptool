// LDAP Tool Angular Application
angular.module('ldapApp', [])
.config(['$httpProvider', function($httpProvider) {
    // Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.controller('LdapController', ['$scope', '$http', function($scope, $http) {
    
    // Initialize application state
    $scope.activeTab = 'connection';
    $scope.searchLoading = false;
    $scope.modifyLoading = false;
    $scope.browseLoading = false;
    $scope.connectionTesting = false;
    $scope.viewMode = 'formatted';
    
    // Shared connection configuration
    $scope.connectionConfig = {
        host: '',
        port: null,
        useSSL: false,
        bindDn: '',
        password: '',
        connected: false
    };
    
    // Initialize request objects
    $scope.searchRequest = {
        base: '',
        filter: '(objectClass=*)',
        scope: 'sub'
    };
    
    $scope.browseRequest = {
        base: ''
    };
    
    $scope.modifyRequest = {
        dn: '',
        modifications: []
    };
    
    // Initialize other state variables
    $scope.attributesString = '';
    $scope.searchResult = null;
    $scope.modifyResult = null;
    $scope.browseConnected = false;
    $scope.browseTree = [];
    $scope.selectedEntry = null;
    $scope.browseError = null;
    $scope.showManualDnInput = false;
    $scope.connectionTestResult = null;
    
    // Saved connections management
    $scope.savedConnections = [];
    $scope.selectedSavedConnection = '';
    $scope.connectionForm = {
        newConnectionName: ''
    };
    $scope.showSaveForm = false;
    
    // Initialize from URL parameters or localStorage
    $scope.initializeConnection = function() {
        try {
            // First, try to load from URL parameters
            var urlParams = new URLSearchParams(window.location.search);
            var loadedFromUrl = false;
            
            if (urlParams.has('host')) {
                $scope.connectionConfig.host = urlParams.get('host');
                loadedFromUrl = true;
            }
            if (urlParams.has('port')) {
                $scope.connectionConfig.port = parseInt(urlParams.get('port'));
                loadedFromUrl = true;
            }
            if (urlParams.has('ssl')) {
                $scope.connectionConfig.useSSL = urlParams.get('ssl') === 'true';
                loadedFromUrl = true;
            }
            if (urlParams.has('binddn')) {
                $scope.connectionConfig.bindDn = decodeURIComponent(urlParams.get('binddn'));
                loadedFromUrl = true;
            }
            
            // Load saved connections from localStorage
            $scope.loadSavedConnections();
            
            // If nothing loaded from URL, try to load the last used connection
            if (!loadedFromUrl) {
                $scope.loadLastConnection();
            }
        } catch (error) {
            console.error("Error in initializeConnection:", error);
            // Fall back to loading saved connections only
            try {
                $scope.loadSavedConnections();
                $scope.loadLastConnection();
            } catch (e) {
                console.error("Error loading saved connections:", e);
            }
        }
    };
    
    // Save connection to localStorage
    $scope.saveConnection = function() {
        if (!$scope.connectionForm.newConnectionName || !$scope.connectionForm.newConnectionName.trim()) {
            alert('Please enter a name for this connection');
            return;
        }
        
        var connection = {
            name: $scope.connectionForm.newConnectionName.trim(),
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL,
            bindDn: $scope.connectionConfig.bindDn,
            timestamp: new Date().toISOString()
        };
        
        var savedConnections = JSON.parse(localStorage.getItem('ldapConnections') || '[]');
        
        // Remove existing connection with same name
        savedConnections = savedConnections.filter(function(conn) {
            return conn.name !== connection.name;
        });
        
        savedConnections.unshift(connection); // Add to beginning
        
        // Keep only last 200 connections
        if (savedConnections.length > 200) {
            savedConnections = savedConnections.slice(0, 200);
        }
        
        localStorage.setItem('ldapConnections', JSON.stringify(savedConnections));
        $scope.loadSavedConnections();
        $scope.connectionForm.newConnectionName = '';
        $scope.showSaveForm = false;
        
        alert('Connection saved successfully!');
    };
    
    // Load saved connections from localStorage
    $scope.loadSavedConnections = function() {
        var saved = localStorage.getItem('ldapConnections');
        $scope.savedConnections = saved ? JSON.parse(saved) : [];
    };
    
    // Load a saved connection
    $scope.loadSavedConnection = function() {
        if (!$scope.selectedSavedConnection) return;
        
        var connection = $scope.savedConnections.find(function(conn) {
            return conn.name === $scope.selectedSavedConnection;
        });
        
        if (connection) {
            $scope.connectionConfig.host = connection.host;
            $scope.connectionConfig.port = connection.port;
            $scope.connectionConfig.useSSL = connection.useSSL;
            $scope.connectionConfig.bindDn = connection.bindDn;
            $scope.connectionConfig.password = ''; // Never save password
            $scope.connectionConfig.connected = false;
            $scope.connectionTestResult = null;
        }
    };
    
    // Delete a saved connection
    $scope.deleteSavedConnection = function(connectionName) {
        if (confirm('Are you sure you want to delete "' + connectionName + '"?')) {
            var savedConnections = JSON.parse(localStorage.getItem('ldapConnections') || '[]');
            savedConnections = savedConnections.filter(function(conn) {
                return conn.name !== connectionName;
            });
            localStorage.setItem('ldapConnections', JSON.stringify(savedConnections));
            $scope.loadSavedConnections();
            if ($scope.selectedSavedConnection === connectionName) {
                $scope.selectedSavedConnection = '';
            }
        }
    };
    
    // Save last used connection (without name)
    $scope.saveLastConnection = function() {
        if ($scope.connectionConfig.host) {
            var lastConnection = {
                host: $scope.connectionConfig.host,
                port: $scope.connectionConfig.port,
                useSSL: $scope.connectionConfig.useSSL,
                bindDn: $scope.connectionConfig.bindDn
            };
            localStorage.setItem('ldapLastConnection', JSON.stringify(lastConnection));
        }
    };
    
    // Load last used connection
    $scope.loadLastConnection = function() {
        var lastConnection = localStorage.getItem('ldapLastConnection');
        if (lastConnection) {
            var connection = JSON.parse(lastConnection);
            $scope.connectionConfig.host = connection.host || '';
            $scope.connectionConfig.port = connection.port;
            $scope.connectionConfig.useSSL = connection.useSSL || false;
            $scope.connectionConfig.bindDn = connection.bindDn || '';
        }
    };
    
    // Generate bookmark URL
    $scope.generateBookmarkUrl = function() {
        if (!$scope.connectionConfig.host) {
            alert('Please enter at least a host before generating a bookmark URL');
            return;
        }
        
        var params = new URLSearchParams();
        params.set('host', $scope.connectionConfig.host);
        
        if ($scope.connectionConfig.port) {
            params.set('port', $scope.connectionConfig.port.toString());
        }
        if ($scope.connectionConfig.useSSL) {
            params.set('ssl', 'true');
        }
        if ($scope.connectionConfig.bindDn) {
            params.set('binddn', encodeURIComponent($scope.connectionConfig.bindDn));
        }
        
        var bookmarkUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + params.toString();
        
        // Copy to clipboard if possible
        if (navigator.clipboard) {
            navigator.clipboard.writeText(bookmarkUrl).then(function() {
                alert('Bookmark URL copied to clipboard!\n\n' + bookmarkUrl);
            }).catch(function() {
                prompt('Copy this bookmark URL:', bookmarkUrl);
            });
        } else {
            prompt('Copy this bookmark URL:', bookmarkUrl);
        }
    };
    
    // Connection management
    $scope.testConnection = function() {
        if ($scope.connectionForm.$invalid) {
            return;
        }
        
        $scope.connectionTesting = true;
        $scope.connectionTestResult = null;
        
        // Use the dedicated connection test endpoint
        var testRequest = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL
        };
        
        var headers = {
            'Content-Type': 'application/json'
        };
        
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        $http({
            method: 'POST',
            url: '/ldap/test-connection',
            data: testRequest,
            headers: headers
        }).then(function(response) {
            $scope.connectionConfig.connected = response.data.success;
            $scope.connectionTestResult = {
                success: response.data.success,
                message: response.data.message
            };
            $scope.connectionTesting = false;
            
            // Save last connection on successful test
            if (response.data.success) {
                $scope.saveLastConnection();
            }
        }, function(error) {
            $scope.connectionConfig.connected = false;
            $scope.connectionTestResult = {
                success: false,
                message: 'Connection test failed: ' + (error.data && error.data.message ? error.data.message : error.statusText || 'Unknown error')
            };
            $scope.connectionTesting = false;
        });
    };
    
    $scope.clearConnection = function() {
        $scope.connectionConfig.connected = false;
        $scope.connectionTestResult = null;
        $scope.browseConnected = false;
        $scope.browseTree = [];
        $scope.selectedEntry = null;
        $scope.browseError = null;
    };
    
    // Format JSON for display
    $scope.formatJson = function(obj) {
        return JSON.stringify(obj, null, 2);
    };
    
    // Helper function to check if a value is an array
    $scope.isArray = function(value) {
        return Array.isArray(value);
    };
    
    // Tab management
    $scope.setActiveTab = function(tabName) {
        $scope.activeTab = tabName;
    };

    // LDAP Search functionality
    $scope.performSearch = function() {
        if ($scope.searchForm.$invalid) {
            return;
        }
        
        $scope.searchLoading = true;
        $scope.searchResult = null;
        
        // Prepare attributes array
        var attributes = [];
        if ($scope.attributesString && $scope.attributesString.trim()) {
            attributes = $scope.attributesString.split(',').map(function(attr) {
                return attr.trim();
            }).filter(function(attr) {
                return attr.length > 0;
            });
        }
        
        // Prepare request payload using shared connection config
        var requestPayload = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL,
            base: $scope.searchRequest.base,
            filter: $scope.searchRequest.filter,
            scope: $scope.searchRequest.scope,
            attributes: attributes
        };
        
        // Prepare headers
        var headers = {
            'Content-Type': 'application/json'
        };
        
        // Add Basic Auth if credentials provided
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        // Make HTTP request
        $http({
            method: 'POST',
            url: '/ldap/ldapsearch',
            data: requestPayload,
            headers: headers
        }).then(function(response) {
            $scope.searchResult = response.data;
            $scope.searchLoading = false;
        }, function(error) {
            $scope.searchResult = {
                success: false,
                errorMessage: 'Request failed: ' + (error.data && error.data.message ? error.data.message : error.statusText || 'Unknown error')
            };
            $scope.searchLoading = false;
        });
    };
    
    // LDAP Browse functionality
    $scope.autoConnectToBrowse = function() {
        if (!$scope.connectionConfig.connected) {
            $scope.browseError = "Please test your connection first";
            return;
        }
        
        $scope.browseLoading = true;
        $scope.browseError = null;
        $scope.browseTree = [];
        $scope.selectedEntry = null;
        
        // Get the Root DSE object and its namingContexts
        $scope.getRootDse()
            .then(function(rootDseEntry) {
                // Create the Root DSE node as the top-level entry
                var rootDseNode = {
                    dn: '',
                    rdn: 'Root DSE',
                    entry: rootDseEntry,
                    hasChildren: true,
                    expanded: false,
                    children: [],
                    level: 0,
                    selected: false,
                    isRootDse: true
                };
                
                // Extract naming contexts from the Root DSE
                var namingContexts = [];
                if (rootDseEntry.namingContexts) {
                    if (Array.isArray(rootDseEntry.namingContexts)) {
                        namingContexts = rootDseEntry.namingContexts;
                    } else {
                        namingContexts = [rootDseEntry.namingContexts];
                    }
                }
                
                // If no naming contexts found, try to get a root DN and use it as a fallback
                if (namingContexts.length === 0) {
                    console.log("No namingContexts found in rootDSE, attempting to get root DN as fallback");
                    return $scope.getRootDn().then(function(rootDn) {
                        if (rootDn && rootDn.trim()) {
                            namingContexts = [rootDn];
                        } else {
                            // Show manual input if we can't determine any naming contexts
                            $scope.browseError = "No naming contexts found in Root DSE. Please use manual DN input.";
                            $scope.showManualDnInput = true;
                            $scope.browseLoading = false;
                            return;
                        }
                        
                        // Create child nodes for the fallback naming context
                        var namingContextNodes = namingContexts.map(function(context, index) {
                            return {
                                dn: context,
                                rdn: context,
                                entry: null,
                                hasChildren: true,
                                expanded: false,
                                children: [],
                                level: 1,
                                selected: false,
                                isNamingContext: true
                            };
                        });
                        
                        rootDseNode.children = namingContextNodes;
                        $scope.browseTree = [rootDseNode];
                        $scope.browseConnected = true;
                        $scope.browseLoading = false;
                    }).catch(function(error) {
                        $scope.browseError = "No naming contexts found and unable to determine root DN: " + error;
                        $scope.showManualDnInput = true;
                        $scope.browseLoading = false;
                    });
                }
                
                // Create child nodes for each naming context
                var namingContextNodes = namingContexts.map(function(context, index) {
                    return {
                        dn: context,
                        rdn: context,
                        entry: null, // Will be loaded when expanded
                        hasChildren: true,
                        expanded: false,
                        children: [],
                        level: 1,
                        selected: false,
                        isNamingContext: true
                    };
                });
                
                rootDseNode.children = namingContextNodes;
                $scope.browseTree = [rootDseNode];
                $scope.browseConnected = true;
                $scope.browseLoading = false;
            })
            .catch(function(error) {
                $scope.browseError = error;
                $scope.browseConnected = false;
                $scope.browseLoading = false;
                // Show manual DN input option if auto-detection fails
                $scope.showManualDnInput = true;
            });
    };
    
    $scope.manualConnectToBrowse = function() {
        if (!$scope.browseRequest.base || $scope.browseRequest.base.trim() === '') {
            $scope.browseError = "Please enter a Base DN";
            return;
        }
        
        $scope.browseLoading = true;
        $scope.browseError = null;
        $scope.browseTree = [];
        $scope.selectedEntry = null;
        $scope.showManualDnInput = false;
        
        // Load the root level with manually entered DN
        $scope.loadTreeLevel($scope.browseRequest.base, null)
            .then(function(children) {
                if (children && children.length > 0) {
                    $scope.browseTree = children;
                    $scope.browseConnected = true;
                } else {
                    // Create a single root node
                    $scope.browseTree = [{
                        dn: $scope.browseRequest.base,
                        rdn: $scope.browseRequest.base,
                        hasChildren: true,
                        expanded: false,
                        children: [],
                        level: 0
                    }];
                    $scope.browseConnected = true;
                }
                $scope.browseLoading = false;
            })
            .catch(function(error) {
                $scope.browseError = error;
                $scope.browseConnected = false;
                $scope.browseLoading = false;
            });
    };
    
    $scope.getRootDse = function() {
        // Prepare request using shared connection config
        var rootDseRequest = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL
        };
        
        // Prepare headers
        var headers = {
            'Content-Type': 'application/json'
        };
        
        // Add Basic Auth if credentials provided
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        return $http({
            method: 'POST',
            url: '/ldap/get-root-dse',
            data: rootDseRequest,
            headers: headers
        }).then(function(response) {
            if (response.data.success && response.data.entries && response.data.entries.length > 0) {
                return response.data.entries[0]; // Return the Root DSE entry
            } else {
                throw new Error(response.data.message || 'Failed to retrieve Root DSE');
            }
        }, function(error) {
            throw new Error('Failed to get Root DSE: ' + (error.data && error.data.message ? error.data.message : error.statusText || 'Unknown error'));
        });
    };
    
    $scope.getRootDn = function() {
        // Prepare request using shared connection config
        var rootDnRequest = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL
        };
        
        // Prepare headers
        var headers = {
            'Content-Type': 'application/json'
        };
        
        // Add Basic Auth if credentials provided
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        return $http({
            method: 'POST',
            url: '/ldap/get-root-dn',
            data: rootDnRequest,
            headers: headers
        }).then(function(response) {
            if (response.data.success && response.data.rootDn) {
                return response.data.rootDn;
            } else {
                throw new Error(response.data.message || 'Failed to retrieve Root DN');
            }
        }, function(error) {
            throw new Error('Failed to get Root DN: ' + (error.data && error.data.message ? error.data.message : error.statusText || 'Unknown error'));
        });
    };
    
    $scope.connectToBrowse = function() {
        if ($scope.browseForm.$invalid) {
            return;
        }
        
        $scope.browseLoading = true;
        $scope.browseError = null;
        $scope.browseTree = [];
        $scope.selectedEntry = null;
        
        // Load the root level
        $scope.loadTreeLevel($scope.browseRequest.base, null)
            .then(function(children) {
                if (children && children.length > 0) {
                    $scope.browseTree = children;
                    $scope.browseConnected = true;
                } else {
                    // Create a single root node
                    $scope.browseTree = [{
                        dn: $scope.browseRequest.base,
                        rdn: $scope.browseRequest.base,
                        hasChildren: true,
                        expanded: false,
                        children: [],
                        level: 0
                    }];
                    $scope.browseConnected = true;
                }
                $scope.browseLoading = false;
            })
            .catch(function(error) {
                $scope.browseError = error;
                $scope.browseConnected = false;
                $scope.browseLoading = false;
            });
    };
    
    $scope.disconnectBrowse = function() {
        $scope.browseConnected = false;
        $scope.browseTree = [];
        $scope.selectedEntry = null;
        $scope.browseError = null;
        $scope.showManualDnInput = false;
    };
    
    $scope.loadTreeLevel = function(baseDn, parentNode) {
        // Prepare search request for this level using shared connection config
        var searchRequest = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL,
            base: baseDn,
            filter: '(objectClass=*)',
            scope: 'one',
            attributes: ['cn', 'ou', 'dc', 'objectClass']
        };
        
        // Prepare headers
        var headers = {
            'Content-Type': 'application/json'
        };
        
        // Add Basic Auth if credentials provided
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        return $http({
            method: 'POST',
            url: '/ldap/ldapsearch',
            data: searchRequest,
            headers: headers
        }).then(function(response) {
            if (response.data.success && response.data.entries) {
                var children = response.data.entries.map(function(entry) {
                    return {
                        dn: entry.dn,
                        rdn: $scope.extractRdn(entry.dn),
                        entry: entry,
                        hasChildren: $scope.hasChildrenIndicators(entry),
                        expanded: false,
                        children: [],
                        level: parentNode ? parentNode.level + 1 : 0,
                        selected: false
                    };
                });
                return children;
            } else {
                throw new Error(response.data.message || response.data.errorMessage || 'Failed to load directory level');
            }
        }, function(error) {
            throw new Error('Request failed: ' + (error.data && error.data.message ? error.data.message : error.statusText || 'Unknown error'));
        });
    };
    
    $scope.toggleNode = function(node, event) {
        event.stopPropagation();
        
        if (!node.hasChildren) {
            return;
        }
        
        if (node.expanded) {
            node.expanded = false;
        } else {
            if (node.children.length === 0) {
                // Special handling for rootDSE - children are already loaded (naming contexts)
                if (node.isRootDse) {
                    node.expanded = true;
                    return;
                }
                
                // Load children
                node.loading = true;
                $scope.loadTreeLevel(node.dn, node)
                    .then(function(children) {
                        node.children = children;
                        node.expanded = true;
                        node.loading = false;
                    })
                    .catch(function(error) {
                        $scope.browseError = error.message || error;
                        node.loading = false;
                    });
            } else {
                node.expanded = true;
            }
        }
    };
    
    $scope.selectNode = function(node) {
        // Clear previous selection
        $scope.clearSelection($scope.browseTree);
        
        // Select this node
        node.selected = true;
        
        // For rootDSE, we already have the entry data
        if (node.isRootDse && node.entry) {
            $scope.selectedEntry = node.entry;
        } else {
            // Load full entry details for other nodes
            $scope.loadEntryDetails(node.dn);
        }
    };
    
    $scope.clearSelection = function(nodes) {
        nodes.forEach(function(node) {
            node.selected = false;
            if (node.children && node.children.length > 0) {
                $scope.clearSelection(node.children);
            }
        });
    };
    
    $scope.loadEntryDetails = function(dn) {
        var searchRequest = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL,
            base: dn,
            filter: '(objectClass=*)',
            scope: 'base',
            attributes: ['*']
        };
        
        var headers = {
            'Content-Type': 'application/json'
        };
        
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        $http({
            method: 'POST',
            url: '/ldap/ldapsearch',
            data: searchRequest,
            headers: headers
        }).then(function(response) {
            if (response.data.success && response.data.entries && response.data.entries.length > 0) {
                $scope.selectedEntry = response.data.entries[0];
            }
        }, function(error) {
            console.error('Failed to load entry details:', error);
        });
    };
    
    $scope.expandAll = function() {
        $scope.expandNodes($scope.browseTree);
    };
    
    $scope.collapseAll = function() {
        $scope.collapseNodes($scope.browseTree);
    };
    
    $scope.expandNodes = function(nodes) {
        nodes.forEach(function(node) {
            if (node.hasChildren && !node.expanded) {
                $scope.toggleNode(node, {stopPropagation: function(){}});
            }
            if (node.children && node.children.length > 0) {
                $scope.expandNodes(node.children);
            }
        });
    };
    
    $scope.collapseNodes = function(nodes) {
        nodes.forEach(function(node) {
            if (node.expanded) {
                node.expanded = false;
            }
            if (node.children && node.children.length > 0) {
                $scope.collapseNodes(node.children);
            }
        });
    };
    
    $scope.extractRdn = function(dn) {
        if (!dn) return '';
        var parts = dn.split(',');
        return parts[0].trim();
    };
    
    $scope.hasChildrenIndicators = function(entry) {
        if (!entry.objectClass) return true; // Assume it might have children
        
        var objectClasses = Array.isArray(entry.objectClass) ? entry.objectClass : [entry.objectClass];
        
        // Common organizational object classes that typically have children
        var organizationalClasses = [
            'organizationalUnit', 'organization', 'domain', 'dcObject',
            'container', 'builtinDomain', 'locality', 'country'
        ];
        
        return objectClasses.some(function(oc) {
            return organizationalClasses.includes(oc.toLowerCase());
        });
    };
    
    $scope.getNodeIcon = function(node) {
        // Special icons for rootDSE and naming contexts
        if (node.isRootDse) {
            return 'fa-server';
        } else if (node.isNamingContext) {
            return 'fa-sitemap';
        }
        
        if (!node.entry || !node.entry.objectClass) {
            return 'fa-folder';
        }
        
        var objectClasses = Array.isArray(node.entry.objectClass) ? node.entry.objectClass : [node.entry.objectClass];
        
        // Determine icon based on object class
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
    };
    
    $scope.getNodeLabel = function(node) {
        // Special labels for rootDSE and naming contexts
        if (node.isRootDse) {
            return 'Root DSE';
        } else if (node.isNamingContext) {
            return node.dn; // Show the full DN for naming contexts
        }
        
        if (!node.rdn) return node.dn || 'Unknown';
        
        // Extract the value part from RDN (e.g., "cn=admin" -> "admin")
        var parts = node.rdn.split('=');
        if (parts.length > 1) {
            return parts[1].trim();
        }
        return node.rdn;
    };
    
    // LDAP Modify functionality
    $scope.performModify = function() {
        if ($scope.modifyForm.$invalid || $scope.modifyRequest.modifications.length === 0) {
            return;
        }
        
        $scope.modifyLoading = true;
        $scope.modifyResult = null;
        
        // Validate modifications
        var validModifications = [];
        for (var i = 0; i < $scope.modifyRequest.modifications.length; i++) {
            var mod = $scope.modifyRequest.modifications[i];
            if (mod.operation && mod.attribute) {
                // Filter out empty values
                var values = mod.values.filter(function(value) {
                    return value && value.trim();
                });
                
                validModifications.push({
                    operation: mod.operation,
                    attribute: mod.attribute,
                    values: values
                });
            }
        }
        
        if (validModifications.length === 0) {
            $scope.modifyResult = {
                success: false,
                errorMessage: 'No valid modifications found'
            };
            $scope.modifyLoading = false;
            return;
        }
        
        // Prepare request payload using shared connection config
        var requestPayload = {
            host: $scope.connectionConfig.host,
            port: $scope.connectionConfig.port,
            useSSL: $scope.connectionConfig.useSSL,
            dn: $scope.modifyRequest.dn,
            modifications: validModifications
        };
        
        // Prepare headers
        var headers = {
            'Content-Type': 'application/json'
        };
        
        // Add Basic Auth
        if ($scope.connectionConfig.bindDn && $scope.connectionConfig.bindDn.trim()) {
            var credentials = btoa($scope.connectionConfig.bindDn + ':' + ($scope.connectionConfig.password || ''));
            headers['Authorization'] = 'Basic ' + credentials;
        }
        
        // Make HTTP request
        $http({
            method: 'POST',
            url: '/ldap/ldapmodify',
            data: requestPayload,
            headers: headers
        }).then(function(response) {
            $scope.modifyResult = response.data;
            $scope.modifyLoading = false;
        }, function(error) {
            $scope.modifyResult = {
                success: false,
                errorMessage: 'Request failed: ' + (error.data && error.data.message ? error.data.message : error.statusText || 'Unknown error')
            };
            $scope.modifyLoading = false;
        });
    };
    
    // Modification management functions
    $scope.addModification = function() {
        $scope.modifyRequest.modifications.push({
            operation: '',
            attribute: '',
            values: ['']
        });
    };
    
    $scope.removeModification = function(index) {
        $scope.modifyRequest.modifications.splice(index, 1);
    };
    
    $scope.addValue = function(modification) {
        modification.values.push('');
    };
    
    $scope.removeValue = function(modification, index) {
        if (modification.values.length > 1) {
            modification.values.splice(index, 1);
        }
    };
    
    // Initialize with one empty modification
    $scope.addModification();
    
    // Ensure default tab is active
    $scope.setActiveTab('connection');
    
    // Initialize connection settings from URL or localStorage
    $scope.initializeConnection();
    
    // Debug: Simple test to verify Angular is working
    $scope.debugMessage = "Angular is working!";
    console.log("Angular controller initialized successfully");
    
}]);
