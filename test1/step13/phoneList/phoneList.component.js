'use strict';

angular.module('phoneList')
	   .component('phoneList',
		{
			templateUrl:'phoneList/phoneList.template.html',
			controller:['$http',function greatUserController($http){
					 var self = this;
        			self.orderBy = 'username';
					$http.get('http://localhost:8081/user/list').then(
						function(response){
							 
							self.users=response.data;
							 
						}

					);
				}
			 ]
		});