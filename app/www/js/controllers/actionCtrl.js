/*
 * @Author: torchlight
 * @Date:   2016-11-18 23:53:55
 * @Last Modified by:   Weetao
 * @Last Modified time: 2016-12-11 22:34:38
 */
(function() {
    'use strict';
    /**
     *  Module
     *
     * Description
     */
    angular.module('luck').
    controller('actionCtrl', ['$state', '$scope','socket','utils', 'actionService', 'popTotas', 'userService',
        function($state, $scope,socket,utils, actionService, popTotas, userService) {
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
            if(seesion.RoleId==10){

                 socket.onAction(seesion.mark);
            }else if(seesion.RoleId<=1){
                socket.onAction(0);
            }else{
                socket.onAction(seesion.Id);
            }
           
            $scope.$on('updateAction',function(event,data){
                if(data.name!=seesion.UserName){

                vm.data.unshift(data);
                }
            })
            // vm.Time = actionService.getTime();
            vm.init = function() {
                date = new Date();
                var m = date.getMinutes();
                if (m % 5 == 0 && !vm.isOpen) {
                    vm.indexTime = 60 - date.getSeconds();
                } else {
                    vm.indexTime = ((5 - m % 5) * 60 - date.getSeconds()) + 68;
                };
                if (vm.indexTime < 45) {
                    popTotas.info('封盘');
                    vm.isStop = false;
                    vm.isMessage = "封盘";      
                }
                var loop = setInterval(function() {
                    if (vm.indexTime > 0) {
                        vm.indexTime--;
                        if(vm.indexTime < 45){
                            vm.isStop = false;
                            if(vm.isMessage != "封盘"){

                            vm.isMessage = "封盘"; 
                            }
                        }
                    } else {
                        clearInterval(loop);
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
                    popTotas.error('已经封盘');
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
                        vm.result = data.data;
                        vm.getAllNum()
                        // } else {
                        //     if( vm.isMessage != "获取结果"){

                        //     vm.isMessage = "获取结果";  
                        //     }
                        //     timeMax++;
                        //     if(timeMax>=10){
                        //         clearInterval(loopGet);
                        //         popTotas.error('超时');
                        //         return false;
                        //     }
                        //     if (data.data.id != vm.result.id) {
                        //         vm.result = data.data;
                        //         vm.isOpen = false;
                        //         vm.isStop = true;
                        //         vm.isMessage = "可以下注";
                        //         if (loopGet) {
                        //             clearInterval(loopGet);
                        //         }
                        //     }
                        // }
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            };
            vm.addBets = function() {
                vm.model.num = vm.result.id+1;
                if(vm.model.money<50){
                    popTotas.error('下注金额不能低于50');
                    return false;
                }
                actionService.addBets(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                        vm.data.unshift(data.data);
                        vm.model.action = "";
                        vm.points = vm.points-vm.model.money;
                        popTotas.success(data.message);
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            };
            // vm.seconeos = function() {
            //     var loop = setInterval(function() {
            //         if (vm.indexTime > 0) {
            //             vm.indexTime--;
            //         } else {
            //             clearInterval(loop);
            //             vm.getLoop();
            //             // vm.init();
            //         }
            //         $scope.$apply()
            //     }, 1000)
            // };
            vm.delete=function(n){
                var num={
                    num:n.id
                }
                actionService.delete(num).then(function(data) {
                    if (data.code == "I00000") {
                         vm.getPoints();
                         vm.getAllNum();
                        popTotas.success(data.message);

                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    popTotas.error(err.message)
                });
            }
            vm.getSystemAnarchy = function() {
                actionService.getAnarchy().then(function(data) {
                    if (data.code == "I00000") {
                        vm.system = data.data.updateNum;
                        if (vm.system) {
                            if( vm.isMessage != "获取结果"){
                            vm.isMessage = "获取结果";  
                            }
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
            vm.getAllNum=function(){

                if(!vm.isStop){
                    return false;
                }
                var obj={
                    num:vm.result.id+1
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
         
        }
    ])
})();