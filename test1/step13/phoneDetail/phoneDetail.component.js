'use strict';

angular.module('phoneDetail')
	   .component('phoneDetail',
		{
			templateUrl:'phoneDetail/phoneDetail.template.html',
			controller:['$routeParams',function greatUserController($routeParams){
					  this.userId = $routeParams.phoneId;
				}
			 ]
		});