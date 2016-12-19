/*
 * @Author: torchlight
 * @Date:   2016-11-18 23:53:55
 * @Last Modified by:   Weetao
 * @Last Modified time: 2016-12-18 21:05:27
 */
(function() {
    'use strict';
    /**
     *  Module
     *
     * Description
     */
    angular.module('luck').
    controller('historyCtrl', ['$state', 'actionService', function($state, actionService) {
        var vm = this;
        vm.text = "走势图";
        vm.isTable = 0;
        vm.fliteString=function(obj) {
            var chart=[];
            angular.forEach(obj, function(value, key) {
                var array = '',
                array = value.num.match(/\=\s\d+/);
                chart.push({num:array[0].substring(1, array[0].length),id:value.id});
            });
           return chart;
        }
        vm.getNum = function() {
            actionService.getCathectic({
                stime: '111'
            }).then(function(data) {
                if (data.code == "I00000") {
                    vm.data = data.data;
                } else {
                    popTotas.error(data.message);
                }
            }).catch(function(err) {
                popTotas.error(err.message)
            });
        };
        vm.changeTable = function(n) {
            vm.isTable = n;

            if (n == 1) {
                vm.chartData = vm.fliteString(vm.data);
            }
        }
        vm.getNum();
    }])
})();