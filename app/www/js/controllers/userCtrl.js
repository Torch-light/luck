/*
 * @Author: torchlight
 * @Date:   2016-11-18 23:53:55
 * @Last Modified by:   Weetao
 * @Last Modified time: 2016-12-11 20:29:43
 */
(function() {
    'use strict';
    /**
     *  Module
     *
     * Description
     */
    angular.module('luck').
    controller('userCtrl', ['$scope', '$state', 'socket', 'utils', 'userService', 'popTotas',
        function($scope, $state, socket, utils, userService, popTotas) {
            var vm = this;
            vm.points = 0;
            vm.money = [100, 200, 500, 1000, 2000, 5000];
            vm.obj = utils.get('token');
            vm.img = "img/mr.png";
            vm.date = new Date();
            setInterval(function() {
                vm.date = new Date();
                $scope.$apply()
            }, 1000)
            if (vm.obj.RoleId < 3) {
                socket.onRechange(vm.obj.Id);
            }
            $scope.$on('updateRechange', function(event, data) {
                if (vm.obj.RoleId < 3&&data!=vm.obj.Id) {
                    popTotas.info('有用户充值');
                }

            })
            vm.recharge = function(money) {
                vm.model = {
                    money: money,
                    uid: vm.obj.Id,
                    name: vm.obj.UserName
                };
                userService.recharge(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                        popTotas.success(data.message);
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                })
            };
            vm.getUsers = function() {
               
                userService.getUsers().then(function(data) {
                    if (data.code == "I00000") {
                        vm.data = data.data;
                    }
                }).catch(function(err) {
                    popTotas.error(err.message);
                })
            };
            vm.goReviewed = function() {
                $state.go('reviewed');
            };
            vm.goInvite = function() {
                $state.go('invite');
            };
            vm.gomanage = function() {
                $state.go('manage');
            }
            vm.getUsers();
        }
    ])
})();