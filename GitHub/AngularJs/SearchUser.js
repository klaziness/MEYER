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
            // loop
            angular.forEach(result.items, function (item) {
                var valObj = {};

                valObj.Fullname = getFullName(item.url);
                valObj.Username = item.login;
                valObj.Pic = item.avatar_url;
                valObj.R_epo = item.repos_url;

                $scope.listUser.push(valObj);
            });
            // loop

            console.log('item-array => ' + $scope.listUser);

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

    $scope.clickViewRepo = function (url, name) {

        $scope.userName = name;
        $scope.v_Repo = [];

        //console.log('url => ' + url);

        // ex para url : https://api.github.com/users/msintuneappsdk/repos
        $http.get(url)
        .success(function (resultFull) {

            angular.forEach(resultFull, function (item) {

                var v_valObj = {};

                v_valObj.v_name = item.name;
                v_valObj.v_description = item.description;
                v_valObj.v_stargazers_count = item.stargazers_count;
                v_valObj.v_forks_count = item.forks_count;

                if (item.language === null) {
                    v_valObj.v_checkUndefined = false;
                } else {
                    v_valObj.v_checkUndefined = true;
                };

                v_valObj.v_language = item.language;

                // add obj to array
                $scope.v_Repo.push(v_valObj);
            });
        })
        .error(function (data) {
            console.log(data);
        });
    };
});