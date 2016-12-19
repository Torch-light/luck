/*
* @Author: torchlight
* @Date:   2016-11-19 22:37:57
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-17 16:20:09
*/

(function(){
'use strict';
	/**
	*  Module
	*
	* Description
	*/
	angular.module('luck')
	.factory('reviewedService', ['$q','apiCall', 'config',function($q,apiCall,config){
		var service=apiCall('loginCtrl');
		return {
			getAll:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.reviewed,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getOnce:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.reviewed,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			submit:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.submit,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			getReviewedCash:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.getReviewedCash,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			},
			setCash:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.setCash,param,'post',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;	
			}
		}
	}])

})();