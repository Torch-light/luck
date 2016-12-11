(function() {
    'use strict';
    angular.module('luck').factory('socket', ['$rootScope',
        function($rootScope) {
            var socket = io('localhost:8805');
            var newSocket = {
                onAction: function(id) {
                    socket.on('action-'+id, function(data) {
                        	$rootScope.$broadcast('updateAction',data);
                    });
                },
                onRechange:function(id){
                	socket.on('rechange-'+id, function(data) {
                        debugger;
                        	$rootScope.$broadcast('updateRechange',data);
                    });
                }
            }
            return newSocket;
        }
    ])
})();