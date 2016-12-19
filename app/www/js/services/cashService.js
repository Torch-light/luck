/*
* @Author: torchlight
* @Date:   2016-11-19 22:37:57
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-16 17:18:48
*/

(function(){
'use strict';
	/**
	*  Module
	*
	* Description
	*/
	angular.module('luck')
	.factory('cashService', ['$q','apiCall', 'config',function($q,apiCall,config){
		var service=apiCall('cashCtrl');
		return {
			cash:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.cash,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getCash:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.getCash,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	}])

})();