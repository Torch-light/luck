(function() {
    'use strict';
    angular.module('luck').factory('socket', ['$rootScope','config',
        function($rootScope,config) {
            var socket = io(config.url);
            var newSocket = {
                onAction: function(id) {
                    socket.on('action-'+id, function(data) {
                        	$rootScope.$broadcast('updateAction',data);
                    });
                },
                onRechange:function(id){
                	socket.on('recharge-'+id, function(data) {
                        	$rootScope.$broadcast('updateRechange',data);
                    });
                },
                onResult:function(){
                    socket.on('result-0', function(data) {
                            $rootScope.$broadcast('updateResult',data);
                    });
                },
                onCash:function(id){
                     socket.on('cash-'+id, function(data) {
                        $rootScope.$broadcast('updateCash',data);
                    });
                }
            }
            return newSocket;
        }
    ])
})();