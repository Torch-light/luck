(function(){
	'use strict';
angular.module('luck')
	.factory('popTotas', ['$rootScope','$timeout','toastr',
		function($rootScope,$timeout,toastr) {
		var pop = {
			success: function(_str) {
				  toastr.success(_str);
			},
			error: function(_str) {
				  toastr.error(_str);
			},
			info:function(_str){

				  toastr.info(_str);
			}
		}

		return pop;

	}])

})();
