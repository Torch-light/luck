/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-17 19:26:49
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('seetingCtrl', ['$state','utils', function($state,utils){
	var vm=this;
	vm.out=function(){
		debugger;
		utils.clear('token');
		$state.go('login');
	}
}])
})();