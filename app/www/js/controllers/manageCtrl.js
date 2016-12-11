/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-10 11:56:42
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('manageCtrl', ['manageService','utils','popTotas', function(manageService,utils,popTotas){
	var vm=this;
	vm.obj=utils.get('token');
	vm.getAllUser=function(){
		manageService.getAllUser().then(function(data){
				if(data.code=="I00000"){
					vm.data=data.data;
				}else{	
					popTotas.error(data.message);
				}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	};
	vm.setting=function(n,obj){
		vm.model={
			_roleid:n,
			_id:obj.id
		}
		manageService.setting(vm.model).then(function(data){
				if(data.code=="I00000"){
					popTotas.success(data.message);
					vm.getAllUser();
				}else{	
					popTotas.error(data.message);
				}
		}).catch(function(err){
			popTotas.error(err.message);
		})	
	}
	vm.getAllUser();
}])
})();