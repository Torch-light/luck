/*
* @Author: torchlight
* @Date:   2016-11-18 23:43:21
* @Last Modified by:   Weetao
* @Last Modified time: 2016-11-29 10:24:11
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck')
.factory('config', [function(){
	var baseApi='http://localhost:8865/';
	var Api={
		login:'api/login',
		register:'api/register',
		addbets:'api/addbets',
		recharge:'api/recharge',
		reviewed:'api/reviewed',
		submit:'api/submit',
		getUsers:'api/users',
		createCode:'api/addcode',
		getCode:'api/getCode'
	}
	return {
		baseApi:baseApi,
		api:Api
	}
}])

})();