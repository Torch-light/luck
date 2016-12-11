/*
* @Author: torchlight
* @Date:   2016-11-18 23:53:55
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-10 20:25:30
*/
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('historyCtrl', ['$state','actionService', function($state,actionService){
	var vm=this;
	   vm.getNum = function() {
                actionService.getCathectic({stime:'111'}).then(function(data) {
                    if (data.code == "I00000") {
                       vm.data=data.data;
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            };
             vm.getNum();
        vm.goMine=function(){
        	$state.go('mineHistory');
        }
}])
})();