(function() {
    'use strict';
    angular.module('luck').factory('actionService', ['$q', 'apiCall', 'config', function($q, apiCall, config) {
        var service = apiCall('actionCtrl');
        var actionService = {
            filter: function($obj) {
                if (!$obj.action.match(/(大单|大双|小单|小双|[0-9]+操|大|小|单|双|极大|极小)[0-9]+/)) {
                    return true;
                }
                if ($obj.action.match(/[0-9]+操[0-9]+/)) {
                    $obj.money = $obj.action.match(/[0-9]+操/)[0];
                    var num = $obj.action.match(/操[0-9]+/)[0];
                    $obj.money = $obj.money.substring(0, $obj.money.length - 1);
                } else {
                    $obj.money = $obj.action.match(/[0-9]+/)[0];
                }
                $obj.action = $obj.action.match(/(大单|大双|小单|小双|操|大|小|单|双|极大|极小)+/)[0];
                switch ($obj.action) {
                    case '大单':
                    case '大双':
                    case '小单':
                    case '小双':
                        $obj.multiple = 4;
                        break;
                    case '单':
                        break;
                    case '双':
                        break;
                    case '大':
                        break;
                    case '小':
                        $obj.multiple = 2;
                        break;
                    case '极大':
                    case '极小':
                        $obj.multiple = 2.5;
                        break;
                    case '操':
                        $obj.multiple = 13;
                        $obj.action = num;
                        break;
                    default:
                        return true;
                }
            },
            addBets: function(model) {
                var defer = $q.defer();
                service(config.baseApi, config.api.addbets, model, 'post', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            creteCode: function(model) {
                var defer = $q.defer();
                service(config.baseApi, config.api.createCode, model, 'post', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            getCode: function(model) {
                var defer = $q.defer();
                service(config.baseApi, config.api.getCode, model, 'get', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
        }
        return actionService;
    }])
})();