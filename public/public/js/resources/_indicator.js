app.factory('Indicator', ['$resource', function($resource) {

    return $resource('/indicators/:_id', {}, {
        "query": {
            method: 'GET',
            url: '/indicators?name=:name&current=:current',
            params: { "name": '@name', 'current': '@current' },
            isArray: false
        },
        "update": {
            method: 'PUT'
        }
    });
}]);
