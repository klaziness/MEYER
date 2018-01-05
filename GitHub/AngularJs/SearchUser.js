var SearchUser = angular.module('SearchUser', []);
SearchUser.controller('mainController', function ($scope, $http) {

    $scope.AsSise = "@";

    $scope.getSearch = function (keyEvent) {
        switch (keyEvent.which) {
            case 13:
                getData($scope.keySearch);
                break;
        }
    };

    $scope.clickSearch = function () {
        getData($scope.keySearch);
    };

    function getData(keySearch) {
        $scope.listUser = [];
        var url = "https://api.github.com/search/users?q=";

        $http.get(url + keySearch)

        .success(function (result) {
            console.log(result.items);
            // loop
            angular.forEach(result.items, function (item) {
                var valObj = {};

                valObj.Fullname = getFullName(item.url);
                valObj.Username = item.login;
                valObj.Pic = item.avatar_url;
                valObj.R_epo = item.repos_url;

                console.log(item.repos_url);

                $scope.listUser.push(valObj);
            });
            // loop

            console.log($scope.listUser);

        })
        .error(function (data) {
            console.log(data);
        });
    }

    function getFullName(url) {
        $http.get(url)
        .success(function (resultFull) {
            return resultFull.name;
        })
        .error(function (data) {
            console.log(data);
        });

    }

    $scope.clickViewRepo = function (url) {
        console.log(url);
    };
});