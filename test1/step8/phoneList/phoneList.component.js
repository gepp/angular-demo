'use strict';

angular.module('phoneList')
	   .component('greatUser',
		{
			templateUrl:'phoneList/phoneList.template.html',
			controller:['$http',function greatUserController($http){
					 var self = this;
        			self.orderBy = 'username';
					$http.get('http://localhost:8081/user/list').then(
						function(response){
							console.log(response.data);
							self.users=response.data;
							console.log(self.users);
						}

					);
				}
			 ]
		});