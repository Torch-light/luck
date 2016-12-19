


(function(){
angular.module('luck').
filter('stringFilter',[function(){
    return function(n){
    	var n=n-0;
    	var str='';
    	switch(n){
    		case n>13:
    		str='大';
    		if(n%2==0){
    			str+='双';
    		}else{
    			str+='单';
    		}
    		break;
    		case n<13:
    		str='小';
    		if(n%2==0){
    			str+='双';
    		}else{
    			str+='单';
    		}
    		break;
    	}
    	debugger;
    	return str;
 
    }
}]);
})();





