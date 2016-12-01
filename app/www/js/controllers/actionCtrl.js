/*
 * @Author: torchlight
 * @Date:   2016-11-18 23:53:55
 * @Last Modified by:   Weetao
 * @Last Modified time: 2016-11-29 15:30:05
 */
(function() {
    'use strict';
    /**
     *  Module
     *
     * Description
     */
    angular.module('luck').
    controller('actionCtrl', ['$state', '$scope', 'utils', 'actionService', 'popTotas', 'userService',
        function($state, $scope, utils, actionService, popTotas,userService) {
        var vm = this;
        var seesion = utils.get('token');
        vm.data = [];
        vm.model = {
            name: seesion.UserName,
            action: '',
            time: '',
            money: '',
            multiple: '',
            id:seesion.Id
        };
        vm.getPoints = function() {
            vm.user = {
                id: seesion.Id
            };
            userService.getUsers(vm.user).then(function(data) {
                if (data.code == "I00000") {
                   vm.points=data.data.points;
                   if(vm.points<1000){
                        popTotas.error('积分不足'+vm.points);    
                   }
                }
            }).catch(function(err) {
                popTotas.error(err.message);
            })
        }
        vm.action = function() {
            var date = new Date();
            var bol = actionService.filter(vm.model);
            if (bol) {
                popTotas.error('非法输入');
                vm.model.action = '';
                return false;
            } else {
                if(vm.model.money<=vm.points)
                vm.addBets()
                else{
                    popTotas.error('余额不足');
                }
            }
        };
        vm.addBets = function() {
            actionService.addBets(vm.model).then(function(data) {
                if (data.code == "I00000") {
                    vm.data.unshift(vm.model.action + ':￥' + vm.model.money);
                    vm.model.action = "";
                   vm.points=data.data;
                } else {
                    popTotas.error(data.message);
                }
            }).catch(function(err) {
                popTotas.error(err.message)
            });
        };
      vm.getPoints();
    }])
})();