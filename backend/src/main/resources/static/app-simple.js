// LDAP Tool Angular Application - Simplified for debugging
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
    
    // Shared connection configuration
    $scope.connectionConfig = {
        host: '',
        port: null,
        useSSL: false,
        bindDn: '',
        password: '',
        connected: false
    };
    
    // Saved connections management - simplified
    $scope.savedConnections = [];
    $scope.selectedSavedConnection = '';
    $scope.newConnectionName = '';
    $scope.showSaveForm = false;
    
    // Placeholder functions
    $scope.saveConnection = function() { 
        alert('Save function called - simplified version'); 
    };
    $scope.loadSavedConnections = function() { 
        console.log('loadSavedConnections called'); 
    };
    $scope.loadSavedConnection = function() { 
        console.log('loadSavedConnection called'); 
    };
    $scope.deleteSavedConnection = function() { 
        console.log('deleteSavedConnection called'); 
    };
    $scope.generateBookmarkUrl = function() { 
        alert('Bookmark URL feature - simplified version'); 
    };
    
    // Initialize search request object
    $scope.searchRequest = {
        base: '',
        filter: '(objectClass=*)',
        scope: 'sub',
        attributes: []
    };
    
    // Initialize modify request object
    $scope.modifyRequest = {
        dn: '',
        modifications: []
    };
    
    // Initialize browse request object
    $scope.browseRequest = {
        base: ''
    };
    
    // Browse state
    $scope.browseLoading = false;
    $scope.browseConnected = false;
    $scope.browseTree = [];
    $scope.selectedEntry = null;
    $scope.browseError = null;
    $scope.showManualDnInput = false;
    
    // Connection testing state
    $scope.connectionTesting = false;
    $scope.connectionTestResult = null;
    
    // Results storage
    $scope.searchResult = null;
    $scope.modifyResult = null;
    
    // Helper for attributes string
    $scope.attributesString = '';
    
    // View mode for search results
    $scope.viewMode = 'formatted';
    
    // Tab management
    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
        // Clear results when switching tabs
        if (tab === 'search') {
            $scope.modifyResult = null;
            $scope.browseError = null;
        } else if (tab === 'browse') {
            $scope.searchResult = null;
            $scope.modifyResult = null;
            // Auto-connect to browse if connection is established and not already browsing
            if ($scope.connectionConfig.connected && !$scope.browseConnected && !$scope.browseLoading) {
                // Small delay to ensure UI is ready
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.autoConnectToBrowse();
                    });
                }, 100);
            }
        } else if (tab === 'modify') {
            $scope.searchResult = null;
            $scope.browseError = null;
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
    
    // Debug: Simple test to verify Angular is working
    $scope.debugMessage = "Angular is working!";
    console.log("Angular controller initialized successfully - simplified version");
    
}]);
