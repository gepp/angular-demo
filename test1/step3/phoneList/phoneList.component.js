'use strict';

angular.module('phoneList')
	   .component('greatUser',
		{
			template:'Hello, {{$ctrl.user.username}},you age is {{$ctrl.user.age}}',
			controller:function greatUserController(){
				this.user={'username':'gpp',
							'age':'18'
				};
			}
		});