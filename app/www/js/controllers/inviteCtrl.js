/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-10 11:48:45
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('inviteCtrl', ['$state','$http','$scope','popTotas','utils','actionService',function($state,$http,$scope,popTotas,utils,actionService){
	var vm=this;
	vm.selectNum=[1,5,10,50,100];
	vm.num=vm.selectNum[0];
	vm.seeion=utils.get('token');
	vm.submit=function(){
		if(vm.seeion.RoleId>2){
			popTotas.error('没有权限');
			return  false;
		}
		if(vm.notCode.length>1){
			popTotas.error('还有未使用的code');
			return  false;
		}
		vm.model={
			num:vm.num,
			name:vm.seeion.UserName,
			roleId:vm.seeion.RoleId
		}
		vm.creatCode();
	};
	vm.creatCode=function(){
		actionService.creteCode(vm.model).then(function(data){
			if(data.code=="I00000"){
				vm.code=data.data;
			}else{
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})

	};
	vm.getRecharegeTotal=function(){
		userService.getRecharegeTotal({id:vm.seeion.Id}).then(function(data){
			if(data.code="I00000"){

			}else{
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})		
	};
	vm.getNotCode=function(){
		actionService.getCode().then(function(data){
			if(data.code=="I00000"){
				vm.notCode=data.data;
			}else{
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	}
	vm.changeSelectNum=function(obj){
		vm.num=obj;
	};
	vm.getNotCode();
}])
})();