'use strict';

var articlesModule = angular.module('articlesModule', ['ngAnimate', 'ui.bootstrap']);


articlesModule.run(['$anchorScroll', function ($anchorScroll) {
    $anchorScroll.yOffset = 50;
}]).controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
  function ($anchorScroll, $location, $scope) {
        $scope.gotoAnchor = function (x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('anchor' + x);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };
  }
]);





articlesModule.run(['$anchorScroll', function ($anchorScroll) {
    $anchorScroll.yOffset = 50;
}]).controller('articlesforDay', function ($scope, $http) {

    $scope.today = function () {
        $scope.date = new Date();
    };
    $scope.today();

    $scope.open = function () {
        $scope.popup.opened = true;
    };


    $scope.format = 'dd.MM.yyyy';

    $scope.popup = {
        opened: false
    };




    $scope.articlesForDay = function () {

        var queryString = createQueryStringForDay($scope.date);

        $http({
            method: 'GET',
            url: queryString
        }).then(function (response) {
            $scope.articles = response.data;
        });
    };

    $scope.date = new Date();

    $scope.articlesForDay($scope.date);

});

articlesModule.controller('articleController', function ($scope, $http) {

    $scope.isCollapsed = true;

    $scope.expand = function (item) {

        var queryString = createQueryStringForArticle(item.id);

        if (!$scope.paragraphs) {

            $http({
                method: 'GET',
                url: queryString
            }).then(function (response) {

                $scope.paragraphs = response.data;

                $scope.isCollapsed = !$scope.isCollapsed;

            });
        } else {
            $scope.isCollapsed = !$scope.isCollapsed;
        }

    };
});

function convertForQuery(name, value) {

    return name + "=" + value + "&";

}

function createQueryStringForDay(date) {

    return "/day?" + convertForQuery('year', date.getFullYear()) + convertForQuery('month', date.getMonth() + 1) + convertForQuery('day', date.getDate());

}

function createQueryStringForArticle(id) {

    return "/article?" + convertForQuery('id', id);

}
