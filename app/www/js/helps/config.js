/*
* @Author: torchlight
* @Date:   2016-11-18 23:43:21
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-18 22:11:22
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
	var url="http://www.torchlight.top:8808"
	var baseApi="http://www.torchlight.top/api/"
	// var url='http://localhost:8808';
	// var baseApi='http://localhost:8865/api/';
	var Api={
		// login:'api/event',
		login:'login',
		register:'register',
		addbets:'addbets',
		recharge:'recharge',
		reviewed:'reviewed',
		submit:'submit',
		getUsers:'users',
		createCode:'addcode',
		getCode:'getCode',
		allTotal:'rechargetotal',
		getHistory:'history',
		getCathectic:'getHistory',
		getAnarchy:'getAnarchy',
		getNum:'getNum',
		getAllUser:'allusers',
		seetingUser:'seeting',
		del:'delaction',
		action:'action',
		cash:'cash',
		getCash:'getcash',
		setCash:'setcash',
		getRechange:'getRechange',
		delChange:'delChange'
	}
	return {
		baseApi:baseApi,
		api:Api,
		url:url
	}
}])

})();