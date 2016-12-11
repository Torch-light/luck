/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-10 20:24:24
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('mineHistoryCtrl', ['userService','popTotas', function(userService,popTotas){
	var vm=this;
	vm.getAction=function(){
		userService.getAction().then(function(data){
			if(data.code=="I00000"){
				vm.data=data.data
			}else{
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(data.message);
		})
	}
		vm.getAction();
}])
})();