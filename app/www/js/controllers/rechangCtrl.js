/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-18 17:45:33
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('rechangCtrl', ['$scope','$state','popTotas','utils','userService','socket',
 function($scope,$state,popTotas,utils,userService,socket){
	var vm=this;
	vm.money='';
	vm.cashType=[{id:0,name:'微信'},{id:1,name:'支付宝'},{id:2,name:'资金盘'}];
	vm.defalutCashType=vm.cashType[0];
	vm.defalutMoney=vm.money[1];
	vm.cashUser="";
	vm.obj = utils.get('token');
            if (vm.obj.RoleId=10) {
               socket.onRechange(vm.obj.Id);
            }
            $scope.$on('updateRechange', function(event, data) {
                if (vm.obj.RoleId==10) {
                    popTotas.success('审核通过');
                      vm.getRechange();
                }
            });
	vm.submit=function(){
		vm.model={
			cashtype:vm.defalutCashType.id,
			money:vm.defalutMoney,
			number:vm.cashUser
		}
		cashService.cash(vm.model).then(function(data){
			if(data.code=="I00000"){
				vm.data.unshift(data.data);
				popTotas.success(data.message);
			}else{	
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	};
	vm.recharge = function() {
		if(vm.data.length>0){
			return popTotas.error('充值失败还有待审核订单');
		}
                vm.model = {
                    money: vm.money,
                    uid: vm.obj.Id,
                    name: vm.obj.UserName
                };
                userService.recharge(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                    	vm.money='';
                    	 vm.data.push(data.data);
                         popTotas.success(data.message);
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                })
    };
    vm.getRechange=function(){
    	  userService.getRechange(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                    	vm.data=data.data;
                        // popTotas.success(data.message);
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
          })
    };
    vm.del=function(data){
    	vm.model={
    		rechangId:data.id
    	}
    	 userService.delChange(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                    	vm.getRechange();
                        popTotas.success(data.message);
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
          })
    }
    vm.getRechange();
}])
})();