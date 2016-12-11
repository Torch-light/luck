/*
* @Author: torchlight
* @Date:   2016-11-18 23:43:21
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-11 16:30:03
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
		// login:'api/event',
		login:'api/login',
		register:'api/register',
		addbets:'api/addbets',
		recharge:'api/recharge',
		reviewed:'api/reviewed',
		submit:'api/submit',
		getUsers:'api/users',
		createCode:'api/addcode',
		getCode:'api/getCode',
		allTotal:'api/rechargetotal',
		getHistory:'api/history',
		getCathectic:'api/getHistory',
		getAnarchy:'api/getAnarchy',
		getNum:'api/getNum',
		getAllUser:'api/allusers',
		seetingUser:'api/seeting',
		del:'api/delaction',
		action:'api/action'
	}
	return {
		baseApi:baseApi,
		api:Api
	}
}])

})();