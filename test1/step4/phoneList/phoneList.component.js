'use strict';

angular.module('phoneList')
	   .component('greatUser',
		{
			templateUrl:'phoneList/phoneList.template.html',
			controller:function greatUserController(){
				this.user={'username':'gpp',
							'age':'18'
				};
			}
		});