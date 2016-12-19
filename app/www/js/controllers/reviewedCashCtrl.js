
(function(){
'use strict';
/**
*  Module
*
* Description
*/
angular.module('luck').
controller('reviewedCashCtrl', ['$scope','$state','utils','reviewedService','popTotas','socket',
 function($scope,$state,utils,reviewedService,popTotas,socket){
	var vm=this;
	vm.obj = utils.get('token');
            if (vm.obj.RoleId <=1) {
                socket.onCash(0);
            }else{
                socket.onCash(vm.obj.Id);
            }
            $scope.$on('updateCash',function(event,data){
                if (vm.obj.RoleId < 3&&data!=true) {
                	vm.data.unshift(data);
                    popTotas.info('有用户提现');
                }
            });
	vm.getReviewedCash=function(){
		vm.model={
			type:'cash'
		}
		reviewedService.getAll(vm.model).then(function(data){
			if(data.code=="I00000"){
				vm.data=data.data;
			}else{
			popTotas.error(data.message);	
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	};
	vm.submit=function(data,index){
		vm.model={
			cashId:data.id,
			userId:data.uid
		}
		reviewedService.setCash(vm.model).then(function(data){
			if(data.code=="I00000"){
				popTotas.success(data.message);
				vm.data.splice(index,1);
			}else{
			popTotas.error(data.message);	
			}
		}).catch(function(err){
			popTotas.error(err.message);
		})
	}
	vm.getReviewedCash();
}])
})();