/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-18 18:04:13
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('cashCtrl', ['$scope','$state','cashService','popTotas','socket','utils',
 function($scope,$state,cashService,popTotas,socket,utils){
	var vm=this;
	vm.money=[100,500,1000,5000];
	vm.cashType=[{id:0,name:'微信'},{id:1,name:'支付宝'},{id:2,name:'资金盘'}];
	vm.defalutCashType=vm.cashType[0];
	vm.defalutMoney=vm.money[1];
	vm.cashUser="";
	vm.obj = utils.get('token');
            if (vm.obj.RoleId ==10) {
                socket.onCash(vm.obj.Id);
            }
            $scope.$on('updateCash',function(event,data){
                if (vm.obj.RoleId==10) {
                    popTotas.success('提现审核通过');
                    vm.getCash();
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
	vm.getCash=function(){
			cashService.getCash().then(function(data){
			if(data.code=="I00000"){
				vm.data=data.data;

				// popTotas.success(data.message);
			}else{	
				popTotas.error(data.message);
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	};
	vm.getCash();

}])
})();