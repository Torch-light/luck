/*
* @Author: torchlight
* @Date:   2016-11-19 22:37:57
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-10 10:49:13
*/

(function(){
'use strict';
	/**
	*  Module
	*
	* Description
	*/
	angular.module('luck')
	.factory('manageService', ['$q','apiCall', 'config',function($q,apiCall,config){
		var service=apiCall('manageCtrl');
		return {
			getAllUser:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.getAllUser,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			setting:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.seetingUser,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;	
			}
		}
	}])

})();