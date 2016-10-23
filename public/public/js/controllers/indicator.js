'use strict';

app
    .controller('indicatorListCtrl', ['$scope', '$http', '$state', "$stateParams", 'Indicator', function($scope, $http, $state, $stateParams, Indicator) {
        $scope.filter = { name: '', current: 1 };
        for (var prop in $stateParams)
            if ($stateParams[prop])
                $scope.filter[prop] = $stateParams[prop];

        $scope.showPage = function(page) {
            $scope.page = page;
            $scope.page.start = (page.current - 1) * page.duration + 1;
            $scope.page.end = (page.current - 1) * page.duration + page.length;
            $scope.page.maxSize = 7;
        };
        $scope.keySearch = function(event) {
            if (event.keyCode == 13)
                $scope.research();
        };
        $scope.research = function() {
            if ($scope.filter.current == 1) {
                $scope.query();
            } else {
                $scope.filter.current = 1;
            }
        };
        $scope.$watch('filter.current', function(_new, old, scope) {
            if (_new != old)
                scope.query();
        });
        $scope.query = function() {
            Indicator.query({}, $scope.filter, function(res) {
                if (res.code == 200) {
                    $scope.indicators = res.data.indicators;
                    res.data.page.length = res.data.indicators.length;
                    $scope.showPage(res.data.page);
                } else {
                    $toast(res.msg);
                }
            })
        };
        $scope.query();
        // 传递参数
        $scope.edit = function(id) {
            $state.go('app.indicators.edit', { _id: id, filter: $scope.filter });
        };
    }]);
app // 修改
    .controller('indicatorEditCtrl', ["$scope", "$http", "$state", "$stateParams", 'Indicator', function($scope, $http, $state, $stateParams, Indicator) {
    var _id = $stateParams._id;
    if (_id) { // edit 载入资源
        Indicator.get({ "_id": _id }, {}, function(res) {
            if (res.code == 200) {
                $scope.indicator = res.data;
            } else if (res.code == 404) { //为找到
            }
        });
    }
    //
    $scope.processForm = function() {
        if ($scope.indicator._id){ // update
            Indicator.update({"_id": $scope.indicator._id},$scope.indicator,function (res){
                if (res.code == 200 ){
                    $state.go('app.indicators.list',$stateParams);
                }
            });
        }else{ // new 
            Indicator.save({},$scope.indicator,function (res){
                if (res.code == 200){
                    $state.go('app.indicators.list',$stateParams);
                }
            });
        }
    };
}]);
