/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:00
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-10 11:13:31
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('registerCtrl', ['$state','userService','popTotas', function($state,userService,popTotas){
	var vm=this;
	vm.model={
		name:'',
		password:'',
		code:''
	}
	vm.login=function(){
		$state.go('login');
	};
	vm.register=function(){
		userService.register(vm.model).then(function(data){
			if(data.code=="I00000"){
				popTotas.success(data.message);
				$state.go('login');
			}else{
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	}
}])
})()