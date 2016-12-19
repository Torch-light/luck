/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-18 18:13:23
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('reviewedCtrl', ['$state','$scope','utils','reviewedService','popTotas', 'socket',
	function($state,$scope,utils,reviewedService,popTotas,socket){
	var vm=this;
	vm.obj = utils.get('token');
	  if (vm.obj.RoleId <=1) {
                socket.onRechange(0);
      		}else{
                socket.onRechange(vm.obj.Id);
     }
	 $scope.$on('updateRechange', function(event, data) {
                if (vm.obj.RoleId < 3&&data!=true) {
                	vm.data.unshift(data);
                	popTotas.success('有用户充值');
                }
     });
	vm.getAll=function(){
		vm.model={
			type:'rechange'
		}
		reviewedService.getAll(vm.model).then(function(data){
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