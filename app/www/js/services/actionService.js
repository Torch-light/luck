(function() {
    'use strict';
    angular.module('luck').factory('actionService', ['$q', 'apiCall', 'config','utils', 
        function($q, apiCall, config,utils) {
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
                       
                    case '双':
                       
                    case '大':
                       
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
            getTime: function() {
               
                if(utils.get('time')){
                    return utils.get('time');
                }
                var d=new Date(),
                houst = d.getHours(),
                m=d.getMinutes(),
                time = [],
                minutes = m%5==0?m:(m+(5-m%5))
                ;
                while (houst < 24) {
                 
                    if (minutes >= 60) {
                        houst += 1;
                        minutes = 60;
                    };
                    time.push({h:houst,m:minutes});
                    minutes += 5;
                };
                utils.set('time',time);
                return time;
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
            getCathectic: function(model) {
                var defer = $q.defer();
                service(config.baseApi, config.api.getCathectic, model, 'get', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            getAnarchy:function(model){
                var defer = $q.defer();
                service(config.baseApi, config.api.getAnarchy, model, 'get', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            getNum:function(model){
                var defer = $q.defer();
                service(config.baseApi, config.api.getNum, model, 'get', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            },
            delete:function(model){
                var defer = $q.defer();
                service(config.baseApi, config.api.del, model, 'post', true).success(function(data) {
                    defer.resolve(data);
                }).error(function(data) {
                    defer.reject(data);
                });
                return defer.promise;
            }
        }
        return actionService;
    }])
})();