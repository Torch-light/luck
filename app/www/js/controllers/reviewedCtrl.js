/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-11-28 15:48:00
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('reviewedCtrl', ['$state','utils','reviewedService','popTotas', function($state,utils,reviewedService,popTotas){
	var vm=this;
	vm.getAll=function(){
		
		reviewedService.getAll().then(function(data){
			if(data.code=="I00000"){
				vm.data=data.data;
			}else{
			popTotas.error(data.message);	
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	};
	vm.getOnce=function(){
		reviewedService.getAll().then(function(data){

			if(data.code=="I00000"){
				vm.data.push(data.data);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	}
	vm.getAll();
	vm.submit=function(obj,index){
		vm.model={
			id:obj.id,
			uid:obj.uid,
			money:obj.money
		};
		reviewedService.submit(vm.model).then(function(data){
			if(data.code=="I00000"){
				popTotas.success(data.message);
				vm.data.splice(index,1);
			}else{
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	}
}])
})();