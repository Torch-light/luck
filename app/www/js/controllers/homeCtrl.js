/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-18 18:05:49
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('homeCtrl', ['$state','$http','$scope','popTotas','utils','socket',
	function($state,$http,$scope,popTotas,utils,socket){
	var vm=this;
	vm.obj = utils.get('token');
            if (vm.obj.RoleId <=1) {
                socket.onRechange(0);
                socket.onCash(0);
            }else{
                socket.onRechange(vm.obj.Id);
                socket.onCash(vm.obj.Id);
            }
            $scope.$on('updateRechange', function(event, data) {
            	console.log(1);
                if (vm.obj.RoleId < 3&&data!=vm.obj.Id) {
                    popTotas.info('有用户充值');
                }
            });
            $scope.$on('updateCash',function(event,data){
                if (vm.obj.RoleId < 3&&data!=true) {
                    popTotas.info('有用户提现');
                }
            });
}])
})();