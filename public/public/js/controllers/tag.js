'use strict';

app
    .controller('tagListCtrl', ['$scope', '$http', '$state', "$stateParams", 'Tag', function($scope, $http, $state, $stateParams, Tag) {
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
            Tag.query({}, $scope.filter, function(res) {
                if (res.code == 200) {
                    $scope.tags = res.data.tags;
                    res.data.page.length = res.data.tags.length;
                    $scope.showPage(res.data.page);
                } else {
                    $toast(res.msg);
                }
            })
        };
        $scope.query();
        // 传递参数
        $scope.edit = function(id) {
            $state.go('app.tags.edit', { _id: id, filter: $scope.filter });
        };
    }]);
app // 修改
    .controller('tagEditCtrl', ["$scope", "$http", "$state", "$stateParams", 'Tag', 'Indicator', '$modal', function($scope, $http, $state, $stateParams, Tag, Indicator, $modal) {
    var _id = $stateParams._id;
    if (_id) { // edit 载入资源
        Tag.get({ "_id": _id }, {}, function(res) {
            if (res.code == 200) {
                $scope.tag = res.data;
            } else if (res.code == 404) { //为找到
            }
        });
    }
    $scope.tag = { indicators:[]};
    // 选择
    $scope.openSelect = function() {
        var modalInstance = $modal.open({
            templateUrl: 'tpl/modal/select-indicator.html',
            controller: ModalInstanceCtrl,
            resolve: {
                items: function() {
                    return $scope.tag.indicators;
                }
            }
        });
        modalInstance.result.then(function(result) {
            $scope.tag.indicators = result;
        });
    };
    var ModalInstanceCtrl = function($scope, $modalInstance, items) {
        $scope.indicators = [];
        $scope.selected = angular.copy(items);
        $scope.selected_ids = [];
        if (angular.isArray(items))
            for (var prop in items)
                $scope.selected_ids.push(items[prop]._id);

        $scope.filter = { name: '', current: 1 };
        $scope.page = { current: 1, pages: 1 };

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
                    $scope.page = res.data.page;
                } else {
                    $toast(res.msg);
                }
            })
        };
        $scope.query();

        // 修改增加tags
        $scope.toggleSelect = function(e, indicator) {
            var cb = e.target;
            if (cb.checked) { // add 
                $scope.selected.push(indicator);
                $scope.selected_ids.push(indicator._id);
            } else { // remove
                var index = $scope.selected_ids.indexOf(indicator._id);
                $scope.selected_ids.splice(index, 1);
                $scope.selected.splice(index, 1);
            }
        };
        $scope.toggleSelectAll = function(e) {
            var cb = e.target;
            if (cb.checked) { // add 
                $scope.indicators.forEach(function(indicator) {
                    if ($scope.selected_ids.indexOf(indicator._id) < 0) {
                        $scope.selected.push(indicator);
                        $scope.selected_ids.push(indicator._id);
                    }
                });
            } else { // remove
                $scope.selected_ids = [];
                $scope.selected = [];
            }
        };
        $scope.isSelectedAll = function(e) {
            var hasSelectedAll = true;
            $scope.indicators.forEach(function(indicator) {
                if ($scope.selected_ids.indexOf(indicator._id) < 0) {
                    hasSelectedAll = false;
                    return false;
                }
            });
            return hasSelectedAll;
        };
        $scope.ok = function() {
            $modalInstance.close($scope.selected);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    };
    // 删除指标
    $scope.delIndicator = function(_id, index) {
        $scope.tag.indicators.splice(index, 1);
    };

    $scope.processForm = function() { // 保存修改
        var _tag = angular.copy($scope.tag);
        _tag.indicators = [];
        if (angular.isArray($scope.tag.indicators))
            for (var prop in $scope.tag.indicators)
                _tag.indicators.push($scope.tag.indicators[prop]._id);
        if ($scope.tag._id) { // update
            Tag.update({ "_id": $scope.tag._id }, _tag, function(res) {
                if (res.code == 200) {
                    $state.go('app.tags.list', $stateParams);
                }
            });
        } else { // new 
            Tag.save({}, _tag, function(res) {
                if (res.code == 200) {
                    $state.go('app.tags.list', $stateParams);
                }
            });
        }
    };
}]);
