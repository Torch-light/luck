/*
* @Author: torchlight
* @Date:   2016-11-19 22:37:57
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-18 12:24:53
*/

(function(){
'use strict';
	/**
	*  Module
	*
	* Description
	*/
	angular.module('luck')
	.factory('userService', ['$q','apiCall', 'config',function($q,apiCall,config){
		var service=apiCall('userCtrl');
		return {
			recharge:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.recharge,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getUsers:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.getUsers,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			register:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.register,param,'post',false).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getRecharegeTotal:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.allTotal,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getAction:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.action,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getRechange:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.getRechange,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			delChange:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.delChange,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	}])

})();