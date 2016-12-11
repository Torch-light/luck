/*
 * @Author: torchlight
 * @Date:   2016-11-18 23:51:37
 * @Last Modified by:   Weetao
 * @Last Modified time: 2016-12-11 20:30:28
 */
(function() {
    'use strict';
    angular.module('luck').controller('loginCtrl', ['$state', '$scope', 'loginService', 'utils', 'popTotas',
        function($state, $scope, loginService, utils, popTotas) {
            var vm = this;
            vm.model = {
                name: '',
                password: ''
            };
            vm.login = function() {
                if (vm.model.name.length == 0) {
                    popTotas.error('请输入用户名');
                    return false;
                }
                var isName = utils.test(vm.model.name, "string")
                if (isName) {
                    vm.getDate();
                    // vm.getDate()
                } else {
                    popTotas.error('非法字符');
                }
            };
            vm.changePhone = function() {
                vm.model._phone = utils.displayPhone(vm.model._phone);
            };
            vm.register = function() {
                $state.go('register');
            };
            vm.changePassword = function() {
                $state.go('changepassword')
            };
            vm.getDate = function() {
                loginService.login(vm.model).then(function(data) {
                    if (data.code == "I00000") {
                        utils.set('token', data.data)
                        $state.go('home.user')
                    } else {
                        popTotas.error(data.message);
                    }
                }).catch(function(err) {
                    console.log(err.message);
                })
            };

         
        }
    ])
})()