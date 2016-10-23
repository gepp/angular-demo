'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'tpl/app_dashboard.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/controllers/chart.js']);
                                }
                            ]
                        }
                    }).state('app.indicators', {
                        template: '<div ui-view class="fade-in-up"></div>'
                    }).state('app.indicators.list', {
                        url: '/indicators?name&current',
                        templateUrl: 'tpl/indicator/list.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/controllers/indicator.js']);
                                }
                            ]
                        }
                    }).state('app.indicators.add', {
                        url: '/indicators/add',
                        templateUrl: 'tpl/indicator/edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/controllers/indicator.js']);
                                }
                            ]
                        }
                    }).state('app.indicators.edit', {
                        url: '/indicators/{_id:[a-f0-9]{24}}/edit',
                        templateUrl: 'tpl/indicator/edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/controllers/indicator.js']);
                                }
                            ]
                        }
                    }).state('app.tags', {
                        template: '<div ui-view class="fade-in-up"></div>'
                    }).state('app.tags.list', {
                        url: '/tags?name&current',
                        templateUrl: 'tpl/tag/list.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/resources/tag.js', '/js/controllers/tag.js']);
                                }
                            ]
                        }
                    }).state('app.tags.add', {
                        url: '/tags/add',
                        templateUrl: 'tpl/tag/edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/resources/tag.js', '/js/controllers/tag.js']);
                                }
                            ]
                        }
                    }).state('app.tags.edit', {
                        url: '/tags/{_id:[a-f0-9]{24}}/edit',
                        templateUrl: 'tpl/tag/edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/tag.js', '/js/resources/indicator.js', '/js/controllers/tag.js']);
                                }
                            ]
                        }
                    }).state('app.questions', {
                        template: '<div ui-view class="fade-in-up"></div>'
                    }).state('app.questions.list', {
                        url: '/questions?name&current',
                        templateUrl: 'tpl/tag/list.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/resources/tag.js', '/js/controllers/tag.js']);
                                }
                            ]
                        }
                    }).state('app.questions.add', {
                        url: '/questions/add',
                        templateUrl: 'tpl/question/edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/indicator.js', '/js/resources/tag.js', '/js/controllers/question.js']);
                                }
                            ]
                        }
                    }).state('app.questions.edit', {
                        url: '/questions/{_id:[a-f0-9]{24}}/edit',
                        templateUrl: 'tpl/question/edit.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['/js/resources/tag.js', '/js/resources/indicator.js', '/js/controllers/tag.js']);
                                }
                            ]
                        }
                    })
            }
        ]
    );
