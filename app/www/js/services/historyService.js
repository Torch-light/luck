/*
* @Author: torchlight
* @Date:   2016-11-19 22:37:57
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-02 11:13:44
*/

(function(){
'use strict';
	/**
	*  Module
	*
	* Description
	*/
	angular.module('luck')
	.factory('historyService', ['$q','apiCall', 'config',function($q,apiCall,config){
		var service=apiCall('historyCtrl');
		return {
			getHistory:function(param){
				var defer=$q.defer();
				service(config.baseApi,config.api.login,param,'get',true).success(function(data){
					defer.resolve(data);
				}).error(function(data){
					defer.reject(data);
				});
				return defer.promise;
			}
		}
	}])

})();