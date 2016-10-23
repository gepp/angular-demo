'use strict';

angular.module('phoneList')
	   .component('greatUser',
		{
			templateUrl:'phoneList/phoneList.template.html',
			controller:function greatUserController(){
				this.users=[
							{'username':'wildmoney','age':'17'},
							{'username':'gpp','age':'18'},
							{'username':'kangzhao','age':'19'},
							{'username':'xulei','age':'20'}
 							];
			}
		});