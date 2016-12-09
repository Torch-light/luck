/*
 * @Author: torchlight
 * @Date:   2016-11-18 23:53:55
 * @Last Modified by:   Weetao
 * @Last Modified time: 2016-12-09 20:32:16
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
        function($state, $scope, utils, actionService, popTotas, userService) {
            var vm = this;
            var seesion = utils.get('token');
            var date = new Date(),
                flag, loopGet,timeMax=1;
            vm.isOpen = false;
            vm.isStop = true;
            vm.data = [];
            vm.isMessage = "可下注";
            vm.model = {
                name: seesion.UserName,
                action: '',
                time: '',
                money: '',
                multiple: '',
                id: seesion.Id,
                num: ''
            };
            // vm.Time = actionService.getTime();
            vm.init = function() {
                date = new Date();
                var m = date.getMinutes();
                if (m % 5 == 0 && !vm.isOpen) {
                    vm.indexTime = 60 - date.getSeconds();
                } else {
                    vm.indexTime = ((5 - m % 5) * 60 - date.getSeconds()) + 63;
                };
                if (vm.indexTime < 45||!vm.isStop) {
                            popTotas.info('封盘禁止下注');
                            vm.isStop = false;
                            vm.isMessage = "封盘禁止下注";
                }
                var loop = setInterval(function() {
                    if (vm.indexTime > 0) {
                        vm.indexTime--;
                        
                    } else {
                        clearInterval(loop);
                        vm.getLoop();
                        // vm.init();
                    }
                    $scope.$apply()
                }, 1000)
            };
            vm.getPoints = function() {
                vm.user = {
                    id: seesion.Id
                };
                userService.getUsers(vm.user).then(function(data) {
                    if (data.code == "I00000") {
                        vm.points = data.data.points;
                        if (vm.points < 1000) {
                            popTotas.error('积分不足' + vm.points);
                        }
                    }
                }).catch(function(err) {
                    popTotas.error(err.message);
                })
            };
            vm.action = function() {
                if (!vm.isStop) {
                    popTotas.error('已经封盘，禁止操作');
                }
                var bol = actionService.filter(vm.model);
                if (bol) {
                    popTotas.error('非法输入');
                    vm.model.action = '';
                    return false;
                } else {
                    if (vm.model.money <= vm.points) {
                        vm.addBets()
                    } else {
                        popTotas.error('余额不足');
                    }
                }
            };
            vm.getNum = function() {
                actionService.getCathectic().then(function(data) {
                    if (data.code == "I00000") {
                        if (!vm.result) {
                            vm.result = data.data;
                             vm.getAllNum({num:vm.result.id+1});
                        } else {
                            timeMax++;
                            if(timeMax>=10){
                                clearInterval(loopGet);
                                popTotas.error('超时');
                                return false;
                            }
                            if (data.data.id != vm.result.id) {
                                vm.result = data.data;
                                vm.isOpen = false;
                                vm.isStop = true;
                                vm.isMessage = "可以下注";
                                if (loopGet) {
                                    clearInterval(loopGet);
                                }
                            }
                        }
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            };
            vm.addBets = function() {
                vm.model.num = vm.result.id+1;
                actionService.addBets(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                       
                        vm.model.action = "";
                        vm.points = data.data;
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            };
            vm.getLoop = function() {
                vm.isOpen = true;
                vm.isStop = false;
                vm.init();
                loopGet = setInterval(function() {
                    vm.getNum();
                }, 10000)
            };
            vm.getAction = function() {

                actionService.getAction({
                    num: vm.result.id
                }).then(function(data) {
                    if (data.code == "I00000") {} else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            }
            vm.seconeos = function() {
                var loop = setInterval(function() {
                    if (vm.indexTime > 0) {
                        vm.indexTime--;
                    } else {
                        clearInterval(loop);
                        vm.getLoop();
                        // vm.init();
                    }
                    $scope.$apply()
                }, 1000)
            };
            vm.getSystemAnarchy = function() {
                actionService.getAnarchy().then(function(data) {
                    if (data.code == "I00000") {
                        vm.system = data.data.updateNum;
                        if (vm.system) {
                            vm.getLoop();
                        } else {
                            vm.init();
                        }
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            };
            vm.getAllNum=function(obj){
                if(!vm.isStop){
                    return false;
                }
                actionService.getNum(obj).then(function(data){
                     if (data.code == "I00000") {
                        vm.data=data.data;
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err){
                    popTotas.error(err.message)
                })
            };
            vm.getNum();
            vm.getPoints();
            vm.getSystemAnarchy();
            // var loopGetAllNum = setInterval(function() {

            //         vm.getAllNum({num:vm.result.id+1});
            // }, 10000)
        }
    ])
})();