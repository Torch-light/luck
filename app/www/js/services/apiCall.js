/*
* @Author: torchlight
* @Date:   2016-11-19 22:01:23
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-17 18:35:45
*/

(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
factory('apiCall', ['$q','$http', '$state','$location','utils',
	function($q,$http,$state,$location,utils){
	var serviceCall=function(ctrlName){
		var mosaic = function(param) {
				var u = "?";
				for (var x in param) {
						u = u + x + '=' + param[x] + '&';
				}
				u = u.substr(0, u.length - 1);
	            return u;
			};
		var getDate=function(url,param,methodType){
			var result={};result.$promist=null;
			if(!methodType){
				methodType='get';
			}
			methodType=methodType.toLowerCase();
			switch(methodType){
				case 'get':
				result.$promist=$http.get(url+mosaic(param));
				break;
				case 'post':
				result.$promist=$http.post(url,param);
				break;
				case 'delete':
				result.$promist=$http['delete'](url,{params:param});
				break;
				case 'jsonp':
				result.$promist=$http.get(url+mosaic(param));
				break;
				case 'put':
				result.$promist=$http.get(url,param);
				break;
			};
			return result.$promist;
		};
		var addToken=function(needToken){
			if(needToken){
				var token=utils.get('token').Token;
				if(token){
					$http.defaults.headers.common.Authorization = 'Bearer ' + token || null;
				}else{
					$state.go('login');
				};
			};
		};
		return function(baseUrl,action,param,methodType,needToken){
			var url=baseUrl+action;
			var result={};
			addToken(needToken);
			result=getDate(url,param,methodType);
			return result;
		};
	};
	return serviceCall;
}])
})();