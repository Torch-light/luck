/*
* @Author: torchlight
* @Date:   2016-11-19 22:37:57
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-11 16:29:57
*/

(function(){
'use strict';
	/**
	*  Module
	*
	* Description
	*/
	angular.module('luck')
	.factory('loginService', ['$q','apiCall', 'config',function($q,apiCall,config){
		var service=apiCall('loginCtrl');
		return {
			login:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.login,param,'post',false).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			}
			// login:function(param){
			// 	var defer=$q.defer();
			// 	service(config.baseApi,config.api.login,'','get',false).success(function(data){
			// 		defer.resolve(data);
			// 	}).error(function(data){
			// 		defer.reject(data);
			// 	});
			// 	return defer.promise;
			// }
		}
	}])

})();