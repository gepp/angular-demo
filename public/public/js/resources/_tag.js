app.factory('Tag', ['$resource', function($resource) {

    return $resource('/tags/:_id', {}, {
        "query": {
            method: 'GET',
            url: '/tags?name=:name&current=:current',
            params: { "name": '@name', 'current': '@current' },
            isArray: false
        },
        "update": {
            method: 'PUT'
        }
    });
}]);
